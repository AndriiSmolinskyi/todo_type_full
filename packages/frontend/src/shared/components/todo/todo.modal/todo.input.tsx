import React from 'react';
import { Field, FieldProps } from 'formik';
import * as styles from './todo.modal.style/todo.modal.style'; 

interface TodoInputProps {
  name: string;
  label: string;
  errors?: string;
  touched?: boolean;
  id?: string;
  type?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ name, label, errors, touched, id, type = 'text' }) => {
  return (
    <div className={styles.formBlockItem}>
      <label htmlFor={id || name} className={styles.modalFormLabel}>
        {label}
      </label>
      <Field name={name} id={id || name} className={styles.modalFormInput} type={type}/>
      {errors && touched ? (
        <div className={styles.modalFormError}>{errors}</div>
      ) : null}
    </div>
  );
};

export default TodoInput;