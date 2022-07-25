import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/Logo.svg';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

import styles from './css/Header.module.css';
import {
  Exam,
  Calendar,
  Folders,
  PresentationChart,
  User,
  Door,
} from 'phosphor-react';
import Foto from '../Assets/foto-perfil.jpg';

function Header() {
  const [hamburguerToggle, setHamburguerToggle] = React.useState(false);
  const { login, userLogout } = React.useContext(UserContext);
  console.log;
  const navigate = useNavigate();

  return (
    <header>
      <div
        className={`bg-zinc-700 flex items-center sm:fixed absolute justify-center font-poppins  top-0 text-sm  w-full
        
        ${hamburguerToggle ? `${styles.open} ` : `${styles.close}  `}`}
      >
        <nav
          className={`w-4/5  flex items-center text-gray-50 justify-between xl:w-2/3 
          max-w-5xl top-[1.9rem] z-10 sm:absolute
       lg:w-11/12 `}
        >
          <div
            className={` hidden
            w-1
            sm:w-full
            sm:flex
          sm:align-center
          sm:justify-between
          sm:px-4
          transition
        `}
          >
            <NavLink
              to="/home"
              onClick={() => {
                setHamburguerToggle(false);
              }}
            >
              <Logo />
            </NavLink>

            {login ? (
              <button
                className={`${styles.mobileButton} ${
                  hamburguerToggle && styles.mobileButtonActive
                } `}
                onClick={() => {
                  setHamburguerToggle(!hamburguerToggle);
                }}
              ></button>
            ) : (
              <NavLink to="/login">
                <button className="border p-2 rounded hover:border-[#7ceab7] hover:text-[#7ceab7]">
                  Logar
                </button>
              </NavLink>
            )}

            <div
              className={`absolute right-0 w-full top-[96px] z-10 border-[#7ceab7] border-t-4 `}
            >
              <div className="py-4 flex flex-col px-4 divide-y ">
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
                <div className=" flex justify-left w-full justify-center">
                  <NavLink
                    to="/home"
                    className="flex  items-center py-3 w-32"
                    onClick={() => {
                      userLogout();
                      setHamburguerToggle(false);
                    }}
                  >
                    <Door size={44} />
                    <p className="text-sm ml-2">Sair</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {login ? (
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
          ) : (
            <div className=" sm:hidden flex w-full items-center text-gray-50 justify-between">
              <NavLink to="/home" className="sm:hidden">
                <Logo />
              </NavLink>

              <NavLink to="/login">
                <button className="flex justify-center items-center ">
                  Logar
                </button>
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
