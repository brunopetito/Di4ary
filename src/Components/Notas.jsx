import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request';
import Select from 'react-select';
import AlunosNotas from './AlunosNotas';

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
  query ($id: ID, $periodo: Int, $materia: String) {
    turma(where: { id: $id }) {
      number
      alunos(orderBy: name_ASC) {
        name
        id
        notas(where: { periodo: $periodo, materia: $materia }) {
          id
          materia
          n1
          n2
          n3
          periodo
          reav
          final
        }
      }
      ano
    }
  }
`;

const CREATE_ALUNO_NOTA = gql`
  mutation (
    $id: ID = ""
    $periodo: Int
    $materia: String = ""
    $n1: Float = 0
    $n2: Float = 0
    $n3: Float = 0
    $reav: Float = 0
    $final: Float = 0
  ) {
    createNota(
      data: {
        alunos: { connect: { id: $id } }
        periodo: $periodo
        materia: $materia
        n1: $n1
        n2: $n2
        n3: $n3
        reav: $reav
        final: $final
      }
    ) {
      id
    }
  }
`;

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

const periodos = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

export default function Notas() {
  const [loading, setLoading] = React.useState(false);
  const [turmas, setTurmas] = React.useState([]);

  const [ano, setAno] = React.useState('');
  const [anoSelected, setAnoSelected] = React.useState('');

  const [turma, setTurma] = React.useState('');
  const [turmaSelected, setTurmaSelected] = React.useState('');

  const [periodo, setPeriodo] = React.useState('');
  const [periodoSelected, setPeriodoSelected] = React.useState('');

  const [disciplina, setDisciplina] = React.useState('');
  const [disciplinaSelected, setDisciplinaSelected] = React.useState('');

  const [alunosTurma, setAlunosTurma] = React.useState('');
  const [alunosArray, setAlunosArray] = React.useState([]);

  const turmasFetch = [];

  const { data } = useQuery(GET_ALL_CLASSES);

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
    if (ano && periodo && disciplina && turma) {
      setLoading(!loading);
      setDisciplinaSelected(disciplina);
      setAnoSelected(ano);
      setPeriodoSelected(periodo);
      setTurmaSelected(turma);

      const data = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        GET_ALUNOS_IN_CLASS,
        {
          id: turma,
          periodo: parseInt(periodo),
          materia: disciplina,
        },
      );
      const dataAwaited = await data;
      setAlunosTurma(dataAwaited);
      const dataAluno = await dataAwaited.turma.alunos;
      setAlunosArray(dataAluno);

      dataAluno.map((aluno) => {
        if (aluno.notas.length == 0) {
          const botarNota = request(
            'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
            CREATE_ALUNO_NOTA,
            {
              id: aluno.id,
              materia: disciplina,
              periodo: parseInt(periodo),
            },
          ).then(atualizarNotas);
        } else {
          setLoading(false);
        }
      });
    }
  }

  async function setarAlunosTurma(dado) {
    setAlunosTurma(dado);
  }
  async function setarAlunosArray(dado) {
    setAlunosArray(dado);
  }
  async function setarLoading(dado) {
    setLoading(dado);
  }
  async function atualizarNotas() {
    const data = await request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      GET_ALUNOS_IN_CLASS,
      {
        id: turma,
        periodo: parseInt(periodo),
        materia: disciplina,
      },
    );
    const dataAwaited = await data;

    setAlunosTurma(dataAwaited);
    const dataAluno = await dataAwaited.turma.alunos;
    setAlunosArray(dataAluno);

    setTimeout(() => {
      setLoading(false);
    }, '200');
  }

  return (
    <section
      className="flex items-center h-fit flex-col divide-y divide-zinc-200 
      
    "
    >
      <div
        className="
      flex 
      max-w-5xl 
      items-center mt-10 justify-between text-zinc-800
      gap-2 

      sm:grid
      sm:grid-cols-2 
      sm:gap-3
      jk:grid-cols-2
      mn:grid-cols-1
      
      sm:justify-start
      "
      >
        <Select
          options={anos}
          placeholder="Ano letivo"
          onChange={(a) => {
            setAno(a.value);
          }}
        />
        <Select
          options={turmas}
          placeholder="Turma"
          onChange={(a) => {
            setTurma(a.value);
          }}
        />
        <Select
          options={periodos}
          placeholder="Periodo"
          onChange={(a) => {
            setPeriodo(a.value);
          }}
        />

        <Select
          className="w-auto"
          options={materia}
          placeholder="Disciplina"
          onChange={(a) => {
            setDisciplina(a.value);
          }}
        />

        <div className="">
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
      </div>

      {turmaSelected && (
        <div
          className="w-3/5 text-zinc-800 mt-12 xl:w-2/3 flex flex-col max-w-3xl 
        md:w-full p-2 sm:overflow-auto gap-1 "
        >
          <h2 className="text-center pt-4 text-2xl ">
            {anoSelected} ---{alunosTurma ? alunosTurma.turma.number : null} ---
            {disciplinaSelected} --- {periodoSelected}p
          </h2>

          <div className="flex min-w-fit  items-center  mt-10 justify-between text-zinc-800 sm:overflow-auto">
            <p className=" w-48 bg-emerald-200 text-center text-emerald-900 py-2 px-4 rounded font-display font-bold">
              Nome do Aluno
            </p>
            <p className=" w-24 bg-violet-300  text-violet-900 py-2 px-4 rounded font-display font-bold">
              Trabalho
            </p>
            <p className=" w-24  text-center bg-violet-300  text-violet-900 py-2 px-4 rounded font-display font-bold">
              Teste
            </p>
            <p className=" w-24  text-center bg-violet-300  text-violet-900 py-2 px-4 rounded font-display font-bold">
              Prova
            </p>
            <p className="w-24  text-center bg-violet-300  text-violet-900 py-2 px-4 rounded font-display font-bold">
              Reav
            </p>
            <p className=" w-24  text-center bg-violet-300  text-violet-900 py-2 px-4 rounded font-display font-bold">
              Final
            </p>
          </div>
          <div>
            {alunosArray.map((aluno) => (
              <div key={aluno.id}>
                <AlunosNotas
                  aluno={aluno}
                  turma={turmaSelected}
                  periodo={periodoSelected}
                  disciplina={disciplinaSelected}
                  setarAlunosTurma={setarAlunosTurma}
                  setarAlunosArray={setarAlunosArray}
                  setarLoading={setarLoading}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
