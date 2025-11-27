// scripts/seed-tasks.js
const Task = require('../src/models/Task');
const db = require('../src/config/db');

async function seed() {
  try {
    console.log('Seeding tasks...');

    // Clear existing tasks to make seeding idempotent (optional)
    await new Promise((res, rej) => db.run('DELETE FROM tasks', (err) => (err ? rej(err) : res())));

    const examples = [
      { title: 'Buy groceries', description: 'Milk, Bread, Eggs', completed: false },
      { title: 'Finish report', description: 'Quarterly financials', completed: false },
      { title: 'Walk the dog', description: 'Evening walk', completed: true },
      { title: 'Call Alice', description: 'Discuss project status', completed: false }
    ];

    for (const t of examples) {
      const created = await Task.create(t.title, t.description, t.completed);
      console.log('Inserted task id:', created.id);
    }

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    db.close();
  }
}

seed();
