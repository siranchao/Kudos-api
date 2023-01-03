const express = require('express')
const router = express.Router()
const { getKudos, setKudo, likeKudo, deleteKudo, getKpi, thumbUpKudo } = require('../controller/kudoController')

router.get('/', getKudos)

router.post('/', setKudo)

router.patch('/like/:id', likeKudo)

router.patch('/thumbUp/:id', thumbUpKudo)

router.delete('/:id', deleteKudo)

router.get('/kpi/', getKpi)

module.exports = router