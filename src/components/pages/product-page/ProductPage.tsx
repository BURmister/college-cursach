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
                  <p>{'какая-то информация'}</p>
               </div>
               <div className={styles.price}>
                  <h3>цена такого чуда</h3>
                  <p>{'цена'}</p>
               </div>
               <div className={styles.feature}>
                  <h3>характеристики</h3>
                  <span>
                     <h4>модель</h4>
                     <p>{'модель'}</p>
                  </span>
                  <span>
                     <h4>мощность</h4>
                     <p>{'мощность'}</p>
                  </span>
                  <span>
                     <h4>кубатура</h4>
                     <p>{'кубатура'}</p>
                  </span>
                  <span>
                     <h4>цвет</h4>
                     <p>{'цвет'}</p>
                  </span>
                  <span>
                     <h4>год</h4>
                     <p>{'год'}</p>
                  </span>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProductPage;
