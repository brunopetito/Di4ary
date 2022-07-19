import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendario from './Components/Calendario';
import Notas from './Components/Notas';
import Frequencia from './Components/Frequencia';
import Turmas from './Components/Turmas';
import Conta from './Components/Conta';
import Home from './Components/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/calendario" element={<Calendario />} />
      <Route path="/notas" element={<Notas />} />
      <Route path="/frequencia" element={<Frequencia />} />
      <Route path="/turmas" element={<Turmas />} />
      <Route path="/conta" element={<Conta />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
