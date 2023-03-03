import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper, removeSwiper } from './build-swiper';
import 'ScssComponents/mobile-slider.scss';

gsap.registerPlugin(ScrollTrigger);

const CLASS_NAMES = {
	slider: '.js-mobile-slider',
	arrowNext: '.js-mobile-slider-next',
	arrowPrev: '.js-mobile-slider-prev',
};

Swiper.use([Navigation]);

const mobileSlider = ({ rootSelector, breakpoint }) => {
	const $sliderWrapper = document.querySelector(rootSelector);
	let sliderEl;
	let isInit = false;

	const $slider = $sliderWrapper.querySelector(CLASS_NAMES.slider);
	const $prevArrow = $sliderWrapper.querySelector(CLASS_NAMES.arrowPrev);
	const $nextArrow = $sliderWrapper.querySelector(CLASS_NAMES.arrowNext);

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

	const destroy = () => {
		if (isInit) {
			removeSwiper($slider);
			sliderEl.destroy();
			isInit = false;
		}
	};

	const matchMedia = gsap.matchMedia();

	matchMedia.add([`(min-width: ${breakpoint}px)`], () => {
		destroy();
	});
	matchMedia.add([`(max-width: ${breakpoint - 1}px)`], () => {
		init();
	});
};

export default mobileSlider;

//	How to use

//  Init slider by
//	mobileSlider({
//		rootSelector: '.slider',
//		breakpoint: 768,
//	});
