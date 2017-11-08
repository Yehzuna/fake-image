class FakeImage {
    constructor() {
        document.querySelector('button').addEventListener('click', () => this.click());
        document.body.addEventListener('click', (e) => this.copy(e.target));
    }

    click() {
        const data = this.form();

        if (document.querySelector('.d-none')) {
            document.querySelector('.d-none').classList.remove('d-none');
        }

        document.getElementById('svg').innerText = this.svg(data);
        document.getElementById('src').innerText = this.encode(data);
        document.getElementById('img').innerText = `<img src="${this.encode(data)}" alt="Fake Image">`;
        document.getElementById('result').innerHTML = this.svg(data);
    }

    copy(target) {
        if(target && target.classList.contains('copy')) {
            const input = document.createElement('input');
            input.style.position = 'fixed';
            input.style.top = '-1000px';
            input.value = document.querySelector(target.getAttribute('href')).innerText;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
            return false;
        }
    }

    form() {
        return [...new FormData(document.getElementById('form'))].reduce((o, [k, v]) => {
            if (v.length !== 0) {
                o[k] = v;
            }
            return o;
        }, {});
    }

    svg({width = 100, height = 100, bg = 'ccc', text = `${width}x${height}`, color = '777', size = 12}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" style="fill: #${bg}"/>
    <text x="50%" y="50%" style="dominant-baseline: central; text-anchor: middle; fill: #${color}; font-weight: bold; font-family: Helvetica, monospace; font-size: ${size}pt">${text}</text>
</svg>`;
    }

    encode(data) {
        return 'data:image/svg+xml;charset=UTF-8,' + this.rawurlencode(this.svg(data));
    }

    rawurlencode(str) {
        str = (str + '').toString();
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
    }
}

new FakeImage();