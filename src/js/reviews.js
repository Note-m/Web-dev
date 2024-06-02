import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://portfolio-js.b.goit.study/api';

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const galleryReviews = document.querySelector('.reviews-list');
nextBtn.disabled = false;
prevBtn.disabled = true;


const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch reviews. Please try again later.',
      position: 'topRight',
    });
    throw error;
  }
};

const markup = review => {
  const { author, avatar_url, review: reviewText } = review;
  return `
    <li class="user-review">
      <p class="text-review">${reviewText}</p>
      <div class="icon-photo-name">
        <img
          src="${avatar_url}"
          alt="${author}"
          width="40"
          height="40"
          class="avatar-icon"

        />
        <p class="user-name-review">${author}</p>
      </div>
    </li>`;
};

let reviews = [];
let currentIndex = 0;

async function renderNextReview(event) {
  event.preventDefault();
  try {
    reviews = await fetchReviews();
    if (reviews.length === 0) {
      galleryReviews.innerHTML = "<p class='not-found'>Not found</p>";
      return;
    } else if (currentIndex < reviews.length - 1) {
      currentIndex++;
      galleryReviews.innerHTML = markup(reviews[currentIndex]);
      prevBtn.disabled = false;
    } else {
    iziToast.info({
      title: 'Info',
      message: 'Sorry, no more reviews for now.',
      position: 'topRight',
      color: 'green'
    });
    nextBtn.disabled = true;
  }
  }
  catch (error) {
    console.log(error);
    galleryReviews.innerHTML = "<p class='not-found'>Not found</p>";
  }
}

async function renderPrevReview(event) {
  event.preventDefault();
  try {
    reviews = await fetchReviews();
   if (currentIndex <= reviews.length - 1) {
      currentIndex--;
      galleryReviews.innerHTML = markup(reviews[currentIndex]);
      prevBtn.disabled = false;
    }
  }
  catch (error) {
    console.log(error);
  }
}

nextBtn.addEventListener('click', renderNextReview);
prevBtn.addEventListener('click', renderPrevReview);
