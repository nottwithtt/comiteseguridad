const router = require("express").Router();
import { Request, Response } from "express";
import { Controller } from "../controllers/Controller";
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

module.exports = router;
