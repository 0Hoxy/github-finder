import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //const [users, setUsers] = useReducer([]);
  //const [loading, setLoading] = useReducer(true);
  const initialState = {
    users: [],
    loading: false,
  };


  const [state, dispatch] = useReducer(githubReducer, initialState);

  //테스트용 유저조회
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
      loading: false
    });
  };

  //로딩상태를 true로 업데이트하기 위한 dispatch
  const setLoading = () => dispatch({
    type: 'SET_LOADING'
  });

  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS '
  });


  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      searchUsers,
      clearUsers,
    }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;