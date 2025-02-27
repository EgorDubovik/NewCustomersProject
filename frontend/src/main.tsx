import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-auth-kit';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// Router
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <AuthProvider
                    authType = {'cookie'}
                    authName = {'_auth'}
                    cookieSecure = {false}>
                    <RouterProvider router={router} />
                </AuthProvider>
            </Provider>
        </Suspense>
    // </React.StrictMode>
    
);

