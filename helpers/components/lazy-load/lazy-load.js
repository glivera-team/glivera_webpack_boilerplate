/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const imgLazyLoad = () => {
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

		const trigger = ScrollTrigger.create({
			trigger: $image,
			start: 'top-=200% bottom',
			end: 'bottom+=200% top',
			onEnter: () => {
				$image.addEventListener('load', () => {
					trigger?.kill();
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

export const videoLazyLoad = () => {
	// NOTE: just put data-src to your video tag
	const $videos = document.querySelectorAll('video[data-src]');

	if (!$videos.length) return;

	$videos.forEach(($video) => {
		const source = $video.dataset.src;

		const trigger = ScrollTrigger.create({
			trigger: $video,
			start: 'top-=200% bottom',
			end: 'bottom+=200% top',
			onEnter: () => {
				$video.addEventListener('loadeddata', () => {
					trigger?.kill();
				});

				$video.src = source;
			},
		});
	});
};
