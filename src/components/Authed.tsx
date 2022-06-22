import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import React, {useEffect} from "react";

const Authed = (props: {children: any}) => {
    const nav = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const a = auth.onAuthStateChanged(user => {
            if (!user) {
                console.log('user not found')
                nav('/', {replace: true})
            } else {
                console.log('user found', user)
            }
        })

        return () => {
            a();
        }
    })

    return (
        <div>
            {props.children}
        </div>
    );
}

export default Authed;
