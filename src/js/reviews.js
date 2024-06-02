import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://portfolio-js.b.goit.study/api';

const galleryReviews = document.querySelector(".swiper-wrapper");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const icon = document.querySelector(".icon-swipe")


let reviews;

const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
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
  return review.map(  
  ({ author, avatar_url, review: reviewText }) =>  `
    <li class="swiper-slide user-review">
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
    </li>`
  ).join("")
};

const initReviews = async () => {
  try {
    reviews = await fetchReviews();
    if (reviews.length > 0) {
    galleryReviews.innerHTML += markup(reviews);
    swiper.update();
    }
  } catch (error) {
    console.log(error);
    galleryReviews.innerHTML = "<p class='not-found'>Not found</p>";
    disabledBtn(prevBtn, true);
    disabledBtn(nextBtn, true);
  }
};

const swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: () => {
      const currentIndex = swiper.activeIndex;
      if (currentIndex === 0) {
        disabledBtn(prevBtn, currentIndex === 0);
      } else {
        disabledBtn(prevBtn, false);
      }
      if (currentIndex === reviews.length + 1) {
        disabledBtn(nextBtn, currentIndex === reviews.length + 1); 
        iziToast.info({
          title: 'Info',
          message: 'Sorry, no more reviews for now.',
          position: 'topRight',
          color: 'green'
        });
      } else {
        disabledBtn(nextBtn, false)
      }
    },
  },
});
const disabledBtn = (button, isDisabled) => {
  button.disabled = isDisabled 
  if (isDisabled) {
    button.style.backgroundColor = "grey";
    button.style.cursor = "not-allowed";
    icon.style.stroke = "grey"
  } else {
    button.style.backgroundColor = '';
    button.style.cursor = '';
    icon.style.stroke = "#292929";
  }
} 
disabledBtn(prevBtn, true);

prevBtn.addEventListener('click', () => {
  swiper.slidePrev();
});

nextBtn.addEventListener('click', () => {
  swiper.slideNext();
});

initReviews();