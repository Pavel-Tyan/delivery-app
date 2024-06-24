import { ChangeEvent, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';
import { PREFIX } from '../../helpers/api';

const Menu = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const loadMenu = async (name?: string) => {
            try {
                setIsLoading(true);
                // Искусственная задержка
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });

                const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                    params: {
                        name,
                    },
                });
                setProducts(data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
                if (e instanceof AxiosError) {
                    setError(e.message);
                }
                setIsLoading(false);
                return;
            }
        };

        loadMenu(filter);
    }, [filter]);

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <header className={styles.head}>
                <Heading>Menu</Heading>
                <Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
            </header>
            <div>
                {error && <>Error</>}
                {isLoading && <>Загружаем продукты...</>}
                {!isLoading && products.length > 0 && <MenuList products={products} />}
                {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
            </div>
        </>
    );
};

export default Menu;
