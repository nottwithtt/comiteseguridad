import React, {useContext} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appContext } from "../context";
import Protected from "./Protected";
import Login from "../pages/Login";
import AdminCalendarView from "../pages/AdminCalendarView";
import CalendarView from "../pages/CalendarView";
import EventView from "../pages/EventView";
import EventEdit from "../pages/EventEdit";
import CreateEvent from "../pages/CreateEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {
  const ctx = useContext(appContext).user;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/view_event/:id"
          element={
            <Protected ctx={ctx} loggedIn={!true} forRole={2}>
              <EventView />
            </Protected>
          }
        />
        <Route
          path="/edit_event/:id"
          element={
            <Protected ctx={ctx} loggedIn={!true} forRole={2}>
              <EventEdit />
            </Protected>
          }
        />
        <Route
          path="/register_event"
          element={
            <Protected ctx={ctx} loggedIn={!true} forRole={2}>
              <CreateEvent />
            </Protected>
          }
        />
        <Route
          path="/calendar"
          element={
            <Protected ctx={ctx} loggedIn={!true} forRole={2}>
              <CalendarView />
            </Protected>
          }
        />
        <Route
          path="/scheduling"
          element={
            <Protected ctx={ctx} loggedIn={!true} forRole={2}>
              <AdminCalendarView/>
            </Protected>
          }
        />
        <Route
          path="/login"
          element={
            <Protected ctx={ctx} loggedIn={false} forRole={null}>
              <Login />
            </Protected>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Protected ctx={ctx} loggedIn={false} forRole={null}>
              <CalendarView />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
