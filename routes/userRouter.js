const express = require('express')
const userRouter = express.Router();

// imp: iss data ko ui me dikhane ke liye EJS KI NEED HUI
const userControllers = require('../controllers/userController')

userRouter.get('/',userControllers.getAddHome)
userRouter.get('/user/homes/:homeId',userControllers.getHomeDetail)
userRouter.get('/user/booking',userControllers.homeBooking)

userRouter.post('/user/favourites',userControllers.addToFavourite)//add fav home id
userRouter.get('/user/favourites',userControllers.getFavouriteHomeList)//get home detail on behalf of fav home id
userRouter.post('/favourites/delete/:homeId',userControllers.PostRemoveFavourite)
module.exports = userRouter