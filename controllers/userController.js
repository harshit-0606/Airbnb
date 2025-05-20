const Favourite = require('../models/favourite');
const Home = require('../models/home') 

 exports.getAddHome = (req, res, next) => { 
   Home.fetchHomes().then((registeredHomes)=>res.render('user/home-list',{registeredHomes:registeredHomes, 
      pageTitle: 'airBnb Hub'}))
   }

   
exports.getHomeDetail = (req,res,next) =>{
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home)=>{
   if (!home) {
      console.log("home not found");
      res.redirect("/")
   }
    else{
      res.render("user/home-detail",{home,  pageTitle: 'airBnb Hub'})
    }
  })
  
}

exports.homeBooking =  (req,res,next) =>{
   res.render('user/bookings',{ 
      pageTitle: 'airBnb Hub'})
} 

//fav home ki id ko get karega
exports.addToFavourite = (req,res,next)=>{
const homeId = req.body.id;
const fav = new Favourite(homeId );

fav.save().then((result)=>console.log('fav added',result)
).catch((error)=>console.log('error comes while matking fav addeded ',error)
).finally(()=>{
   res.redirect("/user/favourites")
})

};


//show karega fav home ko url me
exports.getFavouriteHomeList = (req,res,next)=>{

   Favourite.getFavourite().then((homeIds)=>{
      homeIds = homeIds.map((Id)=>Id.houseId);

      Home.fetchHomes().then((registeredHomes)=>{
         const favouriteHomeDetails =  homeIds.map((homeId)=>registeredHomes.find((home)=> home._id.toString() === homeId));
        console.log("favouriteHomeDetails",favouriteHomeDetails);
         res.render('user/favourite',{favouriteHomeDetails, 
            pageTitle: 'airBnb Hub'})
      })
   })
}

exports.PostRemoveFavourite =  (req, res, next) => { 
   const homeId = req.params.homeId;
   console.log("homeId",homeId);
   
   Favourite.removeFavourite(homeId).then((error)=>{
      if (error) {
         console.log("error in removing from favourite",error);
      }
      res.redirect('/user/favourites')
   })
  }
