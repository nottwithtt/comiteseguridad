import React from "react";
import UserNavbar from "./UserNavbar";

function UserWindow({ children }) {
  return (
    <section>
      <UserNavbar></UserNavbar>
      <section className="mb-4 mt-4">
        <div className="container" id="client_window">
          {children}
        </div>
      </section>
    </section>
  );
}

export default UserWindow;
