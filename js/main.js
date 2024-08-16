import { renderBigPhoto } from './photo-handler.js';
import { renderPicturesList } from './template-photos.js';
import { setUserFormSubmit, closeOverlay } from './img-upload.js';

fetch ('https://28.javascript.htmlacademy.pro/kekstagram/data')
.then((response) => response.json())
.then((photo) =>{
    renderPicturesList(photo);
    renderBigPhoto(photo);
    console.log(photo);
});

setUserFormSubmit(closeOverlay);