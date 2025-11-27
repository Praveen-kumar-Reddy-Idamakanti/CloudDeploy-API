// src/config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

require('dotenv').config();

const dbPath = path.join(__dirname, '../../data/app.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database tables
const initializeDB = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
        } else {
          console.log('Users table initialized');
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('Error creating tasks table:', err.message);
        } else {
          console.log('Tasks table initialized');
        }
      }
    );
  });
};

// Run initialization
initializeDB();

module.exports = db;