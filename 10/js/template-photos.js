
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderTemplate = ({ url, comments, likes, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  const pictureContainer = pictureElement.querySelector('.picture');
  pictureContainer.dataset.id = id;
  return pictureElement;
};

const renderPictures = (photos) => {
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const pictureCard = renderTemplate(photo);
    pictureListFragment.appendChild(pictureCard);
  });
  picturesList.appendChild(pictureListFragment);
};

export { renderPictures, picturesList };
