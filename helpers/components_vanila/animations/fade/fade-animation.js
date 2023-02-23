import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeAnim = () => {
	const $fadeItem = document.querySelectorAll('.js-fade-item');
	
	if (!$fadeItem.length) return;

	ScrollTrigger.refresh();
	
	$fadeItem.forEach(($item) => {
		gsap.set($item, {
			opacity: 0,
		});

		ScrollTrigger.create({
			trigger: $item,
			start: 'top 50%',
			once: true,
			// markers: true,
			onEnter: () => {
				gsap.to($item, {
					opacity: 1,
					duration: 1,
					ease: 'none',
				});
			},
		});
	});
};


export default fadeAnim;


//  How to use

// Just add .js-fade-item class to element wich you want to use with fade
