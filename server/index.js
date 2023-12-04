
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080; // Or any other port you prefer
const cors = require('cors'); // Require the cors package


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



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});