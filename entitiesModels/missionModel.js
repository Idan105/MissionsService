const mongoose = require('mongoose');

const missionsSchema = new mongoose.Schema({
    missionName: String,
    threats: [{
        name: String,
        description: String,
        heightMeters: Number,
        position: {
            latitude: Number,
            longitude: Number
        }
    }],
    circle: []
});

const Missions = mongoose.model('Missions', missionsSchema);

module.exports = Missions;