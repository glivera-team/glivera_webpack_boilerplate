import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const parallaxInit = () => {
	gsap.registerPlugin(ScrollTrigger);

	const $parallaxItems = document.querySelectorAll('.js-parallax-item');

	if (!$parallaxItems.length) return;

	$parallaxItems.forEach(item => {
		const parallaxSpeed = item.dataset.parallax_speed || '180';  // default parallax speed
		const $trigger = item;

		gsap.to(item, {
			y: parallaxSpeed * -1,
			ease: 'none',
			scrollTrigger: {
				id: 'parallax',
				trigger: $trigger,
				start: 'top 100%',
				end: 'bottom top',
				ease: 'none',
				scrub: true,
			},
		});
	});
};

export default parallaxInit;

//  How to use

// Just add .js-parallax-item class to element wich you want to be with parallax
