import getImages from './js/getImages';
// import { Notify } from 'notiflix';

// Resf
const refs = {
    // form: document.querySelector('.search-form'),
    inputSearch: document.querySelector('.search-form input'),
    searchBtn: document.querySelector('.search-form button'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load button'),
};

const {form, inputSearch, searchBtn, loadMoreBtn} = refs;

// Event Listeners
inputSearch.addEventListener('input', onInputSerch);
searchBtn.addEventListener('click', onSearchBtnClick);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

// Listener Functions
function onInputSerch(e) {
    console.log(e.currentTarget.value);
    return e.currentTarget.value;
}

function onSearchBtnClick(e) {
    e.preventDefault();
    console.log('onSearchBtnClick');
}

function onLoadMoreBtnClick() {
    console.log('onLoadMoreBtnClick')
}

getImages();




    // Gallery Card Marckup Template
    // <div class="photo-card">
        // <img src="" alt="" loading="lazy" />
        // <div class="info">
    //     <p class="info-item">
    //     <b>Likes</b>
    //     </p>
    //     <p class="info-item">
    //     <b>Views</b>
    //     </p>
    //     <p class="info-item">
    //     <b>Comments</b>
    //     </p>
    //     <p class="info-item">
    //     <b>Downloads</b>
    //     </p>
    // </div>
    // </div>