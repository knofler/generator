/*
* Order Controller
*
* This contains default Order controller.
*/


import Order from './model';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
* Get all orders
* @param req
* @param res
* @returns void
*/

export async function getOrder(req, res) {
  try {
    const doc = await Order
    .find({
        // {createdBy: req.user._id}
    })
    .sort('-dateAdded')
    .lean()
    .exec()

    return res.status(200).json({data:doc})
   } catch(e){
        console.error(e)
        return res.status(400).send(e)
   }
}

/**
* Save a order
* @param req
* @param res
* @returns void
*/

export async function addOrder(req, res) {
  try {
    // Save model data for Sanitization
    // const createdBy = req.user._id
    // console.log('createdBy', createdBy);
    const sanitizedOrder = new Order(req.body);

    // Let's sanitize inputs
     sanitizedOrder.item = sanitizeHtml(sanitizedOrder.item);
    // sanitizedOrder.info = sanitizeHtml(sanitizedOrder.info); --}}
    // sanitizedOrder.created_by = sanitizeHtml(sanitizedOrder.created_by);
    // sanitizedOrder.created_at = sanitizeHtml(sanitizedOrder.created_at);

    // Add slug data for specific field
    sanitizedOrder.slug = slug(sanitizedOrder
        .item.toLowerCase(), {lowercase: true});

    // Add cuid for the model
    sanitizedOrder.cuid = cuid();

    // Make asynchronous call to save the model to Database
    const order = await Order.create(sanitizedOrder);
        return res.status(201)
        .json(order.toJSON());
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}

/**
* Get a single order By Id
* @param req
* @param res
* @returns void
*/

export async function getOrderById(req, res) {
  try {
    console.log("cuid is :", req.params.cuid);
    const doc = await Order
        .findOne({ 
            // createdBy: req.user._id,
            cuid: req.params.cuid,
            // _id: req.params.id
            })
        .lean()
        .exec()

    if (!doc) {
        return res.status(400).end()
    }

        return res.status(200).json({ data: doc })
   } catch (e) {
      return res.status(400).send(e);
   }
}

/**
* Update a order
* @param req
* @param res
* @returns void
*/

export async function updateOneOrder(req, res) {
  try {
    const updatedDoc = await Order
        .findOneAndUpdate({
            // createdBy: req.user._id,
            cuid: req.params.cuid,
            // _id: req.params.id
            },
            req.body,
            { new: true }
        )
        .lean()
        .exec()

    if (!updatedDoc) {
        return res.status(400).end()
    }
        return res.status(200).json({ data: updatedDoc })
   } catch (e) {
       console.error(e);
       return res.status(400).send(e);
   }
}


/**
* Delete a order
* @param req
* @param res
* @returns void
*/

export async function deleteOrder(req, res) {
  try {
    const removed = await Order
        .findOneAndRemove({
           // createdBy:req.user._id,
            cuid: req.params.cuid
           // _id:req.params.id,
        })
    if(!removed){
        return res.status(400).end()
    }
     return res.status(200)
        .json({data:removed})
   } catch (e) {
       console.error(e);
       return res.status(400).send(e);
   }
}