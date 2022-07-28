import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Select from 'react-select';
import { UserContext } from '../UserContext';
import { request } from 'graphql-request';
import FrequenciaAlunos from './FrequenciaAlunos';

const materia = [
  { value: 'Artes', label: 'Artes' },
  { value: 'Biologia', label: 'Biologia' },
  { value: 'Ciências', label: 'Ciências' },
  { value: 'Ed. Física', label: 'Ed. Física' },
  { value: 'Física', label: 'Física' },
  { value: 'Geografia', label: 'Geografia' },
  { value: 'Geometria', label: 'Geometria' },
  { value: 'História', label: 'História' },
  { value: 'Inglês', label: 'Inglês' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Português', label: 'Português' },
];

const anos = [
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
];

const GET_ALL_CLASSES = gql`
  query {
    turmas(orderBy: number_ASC) {
      id
      number
      ano
    }
  }
`;

const GET_ALUNOS_IN_CLASS = gql`
  query ($id: ID = "") {
    turma(where: { id: $id }) {
      alunos {
        name
        id
      }
    }
  }
`;

function Frequencia() {
  const turmasFetch = [];

  const [turmas, setTurmas] = React.useState([]);
  const [turma, setTurma] = React.useState('');
  const [turmaNumber, setTurmaNumber] = React.useState('');
  const [blank, setBlank] = React.useState(false);
  const [alunosArray, setAlunosArray] = React.useState([]);

  const [ano, setAno] = React.useState('');
  const [disciplina, setDisciplina] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { data } = useQuery(GET_ALL_CLASSES);

  const [consultar, setConsultar] = React.useState(false);
  const [consultarSelected, setConsultarSelected] = React.useState(false);

  const [lancar, setLancar] = React.useState(false);
  const [lancarSelected, setLancarSelected] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  const [dia, setDia] = React.useState('');
  const [showStudent, setShowStudent] = React.useState(false);

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
    if (ano && disciplina && turma && (lancar || consultar)) {
      if (lancar) {
        setConsultarSelected(false);
        setLancarSelected(true);
      }
      if (consultar) {
        setLancarSelected(false);
        setConsultarSelected(true);
      }

      setBlank(false);
      setLoading(!loading);
      setShowDate(true);

      const data = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        GET_ALUNOS_IN_CLASS,
        {
          id: turma,
        },
      )
        .then((r) => setAlunosArray(r.turma.alunos))
        .then(() => setLoading(false));
    } else {
      setBlank(true);
    }
  }
  return (
    <section className="flex items-center h-fit flex-col  divide-zinc-200 ">
      <div className="mt-8 gap-4  flex space-between">
        <button
          className={`${
            lancar &&
            'text-emerald-800 border-emerald-800 bg-[#7ceab7] font-medium '
          } border p-2 rounded hover:border-emerald-800 hover:text-emerald-800  `}
          onClick={() => {
            if (consultar) {
              setConsultar(!consultar);
              setShowDate(false);
            }

            setLancar(!lancar);
          }}
        >
          Lançar
        </button>
        <button
          className={`${
            consultar &&
            'text-emerald-800 border-emerald-800 bg-[#7ceab7] font-medium '
          } border p-2 rounded hover:border-emerald-800 hover:text-emerald-800  `}
          onClick={() => {
            if (lancar) {
              setLancar(!lancar);
              setShowDate(false);
            }
            setConsultar(!consultar);
          }}
        >
          Consultar
        </button>
      </div>
      <div
        className="  flex 
      max-w-5xl 
      items-center mt-10 justify-between text-zinc-800
      gap-2 
      sm:grid
      sm:grid-cols-2 
      sm:gap-3
      jk:grid-cols-2
      mn:gap-1
      sm:justify-start
      sm:relative "
      >
        {(lancar || consultar) && (
          <>
            <Select
              className="w-[142.2px]  mn:w-fit "
              options={anos}
              placeholder="Ano"
              onChange={(a) => {
                setAno(a.value);

                setShowDate(false);
              }}
            />
            <Select
              className="w-[103.91px]  mn:w-fit sm:w-[118.4px]"
              options={turmas}
              placeholder="Turma"
              onChange={(a) => {
                setTurma(a.value);
                setTurmaNumber(a.label);

                setShowDate(false);
              }}
            />
            <Select
              className="w-[142.2px] mn:w-fit "
              options={materia}
              placeholder="Disciplina"
              onChange={(a) => {
                setDisciplina(a.value);
                setShowDate(false);
              }}
            />

            {loading ? (
              <button className="py-1 px-4 w-fit h-[38px] rounded text-white  font-display font-bold cursor-no-drop opacity-3 bg-gray-300 opacity-8 ">
                Buscando...
              </button>
            ) : (
              <button
                onClick={buttonClick}
                className=" bg-violet-300 w-fit py-1 px-6 h-[38px] rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300 "
              >
                Buscar ➜
              </button>
            )}
          </>
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

      {showDate && (
        <>
          <p className="text-2xl mt-8">
            {ano} -- {disciplina} -- {turmaNumber}
          </p>
          <div className="mt-4 flex  gap-2">
            <div className=" mt-4 w-36 flex">
              <input
                className="border p-2 rounded"
                type="date"
                onChange={({ target }) => setDia(target.value)}
              />
            </div>
            <button
              className="border p-2 h-[43px] mt-4 rounded"
              onClick={() => setShowStudent(true)}
            >
              ➜
            </button>
          </div>
        </>
      )}

      {showStudent && dia && (
        <>
          {alunosArray.map((aluno) => (
            <div key={aluno.id}>
              <FrequenciaAlunos
                aluno={aluno}
                showStudent={showStudent}
                showDate={showDate}
              />
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default Frequencia;
