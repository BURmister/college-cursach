import { FC, useEffect, useState } from 'react';

import styles from './AddProduct.module.scss';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const AdminPage: FC<props> = ({ setActivePage }) => {
   const [amountPhoto, setAmountPhoto] = useState<{}[]>([{}])

   useEffect(() => {
      setActivePage('catalog/add');
      window.scrollTo(0, 0);
   }, []);

   const isObjectEmpty = (objectName: {}) => {
      return Object.keys(objectName).length === 0;
   };

   const addPhotoInput = () => {
      if (isObjectEmpty(amountPhoto[amountPhoto.length - 1]) && amountPhoto.length <= 10) {
         setAmountPhoto([...amountPhoto, {}]);
      }
   }

   return (
      <>
         <h2>добавить модель</h2>
         <form className={styles.container}>
            <span className={styles.name}>
               <label htmlFor="modelHead">Заголовок</label>
               <input id="modelHead" name="modelHead" type="text" placeholder="< ЗАГАЛОВОК ДЛЯ СТРАНИЦЫ МОДЕЛИ />" />
            </span>
            <span className={styles.image}>
               <label htmlFor="modelPhoto">Фото:</label>
               {amountPhoto.map((item, index) => (
                  <input type="text" id="modelPhoto" name="modelPhoto" placeholder={`< ССЫЛКА НА ОДНО ФОТО />`} />
               ))}
               <button
                  className={
                     isObjectEmpty(amountPhoto[amountPhoto.length - 1]) && amountPhoto.length <= 10 ? styles.addPhoto : styles.disabledAddPhoto
                  }
                  type="button"
                  onClick={() => addPhotoInput()}>
                  +
               </button>
            </span>
            <div className={styles.text}>
               <span className={styles.information}>
                  <label htmlFor="modelInfo">основная информация</label>
                  <textarea id="modelInfo" rows={10} cols={40} name="modelInfo" placeholder="ИНФОРМАЦИЯ О МОДЕЛЕ" />
               </span>
               <span className={styles.price}>
                  <label htmlFor="modelPrice">цена такого чуда</label>
                  <input id="modelPrice" name="modelPrice" placeholder="ЦЕНА" />
               </span>
               <div className={styles.feature}>
                  <h3>характеристики</h3>
                  <span>
                     <label htmlFor="modelName">модель</label>
                     <input id="modelName" type="text" name="modelName" placeholder="ПОЛНОЕ НАЗВАНИЕ" />
                  </span>
                  <span>
                     <label htmlFor="modelType">тип</label>
                     <input id="modelType" type="text" name="modelType" placeholder="ТИП МОДЕЛИ" />
                  </span>
                  <span>
                     <label htmlFor="modelEngine">мощность</label>
                     <input id="modelEngine" type="text" name="modelEngine" placeholder="МОЩНОСТЬ" />
                  </span>
                  <span>
                     <label htmlFor="modelCapacity">кубатура</label>
                     <input id="modelCapacity" type="text" name="modelCapacity" placeholder="ОБЪЕМ ДВИГАТЕЛЯ" />
                  </span>
                  <span>
                     <label htmlFor="modelColor">цвет</label>
                     <input id="modelColor" type="text" name="modelColor" placeholder="ЦВЕТА (ЧЕРЕЗ ЗАПЯТУЮ)" />
                  </span>
                  <span>
                     <label htmlFor="modelYear">год</label>
                     <input id="modelYear" type="text" name="modelYear" placeholder="ГОД ПРОИЗВОДСТВА" />
                  </span>
               </div>
            </div>
            <button type="button">Применить</button>
         </form>
      </>
   );
};

export default AdminPage;
