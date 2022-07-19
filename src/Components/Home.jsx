import Mulher from '../Assets/mulher.jpg';
import React from 'react';
export default function Home() {
  const [formState, setFormState] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [requiredMessage, setRequiredMessage] = React.useState(false);

  function handleClick() {
    if (formState) {
      console.log(email);
    } else {
      setRequiredMessage(true);
    }
  }
  return (
    <section className="flex items-center h-fit justify-center  divide-zinc-200 mb-8  ">
      <div
        className="grid grid-cols-2 mt-20 
      md:w-full md:px-4 sm:flex sm:align-middle sm:justify-center  max-w-5xl  xl:w-2/3 lg:w-11/12
      "
      >
        {/* col 1 */}
        <div className="flex flex-col justify-start max-w-[80%] sm:w-full">
          <p className="text-5xl lg:text-4xl font-bold text- ">
            DI<span className="text-emerald-500">4</span>RY é seu novo diário
            escolar digital
          </p>
          <p className="mt-12">
            Somos a maior plataforma de serviços financeiros feita para escolas.
            Nossa parceria funciona assim: o isaac oferece facilidade em gestão
            financeira e você toma as melhores decisões para a sua escola, com
            mais segurança, controle e tranquilidade.
          </p>

          <div className="flex flex-col max-w-md sm:justify-center sm:align-center">
            <label htmlFor="email" className="mt-12">
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              className={` border  rounded-md h-8 px-2  w-3/4 min-w-[280px] ${
                formState ? 'border-slate-400' : 'border-red-400'
              }`}
              type="email"
              id="email"
              onBlur={({ target }) => {
                if (target.value == '') {
                  setFormState(false);
                  setRequiredMessage(true);
                } else {
                  setFormState(true);
                  setEmail(target.value);
                  setRequiredMessage(false);
                }
              }}
            />
            {requiredMessage && (
              <span className="text-red-500 text-xs">
                {' '}
                Preencha esse campo obrigatório.
              </span>
            )}
            <button
              className="btn border-t-cyan-500 w-3/4 bg-[#7ceab7] p-2 rounded-md mt-4 min-w-[280px]
            py-1 px-6 h-[38px]  text-emerald-800  font-bold hover:bg-emerald-500 hover:text-white transition
            duration-300"
              onClick={handleClick}
            >
              Quero DI4RY na minha escola
            </button>
          </div>
        </div>
        {/* col 2 */}
        <div className="sm:hidden">
          <img
            className="border rounded-md  h-[600px] "
            src={Mulher}
            alt="Foto de uma mulher no notebook."
          />
        </div>
      </div>
    </section>
  );
}
