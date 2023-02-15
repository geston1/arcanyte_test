import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './pages/login'
import Payments from './pages/payments'
import PaymentAdd from './pages/PaymentAdd';

export default function App () {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={ <Login/> } />
                    <Route path="/payments" element={ <Payments/> }/>
                    <Route path="/payments/add" element={<PaymentAdd/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};