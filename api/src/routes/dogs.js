const router = require('express').Router();
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const getAllData = require('./functions');

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
      res.status(200).json(dogsApi);
    }
});

//Obtener el detalle de una raza de perro en particular
//Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
//Incluir los temperamentos asociados
router.get('/:name', async function (req, res) {
  const {name} = req.params  
  try{ 
    const dogsBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    const dogDb = await Dog.findOne({
      where: {
        name: name,
      },
      //ver si traigo temperamentos cuando
      include: Temperament,
    }); 
    if(dogDb || dogsBreeds.data){
        const findBreeds = dogsBreeds.data.concat(dogDb);
        res.status(200).json(findBreeds);
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