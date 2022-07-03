import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Select from 'react-select';
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

const GET_ALL_CLASSES = gql`
  query {
    turmas(orderBy: number_ASC) {
      id
      number
      ano
    }
  }
`;

function Frequencia() {
  const turmasFetch = [];
  const [ano, setAno] = React.useState('');
  const [turma, setTurma] = React.useState('');
  const [turmas, setTurmas] = React.useState();

  const [periodo, setPeriodo] = React.useState('');
  const [disciplina, setDisciplina] = React.useState('');

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

  function buttonClick() {
    console.log('clicado');
  }
  return (
    <section className="flex flex-col items-center justify-center h-24">
      <div className="w-4/5 xl:w-2/3 max-w-screen-md flex items-center mt-10 justify-between text-zinc-800 ">
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
        <button
          onClick={buttonClick}
          className=" bg-violet-300 py-2 px-6 rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300"
        >
          Buscar ➜
        </button>
      </div>

      <p>teste</p>
    </section>
  );
}

export default Frequencia;
