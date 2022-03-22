const buildSliders = (sliderClass) => {
	let sliders = document.querySelectorAll(`${sliderClass}:not(.swiper)`);
	if (sliders) {
		sliders.forEach(slider => {
			const el = slider;
			const htmlStructure = `<div class="swiper-wrapper">${slider.innerHTML}</div>`;
			el.classList.add('swiper');
			el.innerHTML = htmlStructure;
			const slides = el.querySelector('.swiper-wrapper').children;

			Array.from(slides).forEach(slide => slide.classList.add('swiper-slide'));
		});
	}
};

export default buildSliders;
