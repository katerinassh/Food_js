/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_times__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/times */ "./src/js/modules/times.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");








document.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpen)('.modal', modalTimer), 30000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal');
  (0,_modules_times__WEBPACK_IMPORTED_MODULE_1__.default)('2021-03-01', '.timer');
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
    sliderSelector: '.offer__slider',
    nextArrow: '.offer__slider .offer__slider-next',
    prevArrow: '.offer__slider .offer__slider-prev',
    totalQuantity: '.offer__slider #total',
    currentQuantity: '.offer__slider #current',
    slidesSelector: '.offer__slider .offer__slide',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__.default)('.menu__field .container');
});

/***/ }),

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calculator() {
  let sex, height, weight, age, activity;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('activity')) {
    activity = localStorage.getItem('activity');
  } else {
    activity = '1.375';
    localStorage.setItem('activity', activity);
  }

  function initCalculator(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);

      if (element.getAttribute('data-ratio') === localStorage.getItem('activity')) {
        element.classList.add(activeClass);
      }

      if (element.getAttribute('id') === localStorage.getItem('sex')) {
        element.classList.add(activeClass);
      }
    });
  }

  initCalculator('#gender div', 'calculating__choose-item_active');
  initCalculator('.calculating__choose_big div', 'calculating__choose-item_active');
  const result = document.querySelector('.calculating__result span');

  function calculateKalories() {
    if (!sex || !height || !weight || !age || !activity) {
      result.textContent = "___";
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
    }
  }

  calculateKalories();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('click', () => {
        elements.forEach(div => div.classList.remove(activeClass));
        element.classList.add(activeClass);

        if (element.getAttribute('data-ratio')) {
          activity = +element.getAttribute('data-ratio');
          localStorage.setItem('activity', activity);
        } else {
          sex = element.getAttribute('id');
          localStorage.setItem('sex', sex);
        }

        calculateKalories();
      });
    });
  }

  function getDynamicInformation(id) {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.id) {
        case 'height':
          height = +input.value;
          break;

        case 'weight':
          weight = +input.value;
          break;

        case 'age':
          age = +input.value;
          break;
      }

      calculateKalories();
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  getDynamicInformation("height");
  getDynamicInformation("weight");
  getDynamicInformation("age");
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards(containerSelector) {
  class MenuItem {
    constructor(image, alt, subtitle, description, cost, ...classes) {
      this.image = image;
      this.alt = alt;
      this.subtitle = subtitle;
      this.description = description;
      this.cost = cost;
      this.classes = classes;
      this.transfer = 29;
      this.changeToUAH();
    }

    changeToUAH() {
      this.cost = this.cost * this.transfer;
    }

    create(parentContainer) {
      const div = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      } else {
        this.classes.forEach(className => div.classList.add(className));
      }

      div.innerHTML = `<img src=${this.image} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                    </div>`;
      parentContainer.append(div);
    }

  }

  const container = document.querySelector(containerSelector);
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getSources)('http://localhost:3000/menu');
  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuItem(img, altimg, title, descr, price).create(container);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");



function forms(formsSelector) {
  const forms = document.querySelectorAll(formsSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Отправка успешно выполнена',
    failure: 'Что-то пошло не так'
  };

  function bindPostForm(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let statusImage = document.createElement('img');
      statusImage.src = message.loading;
      statusImage.style.cssText = 'margin: 0 auto; display: block';
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      form.insertAdjacentElement('afterend', statusImage);
      (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postForm)('http://localhost:3000/requests', json).then(data => {
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.thanksModal)(message.success, '.modal');
        console.log(data);
      }).catch(() => (0,_modal__WEBPACK_IMPORTED_MODULE_1__.thanksModal)(message.failure, '.modal')).finally(() => {
        form.reset();
        statusImage.remove();
      });
    });
  }

  forms.forEach(form => {
    bindPostForm(form);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "thanksModal": function() { return /* binding */ thanksModal; },
/* harmony export */   "modalOpen": function() { return /* binding */ modalOpen; }
/* harmony export */ });
function modalOpen(modalSelector, idTimer) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add('show');
  modalWindow.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (idTimer) {
    clearInterval(idTimer);
  }
}

function modalEsc(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove('show');
  modalWindow.classList.add('hide');
  document.body.style.overflow = '';
}

function thanksModal(message, modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  const prevModal = document.querySelector('.modal__dialog');
  const newModal = document.createElement('div');
  modalOpen(modalSelector);
  prevModal.classList.add('hide');
  newModal.classList.add('modal__dialog', 'show');
  newModal.innerHTML = `<div class="modal__content">
    <div data-close class="modal__close">&times;</div>
    <div class="modal__title">${message}</div>
    </div>`;
  setTimeout(() => {
    newModal.remove();
    prevModal.classList.remove('hide');
    modalEsc(modalSelector);
  }, 4000);
  modalWindow.append(newModal);
}

