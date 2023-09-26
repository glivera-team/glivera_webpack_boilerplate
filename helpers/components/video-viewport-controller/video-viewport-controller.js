import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const videoViewportController = (videoSelector) => {
	// NOTE: just put js-selector (class) to your video tag and specify this selector when call the fuction
	const $videos = document.querySelectorAll(videoSelector);

	if (!$videos.length) return;

	const playVideo = ($video) => {
		if ($video.readyState !== 4) {
			return;
		}

		$video.play();
	};

	const pauseVideo = ($video) => {
		if ($video.readyState !== 4) {
			return;
		}

		$video.pause();
	};

	$videos.forEach(($video) => {
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
