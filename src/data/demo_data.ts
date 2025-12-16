export const demoData = {
    "name": "default",
    "groups": {
        "1356-ci-cd": {
            "name": "1356-ci-cd",
            "repos": {
                "app_gonzfixi": {
                    "name": "app_gonzfixi",
                    "images": {
                        "1.0.5": {
                            "name": "quay.neelamcorp.priv/1356-ci-cd/app_gonzfixi:1.0.5",
                            "version": "1.0.5",
                            "vulnerabilities": [
                                {
                                    "cve": "CVE-2024-22262",
                                    "severity": "high",
                                    "status": "Open",
                                    "description": "Spring Framework: Open Redirect / SSRF vulnerability",
                                    "owner": "Backend Team"
                                },
                                {
                                    "cve": "CVE-2024-22259",
                                    "severity": "high",
                                    "status": "In Progress",
                                    "description": "Spring Framework: URI Validation Bypass",
                                    "owner": "Backend Team"
                                },
                                {
                                    "cve": "CVE-2024-22243",
                                    "severity": "medium",
                                    "status": "Review",
                                    "description": "Spring Web: Open Redirect vulnerability",
                                    "owner": "Frontend Team"
                                },
                                {
                                    "cve": "CVE-2023-45871",
                                    "severity": "critical",
                                    "status": "Open",
                                    "description": "Apache Tomcat: HTTP Request Smuggling",
                                    "owner": "DevOps"
                                },
                                {
                                    "cve": "CVE-2023-44487",
                                    "severity": "critical",
                                    "status": "Patching",
                                    "description": "HTTP/2 Rapid Reset Attack",
                                    "owner": "SRE"
                                },
                                {
                                    "cve": "CVE-2023-38545",
                                    "severity": "high",
                                    "status": "Open",
                                    "description": "curl: SOCKS5 heap buffer overflow",
                                    "owner": "Infra"
                                },
                                {
                                    "cve": "CVE-2023-50164",
                                    "severity": "critical",
                                    "status": "Open",
                                    "description": "Apache Struts: File Upload RCE",
                                    "owner": "Legacy Team"
                                },
                                {
                                    "cve": "CVE-2024-1001",
                                    "severity": "low",
                                    "status": "Ignored",
                                    "description": "Minor info leak in logging lib",
                                    "owner": "Common Libs"
                                },
                                {
                                    "cve": "CVE-2024-1002",
                                    "severity": "medium",
                                    "status": "Open",
                                    "description": "Cross-site Scripting in Search Bar",
                                    "owner": "Frontend Team"
                                },
                                {
                                    "cve": "CVE-2024-1003",
                                    "severity": "medium",
                                    "status": "Fixed",
                                    "description": "Unvalidated redirect in login flow",
                                    "owner": "Auth Team"
                                },
                                {
                                    "cve": "CVE-2024-1004",
                                    "severity": "low",
                                    "status": "Open",
                                    "description": "Verbose error messages",
                                    "owner": "Backend Team"
                                },
                                {
                                    "cve": "CVE-2024-1005",
                                    "severity": "high",
                                    "status": "Analysis",
                                    "description": "SQL Injection in comments API",
                                    "owner": "Backend Team"
                                },
                                {
                                    "cve": "CVE-2024-1006",
                                    "severity": "critical",
                                    "status": "Open",
                                    "description": "Remote Code Execution via deserialization",
                                    "owner": "Core Platform"
                                },
                                {
                                    "cve": "CVE-2024-1007",
                                    "severity": "medium",
                                    "status": "Open",
                                    "description": "Insecure Direct Object Reference",
                                    "owner": "API Team"
                                },
                                {
                                    "cve": "CVE-2024-1008",
                                    "severity": "low",
                                    "status": "Won't Fix",
                                    "description": "Timestamp disclosure",
                                    "owner": "Infra"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
};
