---
layout: post
title: "Machine Learning Network Traffic Analysis with Nvidia Jetson Orin Nano Super"
date: 2026-01-05
category: Cybersecurity
author: James Wells
---

When I purchased the Nvidia Jetson Orin Nano Super developer kit, I wanted to explore practical machine learning applications for cybersecurity. Instead of running it with a desktop environment, I configured it as a headless server dedicated to analyzing network traffic using NetFlow data and machine learning models. This post documents my journey setting up an ML-powered network threat detection system.

## Why the Jetson Orin Nano?

The Jetson Orin Nano Super offers compelling advantages for this use case. With 8GB of RAM, a powerful GPU for ML acceleration, and ARM-based efficiency, it's perfect for running as a dedicated network analysis appliance. The device draws minimal power compared to a traditional server while still providing enough computational resources to train and run machine learning models on network traffic data.

## Project Overview

The goal was to create a system that could:
- Collect NetFlow data from network devices (routers, firewalls)
- Extract meaningful features from network flows
- Train machine learning models to detect malicious traffic patterns
- Provide real-time threat detection and alerting

This approach complements traditional signature-based detection by identifying anomalous behavior patterns that might indicate C2 beaconing, data exfiltration, port scanning, or other attack techniques.

## Setting Up NetFlow Collection

The first step was installing nfdump, a suite of tools for collecting and processing NetFlow data. NetFlow is a network protocol that captures metadata about network traffic—source/destination IPs, ports, protocols, byte counts, and timing information—without capturing the actual packet payloads.

After installing nfdump, I configured the daemon to listen for NetFlow exports from my OpnSense firewall. The configuration file defines critical parameters like which port to listen on (2055 is standard), where to store flow data, and how to organize it. I chose to organize flows by date in subdirectories, making historical analysis more manageable.

The daemon runs in the background, continuously receiving flow records and writing them to disk. I configured my firewall to export NetFlow v5 data to the Jetson's IP address, creating a continuous stream of network metadata for analysis.

## Building the ML Pipeline

With flow data being collected, the next challenge was transforming raw NetFlow records into features suitable for machine learning. I created a Python-based feature extraction pipeline that processes the flow data and calculates derived metrics.

### Feature Extraction

The feature extraction script reads NetFlow data using subprocess calls to nfdump, then processes each flow to extract over 40 different features. These include basic identifiers (IPs, ports, protocols), volume metrics (bytes, packets), temporal characteristics (duration, packets per second), and behavioral indicators.

The key insight is that malicious traffic often exhibits distinct statistical patterns. For example:
- **Port scans** show many short-duration flows to sequential ports with minimal data transfer
- **C2 beaconing** demonstrates regular timing intervals with fixed packet sizes
- **Data exfiltration** reveals asymmetric byte ratios with large outbound transfers
- **DDoS traffic** exhibits extremely high packet rates to single destinations

The feature extraction code calculates metrics like bytes per packet, packet ratios, flow duration characteristics, and flags for suspicious patterns. It also identifies common services (HTTP, HTTPS, DNS, SSH) and marks potential indicators of compromise like high-port-to-high-port communication or large transfers with few packets.

### Building Training Data

Machine learning models need labeled data—examples of both benign and malicious traffic. I approached this from multiple angles:

First, I integrated threat intelligence feeds from sources like abuse.ch (URLhaus, Feodo Tracker) and Emerging Threats. These provide lists of known malicious IPs associated with botnets, malware C2 servers, and compromised hosts. Any flow involving these IPs gets labeled as malicious.

Second, I identified known benign traffic—internal network communication, traffic to trusted DNS servers, and flows to legitimate services.

For IP addresses not in either category, the system labels them as "unknown" and excludes them from initial training. This conservative approach ensures the model learns from high-confidence examples.

To augment the dataset, I also created synthetic malicious flows representing different attack patterns. The synthetic generation script creates flows with characteristics matching real attacks—port scans with single SYN packets, C2 beacons with regular intervals and fixed packet sizes, brute force attempts with multiple failed connections, and data exfiltration with asymmetric byte ratios.

### Model Training

For the classification model, I chose XGBoost (Extreme Gradient Boosting). It handles imbalanced datasets well, provides feature importance rankings, and runs efficiently even on modest hardware. The model learns to distinguish malicious from benign traffic based on the extracted features.

The training process includes several important steps. First, I split the data into training (80%) and test (20%) sets while maintaining class distribution. If the dataset is imbalanced (which is common—most network traffic is benign), I apply SMOTE (Synthetic Minority Over-sampling Technique) to balance the classes and prevent the model from simply predicting everything as benign.

