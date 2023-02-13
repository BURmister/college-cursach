import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

type props = {
   id: string;
   img: string;
   h: string;
   text: string;
   price: string;
};

const Card: FC<props> = ({ id, img, h, text, price }) => {
   return (
      <div className={styles.card}>
         <div className={styles.cardUp}>
            <Link to={`/catalog/${id}`}>
               <img src={img} alt={`фото модели мотоцикла ${h}`} />
            </Link>
            <h3>{h}</h3>
         </div>
         <p>{text}</p>
         <div className={styles.price}>
            <h4>{price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 ')}$</h4>
            <Link to={`/catalog/${id}`}>Подробнее</Link>
         </div>
      </div>
   );
};

export default Card;
