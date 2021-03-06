# STREAM IT
Asynchronous API Client-Side Capstone Project from [Thinkful's](https://www.thinkful.com/) fullstack web development program. 

## Project Requirements
* The app should do something interesting: The overarching UX (user experience) requirement for this app is that it pulls in data from a third party API and displays that data in some way to your user. It's up to you to figure out how to make this experience feel compelling to the user, and who it is that you want to make something interesting for.
* Polished appearance for final version: Initially, you'll implement a minimal, functional prototype of your app, which you'll use to get feedback on your app's features. While the first version should not be polished, the final version you submit should be. We'll go into greater detail about what this means in the assignment dedicated to styling your app.
* Responsive: The final version of your app should work on both mobile and desktop.

## Screenshots
![Home Page](./working-screenshots/home-page-alien-search-compressor.png?raw=true "Home Page")

![Alien search results](./working-screenshots/alien-query-compressor.png?raw=true "Alien search results")

![Alien Detail Page](./working-screenshots/alien-detail-page-with-similar-carousel-compressor.png?raw=true "Alien Detial Page")

![Silicon Valley Detail Page](./working-screenshots/silicon-valley-detail-page-compressor.png?raw=true "Silicon Valley Detial Page")

![Popular Page](./working-screenshots/popular-movies-compressor.png?raw=true "Popular Page")

![Discover Content Page](./working-screenshots/discover-content-compressor.png?raw=true "Discover Content Page")

## Live [DEMO](https://schmerb.github.io/stream-it/)

## Description
Stream It is a search engine for users to find out exactly where and for how much they can currently stream a movie or tv show and view ratings as well as other useful information. It makes the process of searching for titles across multiple streaming platforms as easy as a few clicks. Provides lists of popular movies and tv shows and a discover content section to browse movies by genre as well as suggestions for similar movies and tv shows. Currently leverages about 340 sources.

## Built With
* Production
  * HTML5 
  * CSS3
  * JavaScript
  * jQuery
    * [Slick](http://kenwheeler.github.io/slick/) - Responsive carousel jQuery plugin
* Development
  * [Gulp](https://gulpjs.com/)
    * Task manager, build step
  * [Browsersync](https://www.browsersync.io/)
    * Automation tool to make the development process faster. 
    * Allows for multiple screens to reload live and all interactions are in synchronization, mirroring actions across every browser on any device located on local network.
  * [Browserify](http://browserify.org/)
    * npm module support for browser
  * [Babel](https://babeljs.io/) 
    * ES6 support for older environments (IE8 etc)

## Notes
* Responsive, mobile first design strategy 
* Specifies hash URL endpoints to retain state of app on page refresh for all views.
  * Utilizes session storage to serialize and store data currently displayed in Slick carousel(s) to save detail page context on page refresh.
* APIs
  * Search powered by The Movie DB (TMDb) API
  * Ratings (IMDB etc..) and metadata from The Open Movie Database (OMDB) API
  * Trailers are fetched from the YouTube API
  * Streaming options / links powered by the GuideBox API
 
