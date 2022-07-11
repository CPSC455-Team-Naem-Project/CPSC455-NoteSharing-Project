import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export  const Login = (props: any) => {
    const auth = getAuth();
    const showLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Please login to continue</h1>
            <button onClick={showLogin}>Login</button>
        </div>
    )
}
