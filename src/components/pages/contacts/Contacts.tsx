import { FC, useEffect } from 'react';

import styles from './Contacts.module.scss';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const Contacts: FC<props> = ({ setActivePage }) => {
   useEffect(() => {
      setActivePage('contacts');
   }, []);

   return (
      <>
         <h2>контакты</h2>
         <div className={styles.container}>
            <iframe
               className={styles.map}
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1419.4488857446377!2d38.97788512526945!3d55.80034744160555!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414b1c8788245941%3A0xbf6bf4ac8124c0dd!2z0J_RgNC-0LzRi9GI0LvQtdC90L3Qvi3RjdC60L7QvdC-0LzQuNGH0LXRgdC60LjQuSDQutC-0LvQu9C10LTQtiDQk9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdC-0LPQviDQvtCx0YDQsNC30L7QstCw0YLQtdC70YzQvdC-0LPQviDRg9GH0YDQtdC20LTQtdC90LjRjyDQstGL0YHRiNC10LPQviDQvtCx0YDQsNC30L7QstCw0L3QuNGPINCc0L7RgdC60L7QstGB0LrQvtC5INC-0LHQu9Cw0YHRgtC4IMKr0JPQvtGB0YPQtNCw0YDRgdGC0LLQtdC90L3QvtCz0L4g0LPRg9C80LDQvdC40YLQsNGA0L3Qvi3RgtC10YXQvdC-0LvQvtCz0LjRh9C10YHQutC-0LPQviDRg9C90LjQstC10YDRgdC40YLQtdGCwrs!5e0!3m2!1sru!2sru!4v1674292653451!5m2!1sru!2sru"
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className={styles.contacts}>
               <div className={styles.list}>
                  <h3>Телефоны</h3>
                  <ul>
                     <li>890345678</li>
                     <li>890345678</li>
                  </ul>
                  <h3>Почта</h3>
                  <ul>
                     <li>qwerty@gmail.com</li>
                     <li>qwerty1@gmail.com</li>
                  </ul>
               </div>
               <div className={styles.about}>
                  <h3>О нас</h3>
                  <p>
                     Наша команда занимается коллекционированием и кастомизацией любой мототехники.
                     Мы можем договориться о ремонте, модернизации или кастомизации вашей техники в очном формате.
                     Вы можете посмотреть наши работы в каталоге, и до встречи в нашем гараже!
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Contacts;
