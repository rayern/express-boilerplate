# Notes App with ES6 Express and Postgres

## Features
 - Backend
    1. Use Node.js to create the backend of the application.
    2. Use Postgres as the database to store the notes data.
    3. Implement authentication and authorization for users using JWT tokens.
    4. Implement the API endpoints for creating, retrieving, updating, and deleting notes.
    5. Implement security and data protection measures.
       
 - Bonus
    1. Implement the ability to share notes with other users. Share API implemented
    2. Implement a search functionality that allows users to search through their notes. Search paramter has been added in the retrieve API
    3. Host the application on Heroku.

## Requirements
 - Node v18.17.1
 - NPM v9.6.7

## Getting Started

#### Clone the repo:
```bash
git clone https://github.com/rayern/notes.git
```

#### Install dependencies:
```bash
npm install
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```

## Running in Production

```bash
npm start
```
