import { renderPictures } from './template-photos.js';
import { isEnterKey, isEscapeKey } from './keyboard-keys.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');

let isBigPictureOpen = false;
/*------------- Комментарии -------------*/

const renderCommentsList = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = avatar;
    imgElement.alt = name;
    imgElement.width = 35;
    imgElement.height = 35;

    const textElement = document.createElement('p');
    textElement.classList.add('social__text');
    textElement.textContent = message;

    commentElement.appendChild(imgElement);
    commentElement.appendChild(textElement);
    commentFragment.appendChild(commentElement);
  });
  socialComments.appendChild(commentFragment);
};

const clearCommentsList = () => {
  socialComments.innerHTML = '';
};


/*------------Big-Picture---------------*/
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
  if (isEnterKey(evt) && isBigPictureOpen) {
    evt.preventDefault();
  }
}

const updateBigPictureContent = ({ url, description, likes, comments }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  renderCommentsList(comments);
};

const openBigPicture = (cardData) => {
  updateBigPictureContent(cardData);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  isBigPictureOpen = true;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearCommentsList();
  document.removeEventListener('keydown', onDocumentKeydown);
  isBigPictureOpen = false;
};

bigPictureCancel.addEventListener('click', closeBigPicture);


/*-------------------- нажатие на фото -------------*/

const renderGallery = (photos) => {
  renderPictures(photos);

  const photosContainer = document.querySelector('.pictures');

  const onCardsClick = (evt) => {
    const photoElement = evt.target.closest('.picture');

    if (!photoElement) {
      return;
    }

    const id = parseInt(photoElement.dataset.id, 10);
    const cardData = photos.find((photo) => photo.id === id);
    if (cardData) {
      openBigPicture(cardData);
    }
  };

  photosContainer.addEventListener('click', onCardsClick);
};

export { renderGallery };
