
const express = require('express')
const hostRouter = express.Router();

const {addHostHomeForm,hostHomeAdded,getHomeAdded ,getEditHome,postEditHome,postDeleteHome} = require('../controllers/hostController')

hostRouter.route("/host/add-home").get(addHostHomeForm)
hostRouter.route("/host/host-home").post(hostHomeAdded);
hostRouter.route("/host/host-home").get(getHomeAdded);
hostRouter.route("/host/edit-home/:homeId").get(getEditHome);
hostRouter.route("/host/edit-home").post(postEditHome);
hostRouter.route("/host/delete-home/:homeId").post(postDeleteHome);

// module.exports = hostRouter; => only single exports
// for multiple exports

exports.hostRouter = hostRouter;


