let buttonBurger = document.querySelector('.header__burger');
let navigation = document.querySelector('.navigation');
let burgerIcon = document.querySelector('.header__burger-line');
let body = document.querySelector('.body');

let backgroundButton = document.querySelector('.background-button');

let buttonClick = false;

buttonBurger.addEventListener("click", function () {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	
	if (!buttonClick) {
		body.style.overflow = 'hidden';

		backgroundButton.style.display = 'block';
		burgerIcon.classList.add("header__burger-click");

		// navigation.style.clipPath = "clip-path: polygon(50% 0%, 50% 0, 50% 0)";
		navigation.style.visibility = 'visible';
		navigation.style.transform = 'scale(1)';

		buttonClick = true;
	} else {
		body.style.overflow = 'visible';
		navigation.style.visibility = 'hidden';
		navigation.style.transform = 'scale(0, 1)';
		burgerIcon.classList.remove("header__burger-click");
		buttonClick = false;
	}
});

backgroundButton.addEventListener("click", function () {
	body.style.overflow = 'visible';
	navigation.style.visibility = 'hidden';
	navigation.style.transform = 'scale(0, 1)';
	burgerIcon.classList.remove("header__burger-click");
	buttonClick = false;
	backgroundButton.style.display = 'none';
});