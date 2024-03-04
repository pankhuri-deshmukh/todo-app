'use client';

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/app/interfaces/Todo';
import styles from './TodoList.module.css';

interface TodoListProps {
  items: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <div className={styles.todoListContainer}>
      { items.length === 0 ? (
        <div className={styles.noTodosMessage}>No items to show...</div>
      ) : (
    <ul className={styles.listContainer}>
      {items.map((todo) => (
        <li key={todo.id} className={styles.listItem}>
          <TodoItem item={todo} />
        </li>
      ))}
    </ul>
      )}
    </div>
  );
};

export default TodoList;

