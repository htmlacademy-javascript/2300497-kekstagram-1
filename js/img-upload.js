import { isEscapeKey } from './keyboard-keys.js';

const fileInput = document.querySelector('#upload-file');
const previewImg = document.querySelector('.default-preview-img');
const form = document.querySelector('#upload-select-image');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const scaleBigger = overlay.querySelector('.scale__control--bigger');
const scaleSmaller = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');
const hashtagsField = form.querySelector('#hashtags');
const descriptionField = form.querySelector('#description');
const imgPreview = overlay.querySelector('.img-upload__preview img');
const effectsContainer = overlay.querySelector('.effects__list');
const sliderElement = overlay.querySelector('.effect-level__slider');
const effectLevel = overlay.querySelector('.img-upload__effect-level');
const effectLevelValue = overlay.querySelector('.effect-level__value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const MAX_HASHTAGS = 5;

// Функция для закрытия оверлея
const closeOverlay = function() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  fileInput.value = '';
  previewImg.src = 'img/upload-default-image.jpg';
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEffects();
};

const onDocumentKeydown = function(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== hashtagsField && document.activeElement !== descriptionField) {
      evt.preventDefault();
      closeOverlay();
    }
  }
};

// Функция для загрузки файла и установки его в preview
const fileLoader = function() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      overlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
      resetEffects();
    };
    reader.readAsDataURL(file);
  }
};

fileInput.addEventListener('change', fileLoader);
closeButton.addEventListener('click', closeOverlay);

// Функция для увеличения/уменьшения изображения
function updateScaleValue(value) {
  scaleValue.value = `${value}%`;
  const scale = value / 100;
  previewImg.style.transform = `scale(${scale})`;
}

function bigScale() {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

function smallScale() {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScaleValue(currentScale);
  }
}

scaleBigger.addEventListener('click', bigScale);
scaleSmaller.addEventListener('click', smallScale);



//Слайдер (пристин)

noUiSlider.create(sliderElement, {
  start: 100,
  connect: 'lower',
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
});

const effectSettings = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: { min: 0, max: 1 },
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: { min: 0, max: 100 },
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: { min: 0, max: 3 },
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: { min: 1, max: 3 },
    step: 0.1,
  },
  none: {
    filter: '',
    range: { min: 0, max: 100 },
    step: 1,
  }
};

// Обновление слайдера и фильтра при выборе эффекта
effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effect = evt.target.value;
    const settings = effectSettings[effect] || effectSettings['none'];

    sliderElement.noUiSlider.updateOptions({
      range: settings.range,
      start: settings.range.max,
      step: settings.step,
    });

    // Обновление класса на изображении
    imgPreview.className = `effects__preview--${effect}`;

    // Скрытие слайдера для эффекта "none"
    if (effect === 'none') {
      imgPreview.style.filter = '';
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
      sliderElement.noUiSlider.set(settings.range.max);
    }
  }
});

// Применение фильтра при изменении уровня эффекта
sliderElement.noUiSlider.on('update', (values, handle) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  const settings = effectSettings[effect] || effectSettings['none'];

  if (effect !== 'none') {
    const value = values[handle];
    effectLevelValue.value = value;
    imgPreview.style.filter = `${settings.filter}(${value}${settings.unit})`;
  }
});

// Функция для сброса эффектов на "Оригинал"
const resetEffects = function () {
  imgPreview.className = 'effects__preview--none';
  imgPreview.style.filter = '';
  effectLevel.classList.add('hidden');
  document.querySelector('#effect-none').checked = true;
};

// Реализация валидации через Pristine
const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateHashTag(value) {
  if (value === '') {
    return true;
  }

  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  return hashtags.every((tag) => hashtagPattern.test(tag));
}

function validateText(value) {
  return value.length <= 140;
}

pristine.addValidator(hashtagsField, validateHashTag, 'неверно введенный хэш-тег');
pristine.addValidator(descriptionField, validateText, 'До 140 символов');

const validateField = (field) => {
  const isValid = pristine.validate(field);
  field.style.borderColor = isValid ? '' : 'red';
};

function updateFieldBorder(field) {
  validateField(field);
}

function onHashtagsFieldInput() {
  updateFieldBorder(hashtagsField);
}

hashtagsField.addEventListener('input', onHashtagsFieldInput);

function onDescriptionFieldInput() {
  updateFieldBorder(descriptionField);
}

descriptionField.addEventListener('input', onDescriptionFieldInput);

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const valid = pristine.validate();
    if (valid) {
      const formData = new FormData(evt.target);

      fetch ('https://28.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      }).then(() => onSuccess()).then(() => evt.target.reset()).catch((err) => {
        console.log('Error: ', err);
      });
      console.log(formData);
      console.log('good');
    }
    else {
      console.log('bad');
    }
  });
};
export {setUserFormSubmit, closeOverlay };
