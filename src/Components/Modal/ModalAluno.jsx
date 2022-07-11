import React from 'react';
import styles from './Modal.module.css';

export default function ModalAluno({ aluno, setModalState }) {
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalState(false);
    }
  }

  return (
    <>
      <div className={styles.modal} onClick={handleOutsideClick}>
        <div className=" m-auto z-10 bg-zinc-100 w-fit h-fit rounded flex flex-col text-center max-w-lg shadow py-5 relative">
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 sm:py-0 sm:px-0"
            onClick={() => setModalState(false)}
          >
            <svg
              className="fill-current h-8 w-8 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Fechar</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
          <div className=" text-2xl flex mx-16 justify-center align-center">
            <img className="w-40 sm:w-32  px-2" src={aluno.foto.url} alt="" />
            <p className="m-auto px-4 break-word"> {aluno.name}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-1 gap-8 sm:overflow-y-auto">
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
