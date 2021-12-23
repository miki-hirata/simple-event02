import express from "express";
import cors from "cors";
import * as data from "./sample-data.js";

const app = express();
app.use(cors());

app.get("/events", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const events = data.events;
  res.json({
    rows: events.slice(offset, offset + limit),
    count: data.events.length,
  });
});

app.get("/events/:eventId", async (req, res) => {
  const eventId = +req.params.eventId;
  const event = data.events.find(
    (event) => event.id === eventId
  );
  if (!event) {
    res.status(404).send("not found");
    return;
  }
  res.json(event);
});

app.get("/events/:eventId/comments", async (req, res) => {
  const eventId = +req.params.eventId;
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const event = data.events.find(
    (event) => event.id === eventId
  );
  if (!event) {
    res.status(404).send("not found");
    return;
  }
  const comments = data.comments.filter(
    (comment) => comment.eventId === eventId
  );
  res.json({
    count: comments.length,
    rows: comments.slice(offset, offset + limit),
  });
});


app.get("/places", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const places = data.places;
  res.json({
    rows: places.slice(offset, offset + limit),
    count: data.places.length,
  });
});

app.get("/places/:placeId", async (req, res) => {
  const placeId = +req.params.placeId;
  const place = data.places.find(
    (place) => place.id === placeId
  );
  if (!place) {
    res.status(404).send("not found");
    return;
  }
  res.json(place);
});



app.get("/tours", async (req, res) => {
  const limit = +req.query.limit || 5;
  const offset = +req.query.offset || 0;
  const tours = data.tours;
  res.json({
    rows: tours.slice(offset, offset + limit),
    count: data.tours.length,
  });
});

app.get("/tours/:tourId", async (req, res) => {
  const tourId = +req.params.tourId;
  const tour = data.tours.find(
    (tour) => tour.id === tourId
  );
  if (!tour) {
    res.status(404).send("not found");
    return;
  }
  res.json(tour);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});