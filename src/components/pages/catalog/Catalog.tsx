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

   const isMounted = useRef(false);
   const isSearch = useRef(false);

   const navigate = useNavigate();

   useEffect(() => {
      setActivePage('catalog');
      window.scrollTo(0, 0);
      const fetchData = () => {
         dispatch(fetchFilters());
      };
      fetchData();
   }, []);

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            typeFilter,
            modelFilter: producerFilter,
            colorsFilter: colorFilter,
         });
         navigate(`?${queryString}`);
         console.log(queryString);
      }
      isMounted.current = true;
   }, [typeFilter, producerFilter, colorFilter]);

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

         isSearch.current = true;
      }
   }, []);

   useEffect(() => {
      if (!isSearch.current) {
         const fetchData = () => {
            dispatch(fetchProducts({ typeFilter, producerFilter, colorFilter }));
         };
         fetchData();
      }
      isSearch.current = false;
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
                  <button
                     type="button"
                     onClick={() => {
                        setTypeFilter([]);
                        setProducerFilter([]);
                        setColorFilter([]);
                     }}>
                     сброс
                     <svg width="26" height="26" viewBox="0 -0.5 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
                           fill="currentColor"
                        />
                     </svg>
                  </button>
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
