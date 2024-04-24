import React , {createContext , useContext , useState} from 'react'

// context holding the auth user details 
export const authContext = createContext({});


// components the returns the AuthContext by enclosing it's child components within the context
const AuthProvider = ({children}) => {


    const [user , setUser] = useState({
        userId: "",
        username: "Anu",
        role: "SELLER",
        authenticated: false,
        accessExpiration: 0,
        refreshExpiration: 0
    })
  return (
   //returning the AuthContext with values "user" and "setUser"
   // by enclosing the child components within it 

   <authContext.Provider value={{user , setUser}}>{children}</authContext.Provider>
  )
}

export default AuthProvider


// custom hooks that returns the context value 
export const useAuth = () => useContext(authContext);
