// src/models/Task.js
const db = require('../config/db');

class Task {
  static async create(title, description = '', completed = 0) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
        [title, description, completed ? 1 : 0],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, title, description, completed: !!completed });
        }
      );
    });
  }

  static async findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, title, description, completed, createdAt FROM tasks ORDER BY id DESC', [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(r => ({ ...r, completed: !!r.completed })));
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, title, description, completed, createdAt FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(undefined);
        resolve({ ...row, completed: !!row.completed });
      });
    });
  }

  static async update(id, fields = {}) {
    const updates = [];
    const params = [];
    if (fields.title !== undefined) {
      updates.push('title = ?');
      params.push(fields.title);
    }
    if (fields.description !== undefined) {
      updates.push('description = ?');
      params.push(fields.description);
    }
    if (fields.completed !== undefined) {
      updates.push('completed = ?');
      params.push(fields.completed ? 1 : 0);
    }

    if (updates.length === 0) return this.findById(id);

    params.push(id);
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve(Task.findById(id));
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  }
}

module.exports = Task;
