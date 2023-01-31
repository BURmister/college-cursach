import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import imgCard1 from './img/brat.jpeg';
import imgCard2 from './img/cross.jpeg';
import imgCard3 from './img/sport.jpeg';
import imgCard4 from './img/road.jpg';
import imgCard5 from './img/adventure.jpeg';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const Home: FC<props> = ({ setActivePage }) => {
   useEffect(() => {
      setActivePage('home');
   }, []);

   return (
      <>
         <section className={styles.text}>
            <div className={styles.container}>
               <h2>больше. дальше. быстрее.</h2>
               <p>
                  посмотрите всю <span>нашу</span> коллекцию винтажных, <span>кросс</span>, спортивных, дорожных и эндуро <span>байков</span>
               </p>
               <Link to="/catalog">подробнее</Link>
            </div>
         </section>
         <section className={styles.cards}>
            <Link to="/catalog">
               <img src={imgCard1} />
               <h3>Винтаж</h3>
            </Link>
            <Link to="/catalog">
               <img src={imgCard2} />
               <h3>кросс</h3>
            </Link>
            <Link to="/catalog">
               <img src={imgCard3} />
               <h3>спорт</h3>
            </Link>
            <Link to="/catalog">
               <img src={imgCard4} />
               <h3>дорожные</h3>
            </Link>
            <Link to="/catalog">
               <img src={imgCard5}/>
               <h3>эндуро</h3>
            </Link>
         </section>
      </>
   );
};

export default Home;
