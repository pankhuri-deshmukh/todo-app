'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '../interfaces/Todo';

interface DataContextProps {
  todoItems: Todo[];
  setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
}

interface DataContextProviderProps {
    children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }) => {

    const storedTodos = JSON.parse(localStorage.getItem('todos') ?? '[]');
  const [todoItems, setTodoItems] = useState<Todo[]>(storedTodos ? storedTodos : []);

  const value: DataContextProps = {
    todoItems,
    setTodoItems,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('DataContext must be used within an DataContextProvider');
    }
    return context;
};
