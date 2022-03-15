const router = require('express').Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { getAllData } = require('./functions');

//http://localhost:3001/dogs?name=golden
router.get('/', async (req, res) => {
  //Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
  const {name} = req.query;
  const dogsApi = await getAllData();

    if(name){
    const filterDogs = await dogsApi.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    //si name no existe en la busqueda mostrar msj
    filterDogs ? res.status(200).json(filterDogs) : res.status(404).send(`No se encuentra la raza ${name}`)
  }else{
    console.log('dogsApi', dogsApi)
      res.status(200).json(dogsApi);
    }
});

//Obtener el detalle de una raza de perro en particular
//Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
//Incluir los temperamentos asociados
router.get('/:idRaza', async function (req, res) {
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

    console.log('dogDb /raza', dogDb)
    if(dogDb || findDog){
      if(dogDb) {
        const infoDbNormalize = {
            ...dogDb.dataValues,
            temperament: dogDb.temperaments.map(e => e.name)
          }
        console.log('inDbNormalize dogs', infoDbNormalize)
        res.status(200).json(infoDbNormalize);
      }else{
        res.status(200).json(findDog);
      }
        // const findBreeds = dogsBreeds.data.concat(dogDb);
    }else{
      res.status(404).send("No existe esa raza");
    }
  }catch(err){
    console.log('error', err);
  }
});

//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
//Crea una raza de perro en la base de datos

router.post('/create', async function (req, res) {
  const { name, height, weight, life_span, temperament } = req.body;
  try {
    if( name && height && weight && life_span && temperament ) {
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
      console.log('temperamentDb', temperamentDb)
      return res.status(200).json(await dogCreate.addTemperament(temperamentDb))
    }
    return res.status(200).send("falta información para crear la raza de perro") 
  }catch(err) {
    return res.status(404).send(err);
  }
})

module.exports = router;