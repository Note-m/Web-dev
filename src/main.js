import Swiper from 'swiper';
import 'swiper/css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const BASE_URL = "https://portfolio-js.b.goit.study/api"

const prevBtn= document.querySelector(".btn-prev")
const nextBtn = document.querySelector(".btn-next")
const galleryReviews = document.querySelector(".reviews-list")

const fetchReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const data = await response.json();
    console.log(data);
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

const markup = reviews => {
  return reviews.map(
    ({ author, avatar_url, review }) => `
        <li class="user-review">
          <p class="text-review">${review}</p>
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

async function renderReviews() {
  try {
    const reviews = await fetchReviews() 
    console.log(reviews);
    if (reviews.length === 0) {
      galleryReviews.innerHTML = "<p class='not-found'>Not found</p>"
      return
  } else {
    galleryReviews.innerHTML = markup(reviews)
    // initSwiper()
  }
  } catch (error) {
    console.log(error)
    galleryReviews.innerHTML = "<p class='not-found'>Not found</p>"
  }
}

// const initSwiper = () => {
//   const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: '.btn-next',
//     prevEl: '.btn-prev',
//   },
//     speed: 400,
//     spaceBetween: 100,
//     slidesPerView: 'auto',
//     loop: false,
//     allowTouchMove: true,
//     keyboard: {
//     enabled: true,
//     onlyInViewport: false,
//     },
//     on: {
//       reachEnd: () => {
//         nextBtn.classList.add('disabled');
//       },
//       reachBeginning: () => {
//         prevBtn.classList.add('disabled');
//       },
//       fromEdge: () => {
//         nextBtn.classList.remove('disabled');
//         prevBtn.classList.remove('disabled');
//       }
//     },
// });
// }
renderReviews()

nextBtn.addEventListener("click", renderReviews);


