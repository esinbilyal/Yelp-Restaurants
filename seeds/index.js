const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, prices } = require('./seedsHelpers');
const Restaurant = require('../models/restaurant');
const url = 'mongodb://localhost:27017/yelp-rest';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const randomPrices = Math.floor(Math.random() * prices.length);

const seedDB = async () => {
    await Restaurant.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 227);
        const rest = new Restaurant({
          //MY USER ID
            author: '5fe3889cbb911a26b4937cf4',
            location: `${cities[random1000].city}, ${cities[random1000].administrative_regions}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            price: `${prices[randomPrices]}`,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dhqcigh6c/image/upload/v1609017939/YelpProject/orvcgaw8grfvjhqviynm.jpg',
                  filename: 'YelpProject/orvcgaw8grfvjhqviynm'
                },
                {
                  url: 'https://res.cloudinary.com/dhqcigh6c/image/upload/v1609017939/YelpProject/awdp13e9hc1ys4piuzrl.jpg',
                  filename: 'YelpProject/awdp13e9hc1ys4piuzrl'
                },
                {
                  url: 'https://res.cloudinary.com/dhqcigh6c/image/upload/v1609017941/YelpProject/n6mcm0fmbvv74lxdhbha.jpg',
                  filename: 'YelpProject/n6mcm0fmbvv74lxdhbha'
                }
              ]
        });
        await rest.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
