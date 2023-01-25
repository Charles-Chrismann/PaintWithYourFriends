const { v4: uuidv4 } = require('uuid');

module.exports = class User {
    id;
    rooms = [];
    constructor(username) {
        this.username = username
        this.id = uuidv4()
    }
}
