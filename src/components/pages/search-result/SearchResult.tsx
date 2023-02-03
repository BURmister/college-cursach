import { FC, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Card from './card/Card';

import imgCard1 from './img/card1.jpg';
import imgCard2 from './img/card2.png';
import imgCard3 from './img/card3.webp';
import styles from './SearchResult.module.scss';

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const SearchResult: FC<props> = ({ setActivePage }) => {
   const [search, setSearch] = useState<string>();
   const [searchParams, setSearchParams] = useSearchParams()
   const navigate = useNavigate()

   useEffect(() => {
      setActivePage('search-result');
      window.scrollTo(0, 0);

      if (window.location.search) {
         const search = searchParams.get('search');
         search && setSearch(search);
      }
   }, [searchParams]);

   return (
      <>
         <h2>результат по запросу {"<"} {search} {"/>"}</h2>
         <div className={styles.container}>
            <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
            <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
            <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
            <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
            <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
            <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
            <Card id={'1'} img={imgCard1} h={'KTM Duke'} text={'резвее, чем кажется'} price={'+100500'} />
            <Card id={'1'} img={imgCard2} h={'Husqvarna fe 450'} text={'делает врум-врум'} price={'+100500'} />
            <Card id={'1'} img={imgCard3} h={'APRILIA RS660'} text={'такой можно на полку ставить '} price={'+100500'} />
         </div>
      </>
   );
};

export default SearchResult;