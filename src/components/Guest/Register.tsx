import {useState} from "react";
import {registerUser} from "../../features/api/accountApi.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const Register = () => {
    const[login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const dispatch = useAppDispatch();

    const handlClickRegister = () => {
        dispatch(registerUser({login, password, firstName, lastName}));
        alert('Register')
    }
    const handlClickClear =() => {
        setLogin('');
        setPassword('');
        setFirstName('');
        setLastName('')
    }
    return (
        <>
            <label>Login:
                <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>First name:
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
            </label>
            <label>Last name:
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                />
            </label>
            <button
                onClick={handlClickRegister}
            >Register
            </button>
            <button
                onClick={handlClickClear}
            >Clear
            </button>
        </>
    );
};

;

export default Register;