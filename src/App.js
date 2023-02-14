import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './pages/login'
import Payments from './pages/payments'

export default function App () {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={ <Login/> } />
                    <Route path="/payments" element={ <Payments/> }/>
                </Routes>
            </BrowserRouter>
        </>
    );
};