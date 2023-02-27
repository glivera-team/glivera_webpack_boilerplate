import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeAnim = () => {
	const $fadeItems = document.querySelectorAll('.js-fade-item');

	if (!$fadeItems.length) return;

	$fadeItems.forEach(($item) => {
		const fadeTrigger = $item.dataset.fadeTrigger || $item;
		const fadeStart = $item.dataset.fadeStart || 'top 50%';
		const fadeDuration = $item.dataset.fadeDuration || 1;
		const fadeEase = $item.dataset.fadeEase || 'none';
		const fadeDirectionValue = $item.dataset.fadeDirection;

		const fadeDirection = () => {
			switch (fadeDirectionValue) {
				case 'up':
				case 'left':
					return {
						start: 100,
						end: 0,
					};
					break;
				case 'down':
				case 'right':
					return {
						start: -100,
						end: 0,
					};
					break;
			}
		};
		const direction = fadeDirection();

		switch (fadeDirectionValue) {
			case 'up':
			case 'down':
				gsap.set($item, {
					opacity: 0,
					y: direction.start,
				});
				break;
			case 'right':
			case 'left':
				gsap.set($item, {
					opacity: 0,
					x: direction.start,
				});
				break;
			default:
				gsap.set($item, {
					opacity: 0,
				});
		}

		ScrollTrigger.create({
			id: 'fade',
			trigger: fadeTrigger,
			start: fadeStart,
			once: true,
			//markers: true,
			onEnter: () => {
				switch (fadeDirectionValue) {
					case 'up':
					case 'down':
						gsap.to($item, {
							opacity: 1,
							y: direction.end,
							duration: fadeDuration,
							ease: fadeEase,
						});
						break;
					case 'right':
					case 'left':
						gsap.to($item, {
							opacity: 1,
							x: direction.end,
							duration: fadeDuration,
							ease: fadeEase,
						});
						break;
					default:
						gsap.to($item, {
							opacity: 1,
							duration: fadeDuration,
							ease: fadeEase,
						});
				}
			},
		});
	});
};

export default fadeAnim;

//  How to use

// Just add .js-fade-item class to element wich you want to use with fade.
// If you need that the element moves during appears use 'data-fade-direction' attribute with values 'up', 'down', 'right', 'left'
