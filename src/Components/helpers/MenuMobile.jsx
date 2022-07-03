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
      className="absolute right-0 w-1/2 top-[96px] h-1/2 bg-zinc-700 z-10 border-t-4  border-[#7ceab7]
     "
    >
      <div>
        <NavLink to="/conta">
          <div className="flex justify-center items-center mt-6 ">
            <img src={Foto} className="w-14 rounded-full" />
            <div className=" pl-2">
              <p className="text-sm">Bruno Petito</p>
              <p className="text-xs text-zinc-400">Professor</p>
            </div>
          </div>
        </NavLink>
        <div className="py-10 flex flex-col align-left px-4 divide-y gap-2">
          <NavLink to="/calendario" className="flex  items-center w-full py-3">
            <Calendar size={44} />
            <p className="text-sm ml-2">Calendário</p>
          </NavLink>
          <NavLink to="/turmas" className="flex  items-center py-3">
            <Folders size={44} />
            <p className="text-sm ml-2">Turmas</p>
          </NavLink>
          <NavLink to="/notas" className="flex  items-center py-3">
            <Exam size={44} />
            <p className="text-sm ml-2">Notas</p>
          </NavLink>
          <NavLink to="/frequencia" className="flex items-center py-3">
            <PresentationChart size={44} />
            <p className="text-sm ml-2">Frequência</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
