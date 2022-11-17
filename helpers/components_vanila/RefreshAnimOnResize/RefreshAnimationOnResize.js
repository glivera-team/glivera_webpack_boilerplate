import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { getWindowSize, isFunction } from '../utils';

class RefreshAnimationOnResize {
	removeMatchMedia() {
		ScrollTrigger.clearMatchMedia(`(max-width: ${this.windowWidth + 1}px) and (min-width: ${this.windowWidth - 1}px)`);
	}

	initMatchMedia() {
		ScrollTrigger.matchMedia({
			[`(max-width: ${this.windowWidth + 1}px) and (min-width: ${this.windowWidth - 1}px)`]: () => {
				this.animation();
			},
		});
	}

	onWindowResize() {
		setTimeout(() => {
			this.removeMatchMedia();

			this.windowWidth = getWindowSize().windowWidth;
			this.initMatchMedia();
			ScrollTrigger.refresh();
		}, 50);
	}

	initInstance() {
		gsap.registerPlugin(ScrollTrigger);
		this.windowWidth = getWindowSize().windowWidth;

		this.initMatchMedia();
		window.addEventListener('resize', this.onWindowResize);
	}

	constructor(fn) {
		if (!fn || (fn && !isFunction(fn))) return;

		this.animation = fn;

		this.onWindowResize = this.onWindowResize.bind(this);
		this.initInstance();
	}
}

export default RefreshAnimationOnResize;
