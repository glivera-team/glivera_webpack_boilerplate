import Swiper, { Navigation, Pagination } from 'swiper';
import { exist } from '../utils/index';
import { buildSwiper, removeSwiper } from './build-swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import 'ScssComponents/slider.scss';

const CLASS_NAMES = {
	slider: '.js-slider',
	nextArrow: '.js-slider-next',
	prevArrow: '.js-slider-prev',
	pagination: '.js-slider-dots',
};

Swiper.use([Navigation, Pagination]);

const slider = ({ rootSelector }) => {
	const $sliderWrapper = document.querySelector(rootSelector);
	console.log($sliderWrapper);

	if (!exist($sliderWrapper)) return;

	const $slider = $sliderWrapper.querySelector(CLASS_NAMES.slider);
	const $prevArrow = $sliderWrapper.querySelector(CLASS_NAMES.prevArrow);
	const $nextArrow = $sliderWrapper.querySelector(CLASS_NAMES.nextArrow);
	const $pagination = $sliderWrapper.querySelector(CLASS_NAMES.pagination);
	console.log($nextArrow);
	buildSwiper($slider);

	const sliderInstance = new Swiper($slider, {
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
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});
};

export default slider;

//	How to use

//  Init slider by slider({rootSelector: '.slider'});
