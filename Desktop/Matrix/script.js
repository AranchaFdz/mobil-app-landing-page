const searchBtn = document.getElementById('search-btn');
const beerList = document.getElementById('beer');
const beerDetailsContent = document.querySelector('.details-content');
const closeBtn = document.getElementById('close-btn');

searchBtn.addEventListener('click', getBeerList);
beerList.addEventListener('click', getBeerDetailsContent);
closeBtn.addEventListener('click', () => {
  beerDetailsContent.classList.remove(beerDetailsContent);
});

function getBeerList() {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://api.punkapi.com/v2/beers?food=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data && data.length) {
        data.forEach(beer => {
          html += `
            <div class="item" data-id="${beer.id}">
              <div class="img">
                <img src="${beer.image_url}" width="50" height="250" alt="beer">
              </div>
              <div class="name">
                <h3>${beer.name}</h3>
              </div>
              <div class = "instruct">
              <h3>Best food to combine:</h3>
              <p>${beer.food_pairing}</p>
            </div>
            </div>
          `; 
        });
        beerList.classList.remove('notFound');
      } else {
        html = "No beers found";
        beerList.classList.add('notFound')
      }
      beerList.innerHTML = html;
    });
}










