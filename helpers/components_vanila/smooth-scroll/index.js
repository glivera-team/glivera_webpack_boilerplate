// 1. Instal gsap

// 2. Add lib ScrollSmoother.js to vendors

// 3. Add this code to needed you page or at the layout.js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from '../vendors/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const smoother = ScrollSmoother.create({
	smooth: 2,
});

// 4. Change html layout, like this
// here header
#smooth-wrapper
	#smooth-content
		// here wrapper
			// ...