import {postForm} from '../services/services';
import {thanksModal} from './modal';

function forms(formsSelector) {

    const forms = document.querySelectorAll(formsSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Отправка успешно выполнена',
        failure: 'Что-то пошло не так'
    };

    function bindPostForm(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusImage = document.createElement('img');
            statusImage.src = message.loading;
            statusImage.style.cssText = 'margin: 0 auto; display: block';

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            form.insertAdjacentElement('afterend', statusImage);

            postForm('http://localhost:3000/requests', json)
            .then(data => {
                thanksModal(message.success, '.modal');
                console.log(data);
            })
            .catch(() => thanksModal(message.failure, '.modal'))
            .finally(() => {
                form.reset();
                statusImage.remove();
            });
        })
    }

    forms.forEach(form => {
        bindPostForm(form);
    });
}

export default forms;