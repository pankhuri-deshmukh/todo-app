'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Todo } from '@/app/interfaces/Todo';
import React from 'react';
import ModificationPage from '../../components/ModificationPage';
import { useData } from '@/app/context/DataContext';
import { useParams, useRouter } from 'next/navigation';
import styles from '../../add/page.module.css'; 
import style from './page.module.css'; 

const EditPage = () => {
  const router = useRouter();
  const params = useParams<{ todoId: string }>();
  const { todoItems, setTodoItems } = useData();

  const todo = todoItems.find((todo) => todo.id === params.todoId);
  if (!todo) {
    return <>
    <div className={style.errorContainer}>
      <div className={style.errorMessage}>
        Todo does not exist.
      </div>
      <button className={style.backButton} onClick={() => router.push('/')}>
        Back to main page
      </button>
    </div>
  </>
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
    },
  });

  const editTodo = (todoId: string, updatedTodo: Todo) => {
    const updatedTodos = todoItems.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    setTodoItems(updatedTodos);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let newTodo:Todo;
    if(data.dueDate !== todo.dueDate){
         newTodo = {
            ...todo,
            title: data.title,
            description: data.description,
            completionStatus: false,
            addedDate: new Date(),
            dueDate: data.dueDate,
            dueDateHistory: [
                {
                  changedDate: todo.dueDate || new Date(),
                  newDueDate: data.dueDate || new Date(),
                },
                ...(todo.dueDateHistory || []),
            ]
          };
    }
    else {
            newTodo = {
            ...todo,
            title: data.title,
            description: data.description,
            completionStatus: false,
            addedDate: new Date(),
          };
    }
    editTodo(todo.id, newTodo);
    router.push('/');
    reset();
    toast.success('Modified Successfully');
  };

  const bodyContent = (
    <div className={styles.addPageContainer}>
      <div className={styles.labelContainer}>
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          {...register('title', { required: true })}
          type="text"
          className={styles.inputField}
        />
      </div>

      <div className={styles.labelContainer}>
        <label htmlFor="description">Task Description</label>
        <input
          id="description"
          {...register('description')}
          type="text"
          className={styles.inputField}
        />
      </div>

      <div className={styles.labelContainer}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          {...register('dueDate')}
          className={styles.datePicker}
        />
      </div>
    </div>
  );

  const footerContent = (
    <>
    </>
  );

  return (
    <ModificationPage
      title="Edit Task"
      actionLabel="Save"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      secondaryActionLabel='Back'
      onSecondaryAction={() => router.push('/')}
    />
  );
};

export default EditPage;
