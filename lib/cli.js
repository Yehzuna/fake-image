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

    convert(src, dest = src) {
        fs.readFile(src, {encoding: 'utf-8'}, (error, data) => {
            if (error) throw error;

            const pattern = /{{\s?FA\((src|svg|html),(.*)\)\s?}}/gm;
            const count = data.match(pattern).length;
            const content = data.replace(pattern, (match, type, args) => {
                if (this.isJSON(args)) {
                    return this[type](JSON.parse(args));
                }

                const options = args.split(',').reduce((object, value, index) => {
                    object[this.options[index]] = value.trim();

                    return object;
                }, {});

                return this[type](options);
            });

            console.info(`${count} occurrence(s) replaced in '${src}'.`);

            fs.writeFile(dest, content, (error) => {
                if (error) throw error;

                console.info(`'${dest}' saved.`);
            });
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