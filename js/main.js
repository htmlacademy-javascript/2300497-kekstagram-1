import { renderGallery } from './photo-handler.js';
import { photos } from './data.js';
import { fileLoader } from './img-upload.js';


renderGallery(photos);
fileLoader();

