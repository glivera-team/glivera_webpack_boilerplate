import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fade = () => {
	const settings = {
		el: '.js-fade-el',
	};

	const $fadeEl = document.querySelectorAll(settings.el);
	if ($fadeEl.length) {
		gsap.set($fadeEl, {
			y: 20,
			opacity: 0,
		});

		ScrollTrigger.batch($fadeEl, {
			start: 'top 85%',
			once: true,
			onEnter: (batch) =>
				gsap.to(batch, {
					duration: 0.4,
					opacity: 1,
					y: 0,
					stagger: 0.1,
					ease: 'none',
				}),
		});
	}
};

export default fade;
