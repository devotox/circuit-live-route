'use strict';

const fs = require('fs');
const path = require('path');

let ampFile;
const ampPath = path.resolve('./dist/index.amp.html');

const getAmpFile = () => {
	return ampFile || fs.readFileSync(ampPath, 'utf8');
};

module.exports = {
	htmlFile: 'index.html',
	onVisit(path) {
		return path.includes('?amp') ? getAmpFile() : null;
	},
	hostWhitelist: [
		/^.+\.now\.sh$/,
		/^.+\.surge\.sh$/,
		/^.+\.ngrok\.io$/,
		/^.+\.netlify\.com$/,
		/^localhost(:\d+)?$/,
		/cloudfunctions\.net$/,
		/^.+\.localtunnel\.me$/
	]
};
