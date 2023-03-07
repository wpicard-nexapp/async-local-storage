import { context } from '.'
import { SomeRepository } from './SomeService'

export const someRepo: SomeRepository = {
  async fetchFoo() {
    console.log("Fetching some Foo", context.getStore())

    return "hello-world!"
  },
}
