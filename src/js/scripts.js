var nytAPI =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";

function addContent(data) {
  var looped = "";
  for (i = 0; i < data.results.length; i++) {
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `;
  }
  document.querySelector(".content").innerHTML = looped;
}

function getData() {
  fetch(nytAPI)
    .then((response) => response.json())
    .then((json) => addContent(json));
}

getData();

// if (document.querySelector('.blog')) {
//   getData();
// }
