import { Loader } from '@googlemaps/js-api-loader';

const initMap = () => {
	const $map = document.querySelector('#map');
	const latValue = parseFloat($map.dataset.lat);
	const lngValue = parseFloat($map.dataset.lng);
	if ($map) {
		const loader = new Loader({
			apiKey: $map.dataset.key,
			version: 'weekly',
			libraries: ['places'],
		});

		const mapOptions = {
			center: {
				lat: latValue,
				lng: lngValue,
			},
			zoom: parseFloat($map.dataset.zoom),
		};

		let markerIcon;

		loader
			.load()
			.then((google) => {
				let map = new google.maps.Map($map, mapOptions);
				const marker = new google.maps.Marker({
					position: new google.maps.LatLng(latValue, lngValue),
					map,
				});
			})
			.catch(e => {
				// console.log(e);
			});
	}
};

export default initMap;
