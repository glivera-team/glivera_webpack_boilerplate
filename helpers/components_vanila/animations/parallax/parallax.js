import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exist } from '../utils/index';

const parallaxInit = () => {
	gsap.registerPlugin(ScrollTrigger);

	const $parallaxItems = document.querySelectorAll('.js-parallax-item');

	if (!exist($parallaxItems)) {
		console.error('Parallax elements not found!');
		return;
	}

	$parallaxItems.forEach(($item) => {
		const parallaxSpeed = $item.dataset.parallaxSpeed || '180';
		const parallaxDirection = $item.dataset.parallaxSpeed || -1;
		const parallaxTrigger = $item.dataset.parallaxTrigger || $item;
		const parallaxStart = $item.dataset.parallaxTrigger || 'top bottom';
		const parallaxEnd = $item.dataset.parallaxTrigger || 'bottom top';

		gsap.to($item, {
			y: parallaxSpeed * parallaxDirection,
			ease: 'none',
			scrollTrigger: {
				id: 'parallax',
				trigger: parallaxTrigger,
				start: parallaxStart,
				end: parallaxEnd,
				ease: 'none',
				scrub: true,
			},
		});
	});
};

export default parallaxInit;

//  How to use

// Just add .js-parallax-item class to element wich you want to be with parallax
