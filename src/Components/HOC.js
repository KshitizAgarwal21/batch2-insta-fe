import React from "react";
import Header from "./Header/Header";
import Sidenav from "./Sidenav/Sidenav";
import Stories from "./Stories/Stories";

export default function HOC(Comp) {
  return function () {
    return (
      <>
        <Header></Header>
        <Stories></Stories>
        <Comp />
      </>
    );
  };
}
