// import './sass/_common.scss';
import PhotoApiService from './js/api-service';
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.input'),
    submitBtn: document.querySelector('.button'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')

};

// const KEY = '33939890-a3090e3aada617e55ee2e122d';

const photoApiService = new PhotoApiService();

const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: '250ms' });


refs.form.addEventListener('submit', onFormSumbit);

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);


function onFormSumbit(evt) {
    evt.preventDefault();
    console.log(5);

    // const name = refs.input.value;
    // console.log(name);

    photoApiService.query = evt.currentTarget.elements.searchQuery.value;
    console.log(photoApiService.query);
    photoApiService.resetPage();
    
    photoApiService.fetchPhoto().then(markUp);
    lightbox.refresh();
    
    

    


}

function onLoadMoreBtn() {
    lightbox.refresh();
    photoApiService.fetchPhoto().then(markUp); 
    
}

function markUp(hits) {
    const renderGallery = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads})=>
        `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="100px" />
        <div class="info">
            <p class="info-item">
            <b>${likes} Likes</b>
            </p>
            <p class="info-item">
            <b>${views} Views</b>
            </p>
            <p class="info-item">
            <b>${comments} Comments</b>
            </p>
            <p class="info-item">
            <b>${downloads} Downloads</b>
            </p>
        </div>
         </a>
        </div>`).join(' ');
    
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery);

   

    
}






