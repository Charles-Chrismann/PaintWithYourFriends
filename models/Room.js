const { v4: uuidv4 } = require('uuid');

module.exports = class Room {
    users = [];
    connecteds = []
    canvas;
    id;
    roomOwnerName;
    // constructor(roomName, roomOwnerId, roomOwnerName) {
    constructor(roomName) {
        this.roomName = roomName
        this.id = uuidv4()
    }
}