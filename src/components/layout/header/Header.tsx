import { FC, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import imgLogo from '../../../assets/imgs/logo.webp';

const pages = [
   { name: 'home', value: 'главная', path: '/' },
   { name: 'catalog', value: 'каталог', path: '/catalog' },
   { name: 'contacts', value: 'контакты', path: '/contacts' },
];

type Props = {
   activePage: string;
};

const Header: FC<Props> = ({ activePage }) => {
   const searchRef = useRef<HTMLInputElement>(null);
   const navigate = useNavigate()
   const [localSearch, setLocalSearch] = useState('');

   const onSearchInput = (event: { target: HTMLInputElement }) => {
      setLocalSearch(event.target.value);
      // console.log(localSearch, 'state');
      // console.log(searchRef?.current?.value, 'Ref');
   };

   const clickOnSearch = () => {
      //fetch => ----------------------- -- --  -- -- -- - - - - --- - -- - --------------------
      console.log(searchRef?.current?.value);
      navigate("fetchResponse")
   }

   return (
      <header>
         <div className={styles.container}>
            <div>
               <Link to="/">
                  <img className={styles.logo} src={imgLogo} alt="logo" width="75" />
               </Link>
               <nav>
                  <ul className={styles.navbar}>
                     {pages.map((item, index) => (
                        <li
                           key={index}
                           className={
                              activePage.toLowerCase() === item.name.toLowerCase()
                                 ? `${styles.activePage}`
                                 : ''
                           }>
                           <Link to={item.path}>{item.value}</Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
            <form className={styles.searchContainer} role="search">
               {/* {localSearch && (
                  <img className="clear" src={iconClear} onClick={() => onSearchClear()} alt="X" />
               )} */}
               <input
                  className={styles.searchInput}
                  type="search"
                  placeholder="Поиск модели"
                  aria-label="Поиск модели"
                  onChange={onSearchInput}
                  value={localSearch}
                  ref={searchRef}
               />
               <button className={styles.button} type="button" onClick={clickOnSearch}>
                  Поиск
               </button>
            </form>
         </div>
      </header>
   );
};

export default Header;
