const axios = require('axios');
// const res = require('express/lib/response');
const { Dog, Temperament } = require('../db.js');

const getInfoApi = async () => {
  const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
  // console.log('dogsApi.data', dogsApi.data)
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

const getInfoDb = async () => {
  const infoDb = await Dog.findAll({
    include: Temperament
  });
  // console.log('infoDb', infoDb)
  return infoDb;
};

const getAllData = async () => {
  const infoApi = await getInfoApi();
  const infoDb = await getInfoDb();
  const allData = infoApi.concat(infoDb);
  // console.log('allData', allData)
  return allData;
  console.log('infoDb function', infoDb)
  return infoDb;
};

module.exports = getAllData ;
