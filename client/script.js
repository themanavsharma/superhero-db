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

// function to search superheroes based on specified criteria
async function searchSuperheroes() {

    const field = document.getElementById('fieldDropdown').value.toLowerCase();
    const pattern = document.getElementById('patternInput').value;
    const n = document.getElementById('resultsInput').value;

    try {
        const response = await fetch(`http://localhost:3000/api/${field}/${pattern}/${n}`);
        const superheroes = await response.json();

        if (response.ok) {
      
            console.log('Search results:', superheroes); // logs the search results
            document.getElementById('superheroInfo').innerHTML = JSON.stringify(superheroes, null, 2);

        } else {
       
            console.log('Error searching superheroes:', superheroes.error);
        }
    } catch (error) {

        console.log('Unexpected error:', error);
    }
}

// function to create a superhero list
async function createList() {
  const listName = document.getElementById('listNameInput').value;

  if (!listName) {
    alert('Please enter a list name.');
    return;
  }
  try {
    const response = await fetch(`/api/lists/${encodeURIComponent(listName)}`, {
      method: 'POST',
    });

    if (response.ok) {
      alert(`List ${listName} created successfully`);
    } else {
      const data = await response.json();
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred while creating the list.');
  }
}


// function to add superheroes to a list
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

// function to view superhero IDs in a list
async function viewSuperheroIDs() {
  const listName = document.getElementById('viewIDsListName').value;
  const superheroInfoContainer = document.getElementById('superheroInfo');

  try {
    const response = await fetch(`/api/lists/${listName}/superheroes`);
    const data = await response.json();

    if (response.ok) {
      superheroInfoContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } else {
      alert(`Error: ${errorMessage}`)
    }
  } catch (error) {
    console.log('Error fetching the superhero IDs:', error);
    alert(`Error: ${errorMessage}`)
  }
}

// function to delete a superhero list
async function deleteSuperheroList() {
  const listName = document.getElementById('deleteListName').value;

  try {
    const response = await fetch(`http://localhost:3000/api/lists/${encodeURIComponent(listName)}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    //document.getElementById('superheroInfo').innerHTML = JSON.stringify(result, null, 2);
    if(response.ok){
      alert(`Super hero list ${listName} successfully deleted`)
    }
  } catch (error) {
    console.log('Error deleting the superhero list:', error);
  }
}

// function to view detailed information for a superhero list
async function viewListInfo() {
  const listName = document.getElementById('viewListInfoInput').value;
  const superheroInfoContainer = document.getElementById('superheroInfo');

  try {
    const response = await fetch(`http://localhost:3000/api/lists/${listName}/superheroes/details`);
    const data = await response.json();

    if (response.ok) {
      superheroInfoContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } else {
      superheroInfoContainer.innerHTML = `<p>Error: ${data.error}</p>`;
    }
  } catch (error) {
    console.log('Error fetching list information:', error);
  }
}






