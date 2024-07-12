import { renderPictures } from './template-photos.js';

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
let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;
let currentPhoto;

/*-------------------- Комментарии -------------*/
const createCommentElement = ({ avatar, message, name }) => {
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

  return commentElement;
};

const clearCommentsList = () => {
  socialComments.innerHTML = '';
};

const renderCommentsList = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment);
    commentFragment.appendChild(commentElement);
  });
  socialComments.appendChild(commentFragment);
};

const renderComments = (comments) => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createCommentElement(comments[i]);
    fragment.appendChild(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
  commentCountBlock.textContent = `${commentsShown} из ${comments.length} комментариев`;
};

/*------------keyboard-keys---------------*/

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

/*------------Big-Picture---------------*/

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
  if (isEnterKey(evt) && isBigPictureOpen) {
    evt.preventDefault();
  }
};

const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  clearCommentsList();
  commentsShown = 0;
  renderComments(photoData.comments);

  isBigPictureOpen = true;
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  isBigPictureOpen = false;
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', closeBigPicture);

commentsLoader.addEventListener('click', () => {
  renderComments(currentPhoto.comments);
});

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
      currentPhoto = cardData;
      openBigPicture(cardData);
    }
  };

  photosContainer.addEventListener('click', onCardsClick);
};

export { renderGallery };
