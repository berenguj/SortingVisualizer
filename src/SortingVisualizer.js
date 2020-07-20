import React, { useState } from "react";
import "./App.css";
import Element from "./Elements";
import "./SortingVisualizer.css";

function RandomArray({ array }) {
  return (
    <div className="array-container">
      {array.map((element) => (
        <div
          className="array-bar"
          key={element.id}
          style={{ height: `${element.value}px` }}
        ></div>
      ))}
    </div>
  );
}

export default RandomArray;
