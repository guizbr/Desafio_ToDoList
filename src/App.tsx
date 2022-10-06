import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/Header';
import { ListTasks } from './components/ListTasks';
import { v4 as uuidv4 } from 'uuid';

import './global.css';
import ITask from './interfaces';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo Obrigatório!');
  }

  function checkTask(idTaskToCheck: string) {
    const taskCheckedOne = tasks.map((task) => {
      if (task.id === idTaskToCheck) {
        return {
          id: task.id,
          content: task.content,
          isCompleted: !task.isCompleted,
        };
      } else return task;
    });

    setTasks(taskCheckedOne);
  }

  function deleteTask(idTaskToDelete: string) {
    const tasksWithouDeleteOne = tasks.filter((task) => {
      return task.id !== idTaskToDelete;
    });

    setTasks(tasksWithouDeleteOne);
  }

  const completedTasks = tasks.reduce((acc, obj) => {
    if (obj.isCompleted) acc += 1;
    return acc;
  }, 0);

  return (
    <>
      <Header></Header>
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateTask} className={styles.createTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            value={newTaskText}
            required
          ></input>
          <button type="submit">
            Criar <PlusCircle size={20}></PlusCircle>
          </button>
        </form>
        <main>
          <header className={styles.infoTask}>
            <div>
              <span>Tarefas criadas</span>
              <span>{tasks.length}</span>
            </div>
            <div>
              <span>Concluídas</span>
              <span>
                {completedTasks} de {tasks.length}
              </span>
            </div>
          </header>

          <ListTasks
            tasks={tasks}
            onCheckTask={checkTask}
            onDeleteTask={deleteTask}
          ></ListTasks>
        </main>
      </div>
    </>
  );
}

export default App;
