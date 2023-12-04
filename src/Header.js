import React from "react";

function Header({ showForm, setShowForm }) {
  const appTitle = "Share and Rate!";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share your favorite!"}
      </button>
    </header>
  );
}

export default Header;
