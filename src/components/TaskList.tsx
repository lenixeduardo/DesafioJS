import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //impede que crie uma task vazia.
    if (!newTaskTitle) return;

    const newTask = {
      // usamos math.random para gerar numero aleatorio.
      id: Math.random(),
      // em title pegamos o valor do campo input.
      title: newTaskTitle,
      // iniciamos a tarefa como false.
      isCompleted: false
    }
    //usamos o estado atraves de callback , e salvamos no array a tarefa criada.
setTasks(oldState => [...oldState, newTask]);
// e entao resetamos o input para vazio.
setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id == id ? {
      // pegamos a task antiga com ...
      ...task,

      // e passamos o valor contrario do isComplete.
      isComplete: !task.isComplete
      // se o id for igual, so retorna a task da mesma forma.
    } : task);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // usaremos filter, para ele retornar o array contendo todas tasks diferente do id que estamos querendo remover.

const filteredTasks = tasks.filter(task => task.id != id);

setTasks(filteredTasks);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}