const axios = require('axios');
// const res = require('express/lib/response');
const { Dog, Temperament } = require('../db.js');

// export async function getInfoApi(){
const getInfoApi = async () => {
  const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogs = dogsApi.data.map(e => {
    return {
      height: e.height.metric, 
      image: e.image.url,
      life_span: e.life_span,
      name : e.name,
      temperament: e.temperament,
      weight: e.weight.metric,
    }
  });
  return dogs;
};

// export async function getInfoDb(){
const getInfoDb = async () => {
  const infoDb = await Dog.findAll({
    include: Temperament
  });
  // console.log('infoDb', infoDb.dog[0].dataValues)
  return infoDb;
};

// export async function getAllData(){
const getAllData = async () => {
  const infoApi = await getInfoApi();
  const infoDb = await getInfoDb();
  // console.log('infoDb', infoDb[0].dataValues)
  // console.log('infoDb', infoDb.map(e=> {
  //   ...e.dataValues,
  //   temperament: infoDb[0].dataValues.temperaments[0].dataValues.name
  // } ))
  // console.log('infoDb 2',infoDb[0].dataValues.temperaments[0].dataValues.name)

  const infoDbNormalize = infoDb.map(e => {
    return {
      ...e.dataValues,
      temperament: e.dataValues.temperaments.map(e => e.name)
    }
  })
  console.log('inDbNormalize', infoDbNormalize)
  // {
  //   ...infoDb[0].dataValues,
  //   temperament: infoDb[0].dataValues.temperaments[0].dataValues.name
  // }
  // console.log('infoDb despues', infoDb[0].dataValues)
  // console.log('infoDbNormalize ', infoDbNormalize )
  const allData = infoApi.concat(infoDbNormalize);
  // console.log('allData', allData)
  // console.log('allData', allData)
  return allData;
  // console.log('infoDb function', infoDb)
  // return infoDb;
};

module.exports = {
  getAllData,
  getInfoApi} ;
