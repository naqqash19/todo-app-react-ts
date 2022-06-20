import { useMemo } from 'react'

import { useQueryClient, useQuery, useMutation } from 'react-query'

import _ from 'lodash'
import moment from 'moment'

import * as TodoService from '../services/todo'

import { ITodo } from '../types'

function Todos(): JSX.Element {
  const queryClient = useQueryClient()

  const {
    status,
    error,
    data: todos,
  } = useQuery<ITodo[], Error>('todos', TodoService.fetchAll)

  const { mutate: onUpdateTodo, isLoading: isSavingUpdatedTodo } = useMutation(
    TodoService.update,
    {
      onMutate: async ({ todoId, fieldsToUpdate }) => {
        await queryClient.cancelQueries('todos')

        const previousTodos = queryClient.getQueryData<ITodo[]>('todos')!

        queryClient.setQueryData<ITodo[]>('todos', existingTodos =>
          existingTodos!.map(existingTodo =>
            existingTodo.todoId === todoId
              ? { ...existingTodo, ...fieldsToUpdate }
              : existingTodo
          )
        )

        return { previousTodos }
      },
      onError: (error, _variables, context) => {
        const previousTodos = context!.previousTodos

        if (error instanceof Error) alert(error.message)

        queryClient.setQueryData<ITodo[]>('todos', previousTodos)
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )
  const { mutateAsync: onUpdateTodoAsync2, isLoading: isSavingUpdatedTodo2 } =
    useMutation(TodoService.update)

  const debouncedUpdate = useMemo(() => _.debounce(onUpdateTodo, 700), [])
  const handleUpdate = (
    todoToUpdate: ITodo,
    todoFieldsToUpdate: Partial<ITodo>
  ) => {
    // onUpdateTodo({
    //   todoId: todoToUpdate.todoId,
    //   fieldsToUpdate: todoFieldsToUpdate,
    // })
    debouncedUpdate({
      todoId: todoToUpdate.todoId,
      fieldsToUpdate: todoFieldsToUpdate,
    })
  }
  const handleUpdate2 = async (
    todoToUpdate: ITodo,
    todoFieldsToUpdate: Partial<ITodo>
  ) => {
    const previousTodos = queryClient.getQueryData<ITodo[]>('todos')!
    const previousTodo = previousTodos.find(
      todo => todo.todoId === todoToUpdate.todoId
    )!

    queryClient.setQueryData<ITodo[]>('todos', existingTodos =>
      existingTodos!.map(existingTodo =>
        existingTodo.todoId === todoToUpdate.todoId
          ? { ...existingTodo, ...todoFieldsToUpdate }
          : existingTodo
      )
    )

    try {
      await onUpdateTodoAsync2({
        todoId: todoToUpdate.todoId,
        fieldsToUpdate: todoFieldsToUpdate,
      })
    } catch (error) {
      if (error instanceof Error) alert(error.message)

      queryClient.setQueryData<ITodo[]>('todos', existingTodos =>
        existingTodos!.map(existingTodo =>
          existingTodo.todoId === todoToUpdate.todoId
            ? previousTodo
            : existingTodo
        )
      )
    } finally {
      queryClient.invalidateQueries('todos')
    }
  }

  return (
    <>
      <h2>Hello from Todos!</h2>
      {status === 'loading' && <span>Loading...</span>}
      {status === 'error' && <span>An error occurred! {error.message}</span>}
      <ul>
        {todos &&
          todos.map(todo => (
            <li key={todo.todoId}>
              <label>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  disabled={isSavingUpdatedTodo || isSavingUpdatedTodo2}
                  onChange={() =>
                    handleUpdate2(todo, { completed: !todo.completed })
                  }
                />{' '}
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : '',
                  }}
                >
                  {todo.text}
                </span>
              </label>{' '}
              created {moment(todo.createdAt.toDate()).fromNow()}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Todos
