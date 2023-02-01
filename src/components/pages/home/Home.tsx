import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import imgCard1 from '../../../assets/imgs/brat.jpeg';
import imgCard2 from '../../../assets/imgs/cross.jpeg';
import imgCard3 from '../../../assets/imgs/sport.jpeg';
import imgCard4 from '../../../assets/imgs/road.jpg';
import imgCard5 from '../../../assets/imgs/adventure.jpeg';
import imgCard6 from '../../../assets/imgs/layout2.jpg';
import imgArrow from './img/arrow-right.svg';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const Home: FC<props> = ({ setActivePage }) => {
   useEffect(() => {
      setActivePage('home');
      window.scrollTo(0, 0);
   }, []);

   return (
      <>
         <section className={styles.text}>
            <div className={styles.container}>
               <h2>больше. дальше. быстрее.</h2>
               <p>
                  посмотрите всю <span>нашу</span> коллекцию <span>байков</span>
               </p>
               <Link to="/catalog">подробнее</Link>
            </div>
         </section>
         <section className={styles.cards}>
            <Link to="/catalog" title="все">
               <img src={imgCard6} />
               <h3>
                  все
                  <img src={imgArrow} />
               </h3>
            </Link>
            <Link to="/catalog?type=vintage" title="винтаж">
               <img src={imgCard1} />
               <h3>
                  Винтаж
                  <img src={imgArrow} />
               </h3>
            </Link>
            <Link to="/catalog?type=cross" title="кросс">
               <img src={imgCard2} />
               <h3>
                  кросс
                  <img src={imgArrow} />
               </h3>
            </Link>
            <Link to="/catalog?type=sport" title="спорт">
               <img src={imgCard3} />
               <h3>
                  спорт
                  <img src={imgArrow} />
               </h3>
            </Link>
            <Link to="/catalog?type=road" title="дорожные">
               <img src={imgCard4} />
               <h3>
                  дорожные
                  <img src={imgArrow} />
               </h3>
            </Link>
            <Link to="/catalog?type=tur" title="эндуро">
               <img src={imgCard5} />
               <h3>
                  эндуро
                  <img src={imgArrow} />
               </h3>
            </Link>
         </section>
      </>
   );
};

export default Home;
