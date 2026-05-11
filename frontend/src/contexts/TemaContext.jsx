import React, { createContext, useContext, useState, useEffect } from "react";

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(() => localStorage.getItem("modoEscuro") === "true");
  const [tamanhoFonte, setTamanhoFonte] = useState(() => localStorage.getItem("tamanhoFonte") || "medio");

  useEffect(() => {
    const html = document.documentElement;
    if (modoEscuro) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("modoEscuro", modoEscuro);
  }, [modoEscuro]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("fonte-pequena", "fonte-media", "fonte-grande");
    html.classList.add(`fonte-${tamanhoFonte}`);
    localStorage.setItem("tamanhoFonte", tamanhoFonte);
  }, [tamanhoFonte]);

  return (
    <TemaContext.Provider value={{ modoEscuro, setModoEscuro, tamanhoFonte, setTamanhoFonte }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() { return useContext(TemaContext); }
