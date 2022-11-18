import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import RefreshAnimationOnResize from './RefreshAnimationOnResize';
import { GLOBAL_VARS } from '../utils/constants';

class AnimSample {
	constructor() {
		this.init();
	}

	initAnimation(windowWidth) {
		if (windowWidth < GLOBAL_VARS.mediaPoint1) return; // If you need disable anim on mobile

		const $trigger = document.querySelector('.test');

		let tl = gsap.timeline({
			scrollTrigger: {
				id: 'test',
				trigger: $trigger,
				start: 'top top',
				end: `top+=${windowWidth} top`,
				scrub: true,
				pin: true,
				markers: true,
			},
		});

		tl.to($trigger, {
			y: windowWidth,
		});
	}

	init() {
		const resize = new RefreshAnimationOnResize(this.initAnimation.bind(this));
	}
}

export default AnimSample;
