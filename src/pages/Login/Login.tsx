import { getAuth } from 'firebase/auth';

export const Login = (props: any) => {
  const auth = getAuth();

  return (
    <div>
      <h1>Please login to continue ...</h1>
    </div>
  );
};
