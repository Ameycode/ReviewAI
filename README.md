# ReviewAI

> **An automated GitHub Pull Request Review Engine built with GitHub Actions, Node.js, and the GitHub REST API.**

ReviewAI is a modular pull request review framework that automates the code review workflow using GitHub Actions. It fetches changed files from pull requests, filters irrelevant files, processes review batches, and posts structured review comments directly on GitHub.

> **Version:** v1.0.0 (Foundation Release)

---

# Overview

ReviewAI simplifies the pull request review process by automating repetitive review tasks.

Instead of manually inspecting every changed file, ReviewAI:

* Retrieves changed files from a pull request
* Filters unsupported and generated files
* Organizes files into review batches
* Generates structured Markdown review reports
* Posts review comments directly on the pull request
* Updates previous ReviewAI comments instead of creating duplicates
* Tracks execution metrics and workflow information

The architecture is designed so AI providers can be integrated later without changing the core review engine.

---

# Features

## GitHub Integration

* GitHub Actions automation
* GitHub REST API integration
* Automatic Pull Request detection
* Fetch changed files
* Create review comments
* Update existing review comments

## Review Engine

* Smart file filtering
* Batch processing
* Modular review architecture
* Markdown report generation
* Detailed workflow logging

## Performance

* Ignore binary files
* Ignore generated folders
* Ignore lock files
* Ignore minified files
* Configurable batch processing

## Metrics

* Files changed
* Files reviewed
* Files ignored
* Number of batches
* Execution logs

---

# Project Architecture

```text
                    GitHub Pull Request
                             │
                             ▼
                    GitHub Actions Workflow
                             │
                             ▼
                    ReviewAI Engine
         ┌──────────────┬───────────────┐
         │              │               │
         ▼              ▼               ▼
     GitHub API     File Filter     Batch Engine
         │                              │
         └──────────────┬───────────────┘
                        ▼
               Markdown Formatter
                        │
                        ▼
              Pull Request Comment
```

---

# Project Structure

```text
ReviewAI
│
├── .github/
│   └── workflows/
│       └── review.yml
│
├── src/
│   ├── ai.js
│   ├── batch.js
│   ├── config.js
│   ├── constants.js
│   ├── filter.js
│   ├── formatter.js
│   ├── github.js
│   ├── index.js
│   ├── logger.js
│   ├── metrics.js
│   ├── prompt.js
│   ├── reviewEngine.js
│   └── utils.js
│
├── package.json
├── README.md
└── LICENSE
```

---

# Workflow

```text
Pull Request Opened
        │
        ▼
GitHub Action Triggered
        │
        ▼
Read Event Payload
        │
        ▼
Fetch Changed Files
        │
        ▼
Filter Unsupported Files
        │
        ▼
Create Review Batches
        │
        ▼
Generate Markdown Report
        │
        ▼
Create / Update Pull Request Comment
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/<your-username>/ReviewAI.git
cd ReviewAI
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create the required GitHub Secrets:

* `GITHUB_TOKEN`
* `OPENROUTER_API_KEY` *(reserved for future AI integration)*

---

# Running

```bash
npm start
```

---

# Supported File Filtering

ReviewAI automatically ignores:

* Images
* PDFs
* Binary files
* Lock files
* Generated folders
* Minified JavaScript
* Large patches
* Files without diffs

---

# Example Output

```text
========================================
ReviewAI Started
========================================

Repository : user/project
PR Number  : 5

Found 14 changed file(s)

Supported Files : 10
Ignored Files   : 4

Created 5 batch(es)

Review Completed

========================================
```

---

# Technologies Used

* Node.js
* JavaScript (ES Modules)
* GitHub Actions
* GitHub REST API
* Octokit
* Markdown
* GitHub CI/CD

---

# Current Version

## v1.0.0 — Foundation Release

### Included

* GitHub Actions integration
* GitHub API integration
* Pull request automation
* Smart file filtering
* Batch processing
* Markdown formatter
* Pull request comment creation
* Pull request comment updates
* Logging
* Metrics
* Modular architecture

### Planned

* AI-powered review generation
* Inline review comments
* Severity classification
* Language detection
* Framework detection
* Risk scoring
* Multi-provider AI support
* Web dashboard
* CLI support

---

# Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# License

This project is licensed under the **MIT License**.

---

# Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.
