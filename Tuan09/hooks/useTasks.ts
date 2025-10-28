import { useState, useEffect, useCallback, useRef } from 'react';
import { DatabaseService } from '@/services/DatabaseService';
import { SyncService, SyncResult } from '@/services/SyncService';
import { Task, TaskInput } from '@/models/Task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const loadingTaskRef = useRef<Set<string>>(new Set());

  // Initialize database and load tasks
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await DatabaseService.initialize();
        await loadTasks();
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Load tasks from database
  const loadTasks = useCallback(async () => {
    try {
      const loadedTasks = await DatabaseService.getAllTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, []);

  // Add a new task
  const addTask = useCallback(async (title: string) => {
    try {
      const taskInput: TaskInput = {
        title,
        isComplete: false,
        createdAt: new Date().toISOString(),
      };

      const newTask = await DatabaseService.addTask(taskInput);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }, []);

  // Update a task
  const updateTask = useCallback(async (id: string, updates: Partial<TaskInput>) => {
    try {
      loadingTaskRef.current.add(id);
      const updatedTask = await DatabaseService.updateTask(id, updates);
      if (updatedTask) {
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === id ? updatedTask : task))
        );
      }
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    } finally {
      loadingTaskRef.current.delete(id);
    }
  }, []);

  // Toggle task completion
  const toggleTask = useCallback(async (id: string) => {
    try {
      loadingTaskRef.current.add(id);
      const updatedTask = await DatabaseService.toggleTask(id);
      if (updatedTask) {
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === id ? updatedTask : task))
        );
      }
      return updatedTask;
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error;
    } finally {
      loadingTaskRef.current.delete(id);
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (id: string) => {
    try {
      await DatabaseService.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }, []);

  // Sync with cloud
  const syncWithCloud = useCallback(async (direction: 'both' | 'from' | 'to' = 'both') => {
    setIsSyncing(true);
    setSyncError(null);

    try {
      let result: SyncResult;

      if (direction === 'from') {
        result = await SyncService.syncFromCloud();
      } else if (direction === 'to') {
        result = await SyncService.syncToCloud();
      } else {
        result = await SyncService.fullSync();
      }

      // Reload tasks after sync
      await loadTasks();

      console.log('Sync result:', result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSyncError(errorMessage);
      console.error('Error syncing with cloud:', error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [loadTasks]);

  // Check if a specific task is loading
  const isTaskLoading = useCallback((id: string) => {
    return loadingTaskRef.current.has(id);
  }, []);

  return {
    tasks,
    isLoading,
    isSyncing,
    syncError,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    loadTasks,
    syncWithCloud,
    isTaskLoading,
  };
}
