const express = require('express');
const fs = require('fs');
const port = 3000;
const path = require('path');

const low = require('lowdb');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');


const app = express();


app.use(bodyParser.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));


const data = fs.readFileSync(path.join(__dirname, 'superhero_info.json'), 'utf-8'); // reads superhero info data from the json file
const superheroInfoData = JSON.parse(data); // converts the json data into a js object

// gets the superhero information by ID
app.get('/api/superhero/:id', (req, res) => {
   
    const superheroId = parseInt(req.params.id); // gets the superhero ID from the url
    const superhero = superheroInfoData.find((hero) => hero.id === superheroId); // finds superhero in the array based on ID
  
    if (!superhero) { // return a 404 error if the superhero is not found
      return res.status(404).json({ error: 'Superhero not found' });
    }

    res.json(superhero); // send the superhero info as a json in the response

  });



const powersData = fs.readFileSync(path.join(__dirname, 'superhero_powers.json'), 'utf-8'); // reads superhero powers data from the json file
const superheroPowersData = JSON.parse(powersData); // converts the json data into a js object

// gets the superhero powers information by ID
app.get('/api/superhero/:id/powers', (req, res) => {
    
    const superheroId = parseInt(req.params.id); // gets the superhero ID from the url
    const superhero = superheroInfoData.find((hero) => hero.id === superheroId); // finds superhero in the array based on ID

    if (!superhero) { // return a 404 error if the superhero is not found
    return res.status(404).json({ error: 'Superhero not found' });
    }

    const superheroPowers = superheroPowersData.find((powers) => powers.hero_names === superhero.name); // finds the powers of the superhero based on their name, retrieved from the info

    if (!superheroPowers) { // return a 404 error if the superhero powers is not found
    return res.status(404).json({ error: 'Superhero powers not found' });
    }

    res.json(superheroPowers); // send the superhero powers as a json in the response

});



// gets the publisher names 
app.get('/api/publishers', (req, res) => {

    const publisherNames = superheroInfoData.map(hero => hero.Publisher).filter(Boolean); //get all the publisher names 
  
    if (publisherNames.length === 0) { // return a 404 error if no publishers are found
      return res.status(404).json({ error: 'No publishers found' });
    }

    res.json({ publishers: publisherNames }); // send the publisher names as a json in the response

});




const theData = fs.readFileSync(path.join(__dirname, 'superhero_info.json'), 'utf-8');
const theSuperheroInfoData = JSON.parse(theData).map(hero => {
  const lowercasedHero = {};
  for (const key in hero) {
    lowercasedHero[key.toLowerCase()] = hero[key];
  }
  return lowercasedHero;
});


app.get('/api/:field/:pattern/:n', (req, res) => {
  const { field, pattern, n } = req.params;
  console.log('Received request with parameters:', { field, pattern, n });

  const lowercasePattern = pattern.toLowerCase();

  const matchingSuperheroes = theSuperheroInfoData.filter(hero => {
    console.log('Checking:', { field, pattern, heroField: hero[field].toLowerCase() });

    return hero[field].toLowerCase().includes(lowercasePattern);
  });

  console.log('Matching superheroes:', matchingSuperheroes);

  if (matchingSuperheroes.length === 0) {
 
    res.status(404).json({ error: 'No superheroes found matching the criteria' });
  } else {

    const result = n ? matchingSuperheroes.slice(0, n) : matchingSuperheroes;

    res.json(result);
  }
});


const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ superheroLists: {} }).write();


app.post('/api/lists/:listName', (req, res) => {
    const listName = req.params.listName;
  

    if (db.get(`superheroLists.${listName}`).value()) {

      res.status(400).json({ error: `List with name '${listName}' already exists` });
    } else {

      db.set(`superheroLists.${listName}`, []).write();
      res.json({ message: `Superhero list '${listName}' created successfully` });
    }
  });




app.listen(port, () => { //starts the server and listens on port 3000
    console.log(`Server is running on port ${port}`);
  });
