import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Go to ToDo List" onPress={() => navigation.navigate('ToDoList')} />
    </View>
  );
}

function TaskItem({ task, onComplete }) {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text style={styles.taskContent}>{task.content}</Text>
      <Text style={styles.taskDueDate}>Due: {task.dueDate}</Text>
      <Button
        title={task.completed ? "Completed" : "Complete"}
        onPress={() => onComplete(task.id)}
        color={task.completed ? 'green' : 'blue'}
      />
    </View>
  );
}

function ToDoListScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', name: 'Task 1', content: 'Content 1', dueDate: '2023-12-31', completed: false },
    { id: '2', name: 'Task 2', content: 'Content 2', dueDate: '2023-12-31', completed: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const addTask = () => {
    if (newTaskName && newTaskContent && newTaskDueDate) {
      const newTask = {
        id: (tasks.length + 1).toString(),
        name: newTaskName,
        content: newTaskContent,
        dueDate: newTaskDueDate,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setModalVisible(false);
      setNewTaskName('');
      setNewTaskContent('');
      setNewTaskDueDate('');
    }
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>ToDo List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={completeTask} />
        )}
      />
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={newTaskName}
            onChangeText={setNewTaskName}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Content"
            value={newTaskContent}
            onChangeText={setNewTaskContent}
          />
          <TextInput
            style={styles.input}
            placeholder="Due Date (YYYY-MM-DD)"
            value={newTaskDueDate}
            onChangeText={setNewTaskDueDate}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={addTask}
          >
            <Text style={styles.textStyle}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ToDoList" component={ToDoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  taskContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskContent: {
    fontSize: 16,
    marginVertical: 5,
  },
  taskDueDate: {
    fontSize: 14,
    color: 'gray',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 200,
  },
});

export default function App() {
  return <AppNavigator />;
}
