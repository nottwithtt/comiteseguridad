import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_ROUTE } from "../scripts/constants";
import { sanitizeEmail } from "../scripts/data_sanitizer";
import MessageModal from "../components/MessageModal";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const sendForm = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      data: {
        email: sanitizeEmail(email),
        password: password,
      },
      withCredentials: true,
      url: BACKEND_ROUTE + "/login",
    }).then(
      (res) => {
        handleResponse(res.data);
      },
      () => {
        handleResponse({
          error: true,
          message: "Usuario y/o contraseña incorrectos",
        });
      }
    );
  };

  const handleResponse = (response) => {
    if (response.error) {
      setModalMessage(response.message);
      setShowModal(true);
      setError(true);
    } else {
      window.location.href = "/calendar";
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container py-5 h-100">
      <MessageModal
        message={modalMessage}
        is_open={showModal}
        close={closeModal}
        error={error}
      ></MessageModal>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h1 className="mt-1 mb-5 pb-1">Inicio de Sesión</h1>
                  </div>

                  <form onSubmit={sendForm}>
                    <h5 className="mt-1 mb-3 pb-1">Iniciar sesión</h5>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="login_email"
                        className="form-control"
                        placeholder="email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="form-label">Correo electrónico</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="login_password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label">Contraseña</label>
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1 d-flex flex-column">
                      <Button
                        text="Iniciar sesión"
                        bootstrap="btn btn-block fa-lg mb-3"
                        color="#A7867D"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="col-lg-6 d-flex flex-column"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="px-3 py-1 mt-3">
                  <div className="d-flex flex-column align-items-center justify-content-center pb-4">
                    <Link
                      to="/calendar"
                      className="btn"
                      style={{ backgroundColor: "#A7867D", width: "150px" }}
                    >
                      Regresar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
