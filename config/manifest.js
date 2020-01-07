'use strict';

module.exports = function() {
	// See https://github.com/san650/ember-web-app#documentation for a list of supported properties

	const sizes = [
		16,
		32,
		36,
		48,
		64,
		70,
		72,
		96,
		128,
		144,
		150,
		152,
		192,
		310,
		384,
		512
	];

	const iconRoot = process.env.CORBER
		? 'assets/images/icons'
		: '/assets/images/icons';

	const icons = sizes.map((size) => {
		const sizes = `${size}x${size}`; // eslint-disable-line

		const result = {
			sizes,
			type: 'image/png',
			targets: ['manifest', 'apple', 'android'],
			src: `${iconRoot}/icon-${size}.png` // eslint-disable-line
		};

		[16, 32].includes(size) && (result.targets = ['favicon']);

		[150, 310].includes(size)
			&& (result.targets = ['ms'])
			&& (result.element = `square${sizes}logo`);

		return result;
	});

	return {
		icons,
		dir: 'ltr',
		scope: '/',
		name: 'circuit-live-route',
		display: 'standalone',
		short_name: 'circuit-live-route', // eslint-disable-line
		theme_color: '#009688', // eslint-disable-line
		orientation: 'portrait',
		background_color: '#FFFFFF', // eslint-disable-line
		gcm_sender_id: '103953800507', // eslint-disable-line
		description: 'Live Routing',
		start_url: '/?utm_source=web_app_manifest', // eslint-disable-line
		author: {
			'name': 'Devonte Emokpae',
			'website': 'https://www.getcircuit.com'
		},
		apple: {
			precomposed: true,
			webAppCapable: true,
			statusBarStyle: 'black-translucent',
			formatDetection: {
				telephone: true
			}
		},
		ms: {
			tileColor: '#009688'
		}
	};
};
