import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/Logo.svg';
import styles from './css/Header.module.css';
import {
  Exam,
  Calendar,
  Folders,
  PresentationChart,
  User,
  X,
} from 'phosphor-react';
import Foto from '../Assets/foto-perfil.jpg';

function Header() {
  const [hamburguerToggle, setHamburguerToggle] = React.useState(false);

  return (
    <div className="transition">
      <header
        className={`bg-zinc-700 flex items-center justify-center h-24 font-poppins  text-sm  transition ${
          hamburguerToggle ? `${styles.teste}` : null
        }`}
      >
        <nav
          className={`w-4/5   flex items-center text-gray-50 justify-between xl:w-2/3 
          max-w-5xl
      md:w-11/12  ${hamburguerToggle ? ' absolute top-[1.9rem]' : 'null'}`}
        >
          <div
            className={` 
            w-1
            sm:w-full
            sm:flex
          sm:align-center
          sm:justify-between
          sm:px-4
          transition
          ${hamburguerToggle ? ' transition block' : 'hidden'}`}
          >
            <NavLink
              to="/home"
              onClick={() => {
                setHamburguerToggle(!hamburguerToggle);
              }}
            >
              <Logo />
            </NavLink>

            <button
              className={`${styles.mobileButton} ${
                hamburguerToggle && styles.mobileButtonActive
              } `}
              onClick={() => {
                setHamburguerToggle(!hamburguerToggle);
              }}
            ></button>
            {hamburguerToggle && (
              <div
                className={`absolute right-0 w-full top-[96px] z-10 border-t-4  border-[#7ceab7] `}
              >
                <div className="py-4 flex flex-col px-4 divide-y  ">
                  <div className=" flex align-center justify-center w-full">
                    <NavLink
                      to="/calendario"
                      className="flex items-center align-left py-3 w-32"
                      onClick={() => {
                        setHamburguerToggle(false);
                      }}
                    >
                      <Calendar size={44} />
                      <p className="text-sm ml-2">Calendário</p>
                    </NavLink>
                  </div>

                  <div className=" flex justify-left w-full justify-center">
                    <NavLink
                      to="/turmas"
                      className="flex  items-center py-3 w-32"
                      onClick={() => {
                        setHamburguerToggle(false);
                      }}
                    >
                      <Folders size={44} />
                      <p className="text-sm ml-2">Turmas</p>
                    </NavLink>
                  </div>
                  <div className=" flex justify-left w-full justify-center">
                    <NavLink
                      to="/notas"
                      className="flex  items-center py-3 w-32"
                      onClick={() => {
                        setHamburguerToggle(false);
                      }}
                    >
                      <Exam size={44} />
                      <p className="text-sm ml-2">Notas</p>
                    </NavLink>
                  </div>
                  <div className=" flex justify-left w-full justify-center">
                    <NavLink
                      to="/frequencia"
                      className="flex items-center justify-left py-3 w-32"
                      onClick={() => {
                        setHamburguerToggle(false);
                      }}
                    >
                      <PresentationChart size={44} />
                      <p className="text-sm ml-2">Frequência</p>
                    </NavLink>
                  </div>
                  <div className=" flex justify-left w-full justify-center">
                    <NavLink
                      to="/conta"
                      className="flex  items-center py-3 w-32"
                      onClick={() => {
                        setHamburguerToggle(false);
                      }}
                    >
                      <User size={44} />
                      <p className="text-sm ml-2">Conta</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className=" sm:hidden flex w-full items-center text-gray-50 justify-between">
            <NavLink to="/home" className="sm:hidden">
              <Logo />
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
    </div>
  );
}

export default Header;
