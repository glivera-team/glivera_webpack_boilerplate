import Plyr from 'plyr';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'plyr/dist/plyr.css';
import 'ScssComponents/dynamic-video.scss';

gsap.registerPlugin(ScrollTrigger);

const dynamicVideo = (playOnScroll) => {
	const $videoContainers = document.querySelectorAll('.js-dynamic-video');

	if (!$videoContainers) return;

	$videoContainers.forEach(($videoContainer) => {
		let template;
		let isPlayerBuilt = false;

		const videoPath = $videoContainer.dataset.videoSrc;
		const posterPath = $videoContainer.dataset.poster;
		const videoProvider = $videoContainer.dataset.plyrProvider;
		const videoId = $videoContainer.dataset.plyrEmbedId;

		if (videoPath && posterPath) {
			template = `<video class="video_in" playsinline controls data-poster="${posterPath}"><source src="${videoPath}" type="video/mp4"></video>`;
		}

		if (videoProvider && videoId) {
			template = `<div class="video_in" data-plyr-provider=${videoProvider} data-plyr-embed-id=${videoId}></div>`;
		}

		if (!template) return;

		const buildDynamicVideo = () => {
			$videoContainer.insertAdjacentHTML('beforeend', template);

			const $video = $videoContainer.querySelector('.video_in');
			const $poster = $videoContainer.querySelector('.js-video-poster');

			const player = new Plyr($video);
			player.on('ready', () => {
				player.play();
				$poster.classList.add('hidden');
			});
		};

		if (playOnScroll) {
			ScrollTrigger.create({
				trigger: $videoContainer,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => {
					if (!isPlayerBuilt) {
						buildDynamicVideo();
					}

					isPlayerBuilt = true;
				},
			});
		} else {
			$videoContainer.addEventListener('click', () => buildDynamicVideo($videoContainer), { once: true });
		}
	});
};

export default dynamicVideo;
