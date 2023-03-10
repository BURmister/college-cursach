import { FC, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn } from '../../../redux/slice/authSlice';
import Cookies from 'js-cookie';

import styles from './AddProduct.module.scss';
import { addProduct } from '../../../redux/slice/addProductSlice';
// import NameInput from './name-input/NameInput';

type props = {
   setActivePage: (value: SetStateAction<string>) => void;
};

const AdminPage: FC<props> = ({ setActivePage }) => {
   // const [amountPhoto, setAmountPhoto] = useState<{id: string, value: string | undefined}[]>([{id: nanoid(), value: undefined}])
   const [modelHead, setModelHead] = useState<string>();
   const [photo1, setPhoto1] = useState<string>();
   const [photo2, setPhoto2] = useState<string>();
   const [photo3, setPhoto3] = useState<string>();
   const [modelInfo, setModelInfo] = useState<string>();
   const [modelPrice, setModelPrice] = useState<number>();
   const [modelName, setModelName] = useState<string>();
   const [modelProducer, setModelProducer] = useState<string>();
   const [modelType, setModelType] = useState<string>();
   const [modelEngine, setModelEngine] = useState<string>();
   const [modelCub, setModelCub] = useState<string>();
   // TODO colors arn't string
   const [modelColors, setModelColors] = useState<string[]>();
   const [modelColorsLocal, setModelColorsLocal] = useState<string>();
   const [modelYear, setModelYear] = useState<string>();

   const dispatch = useAppDispatch();

   const isUser = useAppSelector(isLoggedIn);
   const token = Cookies.get('accessToken');

   useEffect(() => {
      setActivePage('catalog/add');
      window.scrollTo(0, 0);
   }, []);

   // const addPhotoInput = () => {
   //    if (amountPhoto[amountPhoto.length - 1].value !== undefined && amountPhoto.length <= 10) {
   //       setAmountPhoto([...amountPhoto, { id: nanoid(), value: '' }]);
   //    }
   // }

   const submitForm = () => {
      const addColors = () => {
         const colors = modelColorsLocal?.split(',');
         colors !== undefined ? setModelColors(colors) : setModelColors(['']);
      };
      addColors();
      if (
         modelHead &&
         photo1 &&
         modelInfo &&
         modelPrice &&
         modelName &&
         modelProducer &&
         modelType &&
         modelEngine &&
         modelCub &&
         modelColors &&
         modelYear
      ) {
         const object = {
            title: modelHead,
            img: photo1,
            // photo2,
            // photo3,
            info: modelInfo,
            price: modelPrice,
            model: modelName,
            producer: modelProducer,
            type: modelType,
            power: modelEngine,
            cub: modelCub,
            colors: modelColors,
            year: modelYear,
         };
         token && dispatch(addProduct({ object, token }));
         console.log(object);
      } else {
         alert('?????? ???????? ???????????? ???????? ??????????????????!');
      }
   };

   if (!isUser) {
      return <h2>???????????????? ????????????????????</h2>;
   }

   return (
      <>
         <h2>???????????????? ????????????</h2>
         <form className={styles.container}>
            <span className={styles.name}>
               <label htmlFor="modelHead">??????????????????</label>
               <input
                  id="modelHead"
                  name="modelHead"
                  value={modelHead}
                  onChange={(event) => setModelHead(event.target.value)}
                  type="text"
                  placeholder="< ?????????????????? ?????? ???????????????? ???????????? />"
               />
            </span>
            <span className={styles.image}>
               <label htmlFor="modelPhoto">????????:</label>
               {/* {amountPhoto.map((item, index) => (
                  <NameInput index={index} item={item} state={amountPhoto} setState={setAmountPhoto} />
               ))} */}
               {/* <button
                  className={
                     amountPhoto[amountPhoto.length - 1].value !== undefined && amountPhoto.length <= 10 ? styles.addPhoto : styles.disabledAddPhoto
                  }
                  type="button"
                  onClick={() => addPhotoInput()}>
                  +
               </button> */}
               <input
                  type="text"
                  id="modelPhoto"
                  value={photo1}
                  onChange={(event) => setPhoto1(event.target.value)}
                  name="modelPhoto"
                  placeholder={`< ???????????? ???? ???????? ???????? />`}
               />
               <input
                  type="text"
                  id="modelPhoto"
                  value={photo2}
                  onChange={(event) => setPhoto2(event.target.value)}
                  name="modelPhoto"
                  placeholder={`< ???????????? ???? ???????? ???????? />`}
               />
               <input
                  type="text"
                  value={photo3}
                  onChange={(event) => setPhoto3(event.target.value)}
                  name="modelPhoto"
                  placeholder={`< ???????????? ???? ???????? ???????? />`}
               />
            </span>
            <div className={styles.text}>
               <span className={styles.information}>
                  <label htmlFor="modelInfo">???????????????? ????????????????????</label>
                  <textarea
                     id="modelInfo"
                     value={modelInfo}
                     onChange={(event) => setModelInfo(event.target.value)}
                     rows={10}
                     cols={40}
                     name="modelInfo"
                     placeholder="???????????????????? ?? ????????????"
                  />
               </span>
               <span className={styles.price}>
                  <label htmlFor="modelPrice">???????? ???????????? ????????</label>
                  <input
                     id="modelPrice"
                     type="number"
                     value={modelPrice}
                     onChange={(event) => setModelPrice(Number(event.target.value))}
                     name="modelPrice"
                     placeholder="????????"
                  />
               </span>
               <div className={styles.feature}>
                  <h3>????????????????????????????</h3>
                  <span>
                     <label htmlFor="modelName">????????????</label>
                     <input
                        id="modelName"
                        type="text"
                        name="modelName"
                        value={modelName}
                        onChange={(event) => setModelName(event.target.value)}
                        placeholder="???????????? ????????????????"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelProducer">??????????????????????????</label>
                     <input
                        id="modelProducer"
                        type="text"
                        name="modelProducer"
                        value={modelProducer}
                        onChange={(event) => setModelProducer(event.target.value)}
                        placeholder="???????????????? ??????????????????????????"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelType">??????</label>
                     <input
                        id="modelType"
                        type="text"
                        name="modelType"
                        value={modelType}
                        onChange={(event) => setModelType(event.target.value)}
                        placeholder="?????? ????????????"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelEngine">????????????????</label>
                     <input
                        id="modelEngine"
                        type="text"
                        name="modelEngine"
                        value={modelEngine}
                        onChange={(event) => setModelEngine(event.target.value)}
                        placeholder="????????????????"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelCapacity">????????????????</label>
                     <input
                        id="modelCapacity"
                        type="text"
                        name="modelCapacity"
                        value={modelCub}
                        onChange={(event) => setModelCub(event.target.value)}
                        placeholder="?????????? ??????????????????"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelColor">????????</label>
                     <input
                        id="modelColor"
                        type="text"
                        name="modelColor"
                        value={modelColors}
                        onChange={(event) => setModelColorsLocal(event.target.value)}
                        placeholder="?????????? (?????????? ??????????????)"
                     />
                  </span>
                  <span>
                     <label htmlFor="modelYear">??????</label>
                     <input
                        id="modelYear"
                        type="text"
                        name="modelYear"
                        value={modelYear}
                        onChange={(event) => setModelYear(event.target.value)}
                        placeholder="?????? ????????????????????????"
                     />
                  </span>
               </div>
            </div>
            <button type="button" onClick={() => submitForm()}>
               ??????????????????
            </button>
         </form>
      </>
   );
};

export default AdminPage;
