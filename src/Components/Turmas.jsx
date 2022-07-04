import React from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request';
import { Notepad, PhoneIncoming } from 'phosphor-react';
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
      alunos {
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
    const data = await request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      GET_ALUNOS_IN_CLASS,
      {
        id: turmaSelected,
      },
    ).then((data) => setAlunosInTurma(data.turma.alunos));
    console.log(alunosInTurma);
  }
  return (
    <section className="flex items-center h-24 flex-col divide-y divide-zinc-200 ">
      <div className="w-4/5 xl:w-2/3 max-w-screen-md flex items-center mt-10  text-zinc-800  ">
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
        <button
          onClick={buttonClick}
          className=" bg-violet-300 py-2 px-6 rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300"
        >
          Buscar ➜
        </button>
      </div>

      {alunosInTurma && (
        <div className="w-3/5 text-zinc-800 mt-12 xl:w-2/3 flex flex-col    max-w-screen-md">
          <div className="flex min-w-fit   items-center  mt-10 justify-between text-zinc-800 ">
            <p className=" w-24 bg-emerald-200 text-center text-emerald-900 py-2 px-4 rounded font-display font-bold">
              Aluno
            </p>
            <p
              className="
              w-fit
              bg-violet-300
              text-center
              text-violet-800
              py-2
              px-4
              rounded
              font-display
              font-bold
              flex
              align-center
              gap-2
              "
            >
              Observações dos Professores
              <Notepad size={24} color="#5B21B6" />
            </p>
            <p
              className="
              w-fit
              bg-violet-300
              text-center
              text-violet-800
              py-2
              px-4
              rounded
              font-display
              font-bold
              flex
              align-center
              gap-2
              "
            >
              Solicitar Contato com o Responsável
              <PhoneIncoming size={24} color="#5B21B6" />
            </p>
          </div>
          <div className=" overflow-visible ">
            {alunosInTurma.map((aluno) => (
              <div
                key={aluno.id}
                className="flex min-w-fit  items-center  mt-10 justify-between text-zinc-800"
              >
                <div className="flex flex-col align-center justify-center">
                  <span>{aluno.name}</span>
                  <img src={aluno.foto.url} className="w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Turmas;
