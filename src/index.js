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

// const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt',
//         captionPosition: 'bottom',
//         captionDelay: '250ms' });


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
    lightbox.show.simplelightbox();    
    

    


}

function onLoadMoreBtn() {
    // lightbox.refresh();
    photoApiService.fetchPhoto().then(markUp); 
    
}

function markUp(hits) {
    const renderGallery = hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads})=>
        `<a class="gallery__link" href="${largeImageURL}">
        <div class="photo-card">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="100px" />
       
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${likes} 
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
            <b> Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b> Downloads</b>
            ${downloads}
            </p>
        </div> 
        </div>
        </a>`).join(' ');
    
    refs.gallery.insertAdjacentHTML('beforeend', renderGallery);

    lightbox()
   

    
}


function lightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.7,
  });
}





