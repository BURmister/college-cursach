import { FC, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Card from './card/Card';

import { fetchProducts, getProducts, productsStatus, updateStatus } from '../../../redux/slice/productsSlice';
import { fetchFilters, filtersStatus, getFilters, updateFiltersStatus } from '../../../redux/slice/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

import imgCard1 from './img/card1.jpg';
import imgCard2 from './img/card2.png';
import imgCard3 from './img/card3.webp';
import styles from './Catalog.module.scss';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const Catalog: FC<props> = ({ setActivePage }) => {
   const products = useAppSelector(getProducts);
   const statusProducts = useAppSelector(productsStatus);
   const statusFilters = useAppSelector(filtersStatus);
   const filters = useAppSelector(getFilters);
   const dispatch = useAppDispatch();

   const [typeFilter, setTypeFilter] = useState<string[]>([]);
   const [producerFilter, setProducerFilter] = useState<string[]>([]);
   const [colorFilter, setColorFilter] = useState<string[]>([]);

   const isMounted = useRef(false)

   const navigate = useNavigate();

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            typeFilter,
            modelFilter: producerFilter,
            colorsFilter: colorFilter
         });
         navigate(`?${queryString}`);
      }
      isMounted.current = true;
   }, [typeFilter, producerFilter, colorFilter]);

   useEffect(() => {
      setActivePage('catalog');
      window.scrollTo(0, 0);
      const fetchData = () => {
         dispatch(fetchFilters());
      };
      fetchData();
   }, []);

   //если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         setTypeFilter(params.typeFilter !== undefined ? String(params?.typeFilter).split(',') : []);
         // console.log(String(params?.typeFilter).split(','));
         setProducerFilter(params.modelFilter !== undefined ? String(params?.modelFilter).split(',') : []);
         // console.log(String(params?.producerFilter).split(','));
         setColorFilter(params.colorsFilter !== undefined ? String(params?.colorsFilter).split(',') : []);
         // console.log(String(params?.colorsFilter).split(','));
      }
   }, []);

   useEffect(() => {
      const fetchData = () => {
         dispatch(fetchProducts({ typeFilter, producerFilter, colorFilter }));
      };
      fetchData();
   }, [typeFilter, producerFilter, colorFilter]);

   const addFilter = (
      type: string,
      el: {
         name: string;
         value: string;
      },
   ) => {
      if (type === 'тип') {
         if (typeFilter.includes(el.value)) {
            setTypeFilter([...typeFilter].filter((item) => item !== el.value));
            console.log(typeFilter);
         } else {
            setTypeFilter([...typeFilter, el.value]);
            console.log(typeFilter);
         }
      }
      if (type === 'производитель') {
         if (producerFilter.includes(el.value)) {
            setProducerFilter([...producerFilter].filter((item) => item !== el.value));
            console.log(producerFilter);
         } else {
            setProducerFilter([...producerFilter, el.value]);
            console.log(producerFilter);
         }
      }
      if (type === 'цвет') {
         if (colorFilter.includes(el.value)) {
            setColorFilter([...colorFilter].filter((item) => item !== el.value));
            console.log(colorFilter);
         } else {
            setColorFilter([...colorFilter, el.value]);
            console.log(colorFilter);
         }
      }
   };

   if (statusProducts === 'error' || statusFilters === 'error') {
      alert('something went wrong, please try again later');
      navigate('/');
      dispatch(updateStatus('loading'));
      dispatch(updateFiltersStatus('loading'));
   }

   if (statusProducts === 'loading' || statusFilters === 'loading') {
      return <h2>...loading</h2>;
   }

   return (
      <>
         <h2>каталог</h2>
         <div className={styles.container}>
            <section className={styles.filters}>
               <h3>фильтры</h3>
               <form>
                  {filters.map((item, index) => (
                     <div key={index}>
                        <legend>{item.type}</legend>
                        {item?.filters.map((el, index) => (
                           <label key={index}>
                              <input
                                 checked={
                                    typeFilter.includes(el.value)
                                       ? true
                                       : false || producerFilter.includes(el.value)
                                       ? true
                                       : false || colorFilter.includes(el.value)
                                       ? true
                                       : false
                                 }
                                 onClick={() => addFilter(item.type, el)}
                                 type="checkbox"
                                 id={el.name}
                                 name={el.name}
                                 value={el.value}
                                 onChange={(e) => {}}
                              />
                              <span></span>
                              {el.name}
                           </label>
                        ))}
                     </div>
                  ))}
               </form>
            </section>
            <section className={styles.cards}>
               {products.map((item, index) => (
                  <Card key={index} id={item._id} img={imgCard1} h={item.title} text={item.info} price={String(item.price)} />
               ))}
            </section>
         </div>
      </>
   );
};

export default Catalog;
