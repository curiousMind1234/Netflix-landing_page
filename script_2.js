window.addEventListener('load', function () {

    init();
    document.addEventListener('scroll', () => {
        //header ui update
        const header = document.querySelector(".header");
        //If you scroll 10 pixels down from the top of this page, 
        //the class "test" is added to this paragraph.
        //Scroll up again to remove the class
        if (document.documentElement.scrollTop > 10) {
            header.classList.add("black-bg");
        } else {
            header.classList.remove("black-bg");
        }
    })

})


//Consts

//Store the API Key and url of tmdb site
const apikey = "5797de04ca7708a5821a287945f59bb2";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main-search");

//create object of all the things you wanted to include on website
const apiPath = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&languages=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDnutOM83yx30WBu0WKgOXLGWsvPFBvaMM`,
    fetchTvShows: `${apiEndpoint}/tv/popular?api_key=${apikey}&language=en-US&page=1`,
    fetchTvShowsvideos: (id) => `${apiEndpoint}/tv/${id}/videos?api_key=${apikey}&language=en-US`,
    searchMultiple: `${apiEndpoint}/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false`
}

//Boots up the app
function init() {
    //getMovies(apiPath.fetchTrending)
    fetchTvShows();
    fetchTrendingMovies();
    fetchAndBuildAllSections();
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchItem = search.value;
    const banner = document.getElementById("banner-section");
    banner.style.display="none";
    const movie_cont = document.getElementById("movies-cont");
    movie_cont.style.display="none";
    const banner_bottom = document.querySelector(".banner-fadeBottom");
    banner_bottom.style.display ="none";
    
    if (searchItem) {
        getMovies(apiPath.searchMultiple + '&query=' + searchItem);
    }
    else{
        const banner = document.getElementById("main-search");
        banner.style.display="none";
        alert("refresh page to go back to home page")  
    }
})

function getMovies(fetchUrl) {
    fetch(fetchUrl).then(res => res.json())
        .then(data => {
              showSearchResults(data.results)                     
        })
        .catch(err => console.log(err))
}

function showSearchResults(data){
     console.log(data);
     main.innerHTML = '';
    
    
     data.forEach(movie => {
        const {title,poster_path,vote_average} = movie;
        let vote = parseFloat(vote_average).toFixed(2);

        const movieLi = document.createElement('div');
        movieLi.classList.add('movies-row');
        const movieLiHTML =
        `
        <div class=movie_data>
        <img class = "movies-item" id="movies-item-id" src="${imgPath}${poster_path}" alt="${title}">
                
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote)}">${vote}</span>
        </div>   
        </div>
        `
        movieLi.innerHTML = movieLiHTML;

        const movieSection = document.createElement('div');
        movieSection.className ="movies-row movies-section-search ";
        movieSection.innerHTML = movieLiHTML;

        main.appendChild(movieSection);
     })
     
}

function fetchTvShows() {
    fetchAndbuildMoviesSection(apiPath.fetchTvShows, 'Top-10 Trending TV Shows')
        .catch(err => console.log(err))
}

function fetchTrendingMovies() {
    fetchAndbuildMoviesSection(apiPath.fetchTrending, 'Trending Now')
        .then(list => {
            const randomIndex = Math.floor(Math.random() * list.length);
            buildBannerSection(list[randomIndex]);
        })
        .catch(err => console.log(err));
}

function buildBannerSection(movie) {
    const bannerCont = document.getElementById("banner-section");
    bannerCont.style.backgroundImage = `url(${imgPath}${movie.backdrop_path})`;

    const div = document.createElement("div");
    div.innerHTML =
        ` <div class="banner-content container">
        <h2 class="banner-title">${movie.title}</h2>
        <p class="banner-info">Release date ${movie.release_date}</p>
        <p class="banner-overview">${movie.overview &&
            movie.overview.length > 200 ?
            movie.overview.slice(0, 200).trim() + '...' : movie.overview}</p>
        <div class="action-buttons-cont">
            <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
            <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
        </div>
    </div>`

    div.className = "banner-content container";
    bannerCont.append(div);

}

function fetchAndBuildAllSections() {
    fetch(apiPath.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchAndbuildMoviesSection(
                        apiPath.fetchMoviesList(category.id),
                        category.name);
                });
            }
        })
        .catch(err => console.log(err));
}

function fetchAndbuildMoviesSection(fetchUrl, categoryName) {

    //Now fetch the URL of every movies genre
    //as it give readable data hence converting it to json first
    return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            //console.table(res.results)
            const movies = res.results;
            if (Array.isArray(movies) && movies.length > 0) {
                buildMovieSection(movies, categoryName);
            }
            return movies;
        })
        .catch(err => console.log(err));

}
function buildMovieSection(list, categoryName) {
   // console.log(list,categoryName);

   const moviesContainer  = document.getElementById("movies-cont");

   const moviesListHTML = list.map(item => {

    let vote = parseFloat(item.vote_average).toFixed(1);
        return `       
        <div class="movie_data" >
        <img class = "movies-item" id="movies-item-id" src="${imgPath}${item.poster_path}" alt="${item.title}">
                
        <div class="movie-info">
            <h3>${item.title}</h3>
            <span class="${getColor(vote)}">${vote}</span>
        </div>
       
        </div>`
   }).join('');
        const moviesSectionHTML = `
        <h2 class="movies-section-heading">${categoryName}<span class="explore-nudge">Explore All</span></h2>
        <div id="main">
        <div class="movies-row">
            ${moviesListHTML}
        </div>
        </div>`
    

        const div = document.createElement('div');
        div.className = "movies-section";
        div.innerHTML = moviesSectionHTML;

        moviesContainer.append(div);

}

function getColor(vote) {
    if (vote > 8) {
        return "green";
    } else if (vote > 5) {
        return "orange"
    }
    else {
        return "red";
    }
}

function searchMovieTrailer(movieName, iframId) {
    if (!movieName) return;

    fetch(apiPath.searchOnYoutube(movieName))
        .then(res => res.json())
        .then(res => {
            const bestResult = res.items[0];
            //for openeing in new page
            //window.open(youtubeURL, '_blank');
            const elements = document.getElementById(iframId);
            //console.log(elements, iframId);

            const div = document.createElement('div');
            div.innerHTML = `<iframe width="245px" height="150px" src="https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&controls=0"></iframe>`
            elements.append(div);
        })
        .catch(err => console.log(err));
}









// https://curiousmind1234.github.io./NEtflix-Clone/netflix_2.html