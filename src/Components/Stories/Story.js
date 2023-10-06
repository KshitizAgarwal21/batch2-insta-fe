import React from "react";
import { useNavigate } from "react-router-dom";

export default function Story() {
  const naviagte = useNavigate();
  const goBack = () => {
    naviagte("/");
  };
  return (
    <div>
      Story
      <p onClick={goBack}>x</p>
    </div>
  );
}
