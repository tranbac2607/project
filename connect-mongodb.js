const mongoose = require('mongoose');
const mongooseString = process.env.MONGODB;

mongoose.connect(mongooseString, {
    //options
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Connect mongo DB successfully!');
    })
    .catch(err => {
        console.error('Connect mongo failed');
        console.error(err.message)
    })

// const moongoose = require('mongoose');

// async function connectDatabase() {

//     try {
//         await moongoose.connect('mongodb://localhost:27017/Scan_Party', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connect successfully');
//     } catch (error) {
//         console.log('Connect fail');
//     }
// }

// connectDatabase();