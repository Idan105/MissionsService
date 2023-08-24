const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5714;

const uri = 'mongodb://localhost:27017/GlobusDB';
const Missions = require('./entitiesModels/missionModel');

app.use(express.json());
app.use(cors());


// Add a new mission
app.post('/missions', (req, res) => {
    const mission = new Missions({
        missionName: req.body.missionName,
        threats: req.body.threats,
        circle: req.body.circle
    });

    try {
        const newMission = mission.save();
        res.status(201).json(newMission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all the threats from a mission
app.get('/missions/:missionName/threats', async (req, res) => {
    try {
        const mission = await Missions.findOne({ missionName: req.params.missionName });
        res.json(mission.threats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


mongoose.connect(uri)
    .then(() => { 
        console.log('MongoDB connected');
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.log(err));