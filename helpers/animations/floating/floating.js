import gsap from 'gsap';

const floating = (el) => {
	function random(min, max) {
		const delta = max - min;
		return (direction = 1) => (min + delta * Math.random()) * direction;
	}

	const easeAnimation = 'sine.inOut';
	const randomX = random(-80, 80);
	const randomY = random(-35, 35);
	const randomTime = random(8, 12);
	const randomTime2 = random(5, 10);
	const randomAngle = random(-36, 36);
	const randomScale = random(0.8, 1.1);

	function moveX(tl, target, direction) {
		tl.to(target, {
			duration: randomTime(),
			x: randomX(direction),
			ease: easeAnimation,
			onComplete: () => moveX(tl, target, direction * -1),
		});
	}

	function moveY(tl, target, direction) {
		tl.to(target, {
			duration: randomTime(),
			y: randomY(direction),
			ease: easeAnimation,
			onComplete: () => moveY(tl, target, direction * -1),
		});
	}

	function rotate(tl, target, direction) {
		tl.to(target, {
			duration: randomTime2(),
			rotation: randomAngle(direction),
			ease: easeAnimation,
			onComplete: () => rotate(tl, target, direction * -1),
		});
	}

	function scale(tl, target, direction) {
		tl.to(target, {
			duration: randomTime2(),
			scale: randomScale(),
			ease: easeAnimation,
			onComplete: () => scale(tl, target, direction * -1),
		});
	}

	const tlX = gsap.timeline();
	const tlY = gsap.timeline();
	const tlRotate = gsap.timeline();
	const tlScale = gsap.timeline();

	gsap.set(el, {
		x: randomX(-1),
		y: randomX(1),
		rotation: randomAngle(-1),
		scale: randomScale(1),
	});

	moveX(tlX, el, 1);
	moveY(tlY, el, -1);
	rotate(tlRotate, el, 1);
	scale(tlScale, el, 1);

	const playTl = () => {
		tlX.play();
		tlY.play();
		tlRotate.play();
		tlScale.play();
	};

	const pauseTl = () => {
		tlX.pause();
		tlY.pause();
		tlRotate.pause();
		tlScale.pause();
	};

	return [playTl, pauseTl];
};

export default floating;

// example usage:
// const $items = document.querySelectorAll('.js-floating-el');
// $items.forEach((el) => {
// 	const [playFloating, pauseFloating] = floating(el);

// 	const trigger = ScrollTrigger.create({
// 		trigger: el,
// 		start: 'top bottom',
// 		end: 'bottom top',
// 		onEnter: () => {
// 			playFloating();
// 		},
// 		onEnterBack: () => {
// 			playFloating();
// 		},
// 		onLeave: () => {
// 			pauseFloating();
// 		},
// 		onLeaveBack: () => {
// 			pauseFloating();
// 		},
// 	});
// });
