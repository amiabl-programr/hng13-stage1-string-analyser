# String Analyser 🧮

A simple Node.js REST API for analysing and storing strings in-memory.  
It supports features like hashing, palindrome detection, word count, character frequency, and both filtered and natural-language search.

## Table of Contents

- [Features](#features)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
  - `POST /strings` — Submit a new string  
  - `GET /strings/:id` — Retrieve a specific string  
  - `GET /strings` — Get all strings (with optional filters)  
  - `GET /strings/filter-by-natural-language` — Natural language filtering  
  - `DELETE /strings/:id` — Delete a string  
- [Data Model](#data-model)  
- [Filtering Options](#filtering-options)  
- [Natural Language Query](#natural-language-query)  
- [Examples](#examples)  
- [License](#license)

## Features

- In-memory storage of submitted strings (uses SHA-256 hash as unique ID)  
- Computes properties for each string: length, palindrome check, unique characters count, word count, character frequency map  
- Retrieve individual or all stored strings  
- Filter by query parameters (length, word count, contains character, palindrome)  
- Natural language search support (e.g., “all single word palindromic strings”)  
- Easy to replace in-memory DB with a persistent store down the line  

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- npm or yarn  

### Installation

```bash
git clone https://github.com/amiabl-programr/hng13-stage1-string-analyser.git
cd hng13-stage1-string-analyser
npm install
