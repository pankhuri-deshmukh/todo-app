'use client';

import { useState } from "react";
import { Todo } from "@/app/interfaces/Todo";
import { FaRegEdit } from "react-icons/fa";
import { TbCalendarDue } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import styles from "./TodoItem.module.css";
import Link from 'next/link'
import { useData } from "@/app/context/DataContext";
import toast from "react-hot-toast";

interface TodoItemProps {
  item: Todo;  
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const { todoItems, setTodoItems } = useData();
  const [showHistory, setShowHistory] = useState(false);

  const deleteTodo = (todoId:string) => {
    const updatedTodos = todoItems.filter((todo) => todo.id !== todoId);
    setTodoItems(updatedTodos);
    toast.success('Item deleted successfully')
  };

  const changeTodoCompletionStatus = (todoId:string) => {
    const updatedTodos = todoItems.map((todo) =>
      todo.id === todoId ? { ...todo, completionStatus: !todo.completionStatus } : todo
    );
    setTodoItems(updatedTodos);
  }

  return (
    
    <div className={`${styles.todoItemContainer} `}>
      <div className={styles.colOne}>
      {item.dueDate && (
        <div className={styles.dueDate}>
          <TbCalendarDue size={20}/>
          {new Date(item.dueDate).toLocaleDateString()}
        </div>
      )}
      <div className={`${styles.todoItemTitle} ${item.completionStatus ? styles.completed : ""}`}>
        <strong>
        {item.title}
        </strong>
      </div>
      <div className={`${styles.todoItemDescription} ${item.completionStatus ? styles.completed : ""}`}>
        {item.description ?  item.description : "No description available."}
      </div>
      <div className={styles.todoItemDetails}>
        {/* <div>
          <strong>Status:</strong> {item.completionStatus ? "Completed" : "Incomplete"}
        </div> */}
      {/* <div>
      <strong>Added Date:</strong> {new Date(item.addedDate).toLocaleDateString()}
      </div> */}
      </div>
      <div className={styles.todoItemActions}>
        <label>
        <input
          type="checkbox"
          checked={item.completionStatus}
          onChange={() => {
            changeTodoCompletionStatus(item.id)
           }}
          className={styles.completeCheckbox}
        />
        Mark as Completed
        </label>
        </div>

        <div>
        { item.dueDateHistory?.length !== 0 && (
        <button
          className={`${styles.showHistoryButton} ${showHistory ? styles.hideHistoryButton : ''}`}
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide ' : 'Show Due Date History'}
        </button>
        )}
        {showHistory && item.dueDateHistory && (
          <div>
            <ul>
              {item.dueDateHistory.map((change, index) => (
                <li key={index}>
                  {`Changed from ${new Date(change.changedDate).toLocaleDateString()} to ${new Date(
                    change.newDueDate
                  ).toLocaleDateString()}`}
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
        
      </div>

    <div className={styles.colTwo}>
    <Link href={`/edit/${item.id}`}>
    <button className={styles.editButton}>
      <FaRegEdit size={20} />
    </button>
    </Link>
    
    <button className={styles.deleteButton} onClick={() => {deleteTodo(item.id)}}>
      <MdOutlineDelete size={20} />
    </button>
    </div>
    </div>
  );
};

export default TodoItem;
