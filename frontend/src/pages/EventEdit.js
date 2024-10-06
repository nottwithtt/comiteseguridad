import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import AdminWindow from "../components/AdminWindow";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import MessageModal from "../components/MessageModal";
import Button from "../components/Button";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { addHours } from "date-fns";
import Event from "../components/Event";


const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventEdit() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [confirmOverlap, setConfirmOverlap] = useState(false);
  const { id } = useParams(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [acuerdos, setAcuerdos] = useState([]);
  const [updatingAcuerdo, setUpdatingAcuerdo] = useState(false);
  const [newAcuerdoDescription, setNewAcuerdoDescription] = useState(""); // 
  const [events, setEvents] = useState([]);



  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/get_event/" + id,
    }).then((res) => {
      const response = res.data;
      const event = response.result;
      setType(event.name);
      setDescription(event.description);
      setDate(format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"));
      setDuration(event.durationinhours);    
    });

    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/acuerdos_evento/" + id,
    }).then((res) => {
      const response = res.data;
      if (!response.error && response.result) {
        setAcuerdos(response.result);
      }
    });

    axios({
      method: "get",
      withCredentials: true,
      url: BACKEND_ROUTE + "/general/get_events",
    }).then((res) => {
      const response = res.data;
      const formattedEvents = formatEvents(response.result);
      setEvents(formattedEvents);
    });
  }, [id]);

  const checkForOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        eventId: id,
        date: date,
        durationinhours: duration,
        description: description,
        name: type,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/event_overlaps",
    }).then((res) => {
      const response = res.data;
      setConfirmOverlap(response.result);

      // Hay traslape de eventos
      if (response.result === true) {
        setError(true);
        setModalMessage(
          "El evento actualmente se traslapa con otros eventos de la agenda. Presione confirmar si desea guardar el evento de igual forma."
        );
        setShowModal(true);
      } else {
        confirmUpdateWithOverlap(event);
      }
    });
  };

  const confirmUpdateWithOverlap = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      data: {
        eventId: id,
        date: date,
        durationinhours: duration,
        description: description,
        name: type,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/update_event",
    }) .then((res) => {
      const response = res.data;

     
      if (response.error) {
        setError(true);
        setModalMessage(response.message);
      } else {
        setError(false);
        setModalMessage("Comprobación realizada."); // Only show this if successful
      }
      
      setShowModal(true);
    })
    .catch((err) => {
      console.error("Error during event update:", err);
      setError(true);  // Set error true
      setModalMessage("Error al actualizar el evento: " + err.message);
      setShowModal(true);
    });
  };

  const deleteEvent = () => {
    axios({
      method: "post",
      data: {
        eventId: id,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/admin/delete_event",
    }).then((res) => {
      const response = res.data;
      setError(response.error);
      setModalMessage(response.message);
      setShowModal(true);
      setDeleting(true);
    });
  };

  const addAcuerdo = async () => {
    if (!newAcuerdoDescription) {
        setError(true);
        setModalMessage("La descripción del acuerdo es requerida.");
        setShowModal(true);
        return;
    }

    const exists = acuerdos.some(acuerdo => acuerdo.descripcion.toLowerCase() === newAcuerdoDescription.toLowerCase());
    if (exists) {
        setError(true);
        setModalMessage("Este acuerdo ya existe.");
        setShowModal(true);
        return;
    }


    try {
        const response = await axios({
            method: "post",
            withCredentials: true,
            url: BACKEND_ROUTE + "/admin/create_acuerdo/", 
            data: {
                numeroOrden: "1",
                descripcion: newAcuerdoDescription,
                estado: "Pendiente",
                eventoId: id,
            },
        });

    

        if (response.data.error) {
            // Log if the response indicates an error
            console.error("Error in response:", response.data.message);
            throw new Error(response.data.message);
        }

        
        setAcuerdos(prevAcuerdos => [...prevAcuerdos, response.data.result]);
        setNewAcuerdoDescription(""); // Reset the input field
        setModalMessage("Acuerdo creado exitosamente.");
        setError(false);
        setShowModal(true);
    } catch (error) {
        // Log detailed error information
        console.error("Error creating acuerdo:", error); // Log the error for debugging
        setError(true);
        setModalMessage("Error al crear el acuerdo. Detalles: " + error.message);
        setShowModal(true);
    }
};


  const handleAcuerdoStatusChange = async (acuerdoId, newStatus) => {
    const acuerdoToUpdate = acuerdos.find(acuerdo => acuerdo._id === acuerdoId);
 
  
    setUpdatingAcuerdo(true);
    
    try {
      await axios({
        method: "put",  // Use PUT method
        withCredentials: true,
        url: BACKEND_ROUTE + "/admin/update_acuerdo/" + acuerdoId, // Updated URL format
        data: {
          numeroOrden: acuerdoToUpdate.numeroOrden, // Ensure numeroOrden is included
          descripcion: acuerdoToUpdate.descripcion, // Keep current descripcion
          estado: newStatus // New status
        }
      });
  
      // Update the acuerdos state with the new status
      setAcuerdos(prevAcuerdos =>
        prevAcuerdos.map(acuerdo =>
          acuerdo._id === acuerdoId ? { ...acuerdo, estado: newStatus } : acuerdo
        )
      );
    } catch (error) {
      setError(true);
      setModalMessage("Error al actualizar el estado del acuerdo.");
      setShowModal(true);
    } finally {
      setUpdatingAcuerdo(false);
    }
  };
  
  const handleAcuerdoDescriptionChange = async (acuerdoId, newDescription) => {
    const acuerdoToUpdate = acuerdos.find(acuerdo => acuerdo._id === acuerdoId);

    try {
      await axios({
        method: "put",  // Change to PUT
        withCredentials: true,
        url: BACKEND_ROUTE + "/admin/update_acuerdo/" + acuerdoId, // Updated URL format
        data: {
          numeroOrden: acuerdoToUpdate.numeroOrden, // Ensure this field is included
          descripcion: newDescription,
          estado: acuerdoToUpdate.estado // Keep current estado
        }
      });
  
      setAcuerdos(prevAcuerdos =>
        prevAcuerdos.map(acuerdo =>
          acuerdo.id === acuerdoId ? { ...acuerdo, descripcion: newDescription } : acuerdo
        )
      );
    } catch (error) {
      setError(true);
      setModalMessage("Error al actualizar la descripción del acuerdo.");
      setShowModal(true);
    }
  };

  const handleDeleteAcuerdo = async (acuerdoId) => {
  
    try {
      const response = await axios({
        method: "delete",
        withCredentials: true,
        url: BACKEND_ROUTE + "/admin/delete_acuerdo/" + acuerdoId // Updated URL to match backend route format
      });
  
      
      // Update the state to remove the deleted acuerdo
      setAcuerdos(prevAcuerdos => 
        prevAcuerdos.filter(acuerdo => acuerdo._id !== acuerdoId) // Ensure to use _id
      );
  
      setModalMessage("Acuerdo eliminado exitosamente.");
      setError(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error deleting acuerdo:", error); // Log error for debugging
      setError(true);
      setModalMessage("Error al eliminar el acuerdo.");
      setShowModal(true);
    }
  };

  const formatEvents = (events) => {
    const formattedEvents = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      const formattedEvent = {
        start: new Date(event.date),
        end: addHours(new Date(event.date), event.durationinhours),
        title: event.name,
        url: "/edit_event/" + event._id,
      };

      formattedEvents.push(formattedEvent);
    }

    return formattedEvents;
  };

  const closeModal = () => {
    setShowModal(false);
    if (!error && deleting) {
      window.location.href = "/scheduling";
    }
  };

  return (
    <AdminWindow>
      <MessageModal
        message={modalMessage}
        is_open={showModal}
        close={closeModal}
        error={error}
      ></MessageModal>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div style={{width: "45%"}}>
          <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              components={{
                event: Event,
              }}
              views={['day']} 
              defaultView="day" 
              date={date} 
              onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
      <div className="mt-4 mb-4" style={{width: "45%"}}>
        <div>
          <form
            id="updateEventForm"
            onSubmit={
              confirmOverlap ? confirmUpdateWithOverlap : checkForOverlap
            }
          >
            <div className="mb-4">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            
            <div className="mb-4">
                <label className="form-label">Acuerdos</label>
                <div className="border rounded">
                  {acuerdos.map((acuerdo, index) => (
                    <div 
                      key={acuerdo.id} 
                      className="d-flex justify-content-between align-items-center p-3 border-bottom"
                    >
                      <div className="d-flex align-items-center flex-grow-1">
                        <div className="d-flex justify-content-center align-items-center rounded-circle border" 
                             style={{width: "32px", height: "32px", marginRight: "12px", flexShrink: 0}}>
                          <span>{index + 1}</span>
                        </div>
                        <input 
                        type="text"
                        className="form-control"
                        value={acuerdo.descripcion}
                        onChange={(e) => {
                          const newAcuerdos = [...acuerdos];
                          newAcuerdos[index].descripcion = e.target.value;
                          setAcuerdos(newAcuerdos);
                        }}
                        onBlur={(e) => {
                          console.log("Acuerdo before calling handleAcuerdoDescriptionChange:", acuerdo); // Debugging log
                          handleAcuerdoDescriptionChange(acuerdo._id, e.target.value); // Updated to use _id
                        }}
                      />
                      </div>
                      <div className="d-flex align-items-center ms-2">
                        <select
                          className="form-select me-2"
                          style={{width: "auto"}}
                          value={acuerdo.estado}
                          onChange={(e) => handleAcuerdoStatusChange(acuerdo._id, e.target.value)} // _id 
                          disabled={updatingAcuerdo}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="completado">Completado</option>
                        </select>
                        <button
                          type="button"
                          className="btn btn-danger rounded me-2" // 
                          onClick={() => handleDeleteAcuerdo(acuerdo._id)} 
                          style={{ fontSize: '1rem' }} // 
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-center mt-4">
                <button
                    className="btn btn-primary me-2"
                    onClick={addAcuerdo}
                >
                    Agregar Acuerdo
                </button>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción del nuevo acuerdo"
                    value={newAcuerdoDescription}
                    onChange={(e) => setNewAcuerdoDescription(e.target.value)} 
                />
            </div>


            <div className="row">
              <div className="col">
                <div className="mb-4 mt-4">
                  <label className="form-label">Fecha y hora de inicio</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="mb-4 mt-4">
                  <label className="form-label">Duración en horas</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    min={1}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-md-end">
          <Button
            text={"Eliminar"}
            bootstrap="btn btn-danger fa-lg mb-4 me-4"
            width={150}
            type="button"
            onclickHandler={deleteEvent}
          />
          <Button
            text={confirmOverlap ? "Confirmar" : "Guardar"}
            bootstrap="btn btn-block fa-lg mb-4 me-4"
            width={150}
            color="#73E2A7"
            type="submit"
            form="updateEventForm"
          />
          <Link
            to={"/scheduling"}
            className="btn btn-block fa-lg mb-4"
            style={{ backgroundColor: "#73E2A7", width: "150px" }}
          >
            Regresar
          </Link>
        </div>
      </div>
      </div>
    </AdminWindow>
  );
}

export default EventEdit;
