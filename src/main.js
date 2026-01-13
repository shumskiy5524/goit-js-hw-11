// Імпорт функцій з локальних файлів
import { getImagesByQuery } from "./pixabay-api.js";
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showNoResultsToast 
} from "./render-functions.js";

// Селектори форми та поля вводу
const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return; // перевірка на пустий рядок

  clearGallery();  // очищаємо старі результати
  showLoader();    // показуємо лоадер

  try {
    const images = await getImagesByQuery(query); // запит до Pixabay API

    if (images.length === 0) {
      showNoResultsToast(); // повідомлення, якщо нічого не знайдено
    } else {
      createGallery(images); // рендеримо галерею
    }

  } catch (error) {
    console.error(error);
    // повідомлення про помилку запиту
    import("izitoast").then(({ default: iziToast }) => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while fetching images!',
        position: 'topRight'
      });
    });
  } finally {
    hideLoader(); // ховаємо лоадер
  }
});
