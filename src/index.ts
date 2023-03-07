import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { someRepo } from './InMemorySomeRepository';
import { SomeService } from './SomeService';
import express = require('express');

type Context = { correlationId: string }

export const context = new AsyncLocalStorage<Context>();

const someService = new SomeService(someRepo);

const app = express();

app.use((req, res, next) => {
  const store: Context = {
    correlationId: randomUUID()
  };
  context.run(store, () => {
    next();
  });
})

app.get("/foo", async (req, res) => {
  const foo = await someService.getFoo()

  res.json(foo);
})

app.listen(8080, () => {
  console.log("listening on http://localhost:8080")
});
