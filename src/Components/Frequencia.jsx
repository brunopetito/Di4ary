import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Select from 'react-select';
import { UserContext } from '../UserContext';
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
  const { userLogin, data } = React.useContext(UserContext);
  const turmasFetch = [];
  const [ano, setAno] = React.useState('');
  const [turma, setTurma] = React.useState('');
  const [turmas, setTurmas] = React.useState();

  const [periodo, setPeriodo] = React.useState('');
  const [disciplina, setDisciplina] = React.useState('');

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

  function handleClick() {
    console.log('clicado');
  }
  return (
    <section className="flex items-center h-fit flex-col divide-y divide-zinc-200 ">
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
          onClick={handleClick}
          className=" bg-violet-300 py-2 px-6 rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300"
        >
          Buscar ➜
        </button>
      </div>
    </section>
  );
}

export default Frequencia;
