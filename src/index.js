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

// refs.loadMoreBtn.classList.add('is-hidden ');


function onFormSumbit(evt) {
    evt.preventDefault();
    console.log(5);

    // lightbox.refresh();
    // console.log(lightbox.refresh());
    clearMarkup();

    // const name = refs.input.value;
    // console.log(name);

    photoApiService.query = evt.currentTarget.elements.searchQuery.value;

    if (photoApiService.query === '') {
        // refs.submitBtn.classList.add('unavailable');
        return Notiflix.Notify.failure(
          'The search field cannot be empty'
        );
    }
    console.log(photoApiService.query);
    photoApiService.resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');
    
    photoApiService.fetchPhoto().then(data => {

        

        if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // throw new Error(response.status);
        } else {
            Notiflix.Notify.info(
          `Hooray! We found ${data.totalHits} images.`
        );
        // if (hits.length = 0) {
        //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        // };
        markup(data.hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
        }

        
    })
        
    // .catch(total => {
    //     if (total = []) {
    //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    // }
    // });
    // lightbox.refresh();

    
    // lightbox.show.simplelightbox();
    
    
    
    


}

function onLoadMoreBtn() {
    
    photoApiService.fetchPhoto().then(data => {
        if (data.hits.length === 0) {
            Notiflix.Notify.failure(
                "We're sorry, but you've reached the end of search results."
            );
            
            refs.loadMoreBtn.classList.add('is-hidden');

        };
        markup(data.hits)
    });
    //     .catch(error => {
    //     console.log(error);
    //     if (error) {
    //         Notiflix.Notify.info(
    //       "We're sorry, but you've reached the end of search results."
    //     );
    //     }
    // }); 
    // lightboxEl.refresh();

    // if (data.totalHits === 0) {
        
    // }
    
    
     

    
    
}

function markup(hits) {
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
    
  lightbox.refresh();
}

function clearMarkup() {
    refs.gallery.innerHTML = '';
}





