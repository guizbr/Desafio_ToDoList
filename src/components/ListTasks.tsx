import { Trash } from 'phosphor-react';
import { ChangeEvent, MouseEventHandler } from 'react';

import clipboard from '../assets/clipboard.svg';
import ITask from '../interfaces';

import styles from './ListTasks.module.css';

interface TasksProps {
  tasks: ITask[];
  onCheckTask: (idTaskToCheck: string) => void;
  onDeleteTask: (idTaskToDelete: string) => void;
}

export const ListTasks = ({ tasks, onCheckTask, onDeleteTask }: TasksProps) => {
  function handleTaskCompletedChange(event: ChangeEvent<HTMLInputElement>) {
    onCheckTask(event.target.value);
  }

  function handleDeleteTask(idTask: string) {
    onDeleteTask(idTask);
  }

  if (tasks.length === 0) {
    return (
      <article className={styles.emptyListTasks}>
        <img src={clipboard} alt="clipboard"></img>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </article>
    );
  }

  return (
    <article className={styles.listTasks}>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={handleTaskCompletedChange}
                value={task.id}
              ></input>
              <span className={task.isCompleted ? styles.lineThrough : ''}>
                {task.content}
              </span>
              <button title="Deletar" onClick={() => handleDeleteTask(task.id)}>
                <Trash size={24}></Trash>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
