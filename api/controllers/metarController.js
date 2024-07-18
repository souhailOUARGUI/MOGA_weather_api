const { Metar } = require('../models/message')

//getting Metars
const fetchMetars = async (req, res) => {
  try {
    const messages = await Metar.find()
    res.json(messages)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//getting one Metar
const fetchMetar = async (req, res) => {
  res.json(res.msg)
}

//creating a metar
const createMetar = async (req, res, socketHandler) => {
  const message = new Metar({
    message: req.body.message,
    timestamp: req.body.timestamp,
    type: req.body.type,
    station: req.body.station,
    wind_direction: req.body.wind_direction,
    wind_speed: req.body.wind_speed,
    wind_unit: req.body.wind_unit,
    visibility: req.body.visibility,
    weather: req.body.weather,
    // cloud_coverage: req.body.cloud_coverage,
    temperature: req.body.temperature,
    dew_point: req.body.dew_point,
    pressure: req.body.pressure,
    remarks: req.body.remarks,
  })
  try {
    const newMessage = await message.save()
    res.json({ message: 'message created' })
    socketHandler.emit('mobile', newMessage)
  } catch (error) {
    res.status(400).json({ message: error.Message })
  }
}

//updating a metar
const updateMetar = async (req, res) => {
  res.msg.message = req.body.message
  res.msg.timestamp = Date.now()
  res.msg.type = req.body.type
  res.msg.station = req.body.station
  res.msg.wind_direction = req.body.wind_direction
  res.msg.wind_speed = req.body.wind_speed
  res.msg.wind_gust = req.body.wind_gust
  res.msg.visibility = req.body.visibility
  res.msg.weather = req.body.weather
  res.msg.cloud_coverage = req.body.cloud_coverage
  res.msg.temperature = req.body.temperature
  res.msg.dew_point = req.body.dew_point
  res.msg.pressure = req.body.pressure
  res.msg.remarks = req.body.remarks
  try {
    const updatedmessage = res.msg.save()
    res.json(updatedmessage)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//deleting a metar
const deleteMetar = async (req, res) => {
  try {
    await res.msg
      .deleteOne()
      .then(() => res.json({ message: 'metar message deleted' }))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//getting a metar from DB
async function getMetar(req, res, next) {
  let msg
  try {
    msg = await Metar.findById(req.params.id)
    if (msg == null) {
      return res.status(404).json({ message: 'message not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.msg = msg
  next()
}

module.exports = {
  fetchMetars,
  fetchMetar,
  getMetar,
  createMetar,
  updateMetar,
  deleteMetar,
}
