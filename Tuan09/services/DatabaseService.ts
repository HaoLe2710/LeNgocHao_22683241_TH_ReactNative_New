import * as SQLite from 'expo-sqlite';
import { Task, TaskInput } from '@/models/Task';

const DATABASE_NAME = 'tasks.db';

export class DatabaseService {
  private static db: SQLite.SQLiteDatabase | null = null;

  static async initialize() {
    if (this.db) return this.db;

    try {
      this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          isComplete INTEGER NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL,
          syncedAt TEXT
        );
      `);
      console.log('Database initialized successfully');
      return this.db;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  static async getDb() {
    if (!this.db) {
      return this.initialize();
    }
    return this.db;
  }

  // Create a new task
  static async addTask(task: TaskInput): Promise<Task> {
    const db = await this.getDb();
    const id = Date.now().toString();
    const newTask: Task = {
      ...task,
      id,
    };

    try {
      await db.runAsync(
        'INSERT INTO tasks (id, title, isComplete, createdAt) VALUES (?, ?, ?, ?)',
        [newTask.id, newTask.title, newTask.isComplete ? 1 : 0, newTask.createdAt]
      );
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // Get all tasks
  static async getAllTasks(): Promise<Task[]> {
    const db = await this.getDb();

    try {
      const result = await db.getAllAsync<any>('SELECT * FROM tasks ORDER BY createdAt DESC');
      return result.map(row => ({
        id: row.id,
        title: row.title,
        isComplete: row.isComplete === 1,
        createdAt: row.createdAt,
        syncedAt: row.syncedAt,
      }));
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  }

  // Get a single task by id
  static async getTaskById(id: string): Promise<Task | null> {
    const db = await this.getDb();

    try {
      const result = await db.getFirstAsync<any>(
        'SELECT * FROM tasks WHERE id = ?',
        [id]
      );
      if (!result) return null;

      return {
        id: result.id,
        title: result.title,
        isComplete: result.isComplete === 1,
        createdAt: result.createdAt,
        syncedAt: result.syncedAt,
      };
    } catch (error) {
      console.error('Error getting task:', error);
      return null;
    }
  }

  // Update a task
  static async updateTask(id: string, updates: Partial<TaskInput>): Promise<Task | null> {
    const db = await this.getDb();

    try {
      const task = await this.getTaskById(id);
      if (!task) return null;

      const updatedTask: Task = {
        ...task,
        ...updates,
      };

      await db.runAsync(
        'UPDATE tasks SET title = ?, isComplete = ? WHERE id = ?',
        [updatedTask.title, updatedTask.isComplete ? 1 : 0, id]
      );

      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Toggle task completion
  static async toggleTask(id: string): Promise<Task | null> {
    const task = await this.getTaskById(id);
    if (!task) return null;

    return this.updateTask(id, { isComplete: !task.isComplete });
  }

  // Delete a task
  static async deleteTask(id: string): Promise<boolean> {
    const db = await this.getDb();

    try {
      const result = await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Delete all tasks
  static async deleteAllTasks(): Promise<void> {
    const db = await this.getDb();

    try {
      await db.runAsync('DELETE FROM tasks');
    } catch (error) {
      console.error('Error deleting all tasks:', error);
      throw error;
    }
  }

  // Update syncedAt timestamp
  static async updateSyncedAt(id: string): Promise<void> {
    const db = await this.getDb();

    try {
      await db.runAsync(
        'UPDATE tasks SET syncedAt = ? WHERE id = ?',
        [new Date().toISOString(), id]
      );
    } catch (error) {
      console.error('Error updating syncedAt:', error);
      throw error;
    }
  }

  // Get unsync tasks
  static async getUnsyncedTasks(): Promise<Task[]> {
    const db = await this.getDb();

    try {
      const result = await db.getAllAsync<any>(
        'SELECT * FROM tasks WHERE syncedAt IS NULL ORDER BY createdAt DESC'
      );
      return result.map(row => ({
        id: row.id,
        title: row.title,
        isComplete: row.isComplete === 1,
        createdAt: row.createdAt,
        syncedAt: row.syncedAt,
      }));
    } catch (error) {
      console.error('Error getting unsynced tasks:', error);
      return [];
    }
  }
}
