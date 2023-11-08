const express = require('express');
const fs = require('fs');
const port = 3000;
const path = require('path');

const app = express();



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


