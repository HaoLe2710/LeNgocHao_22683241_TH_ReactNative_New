import axios from 'axios';
import { Task, TaskInput } from '@/models/Task';

const API_BASE_URL = 'https://68ca01fdceef5a150f6692a8.mockapi.io/tasks';

export class ApiService {
  // Get all tasks from API
  static async fetchAllTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks from API:', error);
      throw error;
    }
  }

  // Get a single task from API
  static async fetchTask(id: string): Promise<Task> {
    try {
      const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task from API:', error);
      throw error;
    }
  }

  // Create a new task on API
  static async createTask(task: TaskInput): Promise<Task> {
    try {
      const response = await axios.post<Task>(API_BASE_URL, {
        ...task,
        createdAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task on API:', error);
      throw error;
    }
  }

  // Update a task on API
  static async updateTask(id: string, updates: Partial<TaskInput>): Promise<Task> {
    try {
      const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating task on API:', error);
      throw error;
    }
  }

  // Delete a task from API
  static async deleteTask(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting task from API:', error);
      throw error;
    }
  }
}
