const mongoose = require('mongoose');
const cities = require('./in');
const { places, descriptors } = require('./seedHelpers');
const House = require('../models/house');
//our database ,, database name -- rentify
mongoose.connect('mongodb://localhost:27017/rentify', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    // console will show this message when database is connected
    console.log("Database Connected");
});



const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await House.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 406);
        const price = Math.floor(Math.random() * 20) + 10;
        const rent = new House({
            author: '62ac9fb5daf4cf44b42dc11f',
            location: `${cities[random].city}, ${cities[random].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].lng,
                    cities[random].lat,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dafapcbdf/image/upload/v1655625002/Rentify/l3psbl0xc8n7psguvyvn.jpg',
                    filename: 'Rentify/l3psbl0xc8n7psguvyvn'
                },

                {
                    url: 'https://res.cloudinary.com/dafapcbdf/image/upload/v1655626286/Rentify/lcirmwyv9qmh7qdzphn5.jpg',
                    filename: 'Rentify/lcirmwyv9qmh7qdzphn5'
                },

            ]
        })
        await rent.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

