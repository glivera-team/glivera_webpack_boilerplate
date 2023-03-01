import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { exist } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

const animConfigDefault = {
	start: 'top 50%',
	duration: 1,
	ease: 'none',
}

const createAnimConfig = ($fadeElement) => {
	const trigger = $fadeElement.dataset.fadeTrigger || $fadeElement;
	const start = $fadeElement.dataset.fadeStart || animConfigDefault.start;
	const duration = $fadeElement.dataset.fadeDuration || animConfigDefault.duration;
	const ease = $fadeElement.dataset.fadeEase || animConfigDefault.ease;
	const direction = $fadeElement.dataset.fadeDirection;
	
	return {
		trigger,
		start,
		duration,
		ease,
		direction
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
		
		const DIRECTIONS_MAP = new Map();
		DIRECTIONS_MAP.set('animStartEnd', {start: 100, end: 0});
		const animStartEnd = DIRECTIONS_MAP.get('animStartEnd');
		
		const setAnimDirection = (value) => {
			return ANIM_CONFIG.direction === value;
		};
		const gsapSet = (axis) => {
			return	{
				opacity: 0,
				...axis,
			}
		};
		const gsapTo = (axis) => {
			return	{
				opacity: 1,
				...axis,
				duration: ANIM_CONFIG.duration,
				ease: ANIM_CONFIG.ease,
			}
		};
			
		if (setAnimDirection('up')) {
			gsap.set($item, gsapSet({y: animStartEnd.start}));
		} 
		else if (setAnimDirection('down')) {
			gsap.set($item, gsapSet({y: -animStartEnd.start}));
		}  
		else if (setAnimDirection('right')) {
			gsap.set($item, gsapSet({x: -animStartEnd.start}));
		} 
		else if (setAnimDirection('left')) {
			gsap.set($item, gsapSet({x: animStartEnd.start}));
		} 
		else {
			gsap.set($item, gsapSet());
		}

		ScrollTrigger.create({
			id: 'fade',
			trigger: ANIM_CONFIG.trigger,
			start: ANIM_CONFIG.start,
			once: true,
			//markers: true,
			onEnter: () => {
				if (setAnimDirection('up') || setAnimDirection('down')) {
					gsap.to($item, gsapTo({y: animStartEnd.end}));
				}  else if (setAnimDirection('right') || setAnimDirection('left')) {
					gsap.to($item, gsapTo({x: animStartEnd.end}));
				} else {
					gsap.to($item, gsapTo());
				}
			},
		});
	});
};

export default fadeAnim;

//  How to use

// Just add .js-fade-item class to element wich you want to use with fade.
// If you need that the element moves during appears use 'data-fade-direction' attribute with values 'up', 'down', 'right', 'left'
// You can change animation parameters by adding the data-attribute to animatable element. Check 'createAnimConfig' variable
