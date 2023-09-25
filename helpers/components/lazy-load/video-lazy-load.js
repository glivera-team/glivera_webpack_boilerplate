/* eslint-disable no-param-reassign */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videoLazyLoad = () => {
	// NOTE: just put data-src to your video tag
	const $videos = document.querySelectorAll('video[data-src]');

	if (!$videos.length) return;

	const playVideo = ($video) => {
		$video.play();
	};

	const pauseVideo = ($video) => {
		$video.pause();
	};

	$videos.forEach(($video) => {
		let isLoaded = false;
		const source = $video.dataset.src;

		ScrollTrigger.create({
			trigger: $video,
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => {
				if (!isLoaded) {
					$video.src = source;
					$video.muted = true;
					isLoaded = true;
				}

				playVideo($video);
			},
			onEnterBack: () => playVideo($video),
			onLeave: () => pauseVideo($video),
			onLeaveBack: () => pauseVideo($video),
		});
	});
};

export default videoLazyLoad;
