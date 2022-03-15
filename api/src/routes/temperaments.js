const router = require('express').Router();
const { Temperament } = require('../db.js');
const { getInfoApi }  = require('./functions')

//Obtener todos los temperamentos posibles
//En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async function (req, res) {
  const dogsApi = await getInfoApi();
  const data = dogsApi.map(el => el.temperament).filter(e => e != undefined);
  //separo cada string en temperamentos separados
  // console.log('data', data.slice(80,175))
  //uno todo
  const tempSplit = data.map(e => e.split(', ')).flat();
  //saco repetidos
  const tempSet = new Set(tempSplit);
  // console.log('tempSet', tempSet)
  
  try{
    tempSet.forEach( e => {
      Temperament.findOrCreate({
        where: {
          name : e
        }
      });
    }); 
    const temperaments = await Temperament.findAll();
    res.status(200).json(temperaments);
  }catch(err) {
    res.status(404).json({err: err});
  }
})

module.exports = router;



