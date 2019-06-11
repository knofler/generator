/*
* Order Routes
*
* This contains defalut Order Route for the API.
*/


import { Router } from 'express';
import * as OrderController from './controller';
const OrderRouter = new Router();

// Get all Orders
OrderRouter.route('/orders').get(OrderController.getOrder);

// Get one Order by cuid
OrderRouter.route('/orders/:cuid').get(OrderController.getOrderById);

// Add a new Order
OrderRouter.route('/orders').post(OrderController.addOrder);

// Update a Order
OrderRouter.route('/orders/:cuid').put(OrderController.updateOneOrder);


// Delete a Order by cuid
OrderRouter.route('/orders/:cuid').delete(OrderController.deleteOrder);

export default OrderRouter;