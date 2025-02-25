const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Events = require("./models/events.model");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
initializeDatabase();

const jsonData = fs.readFileSync("events.json", "utf-8");
const eventsData = JSON.parse(jsonData);

async function readEvents() {
  try {
    const events = await Events.find();
    return events;
  } catch (error) {
    console.error(`An error occurred in fetching events ${error.message}`);
    throw error;
  }
}
app.get("/events", async (req, res) => {
  try {
    const events = await readEvents();
    if (events) {
      res.status(200).json(events);
    } else {
      res.status(404).jaon({ error: "Events not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

async function readEventByTitle(eventTitle) {
  try {
    const event = await Events.findOne({ title: eventTitle });
    return event;
  } catch (error) {
    console.error(
      `An error occurred while fetching event by title ${error.message} `
    );
    throw error;
  }
}

app.get("/events/title/:eventTitle", async (req, res) => {
  try {
    const event = await readEventByTitle(req.params.eventTitle);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).jaon({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event by title" });
  }
});

function seedData() {
  try {
    for (const event of eventsData) {
      const newEvents = new Events({
        title: event.title,
        date: event.date,
        type: event.type,
        thumbnail: event.thumbnail,
        description: event.description,
        topic: event.topic,
        sessionTimings: event.sessionTimings,
        speakers: event.speakers,
        pricing: event.pricing,
        venue: event.venue,
        address: event.address,
        additionalInfo: event.additionalInfo,
        tags: event.tags,
      });
      newEvents.save();
    }
  } catch (error) {
    console.error(`Error in seeding the data ${error.message}`);
  }
}

// seedData();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`An events server is running at ${PORT}`);
});
