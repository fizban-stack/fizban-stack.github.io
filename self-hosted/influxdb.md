---
layout: detail-page
back_url: /self-hosted
back_text: Back to Self-Hosted Apps
breadcrumb_url: /self-hosted
breadcrumb_text: Self-Hosted
title: InfluxDB
subtitle: Time-Series Database
description: Purpose-built time-series database for metrics and events.
image: self-hosted/influxdb.webp
github: https://github.com/influxdata/influxdb
official: https://www.influxdata.com
---

InfluxDB is a purpose-built time-series database designed for handling high write and query loads for metrics, events, and analytics.

## Key Features

- High-performance time-series storage
- SQL-like query language
- Data retention policies
- Continuous queries
- Built-in web interface
- Integration with Grafana

## Why I Use It

InfluxDB handles time-series data that works better with a push model — things like network device metrics, sensor readings, and data from services that write out to InfluxDB natively. Grafana queries it alongside Prometheus, so I can mix data sources within a single dashboard. The retention policies let me keep high-resolution data for a short window and automatically downsample older data, which keeps storage from growing unbounded. It is a focused tool that does one thing well and integrates cleanly with the rest of my monitoring stack.
