import {
  DocumentReference,
  DocumentData,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

import { auth, db } from './firebase'

import { ITodo } from '../types'

const todosRef = collection(db, 'todos')

function getDocRef(docId: string) {
  return doc(todosRef, docId)
}

export function getNewDocRef() {
  return doc(todosRef)
}

export async function fetchAll(): Promise<ITodo[]> {
  const todosQuery = query(
    todosRef,
    where('userId', '==', auth.currentUser!.uid)
  )
  const querySnapshot = await getDocs(todosQuery)
  const todoList: ITodo[] = querySnapshot.docs.map(
    todo => ({ ...todo.data(), todoId: todo.id } as ITodo)
  )
  return todoList
}
export async function fetchById(todoId: string): Promise<ITodo> {
  const todoRef = getDocRef(todoId)
  const todo = await getDoc(todoRef)
  return { ...todo.data(), todoId: todo.id } as ITodo
}
export function add({
  todoRef,
  todo: { todoId, ...todo },
}: {
  todoRef: DocumentReference<DocumentData>
  todo: ITodo
}): Promise<void> {
  return setDoc(todoRef, todo)
}
export function update({
  todoId,
  fieldsToUpdate,
}: {
  todoId: string
  fieldsToUpdate: Partial<ITodo>
}): Promise<void> {
  return updateDoc(getDocRef(todoId), { ...fieldsToUpdate })
}
export function deleteOne(todoId: string): Promise<void> {
  return deleteDoc(getDocRef(todoId))
}
