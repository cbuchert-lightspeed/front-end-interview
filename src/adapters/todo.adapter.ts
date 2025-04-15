import type { todosDataSource } from "../data-sources/todos.data-source.ts"
import type { Todo } from "../types/Todo"
import { Observable } from "../lib/observable.ts"

export class TodoAdapter {
  private observable = new Observable<Todo[]>()

  constructor(private dataSource: typeof todosDataSource) {
  }

  subscribe = (subscriptionCallback: (data: Todo[]) => void) => {
    const key = this.observable.subscribe(subscriptionCallback)

    this.dataSource.getAll().then(todos => this.observable.notify(todos))

    return () => this.observable.unsubscribe(key)
  }

  getTodo = (id: number): Promise<Todo> => {
    return this.dataSource.getById(id)
  }

  updateTodo = (id: number, todo: Todo) => {
    this.dataSource.setById(id, todo).then(() => {
      this.dataSource.getAll().then(this.observable.notify)
    })
  }
}
