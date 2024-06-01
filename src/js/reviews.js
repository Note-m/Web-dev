import Swiper from 'swiper';
import 'swiper/css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const BASE_URL = "https://portfolio-js.b.goit.study/api"

const nextBtn = document.querySelector(".swiper-button-prev")
const prevBtn = document.querySelector(".swiper-button-next")
const galleryReviews = document.querySelector(".reviews-list")

const fetchReviews = () => {
  return swagger.get("/reviews")
}

// const fetchReviews = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/reviews`)
//     if (!response.ok) {
//       throw new Error("Network error")
//     }
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Failed fetching", error)
//     iziToast.error({
//       message: "Sorry, failed fetching reviews. Please try again later.",
//       timeout: 2000,
//     });
//     return [];
//   }
// };

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

async function renderReviews(event) {
  try {
    const reviews = await fetchReviews() 
    if (reviews.length === 0) {
      galleryReviews.innerHTML = "<p class='not-found'>Not found</p>"
      return
  } else {
    galleryReviews.innerHTML = markup(reviews)
    initSwiper()
  }
  } catch (error) {
    console.log(error)
  }
}

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 'auto',
    loop: false,
    allowTouchMove: true,
    keyboard: {
    enabled: true,
    onlyInViewport: false,
    },
    on: {
      reachEnd: () => {
        nextBtn.classList.add('disabled');
      },
      reachBeginning: () => {
        prevBtn.classList.add('disabled');
      },
      fromEdge: () => {
        nextBtn.classList.remove('disabled');
        prevBtn.classList.remove('disabled');
      }
    },
});
}


nextBtn.addEventListener("click", renderReviews)



// const fetchReviews = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/reviews`)
//     if (!response.ok) {
//       throw new Error("Network error")
//     }
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Failed fetching", error)
//     iziToast.error({
//       message: "Sorry, failed fetching reviews. Please try again later.",
//       timeout: 2000,
//     });
//     return [];
//   }
// };