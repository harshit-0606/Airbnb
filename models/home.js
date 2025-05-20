const { ObjectId } = require('mongodb');
const {getDB} = require('../utils/db.connect')


module.exports = class Home {
    constructor(houseName, price, location, rating, image, _id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.image = image;
        if (_id){
           this._id = _id ;
        }
      
    }

    //constructor function hai andr likhne ki need nii hai thanks to ecmascript
    //refer to instance of home object that is created
   
save() {
  const db = getDB();

  if (this?._id) {
    const updateFields = {
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      image: this.image,
    };
    return db.collection('homes').updateOne(
      { _id: new ObjectId(String(this._id)) },
      { $set: updateFields }
    );
  } else {
    if (this.houseName && this.price && this.location && this.rating && this.image) {
      return db.collection('homes').insertOne(this);
    } else { console.log("this",this)
      return Promise.reject("Missing required fields in home.save()");
    }
  }
}


    //this refers to actual home class
    //it return an array
    static fetchHomes() {
     const db = getDB();
     return db.collection('homes')
     .find().
     toArray();
    }

   static findById(homeId){
    const db = getDB();
    return db.collection('homes')
    .find({_id: new ObjectId(String(homeId))}).next();
    //ek object mil jayega pir usse next promise me send kar denge
   }

   static deleteHome(homeId){
    const db = getDB();
    return db.collection('homes')
    .deleteOne({_id: new ObjectId(String(homeId))})
   }

}