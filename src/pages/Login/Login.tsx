import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const jwt = useAppSelector((s: RootState) => s.user.jwt);
    const loginErrorMessage = useAppSelector((s: RootState) => s.user.loginErrorMessage);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    return (
        <div className={styles.login}>
            <Heading>Вход</Heading>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' placeholder='Email' name='email' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input id='password' type='password' placeholder='Пароль' name='password' />
                </div>
                <Button appearance='large'>Вход</Button>
            </form>
            <div className={styles.links}>
                <div>Нет аккаунта?</div>
                <div>
                    <Link to='/auth/register'>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
