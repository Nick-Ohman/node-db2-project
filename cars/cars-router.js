const express = require('express');

const db = require('../connection.js')

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json({
            data: cars
        })
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error getting cars", error
        })
    })
})

router.post('/', validateCarEntry, (req, res) => {
    const car = req.body;
    db.insert(car, 'id')
        .into('cars')
        .then(id => {
            if(id){
                res.status(201).json({
                    data: id,
                    message: "Car added"
                })
            }
        })
})

router.get('/:id', validateCarId, (req, res) =>{
    db('cars')
    .where({id: req.params.id})
    .first()
    .then(car => {
        res.status(200).json({
            data: car
        })
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error retreiving car" , error
        })
    })
})


///middleware
function validateCarEntry(req, res, next) {
    const VIN = req.body.vin;
    const MAKE = req.body.make;
    const MODEL = req.body.model;
    const MILEAGE = req.body.mileage;
    if(!VIN){
        res.status(400).json({
            errorMessage: 'Please enter vin'
        })
    } else if (!MAKE){
        res.status(400).json({
            errorMessage: "Please Enter Make"
        })
    } else if (!MODEL){
        res.status(400).json({
            errorMessage: 'Please Enter Model'
        })
    } else if (!MILEAGE){
        res.status(400).json({
            errorMessage: "please enter mileage"
        })
    } else {
        next();
    }
}

function validateCarId(req, res, next) {
    db('cars')
    .where({id: req.params.id})
    .first()
    .then(car => {
        if(car){
            next();
        } else {
            res.status(404).json({
                errorMessage: "No car matching that ID"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "Error Retreiving car", error
        })
    })
}

module.exports = router;