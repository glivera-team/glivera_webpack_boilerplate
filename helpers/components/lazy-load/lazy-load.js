import gsap from 'gsap';

const lazyLoad = () => {
	// NOTE: just put data-src to your img/video tag or data-srcset to <source> tag of picture
	const $nodes = document.querySelectorAll('[data-src]');

	if (!$nodes.length) return;

	gsap.registerPlugin(ScrollTrigger);

	$nodes.forEach(($node) => {
		const $parent = $node.parentElement;
		const wrapperMode = $parent.tagName;
		const srcSet = $node.dataset.srcset;
		const source = $node.dataset.src;

		if (!srcSet && !source) return;

		const needRefresh =
			$node.dataset.refresh === undefined ||
			$parent.dataset.refresh === undefined;

		const trigger = ScrollTrigger.create({
			trigger: wrapperMode === 'VIDEO' ? $parent : $node,
			start: 'top-=200% bottom',
			end: 'bottom+=200% top',
			onEnter: () => {
				$node.addEventListener('load', () => {
					trigger?.kill();
					if (needRefresh) {
						ScrollTrigger.refresh();
					}
				});

				if (wrapperMode === 'PICTURE') {
					const $sources = $parent.querySelectorAll('source');
					$sources.forEach(($src) => ($src.srcset = $src.dataset.srcset));
				}

				$node.src = source;

				if (wrapperMode === 'VIDEO') {
					console.warn(
						'lazy loading doesnt work for video <source> tag, use data-src for <video> only',
					);
				}
			},
		});
	});
};

export default lazyLoad;
