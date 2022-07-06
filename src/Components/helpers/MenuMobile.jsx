import {
  Exam,
  Calendar,
  Folders,
  PresentationChart,
  User,
} from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import Foto from '../../Assets/foto-perfil.jpg';

export default function MenuMobile({ setHamburguerToggle }) {
  return (
    <div
      className={`absolute right-0 w-full top-[96px] bg-zinc-700 z-10 border-t-4  border-[#7ceab7]`}
    >
      <div className=" w-full m-auto">
        <div className="py-4 flex flex-col  px-4 divide-y w-full  align-center">
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
    </div>
  );
}
