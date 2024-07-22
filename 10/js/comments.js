const bigPicture = document.querySelector('.big-picture');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;

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

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  const nextComments = comments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  nextComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  socialComments.appendChild(fragment);
  commentsShown += nextComments.length;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCountBlock.textContent = `${commentsShown} из ${comments.length} комментариев`;
};

const resetCommentsShown = () => {
  commentsShown = 0;
  commentsLoader.classList.remove('hidden');
};

export { clearCommentsList, renderComments, resetCommentsShown };
