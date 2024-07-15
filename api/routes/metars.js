const express = require('express')
const msgRouter = express.Router()
const metarController = require('../controllers/metarController')
const synopController = require('../controllers/synopController')

/////*******************************   METARS   ************************ */

// getting all
msgRouter.get('/metars', metarController.fetchMetars)

// getting one
msgRouter.get(
  '/metars/:id',
  metarController.getMetar,
  metarController.fetchMetar
)

// creating one

msgRouter.post('/metars', metarController.createMetar)
// updating one
msgRouter.patch(
  '/metars/:id',
  metarController.getMetar,
  metarController.updateMetar
)

// deleting one
msgRouter.delete(
  '/metars/:id',
  metarController.getMetar,
  metarController.deleteMetar
)

/////*******************************   SYNOPS   ************************ */

// getting all
msgRouter.get('/synops', synopController.fetchSynops)

// getting one
msgRouter.get(
  '/synops/:id',
  synopController.getSynop,
  synopController.fetchSynop
)

// creating one
msgRouter.post('/synops', synopController.createSynop)

// updating one
msgRouter.patch(
  '/synops/:id',
  synopController.getSynop,
  synopController.updateSynop
)

// deleting one
msgRouter.delete(
  '/synops/:id',
  synopController.getSynop,
  synopController.deleteSynop
)

module.exports = msgRouter
