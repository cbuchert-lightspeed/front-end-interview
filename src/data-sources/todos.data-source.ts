import type { Todo } from "../types/Todo"

let nextId = 3
const data: Todo[] = [
  {
    id: 1,
    title: "All your base",
    isComplete: false,
    dateCreated: new Date(),
    dateModified: new Date(),
  },
  {
    id: 2,
    title: "base base",
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
      todo.dateModified = new Date()
      data[index] = todo

      resolve({ ...data[index] })
    }
    else {
      reject(new Error("Super duper bad!"))
    }
  })
}

function add(todo: Pick<Todo, "title" | "isComplete">): Promise<Todo> {
  const newTodo = {
    ...todo,
    id: nextId,
    dateCreated: new Date(),
    dateModified: new Date(),
  }

  data.push(newTodo)
  nextId += 1

  return Promise.resolve(newTodo)
}

export const todosDataSource = {
  add,
  getAll,
  getById,
  setById,
}
