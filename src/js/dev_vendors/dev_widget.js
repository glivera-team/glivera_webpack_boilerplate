/* eslint-disable no-plusplus */
const pageWidget = (pages) => {
	let widgetWrap = document.createElement('div');
	widgetWrap.className = 'widget_wrap';

	let widgetList = '';
	for (let i = 0; i < pages.length; i++) {
		widgetList += `<li class="widget_item"><a class="widget_link" href="${pages[i]}.html">${pages[i]}</a></li>`;
	}
	widgetWrap.innerHTML = `<ul class="widget_list">${widgetList}</ul>`;
	document.body.appendChild(widgetWrap);

	const widgetStyles = '<style>body {position:relative} .widget_wrap{position:absolute;top:100px;left:0;z-index:9999;padding:10px 20px;background:#222;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:"Navigation menu";color:white;position:absolute;top:0;left:100%;width:auto;height:auto;padding:10px;text-transform:uppercase;background:#222;cursor:pointer}.widget_wrap:hover,.widget_wrap:active,.widget_wrap:focus{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline}  </style>';
	widgetWrap.innerHTML += widgetStyles;
};

const pageWidgetArray = [];

const pagesArray = PAGES;

const pageWidgetInit = () => {
	if (typeof pagesArray !== 'undefined' && pagesArray.length > 0) {
		console.log('dev functions loaded');

		pagesArray.forEach((page) => {
			const pageName = page.split('.').slice(0, -1).join('.');
			pageWidgetArray.push(pageName);
		});

		// console.log(pageWidgetArray);
		pageWidget(pageWidgetArray);
	}
};

export default pageWidgetInit;
