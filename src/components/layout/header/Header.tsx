import { FC, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useOutside from '../../../hooks/useOutside';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { isLoggedIn, login as loginUser, logout } from '../../../redux/slice/authSlice';

import styles from './Header.module.scss';
import imgLogo from '../../../assets/imgs/logo.webp';
import enterImg from './img/enter.svg';

type Props = {
   activePage: string;
};

const pages = [
   { name: 'home', value: 'главная', path: '/' },
   { name: 'catalog', value: 'каталог', path: '/catalog' },
   { name: 'contacts', value: 'контакты', path: '/contacts' },
];

const Header: FC<Props> = ({ activePage }) => {
   const navigate = useNavigate();
   const searchRef = useRef<HTMLInputElement>(null);
   const [localSearch, setLocalSearch] = useState<string>();
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const isUser = useAppSelector(isLoggedIn);
   const dispatch = useAppDispatch();

   const { ref, isShow, setIsShow } = useOutside(false);

   const onSearchInput = (event: { target: HTMLInputElement }) => {
      setLocalSearch(event.target.value);
   };

   const clickOnSearch = () => {
      navigate(searchRef?.current?.value === '' ? '/catalog' : `/search?search=${searchRef?.current?.value}`);
   };

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
            <form className={styles.searchContainer} role="search">
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
            {isUser ? (
               <button className={styles.logout} type="button" onClick={() => dispatch(logout())}>
                  выйти
               </button>
            ) : (
               <button type="button" onClick={() => setIsShow(!isShow)}>
                  <img src={enterImg} width="30px" />
               </button>
            )}

            {isShow && (
               <div className={styles.wrapper} ref={ref}>
                  <form className={styles.form}>
                     <span>
                        <input type="email" placeholder="name" value={email} onChange={(e) => setEmail(e.target.value)} />
                     </span>
                     <span>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                     </span>
                     <button type="button" onClick={() => dispatch(loginUser({ email, password }))}>
                        Логин
                     </button>
                  </form>
               </div>
            )}
         </div>
      </header>
   );
};

export default Header;
