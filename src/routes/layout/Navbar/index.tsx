import React from "react";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">home</Link>
        <Link to="/videos/upload">upload video</Link>
        <Link to="/search">search</Link>
        <Link to="/join">join</Link>
      </div>
    </>
  );
}

export default navbar;
