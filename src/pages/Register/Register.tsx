import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    };
};
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const jwt = useAppSelector((s: RootState) => s.user.jwt);
    const registerErrorMessage = useAppSelector((s: RootState) => s.user.registerErrorMessage);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(register({ email: email.value, password: password.value, name: name.value }));
    };

    return (
        <div className={styles.login}>
            <Heading>Регистрация</Heading>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles.form} onSubmit={submit}>
                <div className={styles.field}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id='email' placeholder='Email' name='email' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input id='password' type='password' placeholder='Пароль' name='password' />
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Ваше имя</label>
                    <Input id='name' name='password' placeholder='Имя' />
                </div>
                <Button appearance='large'>Зарегистрироваться</Button>
            </form>
            <div className={styles.links}>
                <div>Есть аккаунт?</div>
                <div>
                    <Link to='/auth/register'>Войти</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
