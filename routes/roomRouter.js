const { Router } = require("express");
const { getAllRooms, hotelroom } = require("../controllers/roomController");

const roomRouter = Router();

roomRouter.get("/all", async (req, res) => {
    try {
        const data = await getAllRooms(req);
        res.send(data)
    } catch (error) {
        res.send({ err: error.message })
    }
})

roomRouter.get("/hotelroom/:roomId", async (req, res) => {
    try {
        const data = await hotelroom(req);
        res.send(data)
    } catch (error) {
        res.send({ err: error.message })
    }
})

module.exports = roomRouter;