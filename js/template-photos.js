
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPicturesList = (photos) => {
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach(({ url, comments, likes, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  const pictureContainer = pictureElement.querySelector('.picture');
  pictureContainer.dataset.id = id;
  pictureListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(pictureListFragment);
};

export { renderPicturesList, picturesList };
