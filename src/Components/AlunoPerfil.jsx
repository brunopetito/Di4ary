import React from 'react';
import ModalAluno from './Modal/ModalAluno';

export default function AlunoPerfil({ aluno }) {
  const [modal, setModalState] = React.useState();
  return (
    <>
      <div
        key={aluno.id}
        className="flex min-w-fit  items-center  mt-6 justify-between text-zinc-800"
      >
        <button
          className="flex flex-col align-center justify-center"
          onClick={() => setModalState(!modal)}
        >
          <img src={aluno.foto.url} className="w-32 h-32" />
          <span className="truncate w-28">{aluno.name}</span>
        </button>
      </div>

      {modal && <ModalAluno aluno={aluno} setModalState={setModalState} />}
    </>
  );
}
