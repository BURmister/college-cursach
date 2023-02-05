import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchOneProduct, getOneProduct, productStatus, updateStatus } from '../../../redux/slice/oneProductSlice';

import styles from './ProductPage.module.scss';
// import img from './card2.png'
import Slider from '../../ui/slider/Slider';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const ProductPage: FC<props> = ({ setActivePage }) => {
   const product = useAppSelector(getOneProduct);
   const status = useAppSelector(productStatus);
   const dispatch = useAppDispatch();

   const [id, setId] = useState<string>();

   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      setId(params.id);
      setActivePage('catalog/card');
      const fetchData = async () => {
         id && dispatch(fetchOneProduct(id));
      };
      fetchData();
   }, [id]);

   if (product === null && status === 'error') {
      alert('something went wrong, please try again later');
      navigate('/catalog');
      dispatch(updateStatus('loading'))
   }

   if (product === null) {
      return <h2>...loading</h2>;
   }

   return (
      <>
         <h2>{product.title}</h2>
         <div className={styles.container}>
            <Slider />
            <div className={styles.text}>
               <div className={styles.information}>
                  <h3>основная информация</h3>
                  <p>{product.info}</p>
               </div>
               <div className={styles.price}>
                  <h3>цена такого чуда</h3>
                  <p>{product.price}$</p>
               </div>
               <div className={styles.feature}>
                  <h3>характеристики</h3>
                  <span>
                     <h4>модель</h4>
                     <p>{product.model}</p>
                  </span>
                  <span>
                     <h4>тип</h4>
                     <p>{product.type}</p>
                  </span>
                  <span>
                     <h4>мощность</h4>
                     <p>
                        <span>{product.power}</span>л.с.
                     </p>
                  </span>
                  <span>
                     <h4>кубатура</h4>
                     <p>
                        <span>{product.cub}</span>см3
                     </p>
                  </span>
                  <span>
                     <h4>цвет</h4>
                     <p>
                        {product.colors.map((item, index) => (
                           <span key={index}>{item}</span>
                        ))}
                     </p>
                  </span>
                  <span>
                     <h4>год</h4>
                     <p>{product.year} г</p>
                  </span>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProductPage;
