import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { InMemorySomeRepository } from './InMemorySomeRepository';
import { createSomeRouter } from './SomeRouter';
import express = require('express');
import bodyParser = require('body-parser');

type Context = { correlationId: string }

const someRepo = new InMemorySomeRepository()
export const context = new AsyncLocalStorage<Context>();

const app = express();

app.use((req, res, next) => {
  const store: Context = {
    correlationId: randomUUID()
  };
  context.run(store, () => {
    next();
  });
})

app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  console.log("Received request", {
    body: req.body,
    headers: req.headers,
    ip: req.ip,
    correlationId: context.getStore()?.correlationId
  });
  next();
})
app.use(createSomeRouter(someRepo));

app.listen(8080, () => {
  console.log("listening on http://localhost:8080")
});
