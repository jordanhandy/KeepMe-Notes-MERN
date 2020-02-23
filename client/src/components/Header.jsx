import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  var date = new Date().getHours();
  return (
    <header
      style={
        date > 18
          ? { backgroundColor: "#303030" }
          : { backgroundColor: "#f5ba13" }
      }
    >
      <h1>
        <HighlightIcon />
        KeepMe
      </h1>
    </header>
  );
}

export default Header;
