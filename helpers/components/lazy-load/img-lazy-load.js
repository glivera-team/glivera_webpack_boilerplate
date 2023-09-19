/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const imgLazyLoad = () => {
	// NOTE: just put data-src to your img tag or data-srcset to <source> tag of picture
	const $nodes = document.querySelectorAll('[data-src]');
	const $images = [...$nodes].filter(($node) => $node.tagName !== 'VIDEO');

	if (!$nodes.length) return;

	$images.forEach(($image) => {
		const $parent = $image.parentElement;
		const wrapperMode = $parent.tagName;
		const srcSet = $image.dataset.srcset;
		const source = $image.dataset.src;

		if (!srcSet && !source) return;

		const needRefresh = $image.dataset.refresh === undefined || $parent.dataset.refresh === undefined;

		const trigger = ScrollTrigger.create({
			trigger: $image,
			start: 'top-=200% bottom',
			end: 'bottom+=200% top',
			onEnter: () => {
				$image.addEventListener('load', () => {
					trigger?.kill();
					if (needRefresh) {
						ScrollTrigger.refresh();
					}
				});

				if (wrapperMode === 'PICTURE') {
					const $sources = $parent.querySelectorAll('source');
					$sources.forEach(($src) => ($src.srcset = $src.dataset.srcset));
				}

				$image.src = source;
			},
		});
	});
};

export default imgLazyLoad;
