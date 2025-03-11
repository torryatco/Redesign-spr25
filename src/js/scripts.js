// store the link plus the API key in a variable
const key = "oaYKxOcZGSOFnkfg6AXbkpNBhsGsDfv9";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;
const storagePrefix = "nyt-autosave";

function getStories() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
    <img src="${story.multimedia ? story.multimedia[2].url : ""}" alt="${
        story.multimedia ? story.multimedia[2]?.caption : ""
      }" />
    <figcaption>${
      story.multimedia ? story.multimedia[2]?.caption : ""
    }</figcaption>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;

  sessionStorage.setItem(storagePrefix, looped);
}

// if (document.querySelector(".home")) {
//   getStories();
// }

if (document.querySelector(".home")) {
  var saved = sessionStorage.getItem(storagePrefix);
  if (saved) {
    console.log("loading from sessionStorage");
    document.querySelector(".stories").innerHTML = saved;
  } else {
    console.log("fetching from nytimes");
    getStories();
  }
}

document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  console.log(event.target);
  if (event.target.matches("#pull")) {
    document.querySelector("body").classList.toggle("show-nav");
    event.preventDefault();
  }
  // event.preventDefault();
}