function modal(triggersSelector, modalSelector) {
  const btnsTrigger = document.querySelectorAll(triggersSelector),
        modalWindow = document.querySelector(modalSelector);
  btnsTrigger.forEach(item => {
    item.addEventListener('click', () => modalOpen(modalSelector));
  });
  modalWindow.addEventListener('click', event => {
    if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
      modalEsc(modalSelector);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
      modalEsc(modalSelector);
    }
  });

  function modalShowByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalOpen(modalSelector);
      window.removeEventListener('scroll', modalShowByScroll);
    }
  }

  window.addEventListener('scroll', modalShowByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider({
  sliderSelector,
  nextArrow,
  prevArrow,
  totalQuantity,
  currentQuantity,
  slidesSelector,
  wrapper,
  field
}) {
  // Slider
  const slider = document.querySelector(sliderSelector),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        currentId = document.querySelector(currentQuantity),
        total = document.querySelector(totalQuantity),
        slides = document.querySelectorAll(slidesSelector),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; // Simple slider

  const textNumber = number => {
    if (number >= 10) {
      return number;
    } else {
      return `0${number}`;
    }
  };

  total.textContent = textNumber(+slides.length);
  currentId.textContent = textNumber(1); // let id = +currentId.textContent;
  // dispalyParticularSlide();
  // function dispalyParticularSlide(id = 1) {
  //     slides.forEach((slide, index) => {
  //         if(index + 1 != id) {
  //             slide.classList.add('hide');
  //         } else {
  //             slide.classList.remove('hide');
  //         }
  //     })
  //     currentId.textContent = textNumber(id);
  // }
  // next.addEventListener('click', () => {
  //     if(id < +total.textContent) {
  //         id++;
  //     } else {
  //         id = 1;
  //     }
  //     dispalyParticularSlide(id);
  // })
  // prev.addEventListener('click', () => {
  //     if(id > 1) {
  //         id--;
  //     } else {
  //         id = +total.textContent;
  //     }
  //     dispalyParticularSlide(id);
  // })
  // Carousel

  slider.style.position = 'relative';
  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(slide => slide.style.width = width);
  slidesField.style.display = 'flex';
  slidesField.style.transition = 'all ease-out 0.5s';
  slidesWrapper.style.overflow = 'hidden';
  let x = 0;
  let id = 1;

  function transformIntoNumber(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (x === -(transformIntoNumber(width) * (slides.length - 1))) {
      x = 0;
      id = 1;
    } else {
      x -= transformIntoNumber(width);
      id++;
    }

    slidesField.style.transform = `translateX(${x}px)`;
    dotHighlite(id);
    currentId.textContent = textNumber(id);
  });
  prev.addEventListener('click', () => {
    if (x === 0) {
      x = -(transformIntoNumber(width) * (slides.length - 1));
      id = +total.textContent;
    } else {
      x += transformIntoNumber(width);
      id--;
    }

    slidesField.style.transform = `translateX(${x}px)`;
    dotHighlite(id);
    currentId.textContent = textNumber(id);
  }); // Slider navigation

  const dotsWrapper = document.createElement('ol');
  dotsWrapper.classList.add('carousel-indicators');
  slider.append(dotsWrapper);
  slides.forEach((slide, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.id = index + 1;
    dotsWrapper.append(dot);
  });
  const dots = dotsWrapper.querySelectorAll('.dot');
  dotHighlite();
  dotsWrapper.addEventListener('click', event => {
    dots.forEach(dot => dot.style.opacity = '0.5');

    if (event.target.className === 'dot') {
      navigationDot(+event.target.id);
      event.target.style.opacity = '1';
    }
  });

  function navigationDot(n) {
    x = -(transformIntoNumber(width) * (n - 1));
    slidesField.style.transform = `translateX(${x}px)`;
    id = n;
    currentId.textContent = textNumber(id);
  }

  function dotHighlite(id = 1) {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[id - 1].style.opacity = '1';
  }
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(containerSelector, headerSelector, contentSelector, activeClass) {
  const tabsContainer = document.querySelector(containerSelector),
        tabsHeader = document.querySelectorAll(headerSelector),
        tabsContent = document.querySelectorAll(contentSelector);

  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
    tabsHeader.forEach(item => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabsHeader[i].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();
  tabsContainer.addEventListener('click', event => {
    tabsHeader.forEach((item, i) => {
      if (item == event.target) {
        hideTabContent();
        item.classList.add(activeClass);
        showTabContent(i);
      }
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/modules/times.js":
/*!*********************************!*\
  !*** ./src/js/modules/times.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(deadline, clockSelector) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          time = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);
    }
  }

  setClock(clockSelector, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postForm": function() { return /* binding */ postForm; },
/* harmony export */   "getSources": function() { return /* binding */ getSources; }
/* harmony export */ });
const postForm = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await response.json();
};

const getSources = async url => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not get sources right. Status: ${result.status}`);
  }

  return await result.json(); // getSources('http://localhost:3000/menu')
  // .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //         new MenuItem(img, altimg, title, descr, price).create(container);
  //     })
  // })
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main_bundle.js.map