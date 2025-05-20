
const {getDB} = require('../utils/db.connect')
const fs = require('fs');

module.exports = class Favourite {
    constructor(houseId){
     this.houseId = houseId;
    }

    save(){
        const db = getDB();
        return db.collection('favourites').insertOne(this);
    }

   static getFavourite(){
    const db = getDB();
     return db.collection('favourites')
     .find().
     toArray();
   }

  static removeFavourite(homeId){
   
      const db = getDB();
        return db.collection('favourites')
        .deleteOne({houseId: String(homeId)})

  }


}