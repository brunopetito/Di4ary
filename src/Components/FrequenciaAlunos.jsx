function FrequenciaAlunos({ aluno, showStudent, showDate }) {
  return <>{showStudent && showDate && <p>{aluno.name}</p>}</>;
}

export default FrequenciaAlunos;
