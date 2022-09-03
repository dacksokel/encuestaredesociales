const router = require('express').Router()

// modelo
const Encuestados = require('../modelos/encuestado')

router.get('/',async (req, res)=>{
    res.send('work los encuestados ')
})

module.exports = router