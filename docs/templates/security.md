# Security Policy

The purpose of Application Security is to identify, track, and resolve security vulnerabilities and defects discovered in software applications in order to facilitate the development of secure applications.

It is therefore important that **all applications must undergo security testing to ensure compliance**

## Supported Versions

This project actively maintains the release and hotfix branches following the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) process. Applicable fixes, including security vulnerabilities and defects can be submitted via a pull request. The following versions of the application are supported:

| Version                         | Supported          |
| ------------------------------- | ------------------ |
| 2.1.x (Latest Features)         | :white_check_mark: |
| 1.0.x (Long Term Support - LTS) | :white_check_mark: |
| < 1.0 (End of Life)             | :x:                |

## Reporting a Vulnerability

Please create an Issue in GitHub using Label: Security. Confirmed security vulnerabilties identified in the application will be addressed within the following timeframe, based upon severity rating from the Common Vulnerability Scoring System [(CVSS v3.0)](https://en.wikipedia.org/wiki/Common_Vulnerability_Scoring_System).

| Severity | CVSS v3.0 | Supported Versions |
| -------- | --------- | ------------------ |
| Critical | 9.0-10.0  | <= 10 days         |
| High     | 7.0-8.9   | <= 30 days         |
| Medium   | 4.0-6.9   | <= 45 days         |
| Low      | 0.1-3.9   | <= 60 days         |

## Bug Bounty

Users who submit security vulnerabilities or defects may be eligible to receive bug bounties with monetary rewards based on severity. The Security team will confirm the security vulnerability or defect within 24 hours using the [CVSS Calculator](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator). Please reach out to Security at **[security@company.com](mailto:security@company.com)** for questions regarding this process.

### References

- [Common Vulnerability Scoring System](https://en.wikipedia.org/wiki/Common_Vulnerability_Scoring_System)
- [Common Vulnerability Scoring System Calculator](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator)
- [Open Web Application Security Project (OWASP) Top 10](https://owasp.org/Top10/)
- [Common Weakness Enumeration (CWE)/SANS Institute TOP 25](https://www.sans.org/top25-software-errors/)
