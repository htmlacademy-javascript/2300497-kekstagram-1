import { isEscapeKey, isEnterKey } from './keyboard-keys.js';
import { clearCommentsList, renderComments, resetCommentsShown } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let isBigPictureOpen = false;
let currentPhoto = null;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
  if (isEnterKey(evt) && isBigPictureOpen) {
    evt.preventDefault();
  }
}

function openBigPicture(photoData) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  clearCommentsList();
  resetCommentsShown();
  renderComments(photoData.comments);

  isBigPictureOpen = true;
  document.addEventListener('keydown', onDocumentKeydown);

  currentPhoto = photoData;
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  isBigPictureOpen = false;
  document.removeEventListener('keydown', onDocumentKeydown);
  currentPhoto = null;
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
  if (isEnterKey(evt) && isBigPictureOpen) {
    evt.preventDefault();
  }
};

bigPictureCancel.addEventListener('click', closeBigPicture);

commentsLoader.addEventListener('click', () => {
  if (currentPhoto) {
    renderComments(currentPhoto.comments);
  }
});

export { openBigPicture, closeBigPicture };
