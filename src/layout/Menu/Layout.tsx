import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';
import { RootState } from '../../store/store';

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const profile = useAppSelector((s: RootState) => s.user.profile);
    const items = useAppSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.user}>
                    <img className={styles.avatar} src='/avatar.png' alt='Аватар пользователя' />
                    <div className={styles.name}>{profile?.name}</div>
                    <div className={styles.email}>{profile?.email}</div>
                </div>
                <nav className={styles.menu}>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src='/menu-icon.svg' alt='Иконка меню' />
                        Меню
                    </NavLink>
                    <NavLink
                        to='/cart'
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src='/cart-icon.svg' alt='Иконка корзины' />
                        Корзина{' '}
                        <span className={styles['cart-count']}>
                            {items.reduce((acc, item) => (acc += item.count), 0)}
                        </span>
                    </NavLink>
                </nav>
                <Button className={styles.exit} onClick={logout}>
                    <img src='/exit-icon.svg' alt='Иконка выхода' />
                    Выход
                </Button>
            </aside>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
