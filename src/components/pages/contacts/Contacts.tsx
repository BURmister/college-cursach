import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'

import useActivePage from '../../../hooks/useActivePage'

import styles from './Contacts.module.scss'

type Props = {
   setActivePage: Dispatch<SetStateAction<string>>
}

const Contacts: FC<Props> = ({setActivePage}) => {

   useEffect(() => {
      setActivePage('contacts')
   }, [])

   return (
      <>Hello World</>
   )
}

export default Contacts