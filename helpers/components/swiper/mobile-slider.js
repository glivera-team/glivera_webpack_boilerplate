import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/scss/scrollbar';
import { buildSwiper } from './buildSwiper';

import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/mobile-slider.scss';

gsap.registerPlugin(ScrollTrigger);

const mobileSlider = ({ selector, controls }) => {
	Swiper.use([Navigation]);

	const { mediaPoint1 } = BREAKPOINTS;
	let $sliders = document.querySelectorAll(selector);

	$sliders.forEach((item) => {
		let sliderEl;
		let isInit = false;

		const $wrap = item.closest('.js-mobile-slider-wrap');
		const $prev = $wrap.querySelector('.js-mobile-slider-prev');
		const $next = $wrap.querySelector('.js-mobile-slider-next');

		const controlSettings = controls
			? {
					navigation: {
						prevEl: $prev,
						nextEl: $next,
					},
			  }
			: {};

		const destroy = (slider) => {
			let isInit = false;
			sliderEl.destroy();
		};

		const init = () => {
			if (!isInit) {
				sliderEl = new Swiper(item, {
					observer: true,
					observeParents: true,
					speed: 800,
					slidesPerView: 'auto',
					loop: false,
					...controlSettings,
					on: {
						init: () => {
							isInit = true;
						},
					},
				});
				isInit = true;
			}
		};

		buildSwiper(item);

		ScrollTrigger.matchMedia({
			[`(min-width: ${mediaPoint1}px)`]: () => {
				if (isInit) {
					destroy();
				}
			},
			[`(max-width: ${mediaPoint1 - 1}px)`]: () => {
				init();
			},
		});
	});
};

export default mobileSlider;
