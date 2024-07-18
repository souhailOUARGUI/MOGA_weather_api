const { Synop } = require('../models/message')

//getting Metars
const fetchSynops = async (req, res) => {
  try {
    const messages = await Synop.find()
    res.json(messages)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
//getting one Synop
const fetchSynop = async (req, res) => {
  res.json(res.msg)
}

//creating a Synop
const createSynop = async (req, res) => {
  const message = new Synop({
    message: req.body.message,
    timestamp: Date.now(),
    type: req.body.type,
    station: req.body.station,
    wind_direction: req.body.wind_direction,
    wind_speed: req.body.wind_speed,
    wind_gust: req.body.wind_gust,
    visibility: req.body.visibility,
    weather: req.body.weather,
    cloud_coverage: req.body.cloud_coverage,
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
const updateSynop = async (req, res) => {
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

//deleting a Synop
const deleteSynop = async (req, res) => {
  try {
    await res.msg
      .deleteOne()
      .then(() => res.json({ message: 'Synop message deleted' }))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function getSynop(req, res, next) {
  let msg
  try {
    msg = await Synop.findById(req.params.id)
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
  fetchSynops,
  fetchSynop,
  getSynop,
  createSynop,
  updateSynop,
  deleteSynop,
}
