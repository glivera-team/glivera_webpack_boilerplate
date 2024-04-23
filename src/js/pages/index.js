const index = () => {
	let openBtn = document.querySelector('.open-btn');
	let closeBtn = document.querySelector('.close-btn');
	let navbarNav = document.querySelector('.navbar_nav');
	let navbarCollapse = document.querySelector('.navbar_collapse');

	openBtn.addEventListener('click', () => {
		navbarCollapse.classList.remove('hidden');
	});
	closeBtn.addEventListener('click', () => {
		navbarCollapse.classList.add('hidden');
	});
	navbarNav.addEventListener('click', () => {
		navbarCollapse.classList.add('hidden');
	});
};

export default index;