The XGBoost classifier trains on the feature vectors, learning which combinations of features best predict malicious traffic. After training, I evaluate performance using multiple metrics: precision (how many predicted threats are real), recall (how many real threats we catch), F1-score (harmonic mean of precision and recall), and ROC-AUC (ability to distinguish classes across different thresholds).

![Model Performance Metrics](/assets/images/blog/nvidia-jetson/model_performance.webp)

The visualization above shows the model's performance across several key dimensions. The confusion matrix demonstrates the model's classification accuracy, showing true positives, true negatives, and the rate of false positives and false negatives. The ROC curve illustrates the model's ability to distinguish between benign and malicious traffic at various threshold settings, with the area under the curve (AUC) providing a single metric for overall performance.

Feature importance analysis reveals which characteristics most strongly indicate malicious traffic. In my testing, metrics like byte ratios, packet patterns, duration characteristics, and port behaviors consistently ranked as top indicators. The feature importance chart shows which network flow characteristics the model weighs most heavily when making predictions, providing insight into what patterns are most indicative of malicious activity.

## Real-Time Threat Detection

With a trained model, the system can now analyze live traffic. The detection script periodically exports recent NetFlow data (for example, the last hour), extracts features, and runs predictions. Each flow receives a probability score from 0 to 1, where values closer to 1 indicate higher likelihood of being malicious.

I set a configurable threshold (typically 0.7) for alerting. Flows scoring above this threshold trigger alerts that include the source and destination IPs, ports, protocols, predicted attack type, and probability score. This allows me to investigate suspicious activity while filtering out false positives.

The detection script can run continuously, creating a real-time monitoring system. I configured it to analyze traffic every 5-10 minutes and log alerts for investigation.

## Results and Observations

The system successfully detects various attack patterns in my network traffic. Port scans are easily identified by their characteristic patterns of single-packet flows to many ports. C2 beaconing stands out with its regular timing and fixed packet sizes. Unusual data transfers get flagged based on volume and direction anomalies.

Feature importance analysis revealed interesting insights. Packet and byte ratios proved extremely valuable—malicious traffic often shows asymmetric patterns. Duration characteristics helped identify both very short connections (scans) and unusually long sessions (potential data exfiltration). Port analysis caught suspicious high-port-to-high-port communication that might indicate lateral movement or backdoor access.

False positives do occur, typically from legitimate but unusual traffic patterns—software updates with large downloads, VoIP with regular packet timing, or legitimate security scanning tools. Tuning the threshold and adding known-good IPs to a whitelist helps reduce these.

## Performance on the Jetson

The Jetson Orin Nano handles this workload remarkably well. Feature extraction from 10,000 flows takes 5-10 seconds. Model training on datasets of 50,000-100,000 flows completes in under a minute. Real-time detection adds minimal latency—analyzing an hour of traffic (typically 5,000-20,000 flows depending on network size) completes in seconds.

Running headless significantly improves efficiency. Without the overhead of a desktop environment, the system dedicates resources to the ML pipeline. Power consumption remains low, making this viable as an always-on network monitoring appliance.

## Future Enhancements

I'm planning several improvements. First, implementing sliding window analysis to detect temporal patterns—spotting periodic beaconing or gradual data exfiltration that might not trigger alerts on individual flows but shows suspicious patterns over time.

Second, building separate specialized models for different attack types. A port scan detector, C2 beacon detector, and exfiltration detector could each optimize for their specific patterns, then an ensemble approach could combine their predictions.

Third, integrating with my existing SIEM (Graylog) to correlate NetFlow analysis with log data, creating a more comprehensive threat detection platform.

Finally, experimenting with deep learning approaches—recurrent neural networks that can learn sequential patterns in network behavior over time.

## Conclusion

The Nvidia Jetson Orin Nano Super proves to be an excellent platform for ML-based network security analysis. Its combination of processing power, energy efficiency, and ML capabilities makes it ideal for this use case. Running headless maximizes available resources for the analysis pipeline.

This project demonstrates that effective network threat detection doesn't require enterprise-scale infrastructure. With open-source tools, public threat intelligence, and some Python scripting, you can build a capable ML-powered network monitoring system. The key is understanding which features matter, properly labeling training data, and continuously refining the model as you observe real-world performance.

For anyone interested in practical ML applications for cybersecurity, network traffic analysis is an excellent starting point. The data is readily available from any firewall or router, the feature engineering is straightforward, and the results provide immediate security value.

The code and detailed setup instructions are available on my GitHub, and I'll continue documenting improvements as I expand this system's capabilities.
