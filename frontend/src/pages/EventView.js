import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
//import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import UserWindow from "../components/UserWindow";

function EventView() {
  const [event, setEvent] = useState(null);
  const { id } = useParams(null);

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/get_event/" + id,
    }).then((res) => {
      const response = res.data;
      setEvent(response.result);
    });
  }, [id]);

  return (
    <UserWindow >
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div style={{width: "50%"}}>
          <h4>{new Date(event?.date).toLocaleDateString()}</h4>
        </div>
        <div className="mt-4 mb-4" style={{width: "50%"}}>
          {event ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-text">Nombre de evento:</h5>
                <p className="card-text">{event.name}</p>
                <h6 className="card-text">Descripción:</h6>
                <p className="card-text">{event.description}</p>
                {event.customFields && event.customFields.length > 0 ? (
                  <>
                    <p className="card-text fw-bolder">
                      Información adicional: <br />
                    </p>
                    {event.customFields.map((field) => {
                      return (
                        <p style={{ whiteSpace: "pre-line" }}>
                          {field.name}: <br /> {field.value}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }} >
                <div className="btn btn-block fa-lg mb-4 mt-4" style={{ backgroundColor: "#E2AF73", display: "flex", justifyContent: "space-around", gap: "1rem" }}><p>Hora de inicio</p>  <p>{new Date(event.date).toLocaleTimeString()}</p> </div>
                <div className="btn btn-block fa-lg mb-4 mt-4" style={{ backgroundColor: "#E2AF73", display: "flex", justifyContent: "space-around", gap: "1rem" }}><p>Duración en horas</p> <p>{event.durationinhours}</p></div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-md-center">
            <Link
              to={"/calendar"}
              className="btn btn-block fa-lg mb-4 mt-4"
              style={{ backgroundColor: "#E2AF73", width: "30%" }}
            >
              Regresar
            </Link>
          </div>
        </div>
      </div>

    </UserWindow>
  );
}

export default EventView;
