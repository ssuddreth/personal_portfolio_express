const filter_btns = document.querySelectorAll(".filter-btn");
const gridItem = document.querySelector('grid-item');
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const form = document.getElementById("contact-me-form");
const success = document.getElementById('success');


filter_btns.forEach(btn => 
    btn.classList.add('active'));


  window.addEventListener("scroll", () => {
      skillsEffect();
      countUp();
  })

  function checkScroll(el) {
      let rect = el.getBoundingClientRect();
      if (window.innerHeight >= rect.top + el.offsetHeight) return true;
      return false;
  }

  function skillsEffect() {
      if(!checkScroll(skills_wrap)) return;
      skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
  }

  function countUp() {
    if(!checkScroll(records_wrap)) return;
    records_numbers.forEach((numb) => {
        const updateCount = () => {
            let currentNum = +numb.innerText;
            let maxNum = +numb.dataset.num;
            let speed = 100;
            const increment = Math.ceil(maxNum / speed);

            if (currentNum < maxNum) {
                numb.innerText = currentNum + increment;
                setTimeout(updateCount, 1);
            }
            else {
                numb.innerText = maxNum;
            }
        }

        setTimeout(updateCount, 400);
    });
  }

  const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    let mail = new FormData(form);
    sendMail(mail);
    success.style.display = 'block';
  });
  
  const sendMail = (mail) => {
    fetch("/send", {
      method: "post",
      body: mail,
    }).then((response) => {
      return response.json();
    });
  };

  var mySwiper = new Swiper(".swiper-container", {
      speed: 1100, 
      slidesPerView: 1,
      loop: true,
      autoplay: {
          delay: 5000,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });