import { context } from '.'
import { SomeRepository } from './SomeService'

export class InMemorySomeRepository implements SomeRepository {
  async fetchFoo() {
    console.log("Fetching some Foo", context.getStore())

    return "hello-world!"
  }
}
