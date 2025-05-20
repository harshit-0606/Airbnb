const Home = require('../models/home')
const   Favourite = require('../models/favourite')

exports.addHostHomeForm = (req, res, next) => {
    res.render('host/editHome', {
        editing: false,
        pageTitle: 'addHome Page'
    })
}

// here we handle our post request in which we save the host home data
exports.hostHomeAdded = (req, res, next) => {
  const { houseName, price, location, rating, image } = req.body;
   
  const home = new Home(houseName, price, location, rating, image);
 home.save().then(()=>{
    console.log("host home saved successfully");
         res.redirect('/host/host-home')}
 )
 .catch((error)=>{
    console.log("error while saving the host home",error); 
 })
};

//now we use the get request to get the data and show or render on the page.

exports.getHomeAdded = (req,res,next)=>{
    Home.fetchHomes()
    .then((registeredHomes)=>{
    
        res.render('host/homeAdded',{
            registeredHomes:registeredHomes,
             pageTitle: 'get host home'
        })
    })
    .catch(err => {
      console.error("Error fetching homes:", err);
      res.status(500).send("Could not load homes");
    });
}


//edit home with details get karna
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true'; 
    Home.fetchHomes().then((homes) => {
        const home = homes.find((home) => home._id.toString() === homeId);
        console.log("home edit", home);

        home ? res.render('host/editHome', {
            home,
            editing:editing,
            pageTitle: 'edit your home'
        }) : res.redirect('/host/host-home')
    })
}

//after editing home with details post karna
exports.postEditHome  = (req, res, next) => {
    const {id, houseName, price, location, rating, image } = req.body

    const home = new Home(houseName, price, location, rating, image);
    home._id = id;
    //home save hua
    home.save().then((result)=>{
        console.log("home updated",result);
    });
    res.redirect('/host/host-home')
}

exports.postDeleteHome = (req,res,next)=>{
    const homeId = req.params.homeId;
   Home.deleteHome(homeId)
   .then( ()=>Favourite.removeFavourite(homeId))
   .then(() => res.redirect('/host/host-home'))
     .catch((err) => {
      console.error("Error in deletion:", err);
      res.status(500).send("Something went wrong");
    });

   
}


