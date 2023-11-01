import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsAuth(false);
    }
  }, []);

  return <div>{isAuth ? <Outlet /> : <Navigate to="/login"></Navigate>}</div>;
}
