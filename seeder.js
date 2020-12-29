const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Acronym = require('./models/Acronym');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON files
const acronyms = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/acronyms.json`, 'utf-8')
);
// console.log(acronyms);
let formattedData = [];

acronyms.map(acr => {
  let data = {
    acronym: Object.keys(acr)[0],
    description: Object.values(acr)[0],
  }
  formattedData.push(data)
})


//Import Into DB
const importData = async () => {
  try {
    await Acronym.create(formattedData);
    console.log('Data imported ...');
    process.exit();
  } catch (err) {
    console.log('There was an error');
    console.error(err);
  }
};

//Delete Data
const deleteData = async () => {
  try {
    await Acronym.deleteMany();
    console.log('😊 Data deleted ...');
    process.exit();
  } catch (err) {
    console.log('😒 There was an error');
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
