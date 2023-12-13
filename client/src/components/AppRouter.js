import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} Component={Component} caseSensitive={true}/>
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} Component={Component} caseSensitive={true}/>
            )}
        </Routes>
    );
};

export default AppRouter;
