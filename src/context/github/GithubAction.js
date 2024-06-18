import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` }
});

//특정 단어로 유저찾기
export const searchUsers = async (text) => {
  const pararms = new URLSearchParams({
    q: text
  });

  const response = await github.get(`/search/users?${pararms}`);
  return response.data.items;
};

//아이디로 유저와 리포 검색
export const getUserAndRepos = async (login) => {

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
//유저 리포검색
export const getUserRepos = async (login) => {

  const pararms = new URLSearchParams({
    sort: 'created',
    per_page: 10
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${pararms}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
};