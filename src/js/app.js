import { pageLoad, onWindowResize, calcViewportHeight } from 'utils';

export default class App {
	addEventListeners() {
		onWindowResize(() => calcViewportHeight());
	}

	async loadSections() {
		const { pageId, availableComponents } = document.documentElement.dataset;

		if (!pageId || !availableComponents) return;

		const siteData = await import('../../site_data/SITE_DATA.json');

		const pageData = siteData.pages[pageId];

		if (!pageData) return;

		const availableComponentsArray = availableComponents.split(' ');

		const availableSectionsData = pageData.sections.filter(({ sectionType }) => {
			return availableComponentsArray.includes(sectionType);
		});

		availableSectionsData.forEach(async ({ sectionType, props }) => {
			// It can import one component several times. Webpack will manage it correctly.
			const { default: Component } = await import(`./components/${sectionType}.js`);

			const component = new Component(props);
			component.init();
		});
	}

	addLoadedClass() {
		document.body.classList.add('body--loaded');
	}

	init() {
		pageLoad(async () => {
			this.addEventListeners();

			await this.loadSections();

			this.addLoadedClass();
		});
	}
}
