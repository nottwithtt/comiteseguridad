const router = require("express").Router();
import { Types } from "mongoose"; 
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
    let acuerdos: Types.ObjectId[] = []; // 

    const event = new EventModel(name, description, date, durationinhours, acuerdos, eventid); 



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
    let eventid = req.body.eventId as string;
    let acuerdos: Types.ObjectId[] = []; // Update if needed

    const event = new EventModel(name, description, date, durationinhours, acuerdos, eventid); // 


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
    let acuerdos: Types.ObjectId[] = []; // 

    const event = new EventModel(name, description, date, durationinhours, acuerdos, eventid); // 

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


router.post("/create_acuerdo", async (req: Request, res: Response) => {
    const { numeroOrden, descripcion, estado, eventoId } = req.body; // Extract from request body

    // Validate required fields
    if (!numeroOrden || !descripcion || !estado || !eventoId) {
        return res.status(400).json({
            error: true,
            message: "numeroOrden, descripcion, estado, and eventoId are required.",
        });
    }

    try {
        const newAcuerdo = await controller.createAcuerdo(
            parseInt(numeroOrden), // Parse to number if necessary
            descripcion as string,
            estado as "pendiente" | "completado",
            eventoId // Pass eventoId
        );

        return res.status(201).json({
            error: false,
            message: "Acuerdo creado exitosamente",
            result: newAcuerdo,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            error: true,
            message: "Error al crear el acuerdo",
        });
    }
});

router.put("/update_acuerdo/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { numeroOrden, descripcion, estado } = req.body; // No eventoId here

    // Validate required fields
    if (!numeroOrden || !descripcion || !estado) {
        return res.status(400).json({
            error: true,
            message: "numeroOrden, descripcion, and estado are required.",
        });
    }

    try {
        const result = await controller.updateAcuerdo(
            id,
            parseInt(numeroOrden),
            descripcion as string,
            estado as "pendiente" | "completado"
        );

        // Check if the update was successful
        if (!result) {
            return res.status(404).json({
                error: true,
                message: "Acuerdo not found or could not be updated.",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Acuerdo actualizado",
            result: result,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            error: true,
            message: "Error al actualizar el acuerdo",
        });
    }
});

router.get("/acuerdos_evento/:eventoId", async (req: Request, res: Response) => {
    const { eventoId } = req.params; // Extract eventoId from the request parameters

    // Validate the eventoId
    if (!eventoId) {
        return res.status(400).json({
            error: true,
            message: "eventoId is required.",
        });
    }

    try {
        const acuerdos = await controller.getAcuerdosByEventoId(eventoId); // Call the controller method

        if (acuerdos.length === 0) {
            return res.status(404).json({
                error: false,
                message: "No Acuerdos found for the given eventoId.",
                result: [],
            });
        }

        return res.status(200).json({
            error: false,
            message: "Acuerdos retrieved successfully.",
            result: acuerdos,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            error: true,
            message: "Error retrieving Acuerdos.",
        });
    }
});

// Delete Acuerdo
router.delete("/delete_acuerdo/:id", async (req: Request, res: Response) => {
const { id } = req.params;

try {
    const result = await controller.deleteAcuerdo(id);
    res.send(
    JSON.stringify({
        error: false,
        message: "Acuerdo eliminado",
        result: result,
    })
    );
} catch (e) {
    res.send(
    JSON.stringify({
        error: true,
        message: "Error al eliminar el acuerdo",
    })
    );
}
});


router.get("/get_all_acuerdos", async (req: Request, res: Response) => {
try {
    const result = await controller.getAllAcuerdos();
    res.send(
    JSON.stringify({
        error: false,
        message: "Lista de acuerdos obtenida",
        result: result,
    })
    );
} catch (e) {
    res.send(
    JSON.stringify({
        error: true,
        message: "Error al obtener la lista de acuerdos",
    })
    );
}
});


router.get("/check_order_number_exists", async (req: Request, res: Response) => {
const { numeroOrden } = req.query;

try {
    const result = await controller.checkOrderNumberExists(parseInt(numeroOrden as string));
    res.send(
    JSON.stringify({
        error: false,
        message: "Orden de acuerdo verificada",
        result: result,
    })
    );
} catch (e) {
    res.send(
    JSON.stringify({
        error: true,
        message: "Error al verificar el número de orden",
    })
    );
}
});

module.exports = router;