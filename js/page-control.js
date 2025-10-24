let buttonBack = document.querySelector('.news__button-back');
let buttonForward = document.querySelector('.news__button-forward');

let buttonBackImage = document.querySelector('.news__button-image-back');
let buttonForwardImage = document.querySelector('.news__button-image-forward');

let news = document.querySelectorAll('.new');
let pageCount = document.querySelector('.news__count');
let newsContainer = document.querySelector('.news__wrapper');

let pageTranslate = 0;
let page = Number(pageCount.textContent);

const NEWS_PER_PAGE = 6; 

let countPagesWhole = ~~(news.length / NEWS_PER_PAGE);
let countPagesFractional = news.length % NEWS_PER_PAGE;

if (countPagesFractional > 0) {
    countPagesFractional = 1;
}

let countPagesWatch = countPagesWhole + countPagesFractional;

let pageNews = document.querySelectorAll('.news__page');
let pageSize = document.querySelector('.news__container');
for (let i = 0; i < pageNews.length; i++) {
    pageNews[i].style.width = String(pageSize.offsetWidth) + 'px';
}

if (page == 1) {
    buttonBackImage.classList.remove('news__button-image-back');
    buttonBackImage.classList.add('button-arrow--disable');
}

if (page == countPagesWatch) {
    buttonForwardImage.classList.remove('news__button-image-forward');
    buttonForwardImage.classList.add('button-arrow--disable');
} 

let checkPage = function () {
    if (page > 1) {
        buttonBackImage.classList.remove('button-arrow--disable');
        buttonBackImage.classList.add('news__button-image-back');
    } else {
        buttonBackImage.classList.remove('news__button-image-back');
        buttonBackImage.classList.add('button-arrow--disable');
    }

    if (page == countPagesWatch) {
        buttonForwardImage.classList.remove('news__button-image-forward');
        buttonForwardImage.classList.add('button-arrow--disable');
    } else {
        buttonForwardImage.classList.remove('button-arrow--disable');
        buttonForwardImage.classList.add('news__button-image-forward');
    }
}

buttonForward.addEventListener("click", function () {
    if (page < countPagesWatch) {
        newsContainer.style.transform = "translateX(" + (pageTranslate -= 100) + "%)";
        pageCount.textContent = (page += 1);
        checkPage();
    } 
});

buttonBack.addEventListener("click", function () {
    if (page > 1) {
        newsContainer.style.transform = "translateX(" + (pageTranslate += 100) + "%)";
        pageCount.textContent = (page -= 1);
        checkPage();
    }
});