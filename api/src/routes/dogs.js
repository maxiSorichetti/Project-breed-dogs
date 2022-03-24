const router = require('express').Router();
const axios = require('axios');
const { clearCookie } = require('express/lib/response');
const { Dog, Temperament } = require('../db.js');
const { getAllData } = require('./functions');

//http://localhost:3001/dogs?name=golden
router.get('/', async (req, res, next) => {
  const {name} = req.query;
  try{
    const dogsApi = await getAllData();
    const data = dogsApi.map(e => {
    const weightNormalized = e.weight.metric ? e.weight.metric.split(' - ') : e.weight.split(' - ')
    return {
      ...e,
      weight: weightNormalized[0] 
    }
  })
    if(name){
    const filterDogs = dogsApi.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    //si name no existe en la busqueda mostrar msj
    filterDogs ? res.status(200).json(filterDogs) : res.status(404).send(`No se encuentra la raza ${name}`)
  }else{
    res.status(200).json(data);
    }
  }catch(err) {
    console.log('error', err);
  }
});

router.get('/:idRaza', async function (req, res, next) {
  const {idRaza} = req.params  
  console.log('idRaza', idRaza)
  try{ 
    const dogsBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds`)
    const findDog = dogsBreeds.data.find(e => e.name.toLowerCase() === idRaza.toLowerCase())
    const dogDb = await Dog.findOne({
      where: {
        name: idRaza,
      },
      include: Temperament,
    });

    if(dogDb || findDog){
      if(dogDb) {
        const infoDbNormalize = {
            ...dogDb.dataValues,
            temperament: dogDb.temperaments.map(e => e.name)
          }
        res.status(200).json(infoDbNormalize);
      }else{
        res.status(200).json(findDog);
      }
    }else{
      res.status(404).send("No existe esa raza");
    }
  }catch(err){
    console.log('error', err);
  }
});

router.post('/create', async function (req, res, next) {
  const { name, height, weight, life_span, temperament } = req.body;
  try {
    const dogDb = await Dog.findOne({
      where: { name: name},
    })
    if( !dogDb || name && height && weight && life_span && temperament ) {
      const dogCreate = await Dog.create({
        name,
        height,
        weight,
        life_span,
        temperament,
        image: 'https://cdn2.thedogapi.com/images/B1d5me547.jpg',
      });
      const temperamentDb = await Temperament.findAll({
        where: {
          name: temperament,
        }
      });
      //hago la asociacion 
      return res.status(200).json(await dogCreate.addTemperament(temperamentDb))
    }
    return res.status(200).send("falta información para crear la raza de perro") 
  }catch(err) {
    return res.status(404).send(err);
  }
})


module.exports = router;