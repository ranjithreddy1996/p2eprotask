const express = require("express");
const router = express.Router();

const {
    freeSlots,
    addEvent,
    getEvents,
    bookSlot
} = require("../controllers/eventcontroller");

router.post("/addevent", addEvent);

router.get("/freeslots", freeSlots);

router.get("/getevents", getEvents);

router.patch("/bookSlot", bookSlot);



module.exports = router;
