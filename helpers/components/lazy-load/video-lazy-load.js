/* eslint-disable no-param-reassign */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videoLazyLoad = () => {
	// NOTE: just put data-src to your video tag
	const $nodes = document.querySelectorAll('[data-src]');
	const $videos = [...$nodes].filter(($node) => $node.tagName === 'VIDEO');

	if (!$videos.length) return;

	const playVideo = ($video) => {
		$video.play();
	};

	const pauseVideo = ($video) => {
		$video.pause();
	};

	$videos.forEach(($video) => {
		const source = $video.dataset.src;

		$video.src = source;
		$video.muted = true;

		ScrollTrigger.create({
			trigger: $video,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => playVideo($video),
			onEnterBack: () => playVideo($video),
			onLeave: () => pauseVideo($video),
			onLeaveBack: () => pauseVideo($video),
		});
	});
};

export default videoLazyLoad;
