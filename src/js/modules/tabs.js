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
        })

    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabsHeader[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    tabsContainer.addEventListener('click', (event) => {
        tabsHeader.forEach((item, i) => {
            if (item == event.target) {
                hideTabContent();
                item.classList.add(activeClass);
                showTabContent(i);
            }
        });
    });
}

export default tabs;