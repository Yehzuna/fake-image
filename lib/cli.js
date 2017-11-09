const fs = require('fs');

class FACLI {
    log() {
        console.log('log!');
    }
    scan(file) {
        fs.readlinkSync(file);
    }
}

module.exports = new FACLI();