import { renderBigPhoto } from './photo-handler.js';
import { renderPicturesList } from './template-photos.js';
import { setUserFormSubmit, closeOverlay } from './img-upload.js';
import { getData } from './api.js';
import { showAlert } from './util.js';


const imgFiltersElement = document.querySelector('.img-filters');

getData()
  .then((photo) => {
    renderBigPhoto(photo);
    renderPicturesList(photo);
    imgFiltersElement.classList.remove('img-filters--inactive'); // удаляем класс hidden
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeOverlay);
