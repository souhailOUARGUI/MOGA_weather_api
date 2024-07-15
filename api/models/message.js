const mongoose = require('mongoose')

const metarSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, default: 'METAR' },
  station: String,
  wind_direction: Number,
  wind_speed: Number,
  wind_gust: Number,
  visibility: Number,
  weather: [String],
  cloud_coverage: String,
  temperature: Number,
  dew_point: Number,
  pressure: Number,
  remarks: String,
})

const synopSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, default: 'SYNOP' },
  station: String,
  wind_direction: Number,
  wind_speed: Number,
  temperature: Number,
  dew_point: Number,
  pressure: Number,
  precipitation: Number,
  weather: [String],
  cloud_coverage: String,
  snow_depth: Number,
  visibility: Number,
  ground_temperature: Number,
  remarks: String,
})

const Metar = mongoose.model('Metar', metarSchema)
const Synop = mongoose.model('Synop', synopSchema)

module.exports = { Metar, Synop }
