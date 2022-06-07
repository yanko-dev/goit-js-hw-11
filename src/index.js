import ImgApiService from './js/imgApiService';
import LoadMoreBtn from './js/load-more-btn';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    inputSearch: document.querySelector('.search-form input'),
    gallery: document.querySelector('.gallery'),
};

const {gallery, inputSearch, form } = refs;


const imgApiService = new ImgApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtnClick);
gallery.addEventListener('click', onSmalImgClick);

function onSearch(e) {
    e.preventDefault();

    imgApiService.page = 1;
    clearGalleryContainer()
    loadMoreBtn.hide()

    imgApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    console.log('Query: ', e.currentTarget.elements.searchQuery.value);
    
    if(!imgApiService.query) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        clearInputValue();
        loadMoreBtn.hide();
        return;
    }

    imgApiService.resetPage();
    imgApiService.getImages()
        .then(images =>  {
            if(images.data.hits.length === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                clearInputValue();
                loadMoreBtn.hide();
                return;
            }

            Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
            appendGalleryMurkup(images);
            loadMoreBtn.enable();

            if(images.data.hits.length < 40) {
                Notify.info("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.hide();
            }
            
        })
        .catch(error => console.log(error))
        .finally(() => {clearInputValue()})
}

function onLoadMoreBtnClick(e) {
    e.preventDefault();
    loadMoreBtn.disabled();
    
    return imgApiService.getImages()
        .then(images =>  {
            appendGalleryMurkup(images);
            loadMoreBtn.enable();

            if(images.data.hits.length < 40) {
                Notify.info("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.hide();
            }
        })
        .catch(error => console.log(error))
}

function appendGalleryMurkup(pictures) {
    const images = pictures.data.hits;

    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
        <a class="gallery-item" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" width = "300" height = "200" loading="lazy" />
        </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <br>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <br>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <br>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <br>${downloads}
                </p>
            </div>
        </div>`).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    clearInputValue();

    let lightbox = new SimpleLightbox('.photo-card a', {
        close: true,
        captions: true,
    });

}

function clearGalleryContainer() {
    gallery.innerHTML = '';
}

function clearInputValue() {
    inputSearch.value = '';
}

function onSmalImgClick(e) {
    e.preventDefault();
}