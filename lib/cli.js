"use strict";

const fs = require('fs');
const FakeImage = require('./fake-image');

class FakeImageCLI extends FakeImage {
    constructor() {
        super();

        this.options = [
            'width',
            'height',
            'bg',
            'text',
            'color',
            'size'
        ];
    }

    read(path) {
        fs.readFile(path, {encoding: 'utf-8'}, (error, data) => {
            //console.log(data);
            //console.log(error);

            if (data) {
                const pattern = /{{\s?FA\((src|svg|html),(.*)\)\s?}}/gm;
                let content = data.replace(pattern, (match, type, args) => {

                    if (this.isJSON(args)) {
                        return this[type](JSON.parse(args));
                    }

                    let options = args.split(',').reduce((o, value, index) => {
                        o[this.options[index]] = value.trim();
                        return o;
                    }, {});

                    return this[type](options);
                });

                console.log(content);
            }
        });
    }

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }
}

module.exports = new FakeImageCLI();