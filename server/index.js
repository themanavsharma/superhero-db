const express = require('express');
const fs = require('fs');
const port = 3000;
const path = require('path');

const app = express();

const data = fs.readFileSync(path.join(__dirname, 'superhero_info.json'), 'utf-8'); // reads superhero data from the json file
const superheroInfoData = JSON.parse(data); // converts the json data into a js object

// gets the superhero information by ID
app.get('/api/superhero/:id', (req, res) => {
   
    const superheroId = parseInt(req.params.id); // gets the superhero ID from the url
    const superhero = superheroInfoData.find((hero) => hero.id === superheroId); // finds superhero in the array based on ID
  
    if (!superhero) { // return a 404 erroe if the superhero is not found
      return res.status(404).json({ error: 'Superhero not found' });
    }

    res.json(superhero); // send the superhero info as a json in the response

  });

