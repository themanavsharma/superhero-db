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


async function searchSuperheroes() {

    const field = document.getElementById('fieldDropdown').value.toLowerCase();
    const pattern = document.getElementById('patternInput').value;
    const n = document.getElementById('resultsInput').value;

    try {
        const response = await fetch(`http://localhost:3000/api/${field}/${pattern}/${n}`);
        const data = await response.json();

        if (response.ok) {
      
            console.log('Search results:', data);
            document.getElementById('superheroInfo').innerHTML = JSON.stringify(data, null, 2);

        } else {
       
            console.error('Error searching superheroes:', data.error);
        }
    } catch (error) {

        console.error('Unexpected error:', error);
    }
}

async function createList() {
  const listName = document.getElementById('listNameInput').value;

  if (!listName) {
    alert('Please enter a list name.');
    return;
  }

  try {
    const response = await fetch(`/api/lists/${listName}`, {
      method: 'POST',
    });

    if (response.ok) {
      alert(`List '${listName}' created successfully`);
    } else {
      const data = await response.json();
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the list.');
  }
}

async function addToSuperheroList() {
  const listName = document.getElementById('addToListNameInput').value;
  const superheroIds = document.getElementById('superheroIdsInput').value;

  try {
      const response = await fetch(`http://localhost:3000/api/lists/${listName}/${superheroIds}`, {
          method: 'POST',
      });

      const data = await response.json();
      alert(data.message);
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
}


