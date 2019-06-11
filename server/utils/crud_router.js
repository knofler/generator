/*
* {{ properCase name }} Routes
*
* This contains defalut {{ properCase name }} Route for the API.
*/

import { Router } from 'express';

const crudRouter = Router();

// /api/list
crudRouter
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne);

// /api/list/:id
crudRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default crudRouter
;