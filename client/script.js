async function getSuperheroInfo() {
    const superheroId = document.getElementById('superheroId').value;
  
    try {
      const response = await fetch(`http://localhost:3000/api/superhero/${superheroId}`);
      const superhero = await response.json();
  
      document.getElementById('superheroInfo').innerHTML = JSON.stringify(superhero, null, 2);
    } catch (error) {
      console.error('Error fetching superhero information:', error);
    }
  }