import { renderBigPhoto } from './photo-handler.js';
import { renderPicturesList } from './template-photos.js';
import { setUserFormSubmit, closeOverlay } from './img-upload.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((photo) => {
    renderBigPhoto(photo);
    renderPicturesList(photo);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


setUserFormSubmit(closeOverlay);
