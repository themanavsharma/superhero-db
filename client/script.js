//function to get suphero info based on superhero ID input
async function getSuperheroInfo() {

    const superheroId = document.getElementById('superheroId').value; // gets superhero ID from the input field
  
    try {
      const response = await fetch(`http://localhost:3000/api/superhero/${superheroId}`); // fetches superhero info from server based on ID
      const superhero = await response.json(); 
  
      document.getElementById('superheroInfo').innerHTML = JSON.stringify(superhero, null, 2);

    } catch (error) {
      console.log('Error getting the superhero information:', error); // logs an error if it can't get the superhero info
    }
  }

//function to get suphero powers based on superhero ID input
async function getSuperheroPowers() {

    const superheroId = document.getElementById('superheroId').value; // gets superhero ID from the input field
  
    try {
      const response = await fetch(`http://localhost:3000/api/superhero/${superheroId}/powers`); // fetches superhero info from server based on ID
      const superhero = await response.json(); 
  
      document.getElementById('superheroInfo').innerHTML = JSON.stringify(superhero, null, 2);

    } catch (error) {
      console.log('Error getting the superhero information:', error); // logs an error if it can't get the superhero info
    }
  }