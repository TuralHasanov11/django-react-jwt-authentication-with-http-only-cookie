import { useState, createContext } from 'react'


export const AuthContext = createContext({
    user: {},
    setUser: () => { },
    accessToken: null,
    refreshToken: null,
    csrftoken: null,
    setAccessToken: () => { },
    setRefreshToken: () => { },
    setCSRFToken: () => { }
})

export function AuthContextProvider(props) {

    const [user, setUser] = useState({})
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [csrftoken, setCSRFToken] = useState()

    return <AuthContext.Provider value={{
        user, setUser,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        csrftoken, setCSRFToken
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext