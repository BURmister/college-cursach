import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

type props = {
   id: string,
   img: string,
   h: string,
   text: string,
   price: string
};

const Card: FC<props> = ({ id, img, h, text, price }) => {
   return (
      <div className={styles.card}>
         <img src={img} />
         <h3>{h}</h3>
         <p>{text}</p>
         <div className={styles.price}>
            <h4>{price}$</h4>
            <Link to={`/catalog/${id}`}>Подробнее</Link>
         </div>
      </div>
   );
};

export default Card;
