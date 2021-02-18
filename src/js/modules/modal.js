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

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            modalEsc(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            modalEsc(modalSelector);
        }
    })

    function modalShowByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector);
            window.removeEventListener('scroll', modalShowByScroll);
        }
    }

    window.addEventListener('scroll', modalShowByScroll);

}

export default modal;
export {thanksModal, modalOpen};