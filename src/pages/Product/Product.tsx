import { Await, useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import styles from './Product.module.css';
import Heading from '../../components/Heading/Heading';

const Product = () => {
    const data = useLoaderData() as { data: Product };

    return (
        <div>
            <Suspense fallback={'Загрузка...'}>
                <Await resolve={data.data}>
                    {({ data }: { data: Product }) => (
                        <div className={styles.wrapper}>
                            <div className={styles.head}>
                                <Heading>{data.name}</Heading>
                            </div>
                            <div className={styles.product}>
                                <img className={styles.img} src={data.image} alt='Изображение блюда' />
                                <div className={styles.description}>
                                    <div className={styles.price}>
                                        <div>Цена</div>
                                        <div className={styles['price-card']}>{data.price}&nbsp;₽</div>
                                    </div>
                                    <hr className={styles.hr} />
                                    <div className={styles.rating}>
                                        <div>Рейтинг</div>
                                        <div className={styles['rating-card']}>
                                            {data.rating} <img src='/star-icon.svg' alt='Иконка звезды' />
                                        </div>
                                    </div>
                                    <div className={styles.composition}>
                                        Состав:
                                        <ul className={styles.ingredients}>
                                            {data.ingredients.map((ingredient, index) => (
                                                <li key={ingredient + index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    );
};

export default Product;
