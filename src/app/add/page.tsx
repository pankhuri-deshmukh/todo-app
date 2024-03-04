'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uid } from 'uuid';
import { Todo } from '@/app/interfaces/Todo';
import ModificationPage from '../components/ModificationPage';
import { useData } from '../context/DataContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const AddPage = () => {
  const router = useRouter();
  const { todoItems, setTodoItems } = useData();

  const addTodo = (newTodo: Todo) => {
    setTodoItems([newTodo, ...todoItems]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newTodo: Todo = {
      id: uid(),
      title: data.title,
      description: data.description,
      completionStatus: false,
      addedDate: new Date(),
      dueDate: data.dueDate,
      dueDateHistory: [],
    };
    addTodo(newTodo);
    router.push('/');
    reset();
    toast.success('Task added successfully');
  };

  return (
    <ModificationPage
      title="Add Task"
      actionLabel="Save"
      onSecondaryAction={() => router.push('/')}
      secondaryActionLabel="Back"
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className={styles.addPageContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              {...register('title', { required: true })}
              type="text"
              className={styles.inputField}
            />
            {errors.title && <span className={styles.errorMessage}>This field is required</span>}
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
      }
      footer={<></>}
    />
  );
};

export default AddPage;
