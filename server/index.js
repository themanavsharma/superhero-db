
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080; // Or any other port you prefer
const cors = require('cors'); // Require the cors package

const low = require('lowdb');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');

app.use(express.json());  // Add this line to parse JSON requests

// Apply cors middleware to allow cross-origin requests
app.use(cors());


// Read superhero powers data from the JSON file
const powersDataPath = path.join(__dirname, './superhero_powers.json');
const rawData = fs.readFileSync(powersDataPath, 'utf-8');
const powersData = JSON.parse(rawData);

// Read superhero info data from the JSON file
const infoDataPath = path.join(__dirname, './superhero_info.json');
const rawDataInfo = fs.readFileSync(infoDataPath, 'utf-8');
const infoData = JSON.parse(rawDataInfo);


function searchSuperheroesAndInfoByPowerRace(power, race) {
  // If power is not provided, return all superheroes
  if (!power) {
    return infoData;
  }

  // Filter superheroes based on the entered power
  const matchingSuperheroes = powersData.filter(hero => hero[power] === 'True');

  // Get info for the matching superheroes
  const matchingSuperheroesInfo = matchingSuperheroes.map(superhero => {
    const info = infoData.find(info => info.name === superhero.hero_names);
    return info;
  });

  // If race is provided, further filter superheroes based on race
  if (race) {
    const filteredSuperheroesByRace = matchingSuperheroesInfo.filter(superhero => superhero && superhero.Race && superhero.Race.toLowerCase() === race.toLowerCase());
    return filteredSuperheroesByRace;
  }

  return matchingSuperheroesInfo;
}



// Function to filter superheroes by race
function filterSuperheroesByRace(superheroesInfo, race) {
  if (race === 'noSpecifiedRace') {
    return superheroesInfo;
  } else {
    return superheroesInfo.filter(superhero => superhero && superhero.Race && superhero.Race.toLowerCase() === race.toLowerCase());
  }
}

// Function to filter superheroes by name
function filterSuperheroesByName(superheroesInfo, name) {
  if (name === 'noSpecifiedName') {
    return superheroesInfo;
  } else {
    return superheroesInfo.filter(superhero => superhero && superhero.name && superhero.name.toLowerCase() === name.toLowerCase());
  }
}

// Function to filter superheroes by publisher
function filterSuperheroesByPublisher(superheroesInfo, publisher) {
  if (publisher === 'noSpecifiedPublisher') {
    return superheroesInfo;
  } else {
    return superheroesInfo.filter(superhero => superhero && superhero.Publisher && superhero.Publisher.toLowerCase() === publisher.toLowerCase());
  }
}

// Function to filter superheroes by power
function filterSuperheroesByPower(superheroesInfo, superheroPowers, power) {
  if (power === 'noSpecifiedPower') {
    return superheroesInfo;
  } else {
    const matchingHeroNames = superheroPowers
      .filter(hero => hero[power] === 'True')
      .map(hero => hero.hero_names);

    const matchingSuperheroes = superheroesInfo.filter(hero => matchingHeroNames.includes(hero.name));
    console.log('Matching Superheroes:', matchingSuperheroes);
    return matchingSuperheroes;
  }
}

// Superhero search route
app.get('/api/searchSuperheroes/:power/:race/:name/:publisher', (req, res) => {
  const power = req.params.power;
  const race = req.params.race;
  const name = req.params.name;
  const publisher = req.params.publisher;

  console.log('Name:', name); // Log the name to check its value

  const superheroPowersInfo = powersData;

  const filteredByPower = filterSuperheroesByPower(infoData, superheroPowersInfo, power);
  // console.log('Filtered by Power:', filteredByPower);

  const filteredByRace = filterSuperheroesByRace(filteredByPower, race);
  // console.log('Filtered by Race:', filteredByRace);

  const filteredByName = filterSuperheroesByName(filteredByRace, name)
  // console.log('Filtered by Name:', filteredByName);

  const filteredByPublisher = filterSuperheroesByPublisher(filteredByName, publisher)
  // console.log('Filtered by Name:', filteredByName);

  return res.json(filteredByPublisher);
});


const adapter = new FileSync('users.json');
const db = low(adapter);

// Set defaults for the 'users' collection
db.defaults({ users: [] }).write();

// Endpoint to handle user registration
app.post('/api/register', (req, res) => {
  const newUser = req.body;

  // Check if user with the same email already exists
  const existingUser = db.get('users').find({ email: newUser.email }).value();
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  // Add new user to the database
  db.get('users').push(newUser).write();

  res.status(201).json({ message: 'User registered successfully' });
});


