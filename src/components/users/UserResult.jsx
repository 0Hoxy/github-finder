import { useContext /*useEffect*/ } from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResult() {
  const { users, loading /*fetchUsers*/ } = useContext(GithubContext);

  // useEffect(() => {
  //   fetchUsers();
  //   // eslint-disable-next-line
  // }, []); //앱 시작시 실행됨

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResult;
