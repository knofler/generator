/*
* Chef Routes
*
* This contains defalut Chef Route for the API.
*/


import { Router } from 'express';
import * as ChefController from './controller';
const ChefRouter = new Router();

// Get all Chefs
ChefRouter.route('/chefs').get(ChefController.getChef);

// Get one Chef by cuid
ChefRouter.route('/chefs/:cuid').get(ChefController.getChefById);

// Add a new Chef
ChefRouter.route('/chefs').post(ChefController.addChef);

// Update a Chef
ChefRouter.route('/chefs/:cuid').put(ChefController.updateOneChef);


// Delete a Chef by cuid
ChefRouter.route('/chefs/:cuid').delete(ChefController.deleteChef);

export default ChefRouter;