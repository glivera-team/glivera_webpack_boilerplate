import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper, removeSwiper } from './build-swiper';

import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/mobile-slider.scss';

gsap.registerPlugin(ScrollTrigger);

const mobileSlider = () => {
	const classNames = {
		slider: '.js-mobile-slider',
		wrapper: '.js-mobile-slider-wrapper',
		arrowNext: '.js-mobile-slider-next',
		arrowPrev: '.js-mobile-slider-prev',
	};

	Swiper.use([Navigation, Pagination]);

	const { mediaPoint1 } = BREAKPOINTS;
	const $sliderWrappers = document.querySelectorAll(classNames.wrapper);

	$sliderWrappers.forEach(($wrapper) => {
		let sliderEl;
		let isInit = false;

		const $slider = $wrapper.querySelector(classNames.slider);
		const $prevArrow = $wrapper.querySelector(classNames.arrowPrev);
		const $nextArrow = $wrapper.querySelector(classNames.arrowNext);

		const init = () => {
			if (!isInit) {
				buildSwiper($slider);
				
				sliderEl = new Swiper($slider, {
					observer: true,
					observeParents: true,
					speed: 800,
					slidesPerView: 'auto',
					loop: false,
					navigation: {
						prevEl: $prevArrow,
						nextEl: $nextArrow,
					},
					on: {
						init: () => {
							isInit = true;
						},
					},
				});
			}
		};
		
		const removeInit = () => {
			if (isInit) {
				removeSwiper($slider);
				sliderEl.destroy();
				isInit = false;
			}
		};

		const mMedia = gsap.matchMedia();
		
		mMedia.add([`(min-width: ${mediaPoint1}px)`], () => {
			removeInit();
		});
		mMedia.add([`(max-width: ${mediaPoint1 - 1}px)`], () => {
			init();
		});
	});
};

export default mobileSlider;

//	How to use

// 	Optionally rename classes wich variable 'classNames' contains and add to your html elements wich should be a slider elements.
//  Import some-slider.js to page or block with slider.
//  Init slider by mobileSlider();

