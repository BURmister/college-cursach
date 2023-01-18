import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'
import imgLogo from '../../../assets/imgs/logo.png'

const Header: FC = () => {
   return (
      <header>
         <div className={styles.container}>
            <div>
               <Link className="logo" to="/">
                  <img src={imgLogo} alt="logo" width="75" />
               </Link>
               <nav> 
                  <ul className={styles.navbar}>
                     <li>
                        <Link to="/">Home</Link>
                     </li>
                     <li>
                        <Link to="/catalog">Art cards</Link>
                     </li>
                     <li>
                        <Link to="/anything">What else?</Link>
                     </li>
                  </ul>
               </nav>
            </div>
            <form className={styles.searchContainer} role="search">
               <input
                  className={styles.searchInput}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
               />
               <button className={styles.button} type="submit">
                  Search
               </button>
            </form>
         </div>
      </header>
   )
}

export default Header