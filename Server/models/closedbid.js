const {uid}=require('uid'); 
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClosedBid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClosedBid.init({
    id: {
      set(value) {
        let x=uid(16);
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('id', x);
      },
      type:DataTypes.STRING,
      primaryKey:true},
    auctionId:{
      type:DataTypes.STRING,
      allowNull:false
    },
    auctionName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    startdate:{
      type:DataTypes.STRING,
      allowNull:false
    },
    enddate:{
      type:DataTypes.DATE,
      allowNull:false
    },
    seller:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sellerId:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sphone:{
      type:DataTypes.STRING,
      allowNull:false
    },
    winner:{
      type:DataTypes.STRING,
      allowNull:true
    },
    winnerId:{
      type:DataTypes.STRING,
      allowNull:true
    },
    winningbid:{
      type:DataTypes.STRING,
      allowNull:true
    },
    wphone:{
      type:DataTypes.STRING,
      allowNull:true
    },
    announced:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    
  }, {
    sequelize,
    modelName: 'ClosedBid',
  });
  return ClosedBid;
};