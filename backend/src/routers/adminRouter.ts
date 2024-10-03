const router = require("express").Router();
import { Request, Response } from "express";
import { Controller } from "../controllers/Controller";
import EventModel from "../models/Event";
import { kStringMaxLength } from "buffer";
const controller = Controller.getInstance();

router.post("/event_overlaps", async (req: Request, res: Response) => {

    let name = req.body.name as string;
    let description = req.body.description as string;
    let durationinhours = parseInt(req.body.durationinhours as string);
    let date = new Date(req.body.date as string);
    let eventid = req.body.eventId as string;

    const event = new EventModel(name, description, date, durationinhours, eventid);

    try {
        const result = await controller.checkOverlap(event);
        res.send(
            JSON.stringify({
                error: false,
                message: "Comprobación realizada",
                result: result,
            })
        );
    } catch (e) {
        res.send(
            JSON.stringify({
                error: true,
                message: "Error desconocido",
            })
        );
    }
});

router.post("/create_event", async (req: Request, res: Response) => {
    let name = req.body.name as string;
    let description = req.body.description as string;
    let durationinhours = parseInt(req.body.durationinhours as string);
    let date = new Date(req.body.date as string);

    const event = new EventModel(name, description, date, durationinhours);

    try {
        const result = await controller.createEvent(event);
        res.send(
            JSON.stringify({
                error: false,
                message: "Evento creado",
                result: result,
            })
        );
    } catch (e) {
        res.send(
            JSON.stringify({
                error: true,
                message: "Error desconocido",
            })
        );
    }
});

router.post("/update_event", async (req: Request, res: Response) => {
    let name = req.body.name as string;
    let description = req.body.description as string;
    let durationinhours = parseInt(req.body.durationinhours as string);
    let date = new Date(req.body.date as string);
    let eventid = req.body.eventId as string;

    const event = new EventModel(name, description, date, durationinhours, eventid);

    try {
        const result = await controller.updateEvent(event);
        res.send(
            JSON.stringify({
                error: false,
                message: "Comprobación realizada",
                result: result,
            })
        );
    } catch (e) {
        console.error(e);
        res.send(
            JSON.stringify({
                error: true,
                message: "Error desconocido",
            })
        );
    }
});

router.post("/delete_event", async (req: Request, res: Response) => {
    let eventid = req.body.eventId as string;

    try {
        const result = await controller.deleteEvent(eventid);
        res.send(
            JSON.stringify({
                error: false,
                message: "Comprobación realizada",
                result: result,
            })
        );
    } catch (e) {
        res.send(
            JSON.stringify({
                error: true,
                message: "Error desconocido",
            })
        );
    }
});

module.exports = router;