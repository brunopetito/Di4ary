import {
  Exam,
  Calendar,
  Folders,
  PresentationChart,
  List,
} from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import Foto from '../../Assets/foto-perfil.jpg';

export default function MenuMobile() {
  return (
    <div
      className="absolute right-0 w-full top-[96px] h-full bg-zinc-700 z-10 border-t-4  border-[#7ceab7]
     "
    >
      <div className="flex items-center flex-col">
        <NavLink to="/conta">
          <div className="flex justify-center items-center mt-2 ">
            <img src={Foto} className="w-14 rounded-full" />
            <div className=" pl-2">
              <p className="text-sm">Bruno Petito</p>
              <p className="text-xs text-zinc-400">Professor</p>
            </div>
          </div>
        </NavLink>
        <div className="py-4 flex flex-col  px-4 divide-y w-full ">
          <div className=" flex justify-center w-full">
            <NavLink to="/calendario" className="flex items-center py-3">
              <Calendar size={44} />
              <p className="text-sm ml-2">Calendário</p>
            </NavLink>
          </div>

          <div className=" flex justify-center w-full">
            <NavLink to="/turmas" className="flex  items-center py-3">
              <Folders size={44} />
              <p className="text-sm ml-2">Turmas</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/notas"
              className="flex  items-center justify-center py-3"
            >
              <Exam size={44} />
              <p className="text-sm ml-2">Notas</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/frequencia"
              className="flex items-center justify-center py-3"
            >
              <PresentationChart size={44} />
              <p className="text-sm ml-2">Frequência</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
