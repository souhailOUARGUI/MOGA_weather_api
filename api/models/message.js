const mongoose = require('mongoose')

const metarSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, default: 'METAR' },
  station: String,
  wind_direction: Number,
  wind_speed: Number,
  wind_unit: String,
  visibility: String,
  weather: String,
  // cloud_coverage: String,
  temperature: Number,
  dew_point: Number,
  pressure: Number,
  remarks: String,
})

// const synopSchema = new mongoose.Schema({
//   message: String,
//   timestamp: { type: Date, default: Date.now },
//   type: { type: String, default: 'SYNOP' },
//   station: String,
//   wind_direction: Number,
//   wind_speed: Number,
//   temperature: Number,
//   dew_point: Number,
//   pressure: Number,
//   precipitation: Number,
//   weather: [String],
//   cloud_coverage: String,
//   snow_depth: Number,
//   visibility: Number,
//   ground_temperature: Number,
//   remarks: String,
// })
const synopSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  type: { type: String, default: 'SYNOP' },
  station: String,
  section0: {
    indicator: String,    // AAXX
    datetime: String,     // 25094
    stationId: String     // 60220
  },
  section1: {
    iRixhVV: String,     // 32960
    Nddff: String,       // 52103
    temp: String,        // 11152
    dewPoint: String,    // 21148
    pressure: {
      station: String,   // 30049
      seaLevel: String,  // 40101
    },
    precip: String,      // 69902
    weather: String,     // 70282
    clouds: String       // 8255/
  },
  section3: {
    temp: String,        // 20128
    precip: String,      // 59001
    weather: String      // 70282
  },
  section5: {
    humidity: String     // 00082
  }
});

const Metar = mongoose.model('Metar', metarSchema)
const Synop = mongoose.model('Synop', synopSchema)

module.exports = { Metar, Synop }
