import {createContext, useState, useEffect, ReactNode} from 'react'
import { auth,firebase } from '../services/firebase'


type User = {
  id: string
  name:string
  avatar:string
}
type AuthContextType = {
  user: User | undefined
  SignInWitdhGoogle: () => Promise<void>
}

type AuthContextProviderr = {
  children:ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props:AuthContextProviderr){
  const [user, setuser] = useState<User>() 
  
  useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        const {displayName,photoURL,uid} = user
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account')
        }
        setuser({
          id:uid,
          name:displayName,
          avatar:photoURL
        })
      }
    })
    return() => {
      unsubscribe()
    }
  },[])
  async function SignInWitdhGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)
   

   
      if(result.user){
        const {displayName,photoURL,uid} = result.user
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account')
        }
        setuser({
          id:uid,
          name:displayName,
          avatar:photoURL
        })
      
    }
  } 
   return(
    <AuthContext.Provider value={{user, SignInWitdhGoogle}}>
     {props.children}
    </AuthContext.Provider>


   )
}