import React from 'react';
import styles from './Modal.module.css';

export default function ModalAluno({ aluno, setModalState }) {
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalState(false);
    }
  }
  console.log(aluno.sangue);
  return (
    <>
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div className=" m-auto z-10 bg-zinc-100 w-4/5 h-3/5 rounded flex flex-col text-center max-w-lg shadow sm:h-4/5">
          <div className=" text-2xl flex mx-auto justify-center align-center mt-6">
            <img className="w-40 sm:w-28" src={aluno.foto.url} alt="" />
            <p className="m-auto px-4 break-all"> {aluno.name}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-1 gap-8 overflow-auto">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="responsavelPedagogico"
              >
                Responsável Pedagógico
              </label>
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none overflow-auto"
                id="responsavelPedagogico"
                type="text"
                disabled
                placeholder={aluno.responsavelp}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="responsavelFinanceiro"
              >
                Responsável Financeiro
              </label>
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none"
                id="responsavelFinanceiro"
                type="text"
                disabled
                placeholder={aluno.responsavelf}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="contato1"
              >
                Contato Pedagógico
              </label>
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none"
                id="contato1"
                type="number"
                disabled
                placeholder={aluno.contatop}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="contato1"
              >
                Contato Financeiro
              </label>
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none"
                id="contato1"
                type="number"
                disabled
                placeholder={aluno.contatoF}
              />
            </div>

            <div className="flex jk:flex-col ">
              <div className=" px-7">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1 truncate sm:px-3 "
                  htmlFor="sangue"
                >
                  Sangue
                </label>
                <input
                  className="shadow appearance-none border rounded  py-2  px-1 w-10 text-gray-700 leading-tight placeholder-gray-900 outline-none jk:w-full jk:mb-8 "
                  id="sangue"
                  type="text"
                  disabled
                  placeholder={aluno.sangue}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-1 "
                  htmlFor="sangue"
                >
                  Alergia
                </label>
                <input
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none w-[95%]
                  jk:w-4/5 "
                  id="sangue"
                  type="text"
                  disabled
                  placeholder={aluno.alergia}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="OBS"
              >
                Observação
              </label>
              <textarea
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight placeholder-gray-900 outline-none"
                id="OBS"
                type="text"
                disabled
                placeholder={aluno.observacao}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
