function clickHandlers() {}

var addContent = function(data) {
  var looped = '';
  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }
  document.querySelector('.content div').innerHTML = looped;
};

var getData = function() {
  fetch(nyt)
    .then(response => response.json())
    .then(json => addContent(json));
};

var nyt =
  'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';

document.addEventListener('click', clickHandlers);

getData();

// if (document.querySelector('.blog')) {
//   getData();
// }
