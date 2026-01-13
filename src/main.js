import { getImagesByQuery } from './pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Search field cannot be empty!' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (!data.hits.length) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
});
