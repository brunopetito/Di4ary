import React from 'react';

import { request } from 'graphql-request';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

const GET_USER_ID = gql`
  query ($user: String, $password: String) {
    teachers(where: { user: $user, password: $password }) {
      id
    }
  }
`;

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  // async function getUser(token) {
  //   const { url, options } = USER_GET(token);
  //   const response = await fetch(url, options);
  //   const json = await response.json();
  //   setData(json);
  //   setLogin(true);
  // }

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('id');
      navigate('/login');
    },
    [navigate],
  );

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const p = await request(
        'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
        GET_USER_ID,
        { user: username, password: password },
      ).then((response) => {
        if (response.teachers.length > 0) {
          setData(response);
          setLogin(true);
          window.localStorage.setItem('id', response.teachers[0]);
          navigate('/home');
        }
      });
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const id = window.localStorage.getItem('id');
      if (id) {
        try {
          setError(null);
          setLoading(true);
          setLogin(true);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
