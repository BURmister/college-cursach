import { AuthService } from '@/services/auth/auth.service'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'

interface IData {
   user: {
      _id: string,
      email: string
   } | null,
   accessToken: string,
}

interface IContext extends IData {
   setData: null | Dispatch<SetStateAction<IData>>
}

export const defaultAuthState = {
   user: null,
   accessToken: ''
}

export const AuthContext = createContext<IContext>({} as IContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {

   const [data, setData] = useState<IData>(defaultAuthState)
   
   const { pathname } = useRouter()

   useEffect(() => {
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
         const user = JSON.parse(localStorage.getItem('user') || '')
         setData({
            user,
            accessToken
         })
      }
   }, [])

   useEffect(() => {
      const accessToken = Cookies.get('accessToken')
      if (!accessToken && !data.user) {
         AuthService.logout()
         setData(defaultAuthState)
      }
   }, [pathname])

   return (
      <AuthContext.Provider value={{ ...data, setData}}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider