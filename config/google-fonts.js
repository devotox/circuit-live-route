'use strict';

const fonts = ['Open+Sans', 'Poppins', 'Raleway', 'Roboto'];

const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const w = weights.join(',');

module.exports = fonts.map((f) => `${f}:${w}`);
