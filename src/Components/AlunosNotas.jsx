import React from 'react';
import { request } from 'graphql-request';
import { gql, useQuery } from '@apollo/client';
import { Check, X } from 'phosphor-react';

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

const UPDATE_ALUNO_NOTA = gql`
  mutation MyMutation(
    $id: ID
    $n1: Float
    $n2: Float
    $n3: Float
    $reav: Float
    $final: Float
  ) {
    updateNota(
      where: { id: $id }
      data: { n1: $n1, n2: $n2, n3: $n3, reav: $reav, final: $final }
    ) {
      id
    }
  }
`;

export default function AlunosNotas({
  aluno,
  turma,
  periodo,
  disciplina,
  setarAlunosTurma,
  setarAlunosArray,
  setarLoading,
}) {
  const [loadingMudarNotaN1, setLoadingMudarNotaN1] = React.useState();
  const [stateN1Update, setStateN1Update] = React.useState();
  const [stateN1UpdateProblem, setStateN1UpdateProblem] = React.useState();

  const [loadingMudarNotaN2, setLoadingMudarNotaN2] = React.useState();
  const [stateN2Update, setStateN2Update] = React.useState();
  const [stateN2UpdateProblem, setStateN2UpdateProblem] = React.useState();

  const [loadingMudarNotaN3, setLoadingMudarNotaN3] = React.useState();
  const [stateN3Update, setStateN3Update] = React.useState();
  const [stateN3UpdateProblem, setStateN3UpdateProblem] = React.useState();

  const [loadingMudarNotaReav, setLoadingMudarNotaReav] = React.useState();
  const [stateReavUpdate, setStateReavUpdate] = React.useState();
  const [stateReavUpdateProblem, setStateReavUpdateProblem] = React.useState();

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

    await setarAlunosTurma(dataAwaited);
    const dataAluno = await dataAwaited.turma.alunos;
    setarAlunosArray(dataAluno);

    setTimeout(() => {
      setarLoading(false);
    }, '300');
  }
  async function mudarNotaN1(nota, nova) {
    setLoadingMudarNotaN1(true);

    let notaFinal;
    if ((parseFloat(nova) + nota.n2 + nota.n3) / 3 >= nota.reav) {
      notaFinal = (parseFloat(nova) + nota.n2 + nota.n3) / 3;
    } else {
      notaFinal = nota.reav;
    }
    const data = request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      UPDATE_ALUNO_NOTA,
      {
        id: nota.id,
        n1: parseFloat(nova),
        n2: nota.n2,
        n3: nota.n3,
        reav: nota.reav,
        final: parseFloat(notaFinal.toFixed(2)),
      },
    ).then((res) => {
      setLoadingMudarNotaN1(false);
      if (res.updateNota) {
        atualizarNotas();
        setStateN1Update(true);
      } else {
        setStateN1Update(false);
        stateN1UpdateProblem(true);
      }
    });
  }

  async function mudarNotaN2(nota, nova) {
    setLoadingMudarNotaN2(true);
    let notaFinal;

    if ((parseFloat(nova) + nota.n1 + nota.n3) / 3 >= nota.reav) {
      notaFinal = (parseFloat(nova) + nota.n1 + nota.n3) / 3;
    } else {
      notaFinal = nota.reav;
    }
    const data = request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      UPDATE_ALUNO_NOTA,
      {
        id: nota.id,
        n2: parseFloat(nova),
        final: parseFloat(notaFinal.toFixed(2)),
      },
    ).then((res) => {
      setLoadingMudarNotaN2(false);
      if (res.updateNota) {
        atualizarNotas();
        setStateN2Update(true);
      } else {
        setStateN2Update(false);
      }
    });
  }

  async function mudarNotaN3(nota, nova) {
    setLoadingMudarNotaN3(true);
    let notaFinal;
    if ((parseFloat(nova) + nota.n1 + nota.n2) / 3 >= nota.reav) {
      notaFinal = (parseFloat(nova) + nota.n1 + nota.n2) / 3;
    } else {
      notaFinal = nota.reav;
    }
    const data = request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      UPDATE_ALUNO_NOTA,
      {
        id: nota.id,
        n3: parseFloat(nova),
        final: parseFloat(notaFinal.toFixed(2)),
      },
    ).then((res) => {
      setLoadingMudarNotaN3(false);
      if (res.updateNota) {
        atualizarNotas();
        setStateN3Update(true);
      } else {
        setStateN3Update(false);
      }
    });
  }

  async function mudarNotaReav(nota, nova) {
    setLoadingMudarNotaReav(true);
    let notaFinal;
    if ((nota.n3 + nota.n1 + nota.n2) / 3 >= parseFloat(nova)) {
      notaFinal = (nota.n3 + nota.n1 + nota.n2) / 3;
    } else {
      notaFinal = parseFloat(nova);
    }
    const data = request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      UPDATE_ALUNO_NOTA,
      {
        id: nota.id,
        reav: parseFloat(nova),
        final: parseFloat(notaFinal.toFixed(2)),
      },
    ).then((res) => {
      setLoadingMudarNotaReav(false);
      if (res.updateNota) {
        atualizarNotas();
        setStateReavUpdate(true);
      } else {
        setStateReavUpdate(false);
      }
    });
  }
  return (
    <div className=" min-w-fit flex items-center align-center justify-between text-zinc-800 mt-2 overflow-auto">
      <p className="w-48  truncate px-4 py-2 border rounded">{aluno.name}</p>
      <div className="w-24 h-10 border rounded placeholder-gray-900 flex align-center focus-within:border-2 focus-within:border-zinc-700">
        <input
          type="number"
          step="0.1"
          className="w-full px-4 placeholder-gray-900 outline-none"
          placeholder={aluno.notas[0] && aluno.notas[0].n1}
          onBlur={(event) => {
            if (
              event.target.value != '' &&
              aluno.notas[0] != event.target.value
            ) {
              aluno.notas[0].n1 = event.target.value;
              mudarNotaN1(aluno.notas[0], event.target.value).then(
                (event.target.value = ''),
              ),
                setTimeout(() => {
                  setStateN1Update(false);
                }, '3000');
            }
          }}
        />
        {loadingMudarNotaN1 ? (
          <div className="loader relative top-4 right-4"></div>
        ) : stateN1Update ? (
          <Check
            size={32}
            color="#65ecad"
            className="mt-[0.15rem] mr-[0.15rem]"
          />
        ) : stateN1UpdateProblem ? (
          <X size={32} color="#ec6572" />
        ) : null}
      </div>

      <div className="w-24 h-10 border rounded placeholder-gray-900 flex align-center focus-within:border-2 focus-within:border-zinc-700">
        <input
          type="number"
          step="0.1"
          className="w-full px-4 placeholder-gray-900 outline-none"
          placeholder={aluno.notas[0] && aluno.notas[0].n2}
          onBlur={(event) => {
            if (
              event.target.value != '' &&
              aluno.notas[0] != event.target.value
            ) {
              aluno.notas[0].n2 = event.target.value;
              mudarNotaN2(aluno.notas[0], event.target.value).then(
                (event.target.value = ''),
              );
              setTimeout(() => {
                setStateN2Update(false);
              }, '3000');
            }
          }}
        />
        {loadingMudarNotaN2 ? (
          <div className="loader relative top-4 right-4"></div>
        ) : stateN2Update ? (
          <Check
            size={32}
            color="#65ecad"
            className="mt-[0.15rem] mr-[0.15rem]"
          />
        ) : stateN2UpdateProblem ? (
          <X size={32} color="#ec6572" />
        ) : null}
      </div>

      <div className="w-24 h-10 border rounded placeholder-gray-900 flex align-center focus-within:border-2 focus-within:border-zinc-700">
        <input
          type="number"
          step="0.1"
          className="w-full px-4 placeholder-gray-900 outline-none"
          placeholder={aluno.notas[0] && aluno.notas[0].n3}
          onBlur={(event) => {
            if (
              event.target.value != '' &&
              aluno.notas[0] != event.target.value
            ) {
              aluno.notas[0].n3 = event.target.value;
              mudarNotaN3(aluno.notas[0], event.target.value).then(
                (event.target.value = ''),
              );
              setTimeout(() => {
                setStateN3Update(false);
              }, '3000');
            }
          }}
        />
        {loadingMudarNotaN3 ? (
          <div className="loader relative top-4 right-4"></div>
        ) : stateN3Update ? (
          <Check
            size={32}
            color="#65ecad"
            className="mt-[0.15rem] mr-[0.15rem]"
          />
        ) : stateN3UpdateProblem ? (
          <X size={32} color="#ec6572" />
        ) : null}
      </div>

      <div className="w-24 h-10 border rounded placeholder-gray-900 flex align-center focus-within:border-2 focus-within:border-zinc-700">
        <input
          type="number"
          step="0.1"
          className="w-full px-4 placeholder-gray-900 outline-none"
          placeholder={aluno.notas[0] && aluno.notas[0].reav}
          onBlur={(event) => {
            if (
              event.target.value != '' &&
              aluno.notas[0] != event.target.value
            ) {
              aluno.notas[0].reav = event.target.value;
              mudarNotaReav(aluno.notas[0], event.target.value).then(
                (event.target.value = ''),
              );

              setTimeout(() => {
                setStateReavUpdate(false);
              }, '3000');
            }
          }}
        />

        {loadingMudarNotaReav ? (
          <div className="loader relative top-4 right-4"></div>
        ) : stateReavUpdate ? (
          <Check
            size={32}
            color="#65ecad"
            className="mt-[0.15rem] mr-[0.15rem]"
          />
        ) : stateReavUpdateProblem ? (
          <X size={32} color="#ec6572" />
        ) : null}
      </div>

      <input
        className="w-24 py-2 px-4 border rounded "
        disabled
        placeholder={aluno.notas[0] && aluno.notas[0].final}
      />
    </div>
  );
}
