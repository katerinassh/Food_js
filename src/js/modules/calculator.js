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
        })

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
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
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
            })
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

export default calculator;
    