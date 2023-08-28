const { Rooms } = require("../mongoConfig")
const mongodb = require("mongodb")

const getAllRooms = async (req) => {
    const { page = 1, count = 20 } = req.query;
    return Rooms.find({})
        .skip((parseInt(page) - 1) * parseInt(count))
        .limit(parseInt(count))
        .toArray()
}

const hotelroom = async (req) => {
    const roomId = new mongodb.ObjectId(req.params.roomId)
    return Rooms.findOne({ _id: roomId })
}

module.exports = { getAllRooms, hotelroom }