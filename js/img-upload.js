const closeButton = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('#upload-file');
const previewImg = document.querySelector('.default-preview-img');
const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const hashtagsField = form.querySelector('#hashtags');
const descriptionField = form.querySelector('#description');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsRadio = document.querySelectorAll('.effects__radio');

const isEscapeKey = (evt) => evt.key === 'Escape';
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const MAX_HASHTAGS = 5;


// Функция для загрузки файла и установки его в preview

const fileLoader = () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
    };
    reader.readAsDataURL(file);
  }
};

// Функция для закрытия оверлея
const closeOverlay = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  document.removeEventListener('keydown', onDocumentKeydown);
};

fileInput.addEventListener('change', () => {
  fileLoader();
  fileInput.value = '';
});
closeButton.addEventListener('click', closeOverlay);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== hashtagsField && document.activeElement !== descriptionField) {
      evt.preventDefault();
      closeOverlay();
    }
  }
};

//функция увеличения/уменьшения изображения

function updateScaleValue(value) {
  scaleValue.value = `${value}%`;
  const scale = value / 100;
  previewImg.style.transform = `scale(${scale})`;
}

function bigScale (){
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

function smallScale (){
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

scaleBigger.addEventListener('click', bigScale);
scaleSmaller.addEventListener('click', smallScale);

//реализация фильтров

effectsRadio.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    imgPreview.className = 'default-preview-img';
    if (evt.target.value !== 'none') {
      imgPreview.classList.add(`effects__preview--${evt.target.value}`);
    }
  });
});

// Реализация валидации через пристин

const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateHashTag(value) {
  if (value === '') {return true;}

  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  return hashtags.every(tag => hashtagPattern.test(tag));
}

function validateText (value) {
  return value.length <= 140;

}

pristine.addValidator(hashtagsField, validateHashTag, 'неверно введенный хэш-тег');
pristine.addValidator(descriptionField, validateText, 'До 140 символов');

function updateFieldBorder(field) {
  if (pristine.validate(field)) {
    field.style.borderColor = '';
  } else {
    field.style.borderColor = 'red';
  }
}

hashtagsField.addEventListener('input', () => updateFieldBorder(hashtagsField));
descriptionField.addEventListener('input', () => updateFieldBorder(descriptionField));


form.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (!valid) {
    evt.preventDefault();
  }
});
