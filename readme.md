# Redesign

Log in to Github and create an empty repo called components.

** Download the zip file **

- [Redesign](#redesign)
  - [Homework](#homework)
  - [Reading](#reading)
  - [Exercise - A Site Redesign](#exercise---a-site-redesign)
  - [GIT](#git)
  - [Deployment](#deployment)
  - [Setup and Navigation](#setup-and-navigation)
  - [Header](#header)
  - [SASS](#sass)
    - [Aside: Using Live SASS Compiler in VS Code](#aside-using-live-sass-compiler-in-vs-code)
    - [Nesting SASS](#nesting-sass)
    - [Media Query - Mobile First](#media-query---mobile-first)
    - [Variables](#variables)
  - [Responsive Main Nav](#responsive-main-nav)
    - [Show/Hide Nav](#showhide-nav)
    - [Large Screen](#large-screen)
  - [Video Component](#video-component)
    - [Getting and Setting HTML Attributes](#getting-and-setting-html-attributes)
    - [Updating the Video](#updating-the-video)
    - [Thinning the Templates](#thinning-the-templates)
    - [Final trim](#final-trim)
  - [Images Carousel](#images-carousel)
    - [Content Slider](#content-slider)
  - [Notes](#notes)

## Homework

Prepare your final project.

Your final project will be a static portfolio site generated using 11ty. You can use the JAMStack exercise as a foundation. I fully expect your project to be a work in progress therefore unfinished or partial projects are acceptable. However, it should include:

- CSS (SASS is encouraged but not required)
- DOM scripting - of any sort
- A profile built from data in your Github profile using Fetch and the Github API, e.g. `https://api.github.com/users/DannyBoyNYC`
- Responsive design

Note: if you have another project in mind feel free to let me know.

## Reading

- [Using Git, Github and 11ty](https://youtu.be/PqlhYVqLDm0) together to create a simple site.
- Also [Oh Shit Git](https://ohshitgit.com)
- and don't forget the [11ty](https://www.11ty.io/docs/templates/) documentation

## Exercise - A Site Redesign

Our hypothetical company has a site the looks outdated, is not responsive and needs to be broken up into multiple pages.

[Here](http://oit2.scps.nyu.edu/~devereld/session8/app/) is what their site looks like.

![site](ignore/other/wide.png)

We will be using many of the files and techniques we looked at last week. Before beginning, examine the changes.

- .gitignore - now includes the `_site` directory
- pages - instead of posts we now have a pages collection
- components - inside the `_includes` directory - breaking down a site into smaller parts is a key skill
- layouts - our `layout.html` file now references the components above via `include`
- .eleventyignore - instructs 11ty to not process `readme.md` (this file - for abvious reasons) and anything in the ignore directory (for convenience)
- static directory - reorganized assets
- .eleventy.js - passthroughs for images, JS and CSS in the static directory
- scripts.js - removed dependency on pressing a button and call the function directly (produces an error in the console on every page except Blog)
- `home.md` uses a permalink (`/`) in the front matter which means it will not render to its own directory in the \_site folder but will instead render to the top level (i.e. it becomes our main `index.html`)

I have renamed the pages:

- the ajax page is now called Blog
- `pages/blog.html` is the only page that uses a `pageClass: blog` property (which, in turn, works with the template's `<body class="{{ pageClass }}">`)
- there is a new videos page
- the `pages.json` file (formerly `posts.json`) now tags all files in the pages folder as follows:

```js
{
	"layout": "layouts/layout.html",
	"tags": ["pages", "nav"]
}
```

## GIT

Initialize the repository

```sh
$ cd <project directory>
$ git init
$ git add .
$ git commit -m 'Initial commit'
```

Run the project:

```sh
$ npm run eleventy
```

And open the site in Chrome.

Create a new Github repo and add the remote origin to the repo following the instructions on Github.

```sh
$ git add <your repo name as per the instructions on Github>
$ git push -u origin master
```

## Deployment

We'll use [Netlify](https://www.netlify.com/) to put this on the web. Register and/or log in to [app.netlify.com](https://app.netlify.com) and drag and drop the `_site` folder onto the web browser window to upload the contents [live to the web](https://zealous-kilby-113356.netlify.com/).

We can also hook into a Github branch to set up [continuous delpoyment](https://app.netlify.com/start). Here is a [sample](https://agitated-bartik-814348.netlify.com/) with [admin](https://agitated-bartik-814348.netlify.com/admin).

- use the terminal to create and checkout a new branch

```sh
$ git branch dev
$ git checkout dev
```

In the future you will be able to merge your dev branch with the master branch and have your site updated automatically.

Make sure the branch is clean, then checkout the main (master) branch and push to Github. Netlify will take over from there - running the eleventy command to create a `_site` folder and putting that on its CDN.

```sh
$ git add .
$ git commit -m 'commit message'
$ git checkout master
$ git push -u origin master
```

## Setup and Navigation

There is an erro in the console on every page due to the script that bring in content from the New York Times.

We can correct it by making the execution dependant on the pageClass:

```js
// getData();

if (document.querySelector('.blog')) {
  getData();
}
```

Update the [navigation](https://www.11ty.io/docs/) to include an active class using a Liquid `if` statement:

```html
<ul>
  {% for nav in collections.nav %}
  <li class="{% if nav.url == page.url %} active{% endif %}">
    <a href="{{ nav.url | url }}">{{ nav.data.navTitle }}</a>
  </li>
  {%- endfor -%}
</ul>
```

## Header

Add the first component to `layout.js` after the nav include, e.g.:

```
{% include components/nav.html %}
{% include components/header.html %}
```

## SASS

Examine the directories in the ignore directory.

Copy and paste the contents of `styles.css` to `_base.scss`.

Install sass:

```
$ npm i -D sass
```

Note: `i` is short for `install` and `-D` is short for `--save-dev`

Add to scripts:

```js
{
  "name": "eleventy2",
  "version": "1.0.0",
  "description": "## Homework",
  "main": "index.js",
  "scripts": {
    "eleventy": "eleventy --serve",
    "sass": "sass ignore/scss/styles.scss static/css/styles.css --watch --source-map",
    "start": "npm run eleventy & npm run sass"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@11ty/eleventy": "^0.7.1",
    "sass": "^1.17.3"
  }
}
```

CSS minifcation can be added since the `_site` folder is our production version

`"sass": "sass ignore/scss/styles.scss static/css/styles.css --watch --source-map --style=compressed",`

Stop (`ctrl-c`) and restart (`npm start`) the processes.

Call the sass partial from `styles.scss`

```css
@import 'imports/normalize';
@import 'imports/main';
@import 'imports/base';
```

### Aside: Using Live SASS Compiler in VS Code

If you prefer to use the VS Code plugin [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) for VS Code set the _workspace settings_ as shown:

```js
{
  "liveSassCompile.settings.formats": [
      {
          "savePath": "/_site/static/css/",
          "format": "expanded"
      }
  ],
  "liveSassCompile.settings.excludeList": [
      "**/node_modules/**",
      ".vscode/**",
      "**/other/**"
  ]
}
```

Note the `.vscode` directory that is created for per project settings.

See the full [documentation](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md) for settings.

Click the `Watch Sass` button at the bottom of the editor.

Note: since we are compiling the css directly to the `_site` folder, there is no need for the passthrough in `.eleventy.js`.

### Nesting SASS

Add header CSS to a new `_header.scss` file using nesting:

```css
header {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 2rem;
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.5rem;
    text-transform: uppercase;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
  h1 + p {
    padding-top: 1rem;
    border-top: 3px double #dbd1b5;
  }
  p + p {
    font-size: 1rem;
    line-height: 1.1;
    color: #999;
  }
}
```

Compare the resulting css file with the source sass file.

Inspect the header in the developer tools and note that _mapping_ maps the css line numbers to the scss line numbers

### Media Query - Mobile First

Add a media query to hide the header paragraphs on small screens.

Normally this would be written as:

```css
@media (max-width: 780px) {
  header p {
    display: none;
  }
}
```

But because we are nesting we can simply write (in `_header.scss`):

```css
p {
  ... @media (max-width: 780px) {
    display: none;
  }
}
```

Note: this is _not_ a mobile first design pattern. It uses `max-width` to add display attributes to small screens.

Change it to use a `min-width` mobile first design pattern:

```css
p {
  display: none;
  @media (min-width: 780px) {
    display: block;
    font-size: 1.5rem;
    text-transform: uppercase;
    line-height: 1.1;
    margin-bottom: 1rem;
  }
}
```

Git add, commit, merge and push the branch to deploy the changes.

```sh
$ git add .
$ git commit -m 'added header'
$ git status
$ git checkout master
$ git merge dev
$ git push -u origin master
```

### Variables

Create `_variables.scss` in `scss/imports` with:

```
$break-sm: 480px;
$break-med: 768px;
$break-wide: 980px;

$max-width: 980px;

$link: #007eb6;
$hover: #df3030;
$text: #333;
$med-gray: #666;
$light-gray: #ddd;
$dk-yellow: #dbd1b5;
```

Import it into `styles.scss`. Be sure to import it first in order to make the variables available to the subsequent imports.

Apply the color and break point variables to `_header.scss`

```css
header {
  max-width: $max-width;
  margin: 0 auto;
  padding-top: 2rem;
  h1 {
    font-size: 2.5rem;
  }
  p {
    display: none;
    @media (min-width: $break-med) {
      display: block;
      font-size: 1.5rem;
      text-transform: uppercase;
      line-height: 1.1;
      margin-bottom: 1rem;
    }
  }
  h1 + p {
    padding-top: 1rem;
    border-top: 3px double $dk-yellow;
  }
  p + p {
    font-size: 1rem;
    line-height: 1.1;
    color: $med-gray;
  }
}
```

## Responsive Main Nav

Note the link `<a href="#" id="pull"></a>` in the nav.

```html
<nav>
  <a href="#" id="pull"></a>
  <ul>
    ...
  </ul>
</nav>
```

We will use this to show a menu on small screens.

- create a sass partial `_nav.scss`
- import it into `styles.css` with `@import 'imports/nav';`
- IMPORTANT - remove all references to nav in `_base.scss`

Small screen first - show and format the hamburger menu:

```css
#pull {
  display: block;
  background-color: $link;
  height: 32px;
  padding-top: 12px;
  padding-left: 12px;
}

#pull::after {
  content: '';
  background: url(../img/nav-icon.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: cover;
  display: inline-block;
}
```

Format the ul for the small screen:

```css
nav ul {
  /* display: none; */
  list-style: none;
  background-color: $link;
}

nav li:hover:not(.active) {
  background-color: lighten($link, 10%);
}

nav a {
  padding: 1rem;
  color: #fff;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    text-decoration: none;
  }
}

nav .active {
  background-color: darken($link, 10%);
}

nav .active a {
  font-weight: bold;
}
```

### Show/Hide Nav

Add to the top of `static/js/scripts`:

```js
var hamburger = document.querySelector('#pull');
var body = document.querySelector('body');

hamburger.addEventListener('click', showMenu);

function showMenu() {
  body.classList.toggle('show-nav');
  event.preventDefault();
}
```

or, using event delegation:

```js
function clickHandlers() {
  console.log(event.target);
  if (event.target.matches('#pull')) {
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  // event.preventDefault();
}
```

Add a `.show-nav` class to `_nav.scss`:

```css
.show-nav nav ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
}
```

### Large Screen

Add media queries for medium and larger screens

Hide the hamburger on wider screens:

```css
#pull {
  display: block;
  background-color: $link;
  height: 48px;
  padding-top: 12px;
  padding-left: 12px;
  @media (min-width: $break-med) {
    display: none;
  }
}
```

Show the navigation on large screens:

```css
nav ul {
  display: none;
  list-style: none;
  background-color: $link;
  @media (min-width: $break-med) {
    display: flex;
    justify-content: space-around;
    background: $link;
    text-align: center;
  }
}
```

Format the flex children to allow them to grow:

```css
nav li {
  &:hover:not(.active) {
    background-color: lighten($link, 10%);
  }
  @media (min-width: $break-med) {
    flex-grow: 1;
  }
}
```

`flex-grow` allows the li's to expand.

The complex selector with the ampersand compiles to `nav li:hover:not(.active)`. Without the ampersand it compiles to `nav li :hover:not(.active)`. See [CSS Tricks](https://css-tricks.com/the-sass-ampersand/) for more information on the ampersand in SASS.

Check the navigation on both sizes and make adjustments as necessary.

Here is the final `_nav.scss`:

```css
#pull {
  display: block;
  background-color: $link;
  height: 48px;
  padding-top: 12px;
  padding-left: 12px;
  @media (min-width: $break-med) {
    display: none;
  }
}

#pull::after {
  content: '';
  background: url(../img/nav-icon.png) no-repeat;
  width: 22px;
  height: 22px;
  background-size: cover;
  display: inline-block;
}

nav ul {
  display: none;
  list-style: none;
  background-color: $link;
  @media (min-width: $break-med) {
    display: flex;
    justify-content: space-around;
    background: $link;
    text-align: center;
  }
}

nav li {
  &:hover:not(.active) {
    background-color: lighten($link, 10%);
  }
  @media (min-width: $break-med) {
    flex-grow: 1;
  }
}

nav a {
  padding: 1rem;
  color: #fff;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    text-decoration: none;
  }
}

nav .active {
  background-color: darken($link, 10%);
}

nav .active a {
  font-weight: bold;
}

.show-nav nav ul {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
}
```

Make any additional adjustments.

Note: if we were using React or Angular or Vue to make a single page app (SPA) we would have to code the menu to disappear when a selection was made. But because we are actually navigating to a new URL, the menu collapses naturally.

## Video Component

Add the component to `videos.md`

```html
<section>
  {% include components/video.html %}
</section>
```

Examine the component's HTML.

Format the video and buttons in a new `_video.scss`:

```css
.content-video {
  iframe {
    background: #222;
    height: 320px;
  }
  .btn-list {
    padding: 6px;
    display: flex;
    li {
      margin: 1rem;
      a {
        text-decoration: none;
      }
    }
    .active {
      border-radius: 4px;
      background: $link;
      color: #fff;
      padding: 0.5rem;
    }
  }
}
```

In `base`

```css
img,
iframe {
  width: 100%;
}

ul {
  list-style: none;
}
```

Clicking the buttons should reveal a different video.

Create variables and a function:

```js
const videoLinks = document.querySelectorAll('.content-video a');

videoLinks.forEach(videoLink =>
  videoLink.addEventListener('click', function() {
    console.log(event.target);
    event.preventDefault();
  })
);
```

Examine the `videoLinks` nodelist in the console.

Add a `selectVideo` function:

```js
const videoLinks = document.querySelectorAll('.content-video a');
videoLinks.forEach(videoLink =>
  videoLink.addEventListener('click', selectVideo)
);

// for (let i = 0; i < videoLinks.length; i++){
//   videoLinks[i].addEventListener('click', selectVideo)
// }

function selectVideo() {
  console.log(event.target);
  event.preventDefault();
}
```

Note: we are using `forEach` - a method that exists for both nodeLists and Arrays - as a replacement for a traditional for loop (commented out).

Examine the nodelist in the console.

Iterable Nodelists are a relatively new feature in JavaScript.

If you were concerned about compatibility you could create a true Array from a nodelist by declaring a new variable and spreading the contents on the nodeList into it:

`const videoLinksArray = [...videoLinks]`

And operate on that. But the spread operator (`...`) is also a relatively new feature.

For maximum compatibility use `Array.from()`:

`const videoLinks = Array.from(document.querySelectorAll('.content-video a'));`

### Getting and Setting HTML Attributes

Isolate the `href` value using `getAttribute`:

```js
const videoLinks = Array.from(document.querySelectorAll('.content-video a'));

videoLinks.forEach(videoLink =>
  videoLink.addEventListener('click', selectVideo)
);

function selectVideo() {
  const videoToPlay = event.target.getAttribute('href');
  console.log(videoToPlay);
  event.preventDefault();
}
```

### Updating the Video

Add a variable for the iFrame:

`const iFrame = document.querySelector('iframe')`

and set its src attribute:

`iFrame.setAttribute('src', videoToPlay)`:

```js
const iFrame = document.querySelector('iframe'); // NEW
const videoLinks = document.querySelectorAll('.content-video a');

videoLinks.forEach(videoLink =>
  videoLink.addEventListener('click', selectVideo)
);

function selectVideo() {
  const videoToPlay = event.target.getAttribute('href');
  iFrame.setAttribute('src', videoToPlay); // NEW
  console.log(iFrame); // NEW
  event.preventDefault();
}
```

Switch the active class:

```js
const iFrame = document.querySelector('iframe');
const videoLinks = document.querySelectorAll('.content-video a');
videoLinks.forEach(videoLink =>
  videoLink.addEventListener('click', selectVideo)
);

function selectVideo() {
  removeActiveClass(); // NEW
  this.classList.add('active'); // NEW
  const videoToPlay = event.target.getAttribute('href');
  iFrame.setAttribute('src', videoToPlay);
  event.preventDefault();
}

// NEW
function removeActiveClass() {
  videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
}
```

For performance reasons, you also should not loop over each element and attach an even listener to it.

Use event delegation:

```js
function clickHandlers() {
  if (event.target.matches('#pull')) {
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')) {
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  }
}
```

Note: our clickHandlers function is getting out of hand. You could use a separate function to tame it a bit:

```js
function clickHandlers() {
  if (event.target.matches('#pull')) {
    showMenu();
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')) {
    videoSwitch();
    event.preventDefault();
  }
}

var showMenu = function() {
  document.querySelector('body').classList.toggle('show-nav');
};

var videoSwitch = function() {
  const iFrame = document.querySelector('iframe');
  const videoLinks = document.querySelectorAll('.content-video a');
  videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
  event.target.classList.add('active');
  const videoToPlay = event.target.getAttribute('href');
  iFrame.setAttribute('src', videoToPlay);
};
```

<!-- ## Refactoring Components

Suppose we want to remove the video content from all pages except Home and Videos. We also want to add the video section to the video page without the aside.

Split the video.html component into video-article.html and video-aside.html in the components folder.

Create `components/video-article`

```html
<div class="content-video">
  <iframe
    src="https://player.vimeo.com/video/326317981"
    frameborder="0"
    webkitAllowFullScreen
    mozallowfullscreen
    allowfullscreen
  ></iframe>
  <ul class="btn-list">
    <li>
      <a class="active" href="https://player.vimeo.com/video/326317981"
        >Waves</a
      >
    </li>
    <li>
      <a href="https://player.vimeo.com/video/323437908">Gauchos</a>
    </li>
    <li>
      <a href="https://player.vimeo.com/video/315298268">Pueblo Textil</a>
    </li>
  </ul>
</div>
```

Create `components/video-aside`

```html
<h2>Videos About People</h2>
<p>
  <strong>Waves</strong> Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>
<p>
  <strong>Gauchos</strong> Lorem ipsum dolor sit amet, consectetur adipisicing
  elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
<p>
  <strong>True Love in Pueblo Textil</strong> Nine-year-old Maribel explains to
  us how it feels to be stricken with the world's oldest infliction: love.
</p>
```

In `layout.html`, include the two new components using article and aside tags

```html
<section>
  <article>
    {% include components/video-article.html %}
  </article>
  <aside>
    {% include components/video-aside.html %}
  </aside>
</section>
```

-->

Add to base.scss:

```css
section {
  @media (min-width: $break-med) {
    max-width: $max-width;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-column-gap: 1rem;
    padding-top: 2rem;
    article {
      iframe {
        min-height: 300px;
      }
    }
  }
  aside p {
    margin: 1rem 0;
  }
}
```

<!-- We want the video section to appear on only the home page and in the video page.

- Save out two copies of `layout.html` as `layouts/home.html` and `layouts/video.html`
- Use these templates for rendering e.g.:

`pages/home.md`

```yaml
---
layout: layouts/home.html
pageTitle: Home
navTitle: Home
date: 2010-01-01
permalink: /
---

{% for page in collections.pages %}
  <h2><a href="{{ page.url }}">{{ page.data.pageTitle | upcase }}</a></h2>
  <em>{{ page.date | date: "%Y-%m-%d" }}</em>
{% endfor %}
```

and `pages/videos.md`

```yaml
---
layout: layouts/video.html
pageTitle: Videos
navTitle: Videos
date: 2019-01-01
---

## Coming soon.

[Home](/)
```

Now `home.md` and `videos.md` are using the new layouts (layouts vs components).

Remove the article section from `layout.html` so it doesn't render on all pages.

### Thinning the Templates

The `videos.md` markdown file:

```md
---
layout: layouts/video.html
pageTitle: Videos
navTitle: Videos
date: 2019-01-01
---

Insisting that they had taken every measure to keep the message “extra top secret,” the Trump boys reportedly spent Wednesday defending their decision to send Saudi Arabia plans for a cool missile using their personal Etch A Sketch. “We spent, like, a million hours making that rocket look super good, so we had to send it to our friends in Sunny Arabia…

[Home](/)
```

There is a lot of duplication going on. Let's pass the `video.html` template into `layout.html` for processing.

The `video.html` template:

```html
---
layout: layouts/layout.html
---

<section id="videos">
  <article>
    {% include components/video-article.html %}
  </article>
  <aside>
    {% include components/video-aside.html %}
  </aside>
</section>
```

_NOTE_: our ajax file is overwriting the contents of our div and needs a touch up.

Target a div with a class of blog in the JS:

```js
if (document.querySelector('.content .blog')) {
  document.querySelector('.content .blog').innerHTML = looped;
}
```

And apply that class to the blog page file:

```html
---
pageClass: blog
pageTitle: Blog
date: 2019-03-01
navTitle: Blog
---

<div class="blog"></div>
```

Perform the same thinning process for the `home.html` template.

Trim the `home.html` template

```html
---
layout: layouts/layout.html
---

<section id="videos">
  <article>
    {% include components/video-article.html %}
  </article>
  <aside>
    {% include components/video-aside.html %}
  </aside>
</section>

<div class="content">
  <h1>{{ pageTitle }}</h1>

  {{ content }}
</div>
```

### Final trim

New `video-section.html` in components:

```html
<section id="videos">
  <article>
    {% include components/video-article.html %}
  </article>
  <aside>
    {% include components/video-aside.html %}
  </aside>
</section>
```

Then in the `home.html` layout

```html
---
layout: layouts/layout.html
---

{% include components/video-section.html %}

<div class="content">
  <h1>{{ pageTitle }}</h1>

  {{ content }}
</div>
```

Then the `video.html` layout

```html
---
layout: layouts/layout.html
---

{% include components/video-article.html %} {{ content }}
``` -->

## Images Carousel

Add and new layout file `images.html` to layouts

```
---
layout: layouts/layout.html
---

{% include components/images.html %}

{{ content }}
```

In `images.md`

```
---
layout: layouts/images.html
pageTitle: Images
navTitle: Images
date: 2019-02-01
---

[Home](/)
```

Do a DOM review of this section of the page.

In a new `_carousel.scss`:

```css
.secondary aside {
  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    li {
      flex-basis: 28%;
      margin: 2px;
      padding: 4px;
      background-color: #fff;
      border: 1px solid $dk-yellow;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
      }
    }
  }
}
```

Note transition:

```css
li img {
	...
	transition: all 0.2s linear;
	&:hover {
		transform: scale(1.1);
		box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
	}
```

### Content Slider

The large image on the images page

```css
figure {
  position: relative;
  figcaption {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    position: absolute;
    bottom: 0;
  }
}
```

```js
const carouselLinks = document.querySelectorAll('.image-tn a');
const carouselLinksArray = [...carouselLinks];
const carousel = document.querySelector('figure img');

carouselLinksArray.forEach(carouselLink =>
  carouselLink.addEventListener('click', runCarousel)
);

function runCarousel() {
  const imageHref = this.getAttribute('href');
  carousel.setAttribute('src', imageHref);
  event.preventDefault();
}
```

Set the text in the carousel.

Find the appropriate traversal `const titleText = this.firstChild.title`:

```js
function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  console.log(imageHref);
  const titleText = event.target.title;
  console.log(titleText);
  carousel.setAttribute('src', imageHref);
  event.preventDefault();
}
```

Create a pointer to the figcaption in order to manipulate its content:

```js
const carouselPara = document.querySelector('figcaption');
```

Set the innerHTML `carouselPara.innerHTML = titleText` of the paragraph:

```js
function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  console.log(imageHref);
  const titleText = event.target.title;
  console.log(titleText);
  carousel.setAttribute('src', imageHref);
  carouselPara.innerHTML = titleText;
  event.preventDefault();
}
```

Finally, use event delegation:

```js
function clickHandlers() {
  if (event.target.matches('#pull')) {
    showMenu();
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')) {
    videoSwitch();
    event.preventDefault();
  }
  if (event.target.closest('.image-tn a')) {
    runCarousel();
    event.preventDefault();
  }
}
```

```js
// images

function runCarousel() {
  const carousel = document.querySelector('figure img');
  const carouselPara = document.querySelector('figcaption');
  const imageHref = event.target.parentNode.getAttribute('href');
  const titleText = event.target.title;
  carousel.setAttribute('src', imageHref);
  carouselPara.innerHTML = titleText;
  event.preventDefault();
}

// end images
```

## Notes

js ajax and localstorage

At a certain point I had to adjust the js to remove an error.

```
---
pageClass: blog
pageTitle: Blog
date: 2019-03-01
navTitle: Blog
---

<div class="blog"></div>
```

```js
document.addEventListener('click', clickHandlers);

var nyt =
  'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';

function clickHandlers() {
  if (event.target.matches('#pull')) {
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')) {
    const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
    event.preventDefault();
  }
}

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
  if (document.querySelector('.content .blog')) {
    document.querySelector('.content .blog').innerHTML = looped;
  }
};

var getData = function() {
  fetch(nyt)
    .then(response => response.json())
    .then(json => addContent(json));
};

getData();
```