const listsAdapter = new FileSync('db.json');
const listsDB = low(listsAdapter);

// // Set defaults for the 'superheroLists' collection
// listsDB.defaults({ superheroLists: {} }).write();

// Set defaults for the 'superheroLists' collection
listsDB.defaults([]).write();  // Assuming superheroLists is an array



// Endpoint to get superhero lists
app.get('/api/lists', (req, res) => {
  const superheroLists = listsDB.value().filter((list) => list.isPublic);  // Filter lists with isPublic: true
  res.json(superheroLists);
});


// Endpoint to get secure superhero lists
app.get('/api/secure/lists', (req, res) => {
  const { nickname } = req.query;

  // Read the existing data from db.json
  const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Filter public lists
  const publicLists = data.filter((list) => list.isPublic);

  // Remove lists with the specified nickname
  const filteredLists = publicLists.filter((list) => list.nickname !== nickname);

  res.json(filteredLists);
});






// Endpoint to get detailed information for a superhero by ID
app.get('/api/superhero/:id', (req, res) => {
  const { id } = req.params;

  // Fetch superhero information from superhero_info.json
  const superhero = infoData.find((hero) => hero.id === parseInt(id));

  // Send only the name in case superhero is not found
  if (!superhero) {
    res.json({ name: 'Superhero Not Found' });
    return;
  }

  // Get the superhero name
  const superheroName = superhero.name;

  // Fetch superhero powers from superhero_powers.json using the superhero name
  const superheroPowersData = powersData.find((powers) => powers.hero_names === superheroName);

  // Ensure powers are an array, handle undefined case
  const powers = superheroPowersData
    ? Object.keys(superheroPowersData).filter((power) => superheroPowersData[power] === 'True')
    : [];

  // Send only the required information in the desired format
  const superheroInfo = {
    id: superhero.id,
    name: superhero.name,
    publisher: superhero.Publisher || '',
    powers,
  };

  res.json(superheroInfo);
});



// Endpoint to create a new superhero list
app.post('/api/secure/createlist', (req, res) => {
  const { listName, description, heroIds, isPublic, nickname } = req.body;

  // Get the current date in the format: year-month-date
  const currentDate = new Date().toISOString().split('T')[0];

  // Read the existing data from db.json
  const data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Check if the user already has 20 lists
  const userLists = data.filter((list) => list.nickname === nickname);
  if (userLists.length >= 20) {
    return res.status(400).json({ error: 'User can only have up to 20 lists.' });
  }

  // Check if the list name is unique for the user
  const isListNameUnique = userLists.every((list) => list.listName !== listName);
  if (!isListNameUnique) {
    return res.status(400).json({ error: 'List name must be unique for the user.' });
  }

  // Create a new superhero list object
  const newList = {
    listName,
    lastModified: currentDate,
    nickname,  // Use the provided nickname
    ids: heroIds,
    averageRating: null, // Set the default value to null
    isPublic,
    description,
  };

  // Add the new list to the existing data
  data.push(newList);

  // Write the updated data back to db.json
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');

  res.json(newList);
});


// Endpoint to get the nickname of a user by email
app.get('/api/nickname/:email', (req, res) => {
  const { email } = req.params;

  console.log('Requested email:', email); // Log the requested email

  // Read the users data from users.json
  const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

  // Find the user with the specified email
  const user = usersData.users.find((user) => user.email === email);

  if (user) {
    console.log('User found. Nickname:', user.nickname); // Log the found user's nickname
    res.json({ nickname: user.nickname });
  } else {
    console.log('User not found for email:', email); // Log that user was not found
    res.status(404).json({ error: 'User not found' });
  }
});


// Endpoint to delete a superhero list
app.delete('/api/secure/deletelist', (req, res) => {
  const { listName, nickname } = req.body;

  // Read the existing data from db.json
  let data = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Check if the entry with the given list name and nickname exists
  const indexToDelete = data.findIndex(
    (list) => list.listName === listName && list.nickname === nickname
  );

  if (indexToDelete !== -1) {
    // Entry found, delete it
    data.splice(indexToDelete, 1);

    // Write the updated data back to db.json
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');

    res.json({ success: true, message: 'List deleted successfully.' });
  } else {
    // Entry not found, send an error response
    res.status(404).json({ error: 'List not found for the given nickname and list name.' });
  }
});


// Endpoint to get superhero lists by nickname
app.get('/api/secure/yourlists', (req, res) => {
  const { nickname } = req.query;

  // Read the superhero lists data from db.json
  const superheroLists = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

  // Filter lists by nickname
  const userLists = superheroLists.filter((list) => list.nickname === nickname);

  res.json(userLists);
});








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});