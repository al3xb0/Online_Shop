import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const token = localStorage.getItem('token')

        // if(!user.isAuth && !token){
        //     setLoading(false)
        //     return
        // }
        // setTimeout(() => {
        //     check()
        //         .then((data) => {
        //             if (data) {
        //                 user.setIsAuth(true);
        //                 user.setUser(true);
        //             } else {
        //                 user.setIsAuth(false);
        //                 user.setUser(false);
        //             }
        //         })
        //         .finally(() => setLoading(false));
        //     }, 1000)
        // }, [])

                check().then((data) => {
                        user.setIsAuth(true)
                        user.setUser(true)
                    }).finally(() => setLoading(false));
            }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <BrowserRouter>
            <NavBar />
            <AppRouter />
      </BrowserRouter>
  );
});

export default App;
