import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuMobile from './helpers/MenuMobile';

import styles from './css/Header.module.css';
import {
  Exam,
  Calendar,
  Folders,
  PresentationChart,
  List,
  X,
} from 'phosphor-react';
import Foto from '../Assets/foto-perfil.jpg';

function Header() {
  const [hamburguerToggle, setHamburguerToggle] = React.useState(false);
  return (
    <header className="bg-zinc-700 flex items-center justify-center h-24 font-poppins  text-sm ">
      <nav
        className="w-4/5   flex items-center text-gray-50 justify-between xl:w-2/3 max-w-screen-lg
      md:w-11/12
      "
      >
        <div
          className="hidden 
          w-1
          sm:w-full
          sm:flex
          sm:align-center
          sm:justify-between
          sm:px-9"
        >
          <div className="py-2">logo</div>

          <button
            className={`${styles.mobileButton} ${
              hamburguerToggle && styles.mobileButtonActive
            } `}
            onClick={() => {
              setHamburguerToggle(!hamburguerToggle);
            }}
          ></button>
          {hamburguerToggle && (
            <MenuMobile
              setHamburguerToggle={(setHamburguerToggle, hamburguerToggle)}
              className={hamburguerToggle ? 'bg-esmerald-100' : null}
            />
          )}
        </div>

        <div className=" sm:hidden flex w-full items-center text-gray-50 justify-between">
          <NavLink to="/home" className="sm:hidden">
            Logo
          </NavLink>
          <NavLink
            to="/calendario"
            className="flex flex-col justify-center text-center items-center"
          >
            <Calendar size={44} />
            <p className="text-sm">Calendário</p>
          </NavLink>
          <NavLink
            to="/turmas"
            className="flex flex-col justify-center text-center items-center"
          >
            <Folders size={44} />
            <p className="text-sm">Turmas</p>
          </NavLink>
          <NavLink
            to="/notas"
            className="flex flex-col justify-center text-center items-center"
          >
            <Exam size={44} />
            <p className="text-sm">Notas</p>
          </NavLink>
          <NavLink
            to="/frequencia"
            className="flex flex-col justify-center text-center items-center"
          >
            <PresentationChart size={44} />
            <p className="text-sm">Frequência</p>
          </NavLink>
          <NavLink to="/conta">
            <div className="flex justify-center items-center ">
              <img src={Foto} className="w-14 rounded-full" />
              <div className=" pl-2">
                <p className="text-sm">Bruno Petito</p>
                <p className="text-xs text-zinc-400">Professor</p>
              </div>
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
