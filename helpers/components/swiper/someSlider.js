import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper, removeSwiper } from './buildSwiper';

const someSlider = () => {
	const classNames = {
		slider: '.someSlider',
		wrapper: '.someSliderWrapper',
		arrowNext: '.someSliderNext',
		arrowPrev: '.someSliderPrev',
		pagination: '.someSliderDots',
	};

	const $sliderWrappers = document.querySelectorAll(classNames.wrapper);

	if (!$sliderWrappers.length) return;

	$sliderWrappers.forEach(($wrapper) => {
		const $slider = $wrapper.querySelector(classNames.slider);
		if (!$slider) return;

		const $prevArrow = $wrapper.querySelector(classNames.arrowPrev);
		const $nextArrow = $wrapper.querySelector(classNames.arrowNext);
		const $pagination = $wrapper.querySelector(classNames.pagination);

		buildSwiper($slider);

		const sliderInstance = new Swiper($slider, {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			speed: 800,
			// loop: true,
			navigation: {
				prevEl: $prevArrow,
				nextEl: $nextArrow,
			},
			pagination: {
				el: $pagination,
				type: 'bullets',
				clickable: true,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				1023: {
					slidesPerView: 4,
				},
			},
		});
	});
};

export default someSlider;
