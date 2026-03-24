---
task: Fix Jekyll Liquid errors in Python series posts
slug: 20260324-140158_fix-jekyll-liquid-python-series
effort: standard
phase: execute
progress: 8/8
mode: interactive
started: 2026-03-24T14:01:58Z
updated: 2026-03-24T14:05:00Z
---

## Context

Python series blog posts contain f-string code blocks with `{{` and `}}` (CSS in f-strings, Prometheus templates, Jinja2 templates). Jekyll's Liquid engine tries to parse these as template tags and throws errors. Fix: wrap each affected code block with `{% raw %}` / `{% endraw %}`.

**Affected files:**
- day3 (day3-python-network-recon-vulnerability-scanner.md): Python block lines 17-511
- day4 (day4-python-container-security-scanner-trivy.md): Python block lines 17-481
- day6 (day6-python-soc-alert-triage-automation.md): Python block lines 17-459
- day7 (day7-python-security-dashboard-prometheus-grafana.md): YAML block lines 532-560
- day8 (day8-python-phishing-simulation-platform.md): Python block 17-591, bash block 620-651

## Criteria

- [x] ISC-1: day3 Python block wrapped with raw/endraw tags
- [x] ISC-2: day4 Python block wrapped with raw/endraw tags
- [x] ISC-3: day6 Python block wrapped with raw/endraw tags
- [x] ISC-4: day7 YAML block wrapped with raw/endraw tags
- [x] ISC-5: day8 main Python block wrapped with raw/endraw tags
- [x] ISC-6: day8 bash installation block wrapped with raw/endraw tags
- [x] ISC-7: No existing raw tags duplicated or broken
- [x] ISC-8: All other Python series posts confirmed clean (no {{ patterns)

## Decisions

Use `{% raw %}` on line before opening fence, `{% endraw %}` on line after closing fence.

## Verification
