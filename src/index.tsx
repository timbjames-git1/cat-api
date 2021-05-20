import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, BrowserRouterProps } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const routerProps: BrowserRouterProps = { };

if (process.env.NODE_ENV === 'production'){
    routerProps.basename = process.env.PUBLIC_URL;
}

ReactDOM.render(
    <React.StrictMode>
        <Router {...routerProps}>
            <App />
        </Router>     
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
