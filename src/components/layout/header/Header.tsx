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
   const navigate = useNavigate()
   const searchRef = useRef<HTMLInputElement>(null);
   const [localSearch, setLocalSearch] = useState<string>();

   const onSearchInput = (event: { target: HTMLInputElement }) => {
      setLocalSearch(event.target.value);
      // console.log(localSearch, 'state');
      // console.log(searchRef?.current?.value, 'Ref');
   };

   const clickOnSearch = () => {
      navigate(searchRef?.current?.value === '' ? '/catalog' : `/search?search=${searchRef?.current?.value}`)
   }

   const enterClick = (event: any) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         navigate(searchRef?.current?.value === '' ? '/catalog' : `/search?search=${searchRef?.current?.value}`);
      }
   };

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
                        <li key={index} className={activePage.toLowerCase() === item.name.toLowerCase() ? `${styles.activePage}` : ''}>
                           <Link to={item.path}>{item.value}</Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
            <form className={styles.searchContainer} role="search" >
               {/* {localSearch && (
                  <img className="clear" src={iconClear} onClick={() => onSearchClear()} alt="X" />
               )} */}
               <input
                  className={styles.searchInput}
                  placeholder="Поиск модели"
                  type="search"
                  aria-label="Поиск модели"
                  onChange={onSearchInput}
                  value={localSearch}
                  ref={searchRef}
                  onKeyDown={enterClick}
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
