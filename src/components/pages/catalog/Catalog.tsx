import { Dispatch, FC, SetStateAction, useEffect } from 'react'

type Props = {
   setActivePage: Dispatch<SetStateAction<string>>
}

const Catalog: FC<Props> = ({setActivePage}) => {

   useEffect(() => {
      setActivePage('catalog')
   }, [])

   return (
      <>Hello World</>
   )
}

export default Catalog