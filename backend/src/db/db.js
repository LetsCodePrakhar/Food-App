const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb+srv://Cluster04937:aUFPRV1nc0hU@cluster04937.ihicqmu.mongodb.net/foodapp')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    })
}

module.exports = connectDB;