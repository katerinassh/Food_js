import {getSources} from '../services/services';

function cards(containerSelector) {

    class MenuItem {
        constructor (image, alt, subtitle, description, cost, ...classes) {
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

    getSources('http://localhost:3000/menu');

    axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price).create(container);
        })
    })
}

export default cards;