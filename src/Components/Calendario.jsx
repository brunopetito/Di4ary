import React from 'react';
import FotoCalendario from '../Assets/Calendario.jpeg';

function Calendario() {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-4">
      <div className="">
        <img className="w-full" src={FotoCalendario} alt="" />
      </div>
    </section>
  );
}

export default Calendario;
