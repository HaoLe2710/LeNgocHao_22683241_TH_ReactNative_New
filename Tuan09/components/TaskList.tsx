import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { Task } from '@/models/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  isSyncing?: boolean;
  onToggleTask: (id: string) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onRefresh?: () => Promise<void>;
  loadingTaskIds?: Set<string>;
}

export function TaskList({
  tasks,
  isLoading = false,
  isSyncing = false,
  onToggleTask,
  onDeleteTask,
  onRefresh,
  loadingTaskIds = new Set(),
}: TaskListProps) {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No tasks yet</Text>
        <Text style={styles.emptySubText}>Add a new task to get started</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isSyncing && (
        <View style={styles.syncingIndicator}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.syncingText}>Syncing...</Text>
        </View>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            isLoading={loadingTaskIds.has(item.id)}
          />
        )}
        scrollEnabled={true}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          ) : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
  syncingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#f0f8ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0ff',
    gap: 8,
  },
  syncingText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});
