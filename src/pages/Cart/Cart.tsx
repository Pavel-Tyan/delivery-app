import { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
import Heading from '../../components/Heading/Heading';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { PREFIX } from '../../helpers/api';

const DELIVERY_FEE = 169;

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useAppSelector((s: RootState) => s.cart.items);
    const jwt = useAppSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    useEffect(() => {
        const loadAllItems = async () => {
            const res = await Promise.all(items.map((i) => getItem(i.id)));
            setCartProducts(res);
        };

        loadAllItems();
    }, [items]);

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch(cartActions.clearAfterPurchase());
        navigate('/success');
    };

    return (
        <>
            <Heading className={styles['head']}>Корзина</Heading>
            {items.map((i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (!product) {
                    return;
                }
                return <CartItem key={i.id} count={i.count} {...product} />;
            })}
            <div className={styles.line}>
                <div className={styles.text}>Итог</div>
                <div className={styles.price}>{total}&nbsp; ₽</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.line}>
                <div className={styles.text}>Доставка</div>
                <div className={styles.price}>{DELIVERY_FEE}&nbsp; ₽</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.line}>
                <div className={styles.text}>
                    Итог <span className={styles['total-count']}>({items.length})</span>
                </div>
                <div className={styles.price}>{total + DELIVERY_FEE}&nbsp; ₽</div>
            </div>
            <div className={styles.checkout}>
                {total !== 0 && (
                    <Button appearance='large' onClick={checkout}>
                        оформить
                    </Button>
                )}
            </div>
        </>
    );
};
export default Cart;
