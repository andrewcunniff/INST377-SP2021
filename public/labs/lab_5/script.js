function mapInit() {
  let mymap = L.map('mapid').setView([38.9, -76.73], 8);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const restaurants = await request.json();
  const search = document.querySelector("#search");
  const suggestions = document.querySelector(".suggestions");
  const button = document.querySelector("button")
  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
      const regex = new RegExp(wordToMatch, "gi");
      return place.zip.match(regex);
    });
  }
  function displayMatch() {
    const matchArray = findMatches(event.target.value, restaurants);
    for (i = 0; i < 5; i++) {
      let temp = matchArray[i];
      console.log(temp.geocoded_column_1.coordinates.reverse());
      let marker = L.marker(temp.geocoded_column_1).addTo(mapObjectFromFunction);
    }
    const html = matchArray
      .map(place => {
        console.log(place);
        return `
            <li>
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <p class="title">${place.name}</p> 
                    <p class="subtitle">${place.category}</p>
                    <p class="address">${place.address_line_1}, ${place.city}, ${place.zip}</p>
                  </div>
                </div>
              </div>
            </li> `;
      })
      .join("");
    suggestions.innerHTML = html;
  }
  console.log(search)
  
  button.addEventListener("click", async event => {
    displayMatch(event);
  });

  search.addEventListener("change", displayMatch);

  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
