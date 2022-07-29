import React from 'react';
import { gql } from '@apollo/client';
import { request } from 'graphql-request';

function FrequenciaAlunos({
  aluno,
  showStudent,
  showDate,
  dia,
  materia,
  turma,
  ano,
}) {
  const [present, setPresent] = React.useState(false);
  const [abscence, setAbscence] = React.useState();
  const [justifiedAbscence, setJustifiedAbscence] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const CREATE_FREQUENCY = gql`
    mutation (
      $ano: String = "2022"
      $dia: Date
      $materia: String
      $id: ID
      $id1: ID
      $estado: String = "P"
    ) {
      createFrequencia(
        data: {
          ano: $ano
          dia: $dia
          materia: $materia
          turmas: { connect: { id: $id } }
          estado: $estado
          alunos: { connect: { id: $id1 } }
        }
      ) {
        id
      }
    }
  `;

  const VERIFY_DATE = gql`
    query ($id: ID, $ano: String = "", $dia: Date, $materia: String = "") {
      aluno(where: { id: $id }) {
        frequencias(where: { ano: $ano, dia: $dia, materia: $materia }) {
          id
          estado
        }
      }
    }
  `;

  const UPDATE_FREQUENCY_STATE = gql`
    mutation ($id: ID, $estado: String) {
      updateFrequencia(where: { id: $id }, data: { estado: $estado }) {
        estado
      }
    }
  `;

  React.useEffect(() => {
    const fetchData = async () => {
      const verify = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        VERIFY_DATE,
        {
          ano: ano,
          dia: dia,
          materia: materia,
          id: aluno.id,
        },
      ).then((response) => {
        if (
          response.aluno.frequencias[0] &&
          response.aluno.frequencias[0].estado === 'P'
        ) {
          setPresent(true);
          setAbscence(false);
          setJustifiedAbscence(false);
        }
        if (
          response.aluno.frequencias[0] &&
          response.aluno.frequencias[0].estado === 'F'
        ) {
          setPresent(false);
          setAbscence(true);
          setJustifiedAbscence(false);
        }
        if (
          response.aluno.frequencias[0] &&
          response.aluno.frequencias[0].estado === 'FJ'
        ) {
          setPresent(false);
          setAbscence(false);
          setJustifiedAbscence(true);
        }
      });
    };
    fetchData();
  }, []);

  async function createFrequencia(estado) {
    setLoading(true);
    try {
      //Fazendo uma verificaçao para ver se a presença já existe
      const verify = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        VERIFY_DATE,
        {
          ano: ano,
          dia: dia,
          materia: materia,
          id: aluno.id,
        },
      )
        .then((response) => {
          if (response.aluno.frequencias.length == 0) {
            const data = request(
              'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
              CREATE_FREQUENCY,
              {
                ano: ano,
                dia: dia,
                materia: materia,
                id: turma,
                estado: estado,
                id1: aluno.id,
              },
            ).then(() => setLoading(false));
          } else {
            if (estado != response.aluno.frequencias[0].estado) {
              const data = request(
                'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
                UPDATE_FREQUENCY_STATE,
                {
                  id: response.aluno.frequencias[0].id,
                  estado: estado,
                },
              );
            }
          }
        })
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePresence() {
    setPresent(true);
    setAbscence(false);
    setJustifiedAbscence(false);
    createFrequencia('P');
  }

  async function handleAbscence() {
    setPresent(false);
    setAbscence(true);
    setJustifiedAbscence(false);
    createFrequencia('F');
  }
  async function handleAbscenceJustified() {
    setPresent(false);
    setAbscence(false);
    setJustifiedAbscence(true);
    createFrequencia('FJ');
  }

  return (
    <>
      {showStudent && showDate && (
        <div className="flex h-10 bg-slate-50 w-[530px] justify-between  items-center sm:w-[300px]  ">
          <span className="px-2 truncate"> {aluno.name}</span>

          <div className="px-3 flex gap-2 font-poppins ">
            {loading ? <div className="loader-freq"></div> : null}

            <button
              className={`border  border-current w-10 h-7 rounded bg-[#7CEAB7] text-[#106B42] ${
                !present && 'opacity-30'
              }`}
              onClick={handlePresence}
            >
              P
            </button>
            <button
              className={`border  border-current w-10 h-7 rounded bg-[#F9A6A6] text-[#B54646] ${
                !abscence && 'opacity-30'
              }`}
              onClick={handleAbscence}
            >
              F
            </button>
            <button
              className={`border  border-current w-10 h-7 rounded bg-[#FFEC87] text-[#8D8A30] ${
                !justifiedAbscence && 'opacity-30'
              }`}
              onClick={handleAbscenceJustified}
            >
              FJ
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FrequenciaAlunos;
