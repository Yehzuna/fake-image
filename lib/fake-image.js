"use strict";

class FakeImage {
    svg({width = 100, height = 100, bg = 'ccc', text = `${width}x${height}`, color = '777', size = 12}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" style="fill: #${bg}"/>
    <text x="50%" y="50%" style="dominant-baseline: central; text-anchor: middle; fill: #${color}; font-weight: bold; font-family: Helvetica, monospace; font-size: ${size}pt">${text}</text>
</svg>`;
    }

    src(data) {
        return `data:image/svg+xml;charset=UTF-8,${this.rawurlencode(this.svg(data))}`;
    }

    html(data) {
        return `<img src="${this.src(data)}" alt="Fake Image Generator">`;
    }

    rawurlencode(str) {
        str = (str + '').toString();

        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
    }
}

module.exports = FakeImage;