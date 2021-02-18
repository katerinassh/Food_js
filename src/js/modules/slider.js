function slider({sliderSelector, nextArrow, prevArrow, totalQuantity, currentQuantity, slidesSelector, wrapper, field}) {
    // Slider

    const slider = document.querySelector(sliderSelector),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    currentId = document.querySelector(currentQuantity),
    total = document.querySelector(totalQuantity),
    slides = document.querySelectorAll(slidesSelector),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

    // Simple slider

    const textNumber = number => {
    if(number >= 10) {
        return number;
    } else {
        return `0${number}`;
    }
    }
    total.textContent = textNumber(+slides.length);
    currentId.textContent = textNumber(1);

    // let id = +currentId.textContent;
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
    })

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
    })

    // Slider navigation

    const dotsWrapper = document.createElement('ol');
    dotsWrapper.classList.add('carousel-indicators');
    slider.append(dotsWrapper);

    slides.forEach((slide, index) => {
    const dot = document.createElement('li');

    dot.classList.add('dot');
    dot.id = index + 1;

    dotsWrapper.append(dot);
    })

    const dots = dotsWrapper.querySelectorAll('.dot');
    dotHighlite();

    dotsWrapper.addEventListener('click', event => {
    dots.forEach(dot => dot.style.opacity = '0.5');
    if (event.target.className === 'dot') {
        navigationDot(+event.target.id);
        event.target.style.opacity = '1';
    }
    })

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

export default slider;