import React, { useState } from "react";
import "./App.css";

function Element({ element }) {
  return <div>{element.value}</div>;
}

export default Element;
