import React from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request';
import { Notepad, PhoneIncoming } from 'phosphor-react';
import AlunoPerfil from './AlunoPerfil';
const GET_ALL_CLASSES = gql`
  query {
    turmas(orderBy: number_ASC) {
      id
      number
      ano
    }
  }
`;
const anos = [
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
];

const GET_ALUNOS_IN_CLASS = gql`
  query ($id: ID = "") {
    turma(where: { id: $id }) {
      number
      alunos(orderBy: name_ASC) {
        name
        id
        foto {
          url
        }
      }
    }
  }
`;
function Turmas() {
  const [turmas, setTurmas] = React.useState();
  const [turmaSelected, setTurmaSelected] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [blank, setBlank] = React.useState(false);

  const [ano, setAno] = React.useState('');
  const [alunosInTurma, setAlunosInTurma] = React.useState();
  const { data } = useQuery(GET_ALL_CLASSES);

  const turmasFetch = [];

  React.useEffect(() => {
    if (ano) {
      data.turmas.forEach((element) => {
        if (element.ano == ano) {
          turmasFetch.push({ value: element.id, label: element.number });
        }
      });
    }
    setTurmas(turmasFetch);
  }, [ano]);

  async function buttonClick() {
    if (turmaSelected && ano) {
      setBlank(false);
      setLoading(!loading);
      const data = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        GET_ALUNOS_IN_CLASS,
        {
          id: turmaSelected,
        },
      )
        .then((data) => setAlunosInTurma(data.turma.alunos))
        .then(() => setLoading(false));
    } else {
      setBlank(true);
    }
  }
  return (
    <section className="flex items-center h-fit flex-col divide-y divide-zinc-200 mb-8 ">
      <div className="w-4/5 xl:w-2/3 max-w-screen-md flex items-center mt-10  text-zinc-800  justify-center gap-1 tk:w-full jk:grid">
        <Select
          options={anos}
          placeholder="Ano letivo"
          onChange={(a) => {
            setAno(a.value);
          }}
        />
        <Select
          options={turmas}
          placeholder="Turmas"
          onChange={(a) => {
            setTurmaSelected(a.value);
          }}
        />
        {loading ? (
          <button className="py-2 px-4 w-fit  rounded text-white  font-display font-bold cursor-no-drop opacity-3 bg-gray-300 opacity-8 ">
            Buscando...
          </button>
        ) : (
          <button
            onClick={buttonClick}
            className=" bg-violet-300 w-fit py-2 px-6 rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300 "
          >
            Buscar ➜
          </button>
        )}
      </div>
      {blank ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded relative mt-4 sm:px-3"
          role="alert"
        >
          <strong class="font-bold sm:hidden">Carambolas !</strong>
          <span class="block sm:inline">
            Você esqueceu de selecionar um campo.
          </span>
          <span
            class="absolute top-0 bottom-0 right-0 px-4 py-3 sm:py-0 sm:px-0"
            onClick={() => setBlank(false)}
          >
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Fechar</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}

      {alunosInTurma && (
        <div className="w-3/5 text-zinc-800 mt-12 xl:w-2/3 flex flex-col  max-w-screen-md">
          <div className="flex w-full  flex-col items-center  mt-10 justify-center text-zinc-800 ">
            <p className=" w-24 bg-emerald-200 text-center text-emerald-900 py-2 px-4 rounded font-display font-bold">
              Alunos
            </p>
            <div className=" grid grid-cols-4 gap-5 max-w-lg md:grid-cols-3 jk:grid-cols-2 mn:grid-cols-1">
              {alunosInTurma.map((aluno) => (
                <AlunoPerfil aluno={aluno} key={aluno.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Turmas;
