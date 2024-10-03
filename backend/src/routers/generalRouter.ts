const router = require("express").Router();
import { Request, Response } from "express";
import { Controller } from "../controllers/Controller";
import EventModel from "../models/Event";
import { kStringMaxLength } from "buffer";
const controller = Controller.getInstance();


// Rutas de usuario -----------------------------------------------------------------------

router.get("/check_email_exists", async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const result = await controller.userExists(email as string);
    res.send(
      JSON.stringify({
        error: false,
        message: "Correo electrónico verificado exitosamente",
        result: result,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      })
    );
  }
});

router.get("/get_event/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await controller.getEvent(id as string);
    res.send(
      JSON.stringify({
        error: false,
        message: "Evento encontrado",
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

router.get("/get_events", async (req: Request, res: Response) => {
  try {
    const result = await controller.getAllEvents(); // Llamada al controlador para obtener los eventos
    res.send(
      JSON.stringify({
        error: false,
        message: "Eventos encontrados",
        result: result,
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        error: true,
        message: "Error al obtener los eventos",
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

router.get("/get_acuerdo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await controller.getAcuerdo(id);
    res.send(
      JSON.stringify({
        error: false,
        message: "Acuerdo encontrado",
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


module.exports = router;