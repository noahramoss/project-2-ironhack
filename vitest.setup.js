import "@testing-library/jest-dom";
import React from "react";

// Inyectamos React en el objeto global de Node para que Vitest no se queje
globalThis.React = React;
