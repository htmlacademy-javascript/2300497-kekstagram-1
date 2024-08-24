import { renderBigPhoto } from './photo-handler.js';
import { renderPicturesList } from './template-photos.js';
import { setUserFormSubmit, closeOverlay } from './img-upload.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { filterPictures, setPhotoData } from './filters.js';

const imgFiltersElement = document.querySelector('.img-filters');

getData()
  .then((photo) => {
    setPhotoData(photo);
    renderPicturesList(filterPictures('filter-default'));
    renderBigPhoto(photo);
    imgFiltersElement.classList.remove('img-filters--inactive');
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeOverlay);
