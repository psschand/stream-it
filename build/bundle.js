(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';var _assign=require('babel-runtime/core-js/object/assign');var _assign2=_interopRequireDefault(_assign);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _values=require('babel-runtime/core-js/object/values');var _values2=_interopRequireDefault(_values);var _extends=_assign2.default||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var state={popularMovies:[],popularTv:[],popularMoviePage:1,popularTvPage:1,searchResults:[],searchPage:1,carouselPosters:[],carouselLabel:'',query:'',displayQuery:false,isMobile:false,count:0,genreLists:{},seasons:{},moviesJson:[]};// Selectors
// Banner
var BANNER='.banner';var TITLE='.title';var DISCOVER='.discover';var SEARCH='.search';var POPULAR='.popular';var POPULAR_TV='.popular-tv-f-nav';var FIXED_CONTAINER='.fixed-container';var FIXED_SEARCH_QUERY='.fixed-search-query';// Mobile Nav 
var BURGER_ANCHOR='#burger-anchor';var MOBILE_MENU='.mobile-menu';var MAIN_NAV='.main-nav';// Main / General
var MAIN='main';var QUERY_INPUT='.query-input';var CONTENT='.content';var MORE_BTN='.js-more-btn';// Popular Page
var POPULAR_PAGE='.popular-content';var POPULAR_MOVIES_TITLE='#popular-movies';var POPULAR_MOVIE_CONTENT='.movie-content';var POPULAR_TV_TITLE='#popular-tv';var POPULAR_TV_CONTENT='.tv-content';var TV_MORE_BTN='.tv-btn';var MOVIES_MORE_BTN='.movies-btn';// Search Page
var NAV_SEARCH_INPUT='#nav-search-input';var NAV_SEARCH_GLASS='.nav-search-glass';var SEARCH_HEADER='.search-header';var SEARCH_RESULTS_CONTENT='.search-results-content';var SEARCH_RESULTS_PAGE='.search-results-page';var SEARCH_FORM='.search-form';var MAIN_INPUT='#main-input';var LOADING='.loading';var USER_QUERY='.user-query';var NO_RESULTS='.no-results';var SEARCH_MORE_BTN='.search-more-btn';// Discover Page
var DISCOVER_CONTAINER='.discover-container';var DISCOVER_CONTENT='.discover-content';var DISCOVER_SLIDER='.discover-slider';var DISCOVER_SLIDE_IMG='.discover-slide-poster img';var DISCOVERY_NAV_GENRE='.genre-f-nav';// Detail Carousel
var POSTER_IMG='.poster-img-wrap img';var DETAIL_PAGE_SLIDER='.js-carousel';var DETAIL_CAROUSEL_LABEL='.detail-carousel-label';var DETAIL_SLIDE='.detail-slide';var DETAIL_SLIDE_IMG='.detail-slide img';// Detail Page
var DETAIL_PAGE='.detail-page';var MOVIE_TITLE='.js-movie-title';var YEAR='.js-year';var RATED='.js-rated';var RUNTIME='.js-runtime';var POSTER_LINK='.js-poster-link';var DETAIL_POSTER='.js-detail-poster';var IMDB_RATING='.imdb-label';var ROTTEN_RATING='.rotten-label';var METACRITIC_RATING='.metacritic-label';var IMDB_LINK='.imdb-link';var ROTTEN_LINK='.rotten-link';// const METACRITIC_LINK = '.imdb-link';
var IMDB='.js-imdb';var ROTTEN='.js-rotten';var METACRITIC='.js-metacritic';var PLOT='.js-plot';var DIRECTOR='.js-director';var DIRECTOR_ITEM='#director-item';var WRITERS='.js-writers';var CAST='.js-cast';var FRAME='.js-frame';var TRAILER_SLIDER='.trailer-slider';var SIMILAR_MOVIES_SLIDER='.js-similar-slider';var SIMILAR_SLIDE_IMG='.similar-slide img';// Streaming Options Carousel
var STREAMING_LINKS_SLIDER='.streaming-links-slider';var STREAMING_LINKS_CONTAINER='.streaming-links-container';var PURCHASE_LINKS='.purchase-links';var SUBSCRIPTION_LINKS='.subscription-links';var TV_LINKS='.tv-links';// TV Detail Page
var TV_CONTAINER='.tv-container';var SEASONS_CONTAINER='.seasons-container';var SEASON_POSTER_CONTAINER='.season-poster-container';var SEASON_POSTER='.season-poster-container img';var SEASON_DETAILS_CONTAINER='.season-details-container';var EPISODE_STILL='.episode-still-container img';// ================================================================================
// Displays
// ================================================================================
//  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
var widths=["w92","w154","w185","w342","w500","w780","original"];var img_width=widths[2];var IMG_BASE_URL='https://image.tmdb.org/t/p';// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for poster
// * * * * * * * * * * * * * * * * * * * * * * * * *
function posterTemplate(poster){var isTvShow=poster.hasOwnProperty('first_air_date');var overview=poster.overview.replace(/["]/g,"'");var release_date=isTvShow?poster.first_air_date:poster.release_date;var title=isTvShow?poster.name:poster.title;return'<div class="'+(isTvShow?'tv':'')+' poster">\n                <div class="poster-big-img-wrap poster-img-wrap">\n                    '+getPosterImgTemplate(poster)+'\n                </div>\n                <div class="poster-overlay" data-id="'+poster.id+'" data-tv="'+isTvShow+'">\n                    <span class="view-detail">View Details</span>\n                </div>\n                <label for="'+poster.id+'" class="poster-label">\n                    <span class="poster-title">'+title+'</span>\n                    <span>'+release_date.slice(0,4)+'</span>\n                </label> \n            </div>';}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for just the poster img 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getPosterImgTemplate(poster){var isTvShow=poster.hasOwnProperty('first_air_date');var overview=poster.overview.replace(/["]/g,"'");var release_date=isTvShow?poster.first_air_date:poster.release_date;var title=isTvShow?poster.name:poster.title;return'<img src="'+IMG_BASE_URL+'/'+img_width+'/'+poster.poster_path+'" \n                 alt="Poster image for '+title+'."\n                 id="'+poster.id+'"\n                 data-tv="'+isTvShow+'" \n                 data-title="'+title+'"\n                 data-id="'+poster.id+'"\n                 data-overview="'+overview+'"\n                 data-release-date="'+release_date+'"\n                 data-backdrop="'+poster.backdrop_path+'"\n            >';}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Returns template for carousel posters
// * * * * * * * * * * * * * * * * * * * * * * * * *
function carouselSlideTemplate(poster,className){var isTvShow=poster.hasOwnProperty('first_air_date');var title=isTvShow?poster.name:poster.title;return'<div class="'+className+' '+(isTvShow?'tv':'')+'">\n                <img src="'+IMG_BASE_URL+'/w92/'+poster.poster_path+'"\n                     alt="Poster for '+title+'"\n                     data-id="'+poster.id+'"\n                     data-tv="'+isTvShow+'"\n                     data-title="'+title+'"\n                >\n            </div>';}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular movie posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularMovies(){var movies=state.popularMovies.map(function(movie){return posterTemplate(movie);});$(POPULAR_MOVIE_CONTENT).append(movies.slice(-20).join(''));}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays popular tv show posters to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayPopularTv(){var shows=state.popularTv.map(function(show){return posterTemplate(show);});$(POPULAR_TV_CONTENT).append(shows.slice(-20).join(''));}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Display detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailPage(tmdb,imdb){var type=imdb.Type=='movie'?'movie':'tv';// checks if movie or tv show
window.location='#detail/'+type+'/'+imdb.imdbID;// Sets url for detail page
// console.log('tmdb', tmdb, 'imdb', imdb);
// console.log(tmdb, imdb);
// Poster container 
// metadata -- numerical 
$(MOVIE_TITLE).text(imdb.Title);$(YEAR).text(imdb.Year);$(RATED).text(imdb.Rated);$(RUNTIME).text(imdb.Runtime);$(POSTER_LINK).attr('href',tmdb.homepage);$(DETAIL_POSTER).attr('src',IMG_BASE_URL+'/w342/'+tmdb.poster_path);// Ratings
var imdb_rating=void 0,rotten_rating=void 0,meta_rating=false;imdb.Ratings.forEach(function(rating){if(rating.Source=='Internet Movie Database'){imdb_rating=true;// exists
$(IMDB_LINK).attr('href','http://www.imdb.com/title/'+imdb.imdbID);$(IMDB).text(rating.Value);}else if(rating.Source=='Rotten Tomatoes'){rotten_rating=true;// exists
var url=imdb.tomatoURL;if(url&&url.length>0){$(ROTTEN_LINK).attr('href',url);}$(ROTTEN).text(rating.Value);}else if(rating.Source=='Metacritic'){meta_rating=true;// exists
$(METACRITIC).text(rating.Value);}});imdb_rating?$(IMDB_RATING).show():$(IMDB_RATING).hide();rotten_rating?$(ROTTEN_RATING).show():$(ROTTEN_RATING).hide();meta_rating?$(METACRITIC_RATING).show():$(METACRITIC_RATING).hide();// metadata -- crew
$(PLOT).text(tmdb.overview);$(DIRECTOR).text(imdb.Director);$(WRITERS).text(imdb.Writer);$(CAST).text(imdb.Actors);type=imdb.Type;if(type=='movie'){$(DIRECTOR_ITEM).show();}else if(type=='series'){$(DIRECTOR_ITEM).hide();displaySeasonPosters(tmdb);}}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays show seasons posters to detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySeasonPosters(tmdb){hide(STREAMING_LINKS_CONTAINER);show(TV_CONTAINER);var seasonPosters=tmdb.seasons.map(function(season,index){if(season.poster_path==null){return'';}return'<div class="season-poster-container">\n                        <img src="'+IMG_BASE_URL+'/w92/'+season.poster_path+'"\n                             alt="poster for '+tmdb.name+' season '+season.season_number+'"\n                             id="'+season.id+'"\n                             data-show-id="'+tmdb.id+'"\n                             data-show-name="'+tmdb.name+'"\n                             data-air-date="'+season.air_date+'"\n                             data-episode-count="'+season.episode_count+'"\n                             data-season-number="'+season.season_number+'"  \n                        >\n                        <label class="season-label" for="'+season.id+'">\n                            '+(season.season_number===0?"Special":"Season"+season.season_number)+'\n                        </label> \n                      </div>';});unslick(SEASONS_CONTAINER);$(SEASONS_CONTAINER).empty().append(seasonPosters.join(''));initTvSeasonsSlider();}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays season episodes to detail page
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySeasonDetails(season){show('.detail-hr');var episodeStills=season.episodes.map(function(episode){return'<div class="episode-still-container">\n                    <img src="'+IMG_BASE_URL+'/w154/'+episode.still_path+'"\n                         alt="Still image for episode '+episode.episode_number+'"\n                         id="'+episode.episode_number+'"\n                         data-season="'+season.season_number+'"\n                         data-episode-name="'+episode.name+'"\n                         data-episode-number="'+episode.episode_number+'"\n                         data-episode-overview="'+episode.overview+'"\n                    >\n                    <label for="'+episode.episode_number+'">\n                        <span class="episode-number">Ep. '+episode.episode_number+'</span>\n                        <span class="episode-name">'+episode.name+'</span>\n                    </label>\n\n                </div>';});$(SEASON_DETAILS_CONTAINER).empty().append('<h3>Season '+season.season_number+'</h3>');$(SEASON_DETAILS_CONTAINER).append(episodeStills.join(''));$(SEASON_DETAILS_CONTAINER).append('<hr class="shadow-hr">');}function displayEpisodeStreamLinks(season,ep){var episode=state.seasons['season_'+season]['ep_'+ep];if(episode){displayStreamingLinks(episode,true);}}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  checks if source data for movie exists. 
//  displays sources if exist, error message
//  otherwise
// * * * * * * * * * * * * * * * * * * * * * * * * *
function streamLinkHandler(imdb){var movie=sources[imdb];if(movie!==undefined){displayStreamingLinks(movie);}else{// display message that data does not exist
displayNoDataMessage();}}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  displays Guidebox end of service message
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayNoDataMessage(){var msg='Sorry, Guidebox API is no longer servicing this website. No source(s) data on file for this movie.';$(STREAMING_LINKS_CONTAINER).html('<div class="no-data-msg">\n                                        <p>'+msg+'</p>\n                                       </div>');}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays the different streaming options
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayStreamingLinks(guidebox){var isTvShow=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;// Streaming links data -- GUIDEBOX DATA
$(STREAMING_LINKS_CONTAINER).empty();if(!isTvShow){hide(TV_CONTAINER);$(STREAMING_LINKS_CONTAINER).removeClass('tv-sources');}else{$(STREAMING_LINKS_CONTAINER).append('<hr class="shadow-hr">\n                                            <h3>Episode '+guidebox.episode_number+' Stream Links</h3>').addClass('tv-sources');}show(STREAMING_LINKS_CONTAINER);var movie=guidebox;// GUIDEBOX
var hasSource=false;if(movie.in_theaters){if(movie.other_sources.movie_theater){$(STREAMING_LINKS_CONTAINER).append('<div id="theater-source-container">\n                                                    <h3>STILL IN THEATERS</h3>\n                                                    <h4>Grab Tickets</h4>\n                                                    '+getTheaterSources(movie)+'\n                                                </div>');hasSource=true;}}var respData=guidebox;// GUIDEBOX 
var purch_srcs=respData.purchase_web_sources;var sub_srcs=respData.subscription_web_sources;var tv_srcs=respData.tv_everywhere_web_sources;var free_srcs=respData.free_web_sources;if(purch_srcs.length){var purch_slides=getSources(purch_srcs,'purchase');var purch_slider='<label for="purch-links">Buy / Rent</label>\n                            <ul id="purch-links" class="purchase-links streaming-links-slider">\n                                '+purch_slides.join('')+'\n                            </ul>';$(STREAMING_LINKS_CONTAINER).append(purch_slider);hasSource=true;}if(sub_srcs.length){var sub_slides=getSources(sub_srcs,'subscription');var sub_slider='<label for="sub-links">Subscription</label>\n                          <ul id="sub-links" class="subscription-links streaming-links-slider">\n                                '+sub_slides.join('')+'\n                          </ul>';$(STREAMING_LINKS_CONTAINER).append(sub_slider);hasSource=true;}if(tv_srcs.length){var tv_slides=getSources(tv_srcs,'tv');var tv_slider='<label for="tv-links">TV Everywhere</label>\n                          <ul id="tv-links" class="TV-links streaming-links-slider">\n                                '+tv_slides.join('')+'\n                          </ul>';$(STREAMING_LINKS_CONTAINER).append(tv_slider);hasSource=true;}if(free_srcs.length){var free_slides=getSources(free_srcs,'free');var free_slider='<label for="free-links">Free</label>\n                          <ul id="free-links" class="free-links streaming-links-slider">\n                                '+free_slides.join('')+'\n                          </ul>';$(STREAMING_LINKS_CONTAINER).append(free_slider);hasSource=true;}if(hasSource){$(STREAMING_LINKS_CONTAINER).append('<hr class="shadow-hr">');}isTvShow?initTvStreamLinksSlider():initStreamingLinksSlider();// init slick slider
}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates slides for each source for the 
//  given source type (purchase/subscription/TV/free)
//  @return     Returns an array of source slides 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getSources(sources,src_type){return sources.map(function(src){var hd_buy=void 0;var hd_rent=void 0;var sd_buy=void 0;var sd_rent=void 0;if(src.hasOwnProperty('formats')){src.formats.forEach(function(format){if(format.format=='HD'&&format.type=='purchase'){hd_buy=format.price;}else if(format.format=='HD'&&format.type=='rent'){hd_rent=format.price;}else if(format.format=='SD'&&format.type=='purchase'){sd_buy=format.price;}else if(format.format=='SD'&&format.type=='rent'){sd_rent=format.price;}});}var baseSource=src.source.substr(0,src.source.indexOf('_'));var iconSrc=icons[baseSource]?icons[baseSource]:icons[src.source];var slide='<li class="source-slide">\n                                <a href="'+src.link+'" target="__blank">\n                                    <img id="'+src.source+'" class="icon" src="'+iconSrc+'">\n                                \n                                    <label for="'+src.source+'">'+src.display_name+'<label>';// purchase sources
if(src_type=='purchase'){slide+='<ul class="purchase-options-list">\n                                    <li> \n                                        <dl class="prices">\n                                            <dt>Buy</dt>\n                                            <dd><span class="definition-span">HD</span>'+(hd_buy?hd_buy:' -')+'</dd>\n                                            <dd><span class="definition-span">SD</span>'+(sd_buy?sd_buy:' -')+'</dd>\n                                        </dl>\n                                    </li>\n                                    <li>  \n                                        <dl class="prices">\n                                            <dt>Rent</dt>\n                                            <dd><span class="definition-span">HD</span>'+(hd_rent?hd_rent:' -')+'</dd>\n                                            <dd><span class="definition-span">SD</span>'+(sd_rent?sd_rent:' -')+'</dd>\n                                        </dl>\n                                    </li>\n                                </ul>';// subscription sources
}else if(src_type=='subscription'){slide+='<span class="package-price">'+(package_prices[baseSource]?package_prices[baseSource]:package_prices[src.source])+' / month</span>';// tv sources
}else if(src_type=='tv'){slide+='<span class="package-price">Included with '+src.tv_channel+'</span>';}else if(src_type=='free'){slide+='<span class="package-price">FREE</span>';}slide+='</a></li>';return slide;});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates slides for each theater source
//  @return     Returns an array of theater sources
// * * * * * * * * * * * * * * * * * * * * * * * * *
function getTheaterSources(sources){return sources.other_sources.movie_theater.map(function(src){return'<div class="theater-source">\n                            <a href="'+src.link+'" target="__blank">\n                                <img id="'+src.source+'" class="icon" src="'+icons[src.source]+'">\n                            </a>\n                            <label for="'+src.source+'">'+src.display_name+'</label>\n                        </div>';});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Displays search results to screen
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySearchResults(resultsFound,posters,page){showSearchPage();if(!resultsFound){show(NO_RESULTS);hide(FIXED_SEARCH_QUERY,USER_QUERY);state.displayQuery=false;}else{show(FIXED_SEARCH_QUERY,USER_QUERY);hide(NO_RESULTS);}hide(LOADING);$(SEARCH_HEADER).text(state.query);if(page<2){$(SEARCH_RESULTS_CONTENT).empty();}$(SEARCH_RESULTS_CONTENT).append(posters.join(''));}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates new banner carousel for detail page 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displayDetailCarousel(){unslick(DETAIL_PAGE_SLIDER);$(DETAIL_PAGE_SLIDER).empty();var slides=state.carouselPosters.map(function(poster){return carouselSlideTemplate(poster,'detail-slide poster-img-wrap');});$(DETAIL_PAGE_SLIDER).html(slides.join(''));//overwrites previous slides
$(DETAIL_CAROUSEL_LABEL).text(state.carouselLabel);initDetailSlider();}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Creates new carousel with similar posters
// * * * * * * * * * * * * * * * * * * * * * * * * *
function displaySimilarCarousel(resp,isTv){var posters=resp.results.map(function(video){return carouselSlideTemplate(video,'similar-slide poster-img-wrap');});unslick(SIMILAR_MOVIES_SLIDER);$(SIMILAR_MOVIES_SLIDER).empty().append(posters.join(''));initSimilarSlider();}// ================================================================================
// Helper Functions
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Resets pages used in API calls for popular
//  content AND hides titles and more buttons
// * * * * * * * * * * * * * * * * * * * * * * * * *
function resetPopularPages(){state.popularMoviePage=1;state.popularTvPage=1;hide(POPULAR_TV_TITLE,POPULAR_MOVIES_TITLE,TV_MORE_BTN,MOVIES_MORE_BTN);}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Resets search page 
// * * * * * * * * * * * * * * * * * * * * * * * * *
function resetSearchPage(){state.displayQuery=false;state.query='';$(USER_QUERY).addClass('hidden');hide(SEARCH_MORE_BTN);$(SEARCH_RESULTS_CONTENT).add(SEARCH_HEADER).empty();}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Adds 'hidden' class to all target elements
//  passed in as arguments
// * * * * * * * * * * * * * * * * * * * * * * * * *
function hide(targets){(0,_values2.default)(arguments).forEach(function(target){$(target).addClass('hidden');});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Removes 'hidden' class to all target elements
//  passed in as arguments
// * * * * * * * * * * * * * * * * * * * * * * * * *
function show(targets){(0,_values2.default)(arguments).forEach(function(target){$(target).removeClass('hidden');});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Discovery page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDiscoverPage(){resetPopularPages();resetSearchPage();hide(SEARCH_RESULTS_PAGE,FIXED_SEARCH_QUERY,POPULAR_PAGE,DETAIL_PAGE);$(MAIN).removeClass('detail-page-main');show(DISCOVER_CONTAINER);}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Popular page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showPopularPage(){resetPopularPages();resetSearchPage();hide(SEARCH_RESULTS_PAGE,FIXED_SEARCH_QUERY,DISCOVER_CONTAINER,DETAIL_PAGE);$(MAIN).removeClass('detail-page-main');show(POPULAR_PAGE);}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays Search Page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showSearchPage(){resetPopularPages();hide(DISCOVER_CONTAINER,DETAIL_PAGE,POPULAR_PAGE);$(MAIN).removeClass('detail-page-main');if(state.query!=''){state.displayQuery=true;}hide(NO_RESULTS);show(SEARCH_RESULTS_PAGE);}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Triggers detail page cleanup and displays detail page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function showDetailPage(initCarousel){resetPopularPages();resetSearchPage();clearDetailPage(initCarousel);hide(SEARCH_RESULTS_PAGE,FIXED_SEARCH_QUERY,POPULAR_PAGE,DISCOVER_CONTAINER);show(DETAIL_PAGE);$(MAIN).addClass('detail-page-main');}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Clears Detail page
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function clearDetailPage(initCarousel){$(MOVIE_TITLE).text('');$(YEAR).text('');$(RATED).text('');$(RUNTIME).text('');$(DETAIL_POSTER).attr('src','');$(SEASONS_CONTAINER).add(SEASON_DETAILS_CONTAINER).empty();unslick(STREAMING_LINKS_SLIDER);// unslicks previous slider(s) if initialized
$(STREAMING_LINKS_CONTAINER).empty();// clears previous slider(s)
$(STREAMING_LINKS_CONTAINER).html('<h2 class="detail-loading">LOADING . . .</h2>');if(initCarousel){unslick(DETAIL_PAGE_SLIDER);$(DETAIL_PAGE_SLIDER).empty();}$(FRAME).removeClass('frame-ready');state.seasons={};}// ================================================================================
// API Handlers
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Popular content API handler
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularHandler(){var target=arguments.length>0&&arguments[0]!==undefined?arguments[0]:MAIN;$(POPULAR_MOVIE_CONTENT).empty();$(POPULAR_TV_CONTENT).empty();$(MAIN_INPUT).val('');showPopularPage();var scrollToTv=false;target==MAIN?smoothScroll(MAIN):null;popularMoviesHandler();popularTvShowsHandler();}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular movies
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularMoviesHandler(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;if(page==1){state.popularMovies=[];}discoverMoviesTMDB(page,function(resp){state.popularMovies=state.popularMovies.concat(resp.results);displayPopularMovies();$(POPULAR_MOVIES_TITLE).show();show(MOVIES_MORE_BTN);});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for popular TV shows
// * * * * * * * * * * * * * * * * * * * * * * * * *
function popularTvShowsHandler(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;if(page==1){state.popularTv=[];}discoverTvTMDB(page,function(resp){state.popularTv=state.popularTv.concat(resp.results);displayPopularTv();$(POPULAR_TV_TITLE).show();show(TV_MORE_BTN);});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handles API call for movie / tv show search
// * * * * * * * * * * * * * * * * * * * * * * * * *
function searchMultiHandler(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;show(LOADING);$(MAIN_INPUT).val('');$(NAV_SEARCH_INPUT).val('');page==1?smoothScroll(MAIN):null;// if new search, scroll to top of search page
searchAllTMDB(state.query,page,function(resp){searchAllTMDB(state.query,page+1,function(resp_p2){if(resp.total_pages==page||resp_p2.total_pages==page+1||resp.total_pages<page||resp_p2.total_pages<page+1){hide(SEARCH_MORE_BTN);}else{show(SEARCH_MORE_BTN);}var results=resp.results.concat(resp_p2.results);var filteredPosters=results.filter(function(result){return result.media_type=='person'?false:true;});state.searchResults=state.searchResults.concat(filteredPosters);setCarouselPosters(state.searchResults,'\''+state.query+'\' Results');var posters=filteredPosters.map(function(result){if(result.poster_path!=null){return posterTemplate(result);}});var resultsFound=results.length;displaySearchResults(resultsFound,posters,page);// Call to display results
});});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for movie detail page. Fetches all 
//  metadata for movies and prepares them to  
//  display to user
// * * * * * * * * * * * * * * * * * * * * * * * * *
function movieDetailPageHandler(poster,initCarousel){smoothScroll(MAIN);getMovieDetailsByIdTMDB(poster.attr('data-id'),function(detail_resp){searchByIdOMDB(detail_resp.imdb_id,function(imdb_resp){showDetailPage(initCarousel);displayDetailPage(detail_resp,imdb_resp);initCarousel?displayDetailCarousel():null;getSimilarMoviesTMDB(poster.attr('data-id'),1,function(resp){displaySimilarCarousel(resp,false);});// call to guidebox for streaming links / prices
var imdb=imdb_resp.imdbID;streamLinkHandler(imdb);// searchByExternalIdGuidebox(imdb_resp.imdbID, 'movie', 'imdb', function(gbox_s_resp) {
//     getMovieGuidebox(gbox_s_resp.id, function(gbox_m_resp) {
//         displayStreamingLinks(gbox_m_resp);
//     });
// });
});getMovieVideosTMDB(detail_resp.id,function(video_resp){trailerHandler(video_resp);});});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for tv detail page. Fetches all 
//  metadata for tv shows and prepares them to 
//  display to user
// * * * * * * * * * * * * * * * * * * * * * * * * *
function tvDetailHandler(poster,initCarousel){smoothScroll(MAIN);getTvDetailsTMDB(poster.attr('data-id'),function(detail_resp){getTVExternalIdsTMDB(detail_resp.id,function(ids_resp){searchByIdOMDB(ids_resp.imdb_id,function(imdb_resp){showDetailPage(initCarousel);displayDetailPage(detail_resp,imdb_resp);// Displays detail page
initCarousel?displayDetailCarousel():null;// inits carousel if needed
getSimilarShowsTMDB(poster.attr('data-id'),function(resp){displaySimilarCarousel(resp,true);});searchByExternalIdGuidebox(imdb_resp.imdbID,'show','imdb',function(gbox_s_resp){getShowGuidebox(gbox_s_resp.id,function(gbox_tv_resp){getAllEpisodesGuidebox(gbox_s_resp.id,function(ep_resp){tvEpisodesHandler(ep_resp,detail_resp.number_of_seasons);});});});});});getTvVideosTMDB(detail_resp.id,function(video_resp){trailerHandler(video_resp);});});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for all episodes for given tv show.
//  Stores all episode objects w/ stream links 
//  for each episode and then displays the 
//  streaming links for the episode chosen by user,
//  if it exists
// * * * * * * * * * * * * * * * * * * * * * * * * *
function tvEpisodesHandler(resp,numSeasons){for(var i=1;i<=numSeasons;i++){state.seasons['season_'+i]={};}resp.results.forEach(function(episode){if(episode.episode_number===0){return;}state.seasons['season_'+episode.season_number]['ep_'+episode.episode_number]=episode;});$('label',SEASON_DETAILS_CONTAINER).each(function(){if($(this).hasClass('highlight')){var $img=$(this).siblings('img');displayEpisodeStreamLinks($img.attr('data-season'),$img.attr('data-episode-number'));}});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for getting details and episodes
//  for a specific season and displaying 
//  the metadata
// * * * * * * * * * * * * * * * * * * * * * * * * *
function seasonHandler(showName,showID,season){getTvSeasonDetailsTMDB(showID,season,function(season_resp){displaySeasonDetails(season_resp);});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for trailers, collects them and creates
//  carousel on detail page with thumbails
// * * * * * * * * * * * * * * * * * * * * * * * * *
function trailerHandler(resp){unslick(TRAILER_SLIDER);$(TRAILER_SLIDER).empty();$(FRAME).attr('src','');var trailers=resp.results.filter(function(trailer){return trailer.type.toLowerCase()=='trailer'&&trailer.site.toLowerCase()=='youtube';});if(trailers.length>0){// let mainTrailer = trailers.find(function(trailer) {
// let name = trailer.name.toLowerCase();
// return name == 'official trailer' 
//         || name == 'official main trailer' 
//         || name == 'main trailer'
//         || name.includes('1')
//         || name.includes('official trailer')
//         || name.includes('official teaser')
//         || name.includes('official')
//         || name.includes('teaser') 
//         || name.includes('trailer');
// });
var mainTrailer=undefined;for(var i=0;i<trailers.length;i++){var trailer=trailers[i];var name=trailer.name.toLowerCase();if(name=='official trailer'||name=='official main trailer'||name=='main trailer'||name.includes('1')||name.includes('official trailer')||name.includes('official teaser')||name.includes('official')||name.includes('teaser')||name.includes('trailer')){mainTrailer=trailer;}}if(!mainTrailer){// if no 'main trailer', use first trailer
mainTrailer=trailers[0];}$(FRAME).attr('src','https://www.youtube.com/embed/'+mainTrailer.key+'?');// makes JSON request for each trailer obj and maps each call to array
var jsonRequests=trailers.map(function(trailer){return searchVideoByIdYoutube(trailer.key,function(youtube_resp){if(youtube_resp.items.length>0){var snippet=youtube_resp.items[0].snippet;var thumbnail=snippet.thumbnails.high.url;var url='https://www.youtube.com/embed/'+youtube_resp.items[0].id;var alt_trailer_thumbnail='<div class="trailer-slide">\n                                                        <img src="'+thumbnail+'" \n                                                            alt="Thumbnail for '+snippet.title+'"\n                                                            data-title="'+snippet.title+'"\n                                                            data-url="'+url+'"\n                                                            data-url-autoplay='+url+'?autoplay=1\n                                                            data-trailer-type="'+trailer.type+'"\n                                                        > \n                                                    </div>';if(trailers.length>1){$(TRAILER_SLIDER).append(alt_trailer_thumbnail);}}});});// waits for array of JSON requests to finish, then executes code block
$.when.apply($,jsonRequests).then(function(){if(trailers.length>1){initTrailerSlider();}$(FRAME).addClass('frame-ready');});}// end if (trailers.length > 0)     
}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Handler for Discover page, makes calls to 
//  fetch movies by genre and appends slick 
//  carousel to page for each genre
// * * * * * * * * * * * * * * * * * * * * * * * * *
//  0  ,  1   ,  2   ,  3   ,  4   ,  5   ,    6
// let widths = ["w92","w154","w185","w342","w500","w780","original"]
function discoverHandler(){var anchor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;$(DISCOVER_CONTENT).empty();$(MAIN_INPUT).val('');showDiscoverPage();$(DISCOVER_CONTAINER).css({'height':'0px','overflow':'hidden'});// Hide content to wait for slick
smoothScroll(MAIN);var jsonRequests=genres.map(function(genre){return discoverMoviesByGenreTMDB(genre.id,1,function(resp){var genreSlides=resp.results.map(function(movie){return'<div class="disc-slide">\n                                <div class="discover-slide-poster poster-img-wrap">\n                                    <img    class="discover-img"\n                                            src="'+IMG_BASE_URL+'/'+widths[0]+'/'+movie.poster_path+'"\n                                            id="'+movie.id+'"\n                                            data-id="'+movie.id+'"\n                                            data-tv="false"\n                                            data-genre="'+genre.name+'"\n                                    >\n                                    <div class="poster-overlay" data-id="'+movie.id+'">\n                                        <span class="view-detail">View Details</span>\n                                    </div>\n                                </div>\n                            </div>';});var sliderTemplate='<div class="discover-wrap" id="'+genre.id+'">\n                                        <h3 class="genre">'+genre.name+'</h3>\n                                        <div class="discover-slider">\n                                            '+genreSlides.join('')+'\n                                        </div>\n                                    </div>';// Uses genre name to dynamically add slider to appropriate container
state.genreLists[genre.name]=resp.results;$(DISCOVER_CONTENT).append(sliderTemplate);});});// Waits until all 'discoverMoviesByGenreTMDB' api requests are 
// successful then triggers callback
$.when.apply($,jsonRequests).then(function(a){initDiscoverySlider();// slider element is created, no need to unslick
if(anchor!=null){smoothScroll('#'+anchor,200,50);}$(DISCOVER_CONTAINER).css({'height':'','overflow':''});// Once slicked, display content
});}// ================================================================================
// Slick Carousels
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Discover by genre carousels
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initDiscoverySlider(){$(DISCOVER_SLIDER).slick({dots:false,arrows:true,infinite:false,speed:300,slidesToShow:8,slidesToScroll:8,variableWidth:true,responsive:[{breakpoint:1024,settings:{slidesToShow:7,slidesToScroll:7,infinite:false,dots:false}},{breakpoint:860,settings:{slidesToShow:6,slidesToScroll:6}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:415,settings:"unslick"// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// detail page carousel navigation
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initDetailSlider(){$(DETAIL_PAGE_SLIDER).slick({dots:false,arrows:true,infinite:false,speed:300,slidesToShow:7,slidesToScroll:7,variableWidth:true,responsive:[{breakpoint:1024,settings:{slidesToShow:6,slidesToScroll:6,infinite:false}},{breakpoint:860,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:415,settings:{arrows:false,slidesToShow:2,slidesToScroll:2}// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// detail page carousel navigation
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initTvSeasonsSlider(){$(SEASONS_CONTAINER).slick({dots:false,arrows:false,infinite:false,speed:300,slidesToShow:3,slidesToScroll:2,variableWidth:true,mobileFirst:true,responsive:[{breakpoint:1024,settings:'unslick'},{breakpoint:860,settings:'unslick'},{breakpoint:600,settings:'unslick'},{breakpoint:415,settings:{arrows:false,slidesToShow:2,slidesToScroll:2}// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// similar movies slider
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initSimilarSlider(){$(SIMILAR_MOVIES_SLIDER).slick({dots:false,arrows:true,infinite:false,speed:300,slidesToShow:7,slidesToScroll:7,variableWidth:true,responsive:[{breakpoint:1024,settings:{slidesToShow:6,slidesToScroll:6,infinite:false}},{breakpoint:860,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:415,settings:{arrows:false,slidesToShow:2,slidesToScroll:2}// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// streaming options carousel
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initStreamingLinksSlider(){$(STREAMING_LINKS_SLIDER).slick({dots:false,arrows:true,infinite:false,speed:300,slidesToShow:4,slidesToScroll:4,variableWidth:true,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:false}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:415,settings:"unslick"// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// streaming options carousel
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initTvStreamLinksSlider(){$(STREAMING_LINKS_SLIDER).slick({dots:false,arrows:true,infinite:false,speed:300,slidesToShow:2,slidesToScroll:2,variableWidth:true,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:2,infinite:false}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:415,settings:"unslick"// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * *
// trailers carousels
// * * * * * * * * * * * * * * * * * * * * * * * * *
function initTrailerSlider(){$(TRAILER_SLIDER).slick({dots:true,arrows:false,infinite:false,speed:300,slidesToShow:3,slidesToScroll:3,variableWidth:true,centerMode:false,focusOnSelect:true,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:false}},{breakpoint:600,settings:{arrows:false,slidesToShow:2,slidesToScroll:2}},{breakpoint:415// settings: "unslick"
// You can unslick at a given breakpoint now by adding:
// settings: "unslick"
// instead of a settings object
}]});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function unslick(SLIDER){if($(SLIDER).hasClass('slick-initialized')){$(SLIDER).slick('unslick');}}// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick(){$(window).resize(function(){var width=parseInt($('body').css('width'));if(!$(DISCOVER_SLIDER).hasClass('slick-initialized')){initDiscoverySlider();}if(!$(STREAMING_LINKS_SLIDER).hasClass('slick-initialized')){initStreamingLinksSlider();}if(!$(DETAIL_PAGE_SLIDER).hasClass('slick-initialized')){initDetailSlider();}if(!$(SEASONS_CONTAINER).hasClass('slick-initialized')){initTvSeasonsSlider();}});}// ================================================================================
// Utilities 
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Helper function to print JSON response data to
// console for debugging
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function printResp(resp){console.log(resp);}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Collapses nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNav(newHeight){$(TITLE).stop().animate({'font-size':'20px',width:'85px'},{duration:100,easing:'linear'});$(BANNER).stop().animate({height:newHeight},{// 48px
duration:100,easing:'linear'});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Expands nav bar to set height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function uncollapseNav(newHeight){$(TITLE).stop().animate({'font-size':'36px',width:'150px'},{duration:100,easing:'linear'});$(BANNER).stop().animate({height:newHeight},{// 100px
duration:100,easing:'linear'});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Fixed nav menu and search bar on page scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixNavOnScroll(){$(window).scroll(function(e){var scroll=$(window).scrollTop();if(scroll>$(MAIN).offset().top){$(FIXED_CONTAINER).addClass('fixed-overlay').addClass('fadein');if(state.displayQuery){show(FIXED_SEARCH_QUERY);}}else if(scroll<=100){$(FIXED_CONTAINER).removeClass('fadeout').removeClass('fadein');}else{$(FIXED_CONTAINER).addClass('fadeout').removeClass('fadein').removeClass('fixed-overlay');hide(FIXED_SEARCH_QUERY);}});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1200;var offset=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;$('body, html').animate({scrollTop:$(target).offset().top-offset},duration);}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler(){$(document).ready(function(){checkSize();$(window).resize(checkSize);});}function checkSize(){parseInt($("body").css('width'))<='414'?state.isMobile=true:state.isMobile=false;}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Handler to collapse and expand nav bar upon scroll. maps
// values to calculate new appropriate height
// Currently -- NOT IN USE
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function collapseNavHandler(){$(window).scroll(function(e){var scroll=$(window).scrollTop();var heightStart=100;var heightEnd=state.isMobile?58:48;var scrollStart=10;var scrollEnd=state.isMobile?75:100;if(scroll>scrollStart&&scroll<=scrollEnd){var newHeight=(scroll-scrollStart)/(scrollEnd-scrollStart)*(heightEnd-heightStart)+heightStart;collapseNav(newHeight+'px');}if(scroll>scrollEnd){collapseNav((state.isMobile?58:48)+'px');}if(scroll<=scrollStart){var _newHeight=(scroll-scrollStart)/(scrollEnd-scrollStart)*(heightEnd-heightStart)+heightStart;if(_newHeight>100){_newHeight=100;}uncollapseNav(_newHeight+'px');}});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Shows (slides) nav search glass input 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function showNavSearchInput(){var width=200;if(parseInt($("body").css('width'))<='450'){width=140;}$(NAV_SEARCH_INPUT).show().animate({width:width},{duration:500,easing:'linear',complete:function complete(){$(NAV_SEARCH_INPUT).focus();}});}// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// Hides (slides) nav search glass input 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function hideNavSearchInput(){$(NAV_SEARCH_INPUT).animate({width:'0'},{duration:300,easing:'linear',complete:function complete(){$(NAV_SEARCH_INPUT).hide();}});}// ================================================================================
// Writing JSON reponse to file
// ================================================================================
var textFile=null,makeTextFile=function makeTextFile(text){var data=new Blob([text],{type:'text/plain'});// If we are replacing a previously generated file we need to
// manually revoke the object URL to avoid memory leaks.
if(textFile!==null){window.URL.revokeObjectURL(textFile);}textFile=window.URL.createObjectURL(data);// returns a URL you can use as a href
return textFile;};// ================================================================================
//    API Calls   ~   TMDB, OMDB, Guidebox
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * //
// Searches YouTube data API by video ID number      
// * * * * * * * * * * * * * * * * * * * * * * * * * //
var YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/';var YOUTUBE_KEY='AIzaSyDgSaSC2elGodMOCAZrZCAsllRP50dy4Xg';var searchVideoByIdYoutube=function searchVideoByIdYoutube(video_ID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var VIDEOS_URL=YOUTUBE_BASE_URL+'videos';var query={key:YOUTUBE_KEY,part:'snippet,contentDetails',id:video_ID};return $.getJSON(VIDEOS_URL,query,callback);};// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  TMDB API calls                                   
// * * * * * * * * * * * * * * * * * * * * * * * * * //
var TMDB_BASE_URL='https://api.themoviedb.org/3';var TMDB_KEY='33e990a96c93fc44034cdc76ec1ec949';// * * * * * * * * * * * * *
//  Search ALL (TMDB)
// * * * * * * * * * * * * *
function searchAllTMDB(searchQuery){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_SEARCH_ALL_URL=TMDB_BASE_URL+'/search/multi';var query={api_key:TMDB_KEY,query:searchQuery,page:page};$.getJSON(TMDB_SEARCH_ALL_URL,query,callback);}// * * * * * * * * * * * * *
//  Movie calls (TMDB)
// * * * * * * * * * * * * *
function searchMovieTMDB(searchQuery){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_SEARCH_MOVIE_URL=TMDB_BASE_URL+'/search/movie';var query={api_key:TMDB_KEY,query:searchQuery,page:page};$.getJSON(TMDB_SEARCH_MOVIE_URL,query,callback);}function findByIdTMDB(id){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_FIND_URL=TMDB_BASE_URL+'/find/'+id;var query={api_key:TMDB_KEY,language:'en-US',external_source:'imdb_id'};$.getJSON(TMDB_FIND_URL,query,callback);}function discoverMoviesTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var filter=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'popularity.desc';var TMDB_DISCOVER_MOVIES_URL=TMDB_BASE_URL+'/discover/movie';var query={api_key:TMDB_KEY,sort_by:filter,page:page};return $.getJSON(TMDB_DISCOVER_MOVIES_URL,query,callback);}function discoverMoviesByGenreTMDB(genreIds){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var filter=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'popularity.desc';var TMDB_DISCOVER_MOVIES_GENRE_URL=TMDB_BASE_URL+'/discover/movie';var query={api_key:TMDB_KEY,with_genres:genreIds,page:page,sort_by:filter};return $.getJSON(TMDB_DISCOVER_MOVIES_GENRE_URL,query,callback);}function getMovieDetailsByIdTMDB(movieId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_GET_MOVIE_URL=TMDB_BASE_URL+'/movie/'+movieId;var query={api_key:TMDB_KEY};$.getJSON(TMDB_GET_MOVIE_URL,query,callback);}function getMovieImagesTMDB(movieId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_MOVIE_IMAGES_URL=TMDB_BASE_URL+'/movie/'+movieId+'/images';var query={api_key:TMDB_KEY};$.getJSON(TMDB_MOVIE_IMAGES_URL,query,callback);}function getMovieVideosTMDB(movieId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_MOVIE_VIDEOS_URL=TMDB_BASE_URL+'/movie/'+movieId+'/videos';var query={api_key:TMDB_KEY};$.getJSON(TMDB_MOVIE_VIDEOS_URL,query,callback);}function getMovieRecommendationsTMDB(movieId){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_MOVIE_RECOMMENDATIONS_URL=TMDB_BASE_URL+'/movie/'+movieId+'/recommendations';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_MOVIE_RECOMMENDATIONS_URL,query,callback);}function getSimilarMoviesTMDB(id){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_SIMILAR_MOVIES_URL=TMDB_BASE_URL+'/movie/'+id+'/similar';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_SIMILAR_MOVIES_URL,query,callback);}function getMoviesNowPlayingTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_MOVIES_NOW_PLAYING_URL=TMDB_BASE_URL+'/movie/now_playing';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_MOVIES_NOW_PLAYING_URL,query,callback);}function getPopularMoviesTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_POPULAR_MOVIES_URL=TMDB_BASE_URL+'/movie/popular';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_POPULAR_MOVIES_URL,query,callback);}function getTopRatedMoviesTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_TOP_RATED_MOVIES_URL=TMDB_BASE_URL+'/movie/top_rated';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_TOP_RATED_MOVIES_URL,query,callback);}function getUpcomingMoviesTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_UPCOMING_MOVIES_URL=TMDB_BASE_URL+'/movie/upcoming';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_UPCOMING_MOVIES_URL,query,callback);}function getListOfGenresTMDB(){var type=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'movie';var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_GENRES_LIST_URL=TMDB_BASE_URL+'/genre/'+type+'/list';var query={api_key:TMDB_KEY};$.getJSON(TMDB_GENRES_LIST_URL,query,callback);}function getMoviesByGenreTMDB(genreId_s){var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_MOVIES_BY_GENRE_URL=TMDB_BASE_URL+'/discover/movie';var query={api_key:TMDB_KEY,sort_by:'popularity.desc',page:page,with_genres:genreId_s// List of genres must be comma separated 
};$.getJSON(TMDB_MOVIES_BY_GENRE_URL,query,callback);}// * * * * * * * * * * * * *
//  TV calls (TMDB)
// * * * * * * * * * * * * *
function discoverTvTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var filter=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'popularity.desc';var TMDB_DISCOVER_TV_URL=TMDB_BASE_URL+'/discover/tv';var query={api_key:TMDB_KEY,sort_by:filter,page:page};return $.getJSON(TMDB_DISCOVER_TV_URL,query,callback);}function getTvDetailsTMDB(tvId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_TV_DETAILS_URL=TMDB_BASE_URL+'/tv/'+tvId;var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_DETAILS_URL,query,callback);}function getTVExternalIdsTMDB(tvId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_TV_EXTERNAL_IDS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/external_ids';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_EXTERNAL_IDS_URL,query,callback);}function getTvVideosTMDB(tvId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_TV_VIDEOS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/videos';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_VIDEOS_URL,query,callback);}function getPopularTv(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_POPULAR_TV_URL=TMDB_BASE_URL+'/tv/popular';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_POPULAR_TV_URL,query,callback);}function getCurrentlyOnAirTvTMDB(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_CURRENT_TV_URL=TMDB_BASE_URL+'/tv/on_the_air';var query={api_key:TMDB_KEY,page:page};$.getJSON(TMDB_CURRENT_TV_URL,query,callback);}function getTvSeasonDetailsTMDB(tvId,seasonNumber){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_TV_SEASON_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber;var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_SEASON_URL,query,callback);}function getTvSeasonExternalIdsTMDB(tvId,seasonNumber){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_TV_SEASON_EXTERNAL_IDS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber+'/external_ids';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_SEASON_EXTERNAL_IDS_URL,query,callback);}function getTvSeasonVideosTMDB(tvId,seasonNumber){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:printResp;var TMDB_TV_SEASON_VIDEOS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber+'/videos';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_SEASON_VIDEOS_URL,query,callback);}function getTvEpisodeDetailsTMDB(tvId,seasonNumber,episodeNumber){var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:printResp;var TMDB_GET_TV_EPISODE_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber+'/episode/'+episodeNumber;var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_EPISODE_URL,query,callback);}function getTvEpisodeExternalIdsTMDB(tvId,seasonNumber,episodeNumber){var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:printResp;var TMDB_GET_TV_EPISODE_EXTERNAL_IDS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber+'/episode/'+episodeNumber+'/external_ids';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_EPISODE_EXTERNAL_IDS_URL,query,callback);}function getTvEpisodeVideosTMDB(tvId,seasonNumber,episodeNumber){var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:printResp;var TMDB_TV_EPISODE_VIDEOS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/season/'+seasonNumber+'/episode/'+episodeNumber+'/videos';var query={api_key:TMDB_KEY};$.getJSON(TMDB_TV_EPISODE_VIDEOS_URL,query,callback);}function getSimilarShowsTMDB(tvId){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var TMDB_SIMILAR_SHOWS_URL=TMDB_BASE_URL+'/tv/'+tvId+'/similar';var query={api_key:TMDB_KEY,page:1};$.getJSON(TMDB_SIMILAR_SHOWS_URL,query,callback);}// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  OMDB API calls                                   
// * * * * * * * * * * * * * * * * * * * * * * * * * //
var OMDB_URL='https://www.omdbapi.com/';var POSTER_OMDB_URL='http://img.omdbapi.com/?i=tt3896198&h=600&apikey=48bffb4a';var OMDB_KEY='48bffb4a';function searchByIdOMDB(id){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var query={i:id,plot:'short',apikey:OMDB_KEY,tomatoes:'True'};$.getJSON(OMDB_URL,query,callback);}function searchCustomOMDB(params){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var query={apikey:OMDB_KEY};_extends(query,params);$.getJSON(OMDB_URL,query,callback);}// * * * * * * * * * * * * * * * * * * * * * * * * * //
//  Guidebox API calls                               
// * * * * * * * * * * * * * * * * * * * * * * * * * //
var GBOX_BASE_URL="https://api-public.guidebox.com/v2";var GUIDEBOX_KEY='db85b00dc1a54c2a02ed61575609802bb3d8c498';function getQuota(){var QUOTA_GUIDEBOX_URL=GBOX_BASE_URL+'/quota';var query={api_key:"db85b00dc1a54c2a02ed61575609802bb3d8c498"};$.getJSON(QUOTA_GUIDEBOX_URL,query,function(res){console.log('Current: ',res.monthly_quota.current);console.log('REMAINING: ',res.monthly_quota.total-res.monthly_quota.current);});}function getPopularTitles(){var limit=arguments.length>0&&arguments[0]!==undefined?arguments[0]:250;var offset=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var sources=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'all';var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:printResp;var RECENT_MOVIES_URL=GBOX_BASE_URL+'/movies/';var query={api_key:GUIDEBOX_KEY,limit:limit,offset:offset,sources:sources};return $.getJSON(RECENT_MOVIES_URL,query,callback);}// imdb OR themoviedb   
function searchByExternalIdGuidebox(external_id){var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'movie';var idType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'imdb';var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:printResp;var SEARCH_GUIDEBOX_BY_EX_ID=GBOX_BASE_URL+'/search';var query={api_key:GUIDEBOX_KEY,type:type,field:'id',id_type:idType,query:external_id};$.getJSON(SEARCH_GUIDEBOX_BY_EX_ID,query,callback);}function getMovieGuidebox(movieID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var MOVIE_GBOX_URL=GBOX_BASE_URL+'/movies/'+movieID;var query={api_key:GUIDEBOX_KEY};return $.getJSON(MOVIE_GBOX_URL,query,callback);}function getShowGuidebox(showID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var SHOW_GBOX_URL=GBOX_BASE_URL+'/shows/'+showID;var query={api_key:GUIDEBOX_KEY};$.getJSON(SHOW_GBOX_URL,query,callback);}function getShowSeasonsGuidebox(showID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var SHOW_GBOX_URL=GBOX_BASE_URL+'/shows/'+showID+'/seasons';var query={api_key:GUIDEBOX_KEY};$.getJSON(SHOW_GBOX_URL,query,callback);}function getAllEpisodesGuidebox(showID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var limit=arguments.length>2&&arguments[2]!==undefined?arguments[2]:100;var SHOW_GBOX_URL=GBOX_BASE_URL+'/shows/'+showID+'/episodes';var query={api_key:GUIDEBOX_KEY,include_links:true,limit:limit};$.getJSON(SHOW_GBOX_URL,query,callback);}function getEpisodeDetailGuidebox(episodeID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var EPISODE_GBOX_URL=GBOX_BASE_URL+'/episodes/'+episodeID;var query={api_key:GUIDEBOX_KEY};$.getJSON(SHOW_GBOX_URL,query,callback);}function getShowAvailableContentGuidebox(showID){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:printResp;var SHOW_GBOX_URL=GBOX_BASE_URL+'/shows/'+showID+'/available_content';var query={api_key:GUIDEBOX_KEY};$.getJSON(SHOW_GBOX_URL,query,callback);}// ================================================================================
// Gets titles from guidebox, stores them
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Gets popular movies short metadata from Guidebox
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function writeDataToFile(){var arr=[];var jsonRequests=[];for(var i=0;i<10;i++){jsonRequests.push(getPopularTitles(250,i,'all',function(res){res.results.forEach(function(title){arr.push(title);});}));}$.when.apply($,jsonRequests).then(function(){// console.log('DONE');
var jsonStr=(0,_stringify2.default)(arr);var jsonBlobURL=makeTextFile(jsonStr);$('.download').attr('href',jsonBlobURL);});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Creates blob with data as argument and sets its 
// download URL to download nav item href
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function writeThisToFile(data){var jsonStr=(0,_stringify2.default)(data);var jsonBlobURL=makeTextFile(jsonStr);$('.download').attr('href',jsonBlobURL);}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Loops through guidebox popular movies results
// and makes calls for each movies complete metadata
// and creates blob with data to download
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function writeMovieDetailsToFile(){var jsonRequests=[];var movies=[];// Start at 845 and continue collecting 
for(var i=1150;i<1350;i++){jsonRequests.push(getMovieGuidebox(data[i].id,function(res){movies.push(res);state.moviesJson.push(res);}));}$.when.apply($,jsonRequests).then(function(){// console.log('DONE');
var jsonStr=(0,_stringify2.default)(movies);var jsonBlobURL=makeTextFile(jsonStr);$('.download').attr('href',jsonBlobURL);});}// ================================================================================
// URL manipulation and State capture
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles URL on page reload to display 
// appropriate state                                     
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function handleUrl(){var url=window.location.hash;// console.log('URL: ', url);
if(url==''){$(SEARCH_FORM).focusin();$(MAIN_INPUT).focus();}else if(url.includes('search')){urlSearchHandler(url);}else if(url=='#popular'){popularHandler();window.location='#popular';}else if(url=='#discover'){discoverHandler();window.location='#discover';}else if(url.includes('detail')){urlDetailHandler(url);}}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles API call for previous state search
// query                                       
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function urlSearchHandler(url){var searchQuery=url.replace('#search/query=','');state.query=searchQuery;searchMultiHandler();}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Handles API call for correct detail page state                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function urlDetailHandler(url){var type='movie';if(url.includes('tv')){type='tv';}var id=url.replace('#detail/'+type+'/','');findByIdTMDB(id,function(resp){var movie=resp.movie_results[0];var tv=resp.tv_results[0];state.carouselPosters=JSON.parse(sessionStorage.getItem('posters'));state.carouselLabel=JSON.parse(sessionStorage.getItem('label'));if(movie){var $movie=$(getPosterImgTemplate(movie));movieDetailPageHandler($movie,true);}else if(tv){var $tv=$(getPosterImgTemplate(tv));tvDetailHandler($tv,true);}});}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Sets the current posters to be displayed in
// detail banner carousel and makes call to handle 
// session storage of posters                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function setCarouselPosters(posters,label){state.carouselPosters=posters;state.carouselLabel=label;storeCarouselData(posters,label);}// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Stores posters to be used in detail banner 
// carousel in session storage to fetch on 
// page reload                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function storeCarouselData(posters,label){var posters_str=(0,_stringify2.default)(posters);var label_str=(0,_stringify2.default)(label);sessionStorage.setItem('posters',posters_str);sessionStorage.setItem('label',label_str);}// ================================================================================
//    Event Listeners
// ================================================================================
// * * * * * * * * * * * * * * * * * * * * * * * * * //
//   Nav Clicks                                        
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function searchNavClick(){$(SEARCH).on('click',function(e){e.preventDefault();$(FIXED_CONTAINER).removeClass('fixed-overlay');$(MOBILE_MENU).removeClass('expand');$(MAIN_NAV).removeClass('expand');$('#burger-icon').removeClass('open');showSearchPage();$(SEARCH_FORM).focusin();$(MAIN_INPUT).val('').focus();});}function popularNavClick(){$(POPULAR).on('click',function(e){e.preventDefault();$(MOBILE_MENU).removeClass('expand');$(MAIN_NAV).removeClass('expand');$('#burger-icon').removeClass('open');popularHandler();window.location='#popular';});}function discoverNavClick(){$(DISCOVER).on('click',function(e){e.preventDefault();$(MOBILE_MENU).removeClass('expand');$(MAIN_NAV).removeClass('expand');$('#burger-icon').removeClass('open');discoverHandler();window.location='#discover';});}function burgerIconClick(){$('.burger-icon-wrap').on('click',function(e){e.preventDefault();$(this).toggleClass('open');$('#burger-icon').toggleClass('open');$(MOBILE_MENU).toggleClass('expand');$(MAIN_NAV).toggleClass('expand');});}function burgerMenuClick(){$('.burger').on('click',function(e){e.preventDefault();$(MOBILE_MENU).toggleClass('expand');$(MAIN_NAV).toggleClass('expand');});}// * * * * * * * * * * * * * * * * * * * * * * * * * //
//   Search forms                                       
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function searchFormSubmit(){$(SEARCH_FORM).submit(function(e){e.preventDefault();var $input=$(this).find(QUERY_INPUT);state.query=$input.val();state.searchResults=[];searchMultiHandler();window.location='#search/query='+state.query;});}function searchFormFocus(){$(SEARCH_FORM).focusin(function(e){e.preventDefault();$(this).addClass('search-form-focus');});$(SEARCH_FORM).focusout(function(e){e.preventDefault();$(this).removeClass('search-form-focus');});}function navSearchGlassHover(){$(NAV_SEARCH_GLASS).mouseenter(function(e){e.preventDefault();showNavSearchInput();});$(NAV_SEARCH_INPUT).focusout(function(e){e.preventDefault();hideNavSearchInput();});}function navSearchGlassClick(){$(NAV_SEARCH_GLASS).on('click',function(e){e.preventDefault();if(NAV_SEARCH_INPUT.css(width)=='200px'){hideNavSearchInput();}else{showNavSearchInput();}});}function popularTvFooterNavClick(){$(POPULAR_TV).on('click',function(e){e.preventDefault();popularHandler(MAIN);$.when(discoverMoviesTMDB(),discoverTvTMDB()).then(function(){smoothScroll('.tv-section',300,50);});window.location='#popular/tv';});}function discoveryFooterNavClick(){$(DISCOVERY_NAV_GENRE).on('click',function(e){e.preventDefault();discoverHandler($(this).attr('data-id'));window.location='#discover';});}// * * * * * * * * * * * * * * * * * * * * * * * * * //
//    Poster clicks                                             
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function posterImgClick(){$(CONTENT).on('click',POSTER_IMG,function(e){e.preventDefault();var $poster=$(this);if($poster.attr('data-tv')=='true'){tvDetailHandler($poster,true);}else{movieDetailPageHandler($poster,true);}});}function popularPosterClick(){$(POPULAR_MOVIE_CONTENT).on('click',POSTER_IMG,function(e){e.preventDefault();setCarouselPosters(state.popularMovies,'Popular Movies');});$(POPULAR_TV_CONTENT).on('click',POSTER_IMG,function(e){e.preventDefault();setCarouselPosters(state.popularTv,'Popular TV');});}function moreContentClick(){$(MORE_BTN).on('click',function(e){e.preventDefault();if($(this).hasClass('movies-btn')){popularMoviesHandler(++state.popularMoviePage);}else if($(this).hasClass('tv-btn')){popularTvShowsHandler(++state.popularTvPage);}else if($(this).hasClass('search-more-btn')){state.searchPage+=2;searchMultiHandler(state.searchPage);}});}function discoverPosterClick(){$(DISCOVER_CONTENT).on('click',POSTER_IMG,function(e){e.preventDefault();var $poster=$(this);var genre=$poster.attr('data-genre');setCarouselPosters(state.genreLists[genre],genre);});}function seasonPosterClick(){$(SEASONS_CONTAINER).on('click',SEASON_POSTER,function(e){e.preventDefault();// make call for season details
// display each episode
var showName=$(this).attr('data-show-name');var showID=$(this).attr('data-show-id');var season=$(this).attr('data-season-number');seasonHandler(showName,showID,season);});}function episodeStillClick(){$(SEASON_DETAILS_CONTAINER).on('click',EPISODE_STILL,function(e){e.preventDefault();$(SEASON_DETAILS_CONTAINER).find('label').removeClass('highlight');$(this).siblings('label').addClass('highlight');var ep=$(this).attr('data-episode-number');var season=$(this).attr('data-season');if((0,_keys2.default)(state.seasons).length!=0){displayEpisodeStreamLinks(season,ep);}else{$(STREAMING_LINKS_CONTAINER).removeClass('hidden');$(STREAMING_LINKS_CONTAINER).html('<hr class="shadow-hr">\n                                                <h3>Episode '+ep+' Stream Links</h3>\n                                                <h2 id="source-status">LOADING . . .</h2>');}});}// * * * * * * * * * * * * * * * * * * * * * * * * * //
//    Carousel Poster clicks                                             
// * * * * * * * * * * * * * * * * * * * * * * * * * //
function trailerCarouselClick(){$(TRAILER_SLIDER).on('click','img',function(e){e.preventDefault();$(FRAME).attr('src',$(this).attr('data-url-autoplay'));});}function detailCarouselClick(){$(DETAIL_PAGE_SLIDER).on('click',DETAIL_SLIDE_IMG,function(e){e.preventDefault();var $poster=$(this);if($poster.attr('data-tv')=='true'){tvDetailHandler($poster,false);}else{movieDetailPageHandler($poster,false);}});}function similarCarouselClick(){$(SIMILAR_MOVIES_SLIDER).on('click',SIMILAR_SLIDE_IMG,function(e){e.preventDefault();if($(this).attr('data-tv')=='true'){tvDetailHandler($(this),false);}else{movieDetailPageHandler($(this),false);}});}// ================================================================================
//    Event Listener Groups
// ================================================================================
function watchNavItems(){// search
searchNavClick();searchFormSubmit();searchFormFocus();// popular
popularNavClick();popularTvFooterNavClick();// discover genres
discoverNavClick();discoveryFooterNavClick();// mobile
burgerIconClick();burgerMenuClick();}function utilities(){checkSizeHandler();responsiveReslick();fixNavOnScroll();}function displays(){// posters clicks
posterImgClick();popularPosterClick();discoverPosterClick();seasonPosterClick();episodeStillClick();moreContentClick();// carousel poster clicks
trailerCarouselClick();detailCarouselClick();similarCarouselClick();}function init(){handleUrl();}// ================================================================================
//    Entry Point
// ================================================================================
$(function(){watchNavItems();utilities();displays();init();// Must come after event listeners are binded
}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_a8a1db43.js","/")
},{"babel-runtime/core-js/json/stringify":2,"babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/keys":4,"babel-runtime/core-js/object/values":5,"buffer":7,"g5I+bs":52}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/babel-runtime/core-js/json/stringify.js","/node_modules/babel-runtime/core-js/json")
},{"buffer":7,"core-js/library/fn/json/stringify":8,"g5I+bs":52}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/babel-runtime/core-js/object/assign.js","/node_modules/babel-runtime/core-js/object")
},{"buffer":7,"core-js/library/fn/object/assign":9,"g5I+bs":52}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/babel-runtime/core-js/object/keys.js","/node_modules/babel-runtime/core-js/object")
},{"buffer":7,"core-js/library/fn/object/keys":10,"g5I+bs":52}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = { "default": require("core-js/library/fn/object/values"), __esModule: true };
}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/babel-runtime/core-js/object/values.js","/node_modules/babel-runtime/core-js/object")
},{"buffer":7,"core-js/library/fn/object/values":11,"g5I+bs":52}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/base64-js/lib/b64.js","/node_modules/base64-js/lib")
},{"buffer":7,"g5I+bs":52}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/buffer/index.js","/node_modules/buffer")
},{"base64-js":6,"buffer":7,"g5I+bs":52,"ieee754":51}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/fn/json/stringify.js","/node_modules/core-js/library/fn/json")
},{"../../modules/_core":16,"buffer":7,"g5I+bs":52}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/fn/object/assign.js","/node_modules/core-js/library/fn/object")
},{"../../modules/_core":16,"../../modules/es6.object.assign":48,"buffer":7,"g5I+bs":52}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/fn/object/keys.js","/node_modules/core-js/library/fn/object")
},{"../../modules/_core":16,"../../modules/es6.object.keys":49,"buffer":7,"g5I+bs":52}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('../../modules/es7.object.values');
module.exports = require('../../modules/_core').Object.values;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/fn/object/values.js","/node_modules/core-js/library/fn/object")
},{"../../modules/_core":16,"../../modules/es7.object.values":50,"buffer":7,"g5I+bs":52}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_a-function.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_an-object.js","/node_modules/core-js/library/modules")
},{"./_is-object":29,"buffer":7,"g5I+bs":52}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_array-includes.js","/node_modules/core-js/library/modules")
},{"./_to-absolute-index":41,"./_to-iobject":43,"./_to-length":44,"buffer":7,"g5I+bs":52}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_cof.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_core.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_ctx.js","/node_modules/core-js/library/modules")
},{"./_a-function":12,"buffer":7,"g5I+bs":52}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_defined.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_descriptors.js","/node_modules/core-js/library/modules")
},{"./_fails":23,"buffer":7,"g5I+bs":52}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_dom-create.js","/node_modules/core-js/library/modules")
},{"./_global":24,"./_is-object":29,"buffer":7,"g5I+bs":52}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_enum-bug-keys.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_export.js","/node_modules/core-js/library/modules")
},{"./_core":16,"./_ctx":17,"./_global":24,"./_hide":26,"buffer":7,"g5I+bs":52}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_fails.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_global.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_has.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_hide.js","/node_modules/core-js/library/modules")
},{"./_descriptors":19,"./_object-dp":31,"./_property-desc":38,"buffer":7,"g5I+bs":52}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_ie8-dom-define.js","/node_modules/core-js/library/modules")
},{"./_descriptors":19,"./_dom-create":20,"./_fails":23,"buffer":7,"g5I+bs":52}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_iobject.js","/node_modules/core-js/library/modules")
},{"./_cof":15,"buffer":7,"g5I+bs":52}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_is-object.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-assign.js","/node_modules/core-js/library/modules")
},{"./_fails":23,"./_iobject":28,"./_object-gops":32,"./_object-keys":34,"./_object-pie":35,"./_to-object":45,"buffer":7,"g5I+bs":52}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-dp.js","/node_modules/core-js/library/modules")
},{"./_an-object":13,"./_descriptors":19,"./_ie8-dom-define":27,"./_to-primitive":46,"buffer":7,"g5I+bs":52}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.f = Object.getOwnPropertySymbols;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-gops.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-keys-internal.js","/node_modules/core-js/library/modules")
},{"./_array-includes":14,"./_has":25,"./_shared-key":39,"./_to-iobject":43,"buffer":7,"g5I+bs":52}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-keys.js","/node_modules/core-js/library/modules")
},{"./_enum-bug-keys":21,"./_object-keys-internal":33,"buffer":7,"g5I+bs":52}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.f = {}.propertyIsEnumerable;

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-pie.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-sap.js","/node_modules/core-js/library/modules")
},{"./_core":16,"./_export":22,"./_fails":23,"buffer":7,"g5I+bs":52}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_object-to-array.js","/node_modules/core-js/library/modules")
},{"./_object-keys":34,"./_object-pie":35,"./_to-iobject":43,"buffer":7,"g5I+bs":52}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_property-desc.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_shared-key.js","/node_modules/core-js/library/modules")
},{"./_shared":40,"./_uid":47,"buffer":7,"g5I+bs":52}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_shared.js","/node_modules/core-js/library/modules")
},{"./_global":24,"buffer":7,"g5I+bs":52}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-absolute-index.js","/node_modules/core-js/library/modules")
},{"./_to-integer":42,"buffer":7,"g5I+bs":52}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-integer.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-iobject.js","/node_modules/core-js/library/modules")
},{"./_defined":18,"./_iobject":28,"buffer":7,"g5I+bs":52}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-length.js","/node_modules/core-js/library/modules")
},{"./_to-integer":42,"buffer":7,"g5I+bs":52}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-object.js","/node_modules/core-js/library/modules")
},{"./_defined":18,"buffer":7,"g5I+bs":52}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_to-primitive.js","/node_modules/core-js/library/modules")
},{"./_is-object":29,"buffer":7,"g5I+bs":52}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/_uid.js","/node_modules/core-js/library/modules")
},{"buffer":7,"g5I+bs":52}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/es6.object.assign.js","/node_modules/core-js/library/modules")
},{"./_export":22,"./_object-assign":30,"buffer":7,"g5I+bs":52}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/es6.object.keys.js","/node_modules/core-js/library/modules")
},{"./_object-keys":34,"./_object-sap":36,"./_to-object":45,"buffer":7,"g5I+bs":52}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/core-js/library/modules/es7.object.values.js","/node_modules/core-js/library/modules")
},{"./_export":22,"./_object-to-array":37,"buffer":7,"g5I+bs":52}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")
},{"buffer":7,"g5I+bs":52}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("g5I+bs"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/process/browser.js","/node_modules/process")
},{"buffer":7,"g5I+bs":52}]},{},[1])