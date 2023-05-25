const Event = require("../model/event");
const moment = require("moment-timezone")

const freeSlots = async (req, res) => {
    const { date, timeZone } = req.query;
    const startDate = moment(date);
    const events = await Event.find({ start: { $gte: startDate }, isBooked: false });
    let result = [];
    events.map((value) => {
        result.push(new Date(value.start).toLocaleString('en-US', { timeZone: timeZone }))
    })
    res.json(result);
};

const addEvent = async (req, res) => {
    const { dateTime, duration } = req.body;
    let result = dateTime.split("T")
    var currentHour = result[1].split(":")
    if (currentHour[0] >= 10 && currentHour[0] < 17) {
        const start = moment(dateTime);
        const end = start.clone().add((duration - 1), 'minutes');
        const existingEvent = await Event.findOne({ start: { $lte: end }, end: { $gte: start } });
        if (existingEvent) {
            return res.status(422).json({ message: 'Event already exists for this time' });
        }
        const event = new Event({ start, end, duration });
        await event.save();

        res.sendStatus(200);
    } else {
        res.json({ message: "The current time is outside the specified range." });
    }
};

const getEvents = async (req, res) => {
    const { startDate, endDate } = req.query;

    const events = await Event.find({ start: { $gte: startDate }, end: { $lte: endDate } });

    res.json(events);
};
const bookSlot = async (req, res) => {
    const { startDate } = req.query;
    const start1 = moment(startDate);
    const events = await Event.findOneAndUpdate({ start: start1 }, { $set: { isBooked: true } }, { upsert: true });
    if (events) {
        res.status(200).json({ message: "Slot Booked" });
    } else {
        res.json({ message: "Slot not Booked" });
    }
};


module.exports = {
    freeSlots,
    addEvent,
    getEvents,
    bookSlot
};
