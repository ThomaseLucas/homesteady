async function getHardinessZone() {
    const zipCode = document.getElementById('zipCode').value;

    //check if the zip code is valid
    if (!zipCode) {
        alert('Zip code is required');
        return;
    }

    const url = `https://phzmapi.org/${zipCode}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching hardiness zone data at: ${zipCode}`);
      }
      const data = await response.json();
      const zone = data.zone;

      fetchPlants(zone);

      //Display the hardiness zone
      document.getElementById('weather-container').innerHTML = `<p>Hardiness Zone: ${zone}</p>`;

    } catch (error) {
      console.error(error);
      document.getElementById('weather-container').innerHTML = `<p>Error fetching hardiness zone data</p>`;
    }
  }

async function fetchPlants(zone) {

  if (!zone) {
    alert('Zone is required');
    return;
  }


  //Fetch plants based on hardiness zone
  const response = await fetch(`/api/plants/get-plants?zone=${zone}`);
  const data = await response.json();

  if (data && data.length > 0) {
    //Render the plant data
    renderPlants(data);
  } else{
    console.log('No plants found for this zone');
  }
}

function renderPlants(plants) {
  const plantList = document.getElementById('plant-list');
  console.log(plants);

  // Clear the existing plant list
  plantList.innerHTML = '';

  plants.forEach(plant => {
    const plantCard = document.createElement('div');
    plantCard.classList.add('plant-card');

    // Create the image element
    const plantImage = plant.default_image ? `<img src="${plant.default_image.regular_url}" alt="${plant.common_name}">` : '<div class="no-image">No Image Available</div>';

    // Add the content to the card
    plantCard.innerHTML = `
      ${plantImage}
      <h4>${plant.common_name}</h4>
      <p>${plant.description || 'No description available'}</p>
      <div class="plant-info">
          <span>Watering: ${plant.watering || 'Unknown'}</span>
          <span>Sunlight: ${plant.sunlight ? plant.sunlight.join(', ') : 'Unknown'}</span>
      </div>
    `;
    
    plantList.appendChild(plantCard);
  });
}
