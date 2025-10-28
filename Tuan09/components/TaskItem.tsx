import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Task } from '@/models/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskItem({ task, onToggle, onDelete, isLoading = false }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await onDelete(task.id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete task');
            } finally {
              setIsDeleting(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(task.id)}
        disabled={isLoading}
      >
        <View style={styles.checkbox}>
          {task.isComplete && (
            <MaterialIcons name="check" size={16} color="#007AFF" />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              task.isComplete && styles.completedTitle,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          <Text style={styles.date}>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.syncIndicator}>
        {task.syncedAt ? (
          <MaterialIcons name="cloud-done" size={18} color="#4CAF50" />
        ) : (
          <MaterialIcons name="cloud-off" size={18} color="#FFC107" />
        )}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        disabled={isDeleting || isLoading}
      >
        {isDeleting ? (
          <ActivityIndicator color="#FF3B30" size={18} />
        ) : (
          <MaterialIcons name="close" size={20} color="#FF3B30" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  completedTitle: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  syncIndicator: {
    paddingHorizontal: 8,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
