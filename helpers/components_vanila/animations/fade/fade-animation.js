import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { exist } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

const animConfigDefault = {
	start: 'top 80%',
	duration: 1,
	ease: 'none',
	elementStartPosition: 100,
	elementEndPosition: 0,
};

const createAnimConfig = ($fadeElement) => {
	const trigger = $fadeElement.dataset.fadeTrigger || $fadeElement;
	const start = $fadeElement.dataset.fadeStart || animConfigDefault.start;
	const duration = $fadeElement.dataset.fadeDuration || animConfigDefault.duration;
	const ease = $fadeElement.dataset.fadeEase || animConfigDefault.ease;
	const direction = $fadeElement.dataset.fadeDirection;
	const elementStartPosition = $fadeElement.dataset.elementStartPosition || animConfigDefault.elementStartPosition;
	const elementEndPosition = $fadeElement.dataset.elementStartPosition || animConfigDefault.elementEndPosition;

	return {
		trigger,
		start,
		duration,
		ease,
		direction,
		elementStartPosition,
		elementEndPosition,
	};
};

const fadeAnim = () => {
	const $fadeItems = document.querySelectorAll('.js-fade-item');

	if (!exist($fadeItems)) {
		console.error('Fade elements not found!');
		return;
	}

	$fadeItems.forEach(($item) => {
		const ANIM_CONFIG = createAnimConfig($item);

		const setAnimDirection = (value) => {
			return ANIM_CONFIG.direction === value;
		};
		const setInitialConfig = (axis) => {
			return {
				opacity: 0,
				...axis,
			};
		};
		const setAnimConfig = (axis) => {
			return {
				opacity: 1,
				...axis,
				duration: ANIM_CONFIG.duration,
				ease: ANIM_CONFIG.ease,
			};
		};

		if (setAnimDirection('up')) {
			gsap.set($item, setInitialConfig({ y: ANIM_CONFIG.elementStartPosition }));
		} else if (setAnimDirection('down')) {
			gsap.set($item, setInitialConfig({ y: -ANIM_CONFIG.elementStartPosition }));
		} else if (setAnimDirection('right')) {
			gsap.set($item, setInitialConfig({ x: -ANIM_CONFIG.elementStartPosition }));
		} else if (setAnimDirection('left')) {
			gsap.set($item, setInitialConfig({ x: ANIM_CONFIG.elementStartPosition }));
		} else {
			gsap.set($item, setInitialConfig());
		}

		ScrollTrigger.create({
			id: 'fade',
			trigger: ANIM_CONFIG.trigger,
			start: ANIM_CONFIG.start,
			once: true,
			//	markers: true,
			onEnter: () => {
				if (setAnimDirection('up') || setAnimDirection('down')) {
					gsap.to($item, setAnimConfig({ y: ANIM_CONFIG.elementEndPosition }));
				} else if (setAnimDirection('right') || setAnimDirection('left')) {
					gsap.to($item, setAnimConfig({ x: ANIM_CONFIG.elementEndPosition }));
				} else {
					gsap.to($item, setAnimConfig());
				}
			},
		});
	});
};

export default fadeAnim;

//  How to use

// Just add .js-fade-item class to element wich you want to use with fade.
// If you need that the element moves during appears use 'data-fade-direction' attribute with values 'up', 'down', 'right', 'left'
// You can change animation parameters by adding the data-attribute to animatable element. Check 'fade-animation.pug' file in this folder
