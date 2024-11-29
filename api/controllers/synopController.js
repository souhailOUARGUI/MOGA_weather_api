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

const fetchSynop = async (req, res) => {
  try {
    const message = await Synop.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// //creating a Synop

const createSynop = async (req, res, socketHandler) => {
  const parts = req.body.message.split(/\s+/);
  
  // Valider le format de base
  if (!parts[0].startsWith('AAXX')) {
    return res.status(400).json({ message: 'Invalid SYNOP format' });
  }

  const message = new Synop({
    message: req.body.message,
    timestamp: req.body.timestamp || Date.now(),
    type: 'SYNOP',
    station: parts[2], // station ID
    section0: {
      indicator: parts[0],
      datetime: parts[1],
      stationId: parts[2]
    },
    section1: {}
  });

  // Parse section 1
  let currentSection = 1;
  for (let i = 3; i < parts.length; i++) {
    const group = parts[i];
    
    if (group === '333') {
      currentSection = 3;
      message.section3 = {};
      continue;
    }
    if (group === '555') {
      currentSection = 5;
      message.section5 = {};
      continue;
    }

    // Traiter selon la section
    if (currentSection === 1) {
      if (group.startsWith('3')) message.section1.pressure = { station: group };
      if (group.startsWith('4')) message.section1.pressure.seaLevel = group;
      if (group.startsWith('1')) message.section1.temp = group;
      if (group.startsWith('2') && !group.startsWith('20')) message.section1.dewPoint = group;
      if (group.startsWith('6')) message.section1.precip = group;
      if (group.startsWith('7')) message.section1.weather = group;
      if (group.startsWith('8')) message.section1.clouds = group;
    }
    else if (currentSection === 3) {
      if (group.startsWith('2')) message.section3.temp = group;
      if (group.startsWith('5')) message.section3.precip = group;
      if (group.startsWith('7')) message.section3.weather = group;
    }
    else if (currentSection === 5) {
      if (group.startsWith('0')) message.section5.humidity = group;
    }
  }

  try {
    const newMessage = await message.save();
    res.json({ message: 'message created' });
    socketHandler.emit('mobile', newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const createSynop = async (req, res, socketHandler) => {
//   const message = new Synop({
//     message: req.body.message,
//     timestamp: Date.now(),
//     type: req.body.type,
//     station: req.body.station,
//     wind_direction: req.body.wind_direction,
//     wind_speed: req.body.wind_speed,
//     wind_gust: req.body.wind_gust,
//     visibility: req.body.visibility,
//     weather: req.body.weather,
//     cloud_coverage: req.body.cloud_coverage,
//     temperature: req.body.temperature,
//     dew_point: req.body.dew_point,
//     pressure: req.body.pressure,
//     remarks: req.body.remarks,
//   })
//   try {
//     const newMessage = await message.save()
//     res.json({ message: 'message created' })
//     socketHandler.emit('mobile', newMessage)
//   } catch (error) {
//     res.status(400).json({ message: error.Message })
//   }
// }

//updating a metar
const updateSynop = async (req, res) => {
  const parts = req.body.message.split(/\s+/)
  
  if (!parts[0].startsWith('AAXX')) {
    return res.status(400).json({ message: 'Invalid SYNOP format' })
  }

  try {
    const message = await Synop.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    message.message = req.body.message
    message.timestamp = Date.now()
    message.station = parts[2]
    message.section0 = {
      indicator: parts[0],
      datetime: parts[1],
      stationId: parts[2]
    }

    let currentSection = 1
    for (let i = 3; i < parts.length; i++) {
      const group = parts[i]
      
      if (group === '333') {
        currentSection = 3
        message.section3 = {}
        continue
      }
      if (group === '555') {
        currentSection = 5
        message.section5 = {}
        continue
      }

      if (currentSection === 1) {
        if (group.startsWith('3')) message.section1.pressure = { station: group }
        if (group.startsWith('4')) message.section1.pressure.seaLevel = group
        if (group.startsWith('1')) message.section1.temp = group
        if (group.startsWith('2') && !group.startsWith('20')) message.section1.dewPoint = group
        if (group.startsWith('6')) message.section1.precip = group
        if (group.startsWith('7')) message.section1.weather = group
        if (group.startsWith('8')) message.section1.clouds = group
      }
      else if (currentSection === 3) {
        if (group.startsWith('2')) message.section3.temp = group
        if (group.startsWith('5')) message.section3.precip = group
        if (group.startsWith('7')) message.section3.weather = group
      }
      else if (currentSection === 5) {
        if (group.startsWith('0')) message.section5.humidity = group
      }
    }

    const updatedMessage = await message.save()
    res.json(updatedMessage)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//deleting a Synop
const deleteSynop = async (req, res) => {
  try {
    const message = await Synop.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }
    await message.deleteOne()
    res.json({ message: 'SYNOP message deleted' })
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
