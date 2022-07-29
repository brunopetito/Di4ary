import React from 'react';
import { UserContext } from '../UserContext';

function Login() {
  const [username, SetUsername] = React.useState('');
  const [password, SetPassword] = React.useState('');
  const [loading, setLoading] = React.useState();
  const { userLogin, data, setData } = React.useContext(UserContext);

  async function handleClick() {
    try {
      setLoading(true);
      const logar = await userLogin(username, password).then(() =>
        setLoading(false),
      );
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <section className="flex flex-col items-center justify-center align-middle pt-12">
      <div className="bg-gray-200 h-80 w-80 flex flex-col items-center align-middle pt-12 rounded-lg shadow-sm ">
        <p className="text-lg font-bold">Bem-Vindo</p>

        <div className="flex flex-col">
          <div className="relative">
            <input
              className="p-2 mt-8 rounded focus:outline-zinc-600 relative"
              type="text"
              onChange={(p) => SetUsername(p.target.value)}
              placeholder="Username"
            />
          </div>

          <input
            className="p-2 mt-2 rounded focus:outline-zinc-600"
            type="password"
            placeholder="Senha"
            onChange={(p) => SetPassword(p.target.value)}
          />
        </div>
        {loading ? (
          <button className="py-1 px-4 w-fit h-[38px] rounded text-white  font-display font-bold cursor-no-drop opacity-3 bg-gray-300 opacity-8 mt-8 ">
            Logando...
          </button>
        ) : (
          <button
            onClick={handleClick}
            className=" bg-violet-300 w-fit py-1 px-6 h-[38px] rounded text-violet-800 font-display font-bold hover:bg-violet-400 hover:text-white transition
          duration-300 mt-8"
          >
            Logar ➜
          </button>
        )}
        <div className="mt-2">
          <p>Username: admin@gmail.com</p>
          <p>Senha: admin1234</p>
        </div>
      </div>
    </section>
  );
}

export default Login;
