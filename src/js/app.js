import Layout from 'layout/Layout';
import { pageLoad } from './utils';

export default class App {
	constructor() {
		this.$htmlTag = document.querySelector('html');
		this.pageClass =
			this.$htmlTag.dataset.templateName &&
			this.$htmlTag.dataset.templateName.length > 0
				? this.$htmlTag.dataset.templateName
				: null;

		this.init = this.init.bind(this);
		this.init();
	}

	importPage() {
		if (this.pageClass && this.pageClass !== null) {
			import(`./pages/${this.pageClass}`)
				.then(({ default: pageClass }) => {
					const newPage = new pageClass();
					newPage.init();
				})
				.catch((error) => {
					console.error(
						'Failed to load page, check data-template-name at root if correct',
					);
					console.dir(error, error.stack);
				});
		}
	}

	init() {
		const initLayout = new Layout();
		pageLoad(() => {
			document.body.classList.add('body--loaded');
		});
		setTimeout(() => {
			this.importPage();
		}, 0);
	}
}
