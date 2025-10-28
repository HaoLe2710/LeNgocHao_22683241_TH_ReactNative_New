import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TaskInputProps {
  onAddTask: (title: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskInput({ onAddTask, isLoading = false }: TaskInputProps) {
  const [title, setTitle] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddTask = async () => {
    if (title.trim()) {
      setIsAdding(true);
      try {
        await onAddTask(title);
        setTitle('');
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task..."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
        editable={!isAdding && !isLoading}
      />
      <TouchableOpacity
        style={[styles.button, (isAdding || isLoading) && styles.buttonDisabled]}
        onPress={handleAddTask}
        disabled={isAdding || isLoading || !title.trim()}
      >
        {isAdding ? (
          <ActivityIndicator color="#fff" size={20} />
        ) : (
          <MaterialIcons name="add" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
