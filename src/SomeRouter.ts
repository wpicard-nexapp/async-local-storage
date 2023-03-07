import express = require('express');
import { SomeRepository, SomeService } from './SomeService';

export const createSomeRouter = (repo: SomeRepository) => {
  const someService = new SomeService(repo);
  const someRouter = express.Router();

  async function getFoo(req: express.Request, res: express.Response, handleError: express.NextFunction): Promise<void> {
    try {
      const foo = await someService.getFoo();
  
      res.json(foo);
    }
    catch (e) {
      handleError(e);
    }
  }
  
  someRouter.post("/foo", getFoo);
  return someRouter;
}

