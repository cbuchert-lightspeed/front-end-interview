import type { Todo } from "../types/Todo"

const data: Todo[] = [
  {
    id: 1,
    title: "All your base",
    isComplete: false,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
]

function getAll(): Promise<Todo[]> {
  return new Promise(res => res([...data]))
}

function getById(id: number): Promise<Todo> {
  const todo = data.find(todo => todo.id === id)

  return new Promise((res, rej) => {
    if (todo) {
      res(todo)
    }
    else {
      rej(new Error("Bad!"))
    }
  })
}

function setById(id: number, todo: Todo): Promise<Todo> {
  const index = data.findIndex(todo => todo.id === id)

  return new Promise((resolve, reject) => {
    if (index > -1) {
      data[index] = todo

      resolve({ ...data[index] })
    }
    else {
      reject(new Error("Super duper bad!"))
    }
  })
}

export const todosDataSource = {
  getAll,
  getById,
  setById,
}
