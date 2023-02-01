import { FC, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Card from './card/Card';

import imgCard1 from './img/card1.jpg';
import imgCard2 from './img/card2.png';
import imgCard3 from './img/card3.webp';
import styles from './Catalog.module.scss';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const Catalog: FC<props> = ({ setActivePage }) => {
   useEffect(() => {
      setActivePage('catalog');
      window.scrollTo(0, 0);
   }, []);

   //UseEffect
   //если параметры еще не менялись, то не вшивать параметры в URL-строку
   // useEffect(() => {
   //    if (isMounted.current) {
   //       const queryString = qs.stringify({
   //          searchValue,
   //          type,
   //          producer,
   //          model,
   //          color,
   //          currentPage,
   //       });
   //       navigate(`?${queryString}`);
   //    }
   //    isMounted.current = true;
   // }, [searchValue, type, producer, model, color, currentPage, currentPage]);

   //если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
   // useEffect(() => {
   //    if (window.location.search) {
   //       const params = qs.parse(window.location.search.substring(1));
   //       const sort = sortList.find((obj: { property: string; type: string }) => obj.property === params.sortBy && obj.type === params.order);
   //       const brand = receivedBrands.find((obj) => obj.data === params.filterBrand);

   //       const search = searchParams.get('searchValue');

   //       dispatch(changeSelectedSort(sort));
   //       brand && setFilterBrand(brand);
   //       search && setSearchValue(search);
   //       search && setLocalSearch(search);
   //       setCurrentPage(Number(params.currentPage));

   //       isSearch.current = true;
   //    }
   // }, []);

   return (
      <>
         <h2>каталог</h2>
         <div className={styles.container}>
            <section className={styles.filters}>
               <h3>фильтры</h3>
               <form>
                  <div>
                     <legend>тип</legend>
                     <label>
                        <input type="checkbox" id="typeOfModel" name="typeOfModel" value="motoModel" />
                        <span></span>
                        кросс
                     </label>
                  </div>
                  <div>
                     <legend>производитель</legend>
                     <label>
                        <input type="checkbox" id="producerOfModel" name="producerOfModel" value="motoModel" />
                        <span></span>
                        ktm
                     </label>
                  </div>
                  <div>
                     <legend>цвет</legend>
                     <label>
                        <input type="checkbox" id="colorOfModel" name="typeOfModel" value="motoModel" />
                        <span></span>
                        white
                     </label>
                  </div>
               </form>
            </section>
            <section className={styles.cards}>
               <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
               <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
               <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
               <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
               <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
               <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
               <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
               <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
               <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
            </section>
         </div>
      </>
   );
};

export default Catalog;

//  //UseDispatch/Navigate
//  const dispatch = useAppDispatch()
//  const navigate = useNavigate()
//  const [searchParams, setSearchParams] = useSearchParams()

//  //UseSelector
//  const sortList = useSelector((state: any) => state.sort.sortList)
//  const selectedSort = useSelector((state: any) => state.sort.selectedSort)
//  const cardStatus = useSelector((state: any) => state.shopCards.status)
//  //Alternative useSelector
//  const shopCards = useSelector(getShopCards)

//  //UseRef
//  const isSearch = React.useRef(false)
//  const isMounted = React.useRef(false)
//  const searchRef = React.useRef<HTMLInputElement>(null)

//  //cуть этого массива в том, чтобы
//  //иметь cписок всех возможных брендов
//  //рендерить названия этих брендов
//  //в сайдбаре динамично, при получении
//  //данных с бэкенда для того, чтобы
//  //не было необходимости изменять jsx
//  //при добавлении или удалении брендов
//  //то же самое с категориями
//  const [receivedBrands, setReceivedBrands] = React.useState([
//      {index: 1, title: 'all', data: ''},
//      {index: 2, title: 'baxter of california', data: 'baxter of california'},
//      {index: 3, title: 'mr natty', data: 'mr natty'},
//      {index: 4, title: 'suavecito', data: 'suavecito'},
//      {index: 5, title: 'malin+goetz', data: 'malin'},
//      {index: 6, title: "murray's", data: "murray's"},
//      {index: 7, title: "american crew", data: "american crew"},
//  ])

//  //UseContext
//  // const {  } = React.useContext(AppContext)

//  // ReactStates
//  const [searchValue, setSearchValue] = React.useState('')
//  const [localSearch, setLocalSearch] = React.useState('')
//  const [filterBrand, setFilterBrand] = React.useState<{index: number, title: string, data: string}>({index: 1, title: 'all', data: ''})
//  const [currentPage, setCurrentPage] = React.useState(1)
//  const [itemsPerPage] = React.useState(9)

//  //AnotherArrowFunction
//  const getGoods = () => {
//      dispatch(changeActivePage(3))
//      isHeader();
//      async function fetchData() {
//          dispatch(fetchShopCards({
//              currentPage,
//              filterBrand,
//              selectedSort,
//              searchValue
//          }))
//          dispatch(fetchCart())
//      }
//      fetchData()
//  }

//  //получить товары с бэка, но подождав пока isSearch провериться
//  useEffect(() => {
//      if (!isSearch.current) {
//          getGoods()
//      }

//      isSearch.current = false

//      window.scrollTo(0, 0)
//  }, [filterBrand, searchValue, currentPage, selectedSort])

//  // Constants
//  const loadingCards = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
//  const lastItemIndex = currentPage * itemsPerPage
//  const firstItemIndex = lastItemIndex - itemsPerPage
//  const pageCount = [1, 2, 3, 4, 5]

//  //ArrowFunctions
//  const paginate = (pageNumber: number) => {
//      setCurrentPage(pageNumber)
//  }
