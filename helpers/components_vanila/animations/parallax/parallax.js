import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exist } from '../utils/index';

gsap.registerPlugin(ScrollTrigger);

const animConfigDefault = {
	speed: '180',
	direction: -1,
	start: 'top bottom',
	end: 'bottom top',
}
const createAnimConfig = ($parallaxElement) => {
	const trigger = $parallaxElement.dataset.parallaxTrigger || $parallaxElement;
	const speed = $parallaxElement.dataset.parallaxSpeed || animConfigDefault.speed;
	const direction = $parallaxElement.dataset.parallaxDirection || animConfigDefault.direction;
	const start = $parallaxElement.dataset.parallaxTrigger || animConfigDefault.start;
	const end = $parallaxElement.dataset.parallaxTrigger || animConfigDefault.end;
	
	return {
		trigger,
		speed,
		direction,
		start,
		end,
	};
};

const parallaxAnim = () => {
	const $parallaxItems = document.querySelectorAll('.js-parallax-item');

	if (!exist($parallaxItems)) {
		console.error('Parallax elements not found!');
		return;
	}

	$parallaxItems.forEach(($item) => {
		const ANIM_CONFIG = createAnimConfig($item);
		gsap.to($item, {
			y: ANIM_CONFIG.speed * ANIM_CONFIG.direction,
			ease: 'none',
			scrollTrigger: {
				id: 'parallax',
				trigger: ANIM_CONFIG.trigger,
				start: ANIM_CONFIG.start,
				end: ANIM_CONFIG.end,
				ease: 'none',
				scrub: true,
				//markers: true,
			},
		});
	});
};

export default parallaxAnim;

//  How to use

// Just add .js-parallax-item class to element wich you want to be with parallax
// You can change animation parameters by adding the data-attribute to animatable element. Check 'createAnimConfig' variable
