import { DatabaseService } from './DatabaseService';
import { ApiService } from './ApiService';
import { Task } from '@/models/Task';

export interface SyncResult {
  synced: number;
  failed: number;
  deleted: number;
}

export class SyncService {
  private static isSyncing = false;

  static getIsSyncing() {
    return this.isSyncing;
  }

  // Sync all tasks from API to local database
  static async syncFromCloud(): Promise<SyncResult> {
    if (this.isSyncing) {
      console.log('Sync already in progress');
      return { synced: 0, failed: 0, deleted: 0 };
    }

    this.isSyncing = true;
    const result: SyncResult = { synced: 0, failed: 0, deleted: 0 };

    try {
      console.log('Starting sync from cloud...');

      // Fetch all tasks from API
      const cloudTasks = await ApiService.fetchAllTasks();
      const localTasks = await DatabaseService.getAllTasks();

      // Get IDs for comparison
      const cloudIds = new Set(cloudTasks.map(t => t.id));
      const localIds = new Set(localTasks.map(t => t.id));

      // Sync tasks from cloud to local
      for (const cloudTask of cloudTasks) {
        try {
          const localTask = await DatabaseService.getTaskById(cloudTask.id);

          if (!localTask) {
            // New task from cloud, add to local
            const taskInput = {
              title: cloudTask.title,
              isComplete: cloudTask.isComplete,
              createdAt: cloudTask.createdAt,
            };
            await DatabaseService.addTask(taskInput);
            await DatabaseService.updateSyncedAt(cloudTask.id);
            result.synced++;
          } else if (localTask.createdAt !== cloudTask.createdAt || 
                     localTask.isComplete !== cloudTask.isComplete) {
            // Task was updated in cloud, update local
            await DatabaseService.updateTask(cloudTask.id, {
              title: cloudTask.title,
              isComplete: cloudTask.isComplete,
              createdAt: cloudTask.createdAt,
            });
            await DatabaseService.updateSyncedAt(cloudTask.id);
            result.synced++;
          }
        } catch (error) {
          console.error(`Error syncing task ${cloudTask.id}:`, error);
          result.failed++;
        }
      }

      // Delete tasks that were removed from cloud
      for (const localTask of localTasks) {
        if (!cloudIds.has(localTask.id)) {
          try {
            await DatabaseService.deleteTask(localTask.id);
            result.deleted++;
          } catch (error) {
            console.error(`Error deleting task ${localTask.id}:`, error);
            result.failed++;
          }
        }
      }

      console.log('Sync completed:', result);
      return result;
    } catch (error) {
      console.error('Error syncing from cloud:', error);
      return result;
    } finally {
      this.isSyncing = false;
    }
  }

  // Sync local changes to cloud
  static async syncToCloud(): Promise<SyncResult> {
    if (this.isSyncing) {
      console.log('Sync already in progress');
      return { synced: 0, failed: 0, deleted: 0 };
    }

    this.isSyncing = true;
    const result: SyncResult = { synced: 0, failed: 0, deleted: 0 };

    try {
      console.log('Starting sync to cloud...');

      const unsyncedTasks = await DatabaseService.getUnsyncedTasks();

      for (const task of unsyncedTasks) {
        try {
          // Try to fetch from cloud to check if it exists
          try {
            await ApiService.fetchTask(task.id);
            // Task exists, update it
            await ApiService.updateTask(task.id, {
              title: task.title,
              isComplete: task.isComplete,
              createdAt: task.createdAt,
            });
          } catch {
            // Task doesn't exist, create it
            await ApiService.createTask({
              title: task.title,
              isComplete: task.isComplete,
              createdAt: task.createdAt,
            });
          }

          await DatabaseService.updateSyncedAt(task.id);
          result.synced++;
        } catch (error) {
          console.error(`Error syncing task ${task.id} to cloud:`, error);
          result.failed++;
        }
      }

      console.log('Sync to cloud completed:', result);
      return result;
    } catch (error) {
      console.error('Error syncing to cloud:', error);
      return result;
    } finally {
      this.isSyncing = false;
    }
  }

  // Full sync: both directions
  static async fullSync(): Promise<SyncResult> {
    try {
      console.log('Starting full sync...');
      
      // First sync from cloud
      const syncFromResult = await this.syncFromCloud();
      
      // Then sync to cloud
      const syncToResult = await this.syncToCloud();

      return {
        synced: syncFromResult.synced + syncToResult.synced,
        failed: syncFromResult.failed + syncToResult.failed,
        deleted: syncFromResult.deleted + syncToResult.deleted,
      };
    } catch (error) {
      console.error('Error during full sync:', error);
      return { synced: 0, failed: 0, deleted: 0 };
    }
  }
}
