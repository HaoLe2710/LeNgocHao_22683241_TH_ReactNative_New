import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTasks } from '@/hooks/useTasks';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';

export default function TasksScreen() {
  const {
    tasks,
    isLoading,
    isSyncing,
    syncError,
    addTask,
    toggleTask,
    deleteTask,
    loadTasks,
    syncWithCloud,
  } = useTasks();

  const [loadingTaskIds, setLoadingTaskIds] = React.useState<Set<string>>(new Set());

  // Reload tasks when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  // Show error if sync fails
  useEffect(() => {
    if (syncError) {
      Alert.alert('Sync Error', syncError);
    }
  }, [syncError]);

  const handleToggleTask = async (id: string) => {
    setLoadingTaskIds(prev => new Set(prev).add(id));
    try {
      await toggleTask(id);
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    } finally {
      setLoadingTaskIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  const handleAddTask = async (title: string) => {
    try {
      await addTask(title);
    } catch (error) {
      Alert.alert('Error', 'Failed to add task');
    }
  };

  const handleSyncWithCloud = async () => {
    try {
      const result = await syncWithCloud('both');
      Alert.alert(
        'Sync Complete',
        `Synced: ${result.synced}\nFailed: ${result.failed}\nDeleted: ${result.deleted}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to sync with cloud');
    }
  };

  const completedCount = tasks.filter(t => t.isComplete).length;
  const totalCount = tasks.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Tasks</Text>
            <Text style={styles.subtitle}>
              {completedCount} of {totalCount} completed
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.syncButton, isSyncing && styles.syncButtonDisabled]}
            onPress={handleSyncWithCloud}
            disabled={isSyncing}
          >
            <MaterialIcons
              name={isSyncing ? 'sync' : 'cloud-upload'}
              size={20}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsContainer}
          contentContainerStyle={styles.statsContent}
        >
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{totalCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statValue}>{completedCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={styles.statValue}>{totalCount - completedCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Synced</Text>
            <Text style={styles.statValue}>
              {tasks.filter(t => t.syncedAt).length}
            </Text>
          </View>
        </ScrollView>

        {/* Task Input */}
        <TaskInput onAddTask={handleAddTask} isLoading={isLoading} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          isSyncing={isSyncing}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          onRefresh={async () => {
            await syncWithCloud('from');
          }}
          loadingTaskIds={loadingTaskIds}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  syncButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncButtonDisabled: {
    opacity: 0.5,
  },
  statsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statsContent: {
    gap: 12,
  },
  statCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minWidth: 90,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
});
