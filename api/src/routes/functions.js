const axios = require('axios');
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
  return infoDb;
};

// export async function getAllData(){
const getAllData = async () => {
  const infoApi = await getInfoApi();
  const infoDb = await getInfoDb();
  const infoDbNormalize = infoDb.map(e => {
    return {
      ...e.dataValues,
      temperament: e.dataValues.temperaments.map(e => e.name)
    }
  })
  console.log('inDbNormalize', infoDbNormalize)
  const allData = infoApi.concat(infoDbNormalize);
  return allData;
};

module.exports = {
  getAllData,
  getInfoApi} ;

// export promise function getInfo Api
// const getInfoApi = () => {
//   axios.get('https://api.thedogapi.com/v1/breeds')
//   .then((response) => {
//     const dogs = response.data.map(e => {
//       return {
//       height: e.height.metric, 
//       image: e.image.url,
//       life_span: e.life_span,
//       name : e.name,
//       temperament: e.temperament,
//       weight: e.weight.metric,
//       }
//     })
//     console.log('dogs API', dogs)
//     return dogs;
//   }).catch(err => console.log('err', err))
// };