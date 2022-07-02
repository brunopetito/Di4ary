import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './global.module.css';
function Footer() {
  return (
    <footer className="bg-zinc-700 flex items-center justify-center h-40 bottom-0 fixed w-full font-poppins text-sm">
      <div className="w-4/5 flex items-start text-gray-50 justify-between xl:w-2/3 max-w-screen-lg">
        <div className="flex flex-col items-center">
          <p className="mb-4 font-poppins">Números</p>
          <div>
            <div className="bg-zinc-600 rounded py-2 px-8 mb-4">
              23552 | Alunos Registrados
            </div>
            <div className="bg-zinc-600 rounded py-2 px-8">
              252 | Professores Registrados
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-auto">
          <p className="mb-4 flex items-center font-poppins">Mapa do Site</p>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 w-full">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/calendario">Calendário</NavLink>
            <NavLink to="/turmas">Turmas</NavLink>
            <NavLink to="/notas">Notas</NavLink>
            <NavLink to="/frequencia">Frequência</NavLink>
          </nav>
        </div>
        <div className="flex flex-col items-center w-auto">
          <p className="mb-4 font-poppins">Suporte</p>
          <p className="mb-2 text-sm">email1@contato.gmail.com</p>
          <p className="mb-2 text-sm">email2@contato.gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
