type ObserverCallback<T> = (data: T) => void

export class Observable<T> {
  private observers = new Map<symbol, ObserverCallback<T>>()

  subscribe = (observerCallback: ObserverCallback<T>) => {
    const key = Symbol("Observer Key")

    this.observers.set(key, observerCallback)

    return key
  }

  unsubscribe = (key: symbol) => {
    this.observers.delete(key)
  }

  notify = (data: T) => {
    this.observers.forEach(observerCallback => observerCallback(data))
  }
}
