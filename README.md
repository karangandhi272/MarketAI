# MarketAI: Natural Language to SQL for Marketing Analytics

![Logo](MarketAI/public/marketai.svg)


## Overview

MarketAI is a powerful tool that enables marketing professionals to query their database using natural language rather than SQL. Simply ask questions in plain English, and get instant SQL-powered analytics with clear explanations and visualized results.

## Features

- 🗣️ **Natural Language Interface**: Ask questions in plain English
- 🔍 **Smart SQL Generation**: AI-powered conversion of natural language to optimized SQL queries
- 📊 **Instant Results**: Get immediate answers with explanations of how the query works
- 🔐 **Secure Connections**: Connect securely to your PostgreSQL database
- 📋 **Database Schema Viewer**: Easily explore your database structure
- 🧩 **Explanation Included**: Every query comes with an explanation of how it works

## Architecture

MarketAI consists of two main components:

1. **Frontend**: React-based web interface for interacting with the system
2. **Backend**: Next.js API routes handling database connections and query execution

## Prerequisites

- Node.js 16+
- PostgreSQL database
- OpenAI API key

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/karangandhi272/MarketAI.git
cd MarketAI

# Install dependencies for frontend
cd MarketAI
npm install

# Install dependencies for backend
cd ../backend
npm install
```

## Configuration

### Frontend Configuration

Create a `.env` file in the `MarketAI` directory with the following code:
```
VITE_OPENAI_API_KEY=Your_Key
```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run dev
```

### Start the Frontend Server

```bash
cd MarketAI
npm run dev
```

## CC BY-NC-ND License

This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. 

You may not use this work for commercial purposes, and you may not distribute modified versions of it. To view a copy of this license, visit [https://creativecommons.org/licenses/by-nc-nd/4.0/](https://creativecommons.org/licenses/by-nc-nd/4.0/).

## Contributing
Contributions are welcome! However, please note that due to the nature of this license, all contributions must comply with the **CC BY-NC-ND** license. Please feel free to submit a Pull Request.

## Support
If you encounter any problems or have questions, please open an issue on GitHub.








