import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { productTitle, deleteStatus, deleteOneProduct } from '../../../../redux/slice/deleteProductSlice';

import styles from './Card.module.scss';
import close from './img/close.svg';

type props = {
   id: string;
   img: string;
   h: string;
   text: string;
   price: string;
   user: boolean;
};

const Card: FC<props> = ({ id, img, h, text, price, user }) => {
   const deleteProductTitle = useAppSelector(productTitle);
   const deleteProductStatus = useAppSelector(deleteStatus);
   const dispatch = useAppDispatch();

   console.log(deleteProductStatus);

   const deleteModel = (id: string) => {
      if (confirm(`удалить модель: ${h}`)) {
         dispatch(deleteOneProduct(id));
      }
   };

   return (
      <div className={styles.card}>
         <div className={styles.cardUp}>
            <Link to={`/catalog/${id}`}>
               <img src={img} alt={`фото модели мотоцикла ${h}`} />
            </Link>
            <h3>{h}</h3>
            {user && (
               <button onClick={() => deleteModel(id)} type="button">
                  <img src={close} />
               </button>
            )}
         </div>
         <p>{text}</p>
         <div className={styles.price}>
            <h4>{price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}$</h4>
            <Link to={`/catalog/${id}`}>Подробнее</Link>
         </div>
      </div>
   );
};

export default Card;
