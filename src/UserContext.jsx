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

const GET_USER_DATA = gql`
  query ($id: ID) {
    teacher(where: { id: $id }) {
      name
      occupation
      photo {
        url
      }
    }
  }
`;

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  async function getTeacherData(id) {
    const teacherData = await request(
      'https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master',
      GET_USER_DATA,
      { id: id },
    ).then((response) => {
      window.localStorage.setItem('TeacherName', response.teacher.name);
      window.localStorage.setItem(
        'TeacherOccupation',
        response.teacher.occupation,
      );
      window.localStorage.setItem('TeacherPhoto', response.teacher.photo);
      setData(response);
    });
  }

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('id');
      window.localStorage.removeItem('TeacherName');
      window.localStorage.removeItem('TeacherOccupation');
      window.localStorage.removeItem('TeacherPhoto');
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
          window.localStorage.setItem('id', response.teachers[0]);
          getTeacherData(response.teachers[0].id);

          setLogin(true);
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
      value={{
        userLogin,
        userLogout,
        data,
        error,
        loading,
        login,
        getTeacherData,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
