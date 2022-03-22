import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import buildSliders from './buildSwiper';

const someSlider = () => {
	const sliderClass = '.someSlider';
	buildSliders(sliderClass);

	let slideEl = document.querySelectorAll(sliderClass);

	if (typeof (slideEl) !== 'undefined' && slideEl != null) {
		let sliderEl = new Swiper(sliderClass, {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			speed: 800,
			// loop: true,
			navigation: {
				prevEl: '.slider_arrow--prev',
				nextEl: '.slider_arrow--next',
			},
			pagination: {
				el: '.slider_dots',
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
	}
};

export default someSlider;
