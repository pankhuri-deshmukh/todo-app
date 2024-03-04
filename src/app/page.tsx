'use client';

import { useState, useEffect } from 'react';
import { useData } from './context/DataContext';

import styles from "./page.module.css";
import SearchFilter from "./components/header/SearchFilter";
import TodoList from "./components/todo/TodoList";

import { Todo } from './interfaces/Todo';

interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function Home() {

  const { todoItems, setTodoItems } = useData();

  //states for search and filter 
  const [searchedTitle, setSearchedTitle] = useState('');
  const [selectedDates, setSelectedDates] = useState<DateRangeType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all')

  //state for final result after selected search and filters ( if any ) have been applied
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoItems));
    setFilteredTodos(todoItems)
  }, [todoItems]);

  useEffect(() => {
    const searched = todoItems
    .filter((item : Todo) => {
      return searchedTitle.toLowerCase() === '' ? item : item.title.toLowerCase().startsWith(searchedTitle);  
    })
    .filter((item: Todo) => {
      if (selectedStatus === 'all') {
        return true;
      } else if (selectedStatus === 'pending') {
        return !item.completionStatus;
      } else if (selectedStatus === 'complete') {
        return item.completionStatus;
      }
      return false;
    })
    .filter((item: Todo) => {
      if (selectedDates.length === 0) {
        return true;
      } else {
        if(item.dueDate){

          const dueDate = new Date(item.dueDate);
          const isWithinDateRange = selectedDates.some((dateRange) =>
            dueDate >= dateRange.startDate && dueDate <= new Date(dateRange.endDate.getTime() + 24 * 60 * 60 * 1000)
          );
          return isWithinDateRange;
        }
        else
        return false;
      }
    });

    setFilteredTodos(searched)
  },[todoItems, searchedTitle, selectedDates, selectedStatus])

  return (
    <main className="">
      <SearchFilter onSearchChange={setSearchedTitle} onStatusChange={setSelectedStatus} onDateRangeChange={setSelectedDates}/>
      <TodoList items={filteredTodos} />
    </main>
  );
}

//Features to implement:
// crud for tasks
// task has title, description, status, added date, due date, due date history
// can strike through completed tasks
// store history of changing due dates
// search based on title 
// filter based on status (done/finished, pending) and date ( can do better efficiency)
// use local storage for data storage
// responsive 
// cover all edge cases - error messages, no items found , form validation etc (error pages?)
