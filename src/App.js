import './App.css';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDescription
    }

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodo);
    setAllTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodoArr = [...allTodos];
    reducedTodoArr.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodoArr));
    setAllTodos(reducedTodoArr);
  }

  const handleCompletedTodo = (index) => {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let completedItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let completedTodoArr = [...completedTodos];
    completedTodoArr.push(completedItem);
    setCompletedTodos(completedTodoArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedtodolist', JSON.stringify(completedTodoArr));
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodoArr = [...completedTodos];
    reducedCompletedTodoArr.splice(index, 1);
    localStorage.setItem('completedtodolist', JSON.stringify(reducedCompletedTodoArr));
    setCompletedTodos(reducedCompletedTodoArr);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedtodolist'));
    if (savedTodo)
      setAllTodos(savedTodo);
    if (savedCompletedTodo)
      setCompletedTodos(savedCompletedTodo);
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1> {/* Updated title here */}
      <div className="todo-wrapper">
        <div className="input-area">
          <div className="input-items">
            <label>Title:</label>
            <input
              type="text"
              placeholder=""
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="input-items">
            <label>Description:</label>
            <input
              type="text"
              placeholder=""
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="input-items">
            <button className="input-add-btn" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondary-btn ${isTaskCompleted === false && 'active'}`}
            onClick={() => setIsTaskCompleted(false)}
          >
            To Do
          </button>
          <button
            className={`secondary-btn ${isTaskCompleted === true && 'active'}`}
            onClick={() => setIsTaskCompleted(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list-area">
          {isTaskCompleted === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className='icon-area'>
                    <AiOutlineDelete
                      className='icon'
                      onClick={() => handleDeleteTodo(index)}
                      title='Delete'
                    />
                    <BsCheckLg
                      className='check-icon'
                      onClick={() => handleCompletedTodo(index)}
                      title='Complete'
                    />
                  </div>
                </div>
              );
            })}

          {isTaskCompleted === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <i>
                        <small>Completed on: {item.completedOn}</small>
                      </i>
                    </p>
                  </div>

                  <div className='icon-area'>
                    <AiOutlineDelete
                      className='icon'
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title='Delete'
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
