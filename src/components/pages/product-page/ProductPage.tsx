import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import styles from './ProductPage.module.scss'

type props = {
   setActivePage: (value: React.SetStateAction<string>) => void;
};

const ProductPage: FC<props> = ({setActivePage}) => {

   const [id, setId] = useState<string>()
   const params = useParams()

   useEffect(() => {
      setId(params.id)
      setActivePage('catalog/card')
   }, [])

   return (
      <>
         <h2>{id} Product page</h2>
      </>
   )
}

export default ProductPage