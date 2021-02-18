import tabs from './modules/tabs';
import times from './modules/times';
import calculator from './modules/calculator';
import modal from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';

import {modalOpen} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => modalOpen('.modal', modalTimer), 30000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    times('2021-03-01', '.timer');
    calculator();
    forms('form');
    slider({
        sliderSelector: '.offer__slider',
        nextArrow: '.offer__slider .offer__slider-next',
        prevArrow: '.offer__slider .offer__slider-prev',
        totalQuantity: '.offer__slider #total',
        currentQuantity: '.offer__slider #current',
        slidesSelector: '.offer__slider .offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards('.menu__field .container');
});

