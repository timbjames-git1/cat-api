import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';

import './Custom.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { CatList } from './features/cat/views/List';
import { UploadView } from './features/cat/views/Upload';

import store from './state/redux-store';

const App: React.FC = () => {

    return (
        <Provider store={store}>

            <div className="site-wrap">

                <header className="site-navbar py-3" role="banner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-4 col-md-6">
                                <h1 className="mb-0">
                                    <a href="/" className="text-white h2 mb-0">
                                        Felines
                                    </a>
                                </h1>
                            </div>
                            <div className="col-8 col-md-6">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu mx-auto">
                                        <li className="active">
                                            <NavLink to="">View Cats</NavLink>
                                        </li>
                                        <li className="active">
                                            <NavLink to="upload">Upload</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>                        
                        </div>
                    </div>
                </header>

                <div className="container-fluid">

                    <Switch>                    
                        <Route path="/upload" component={UploadView} />       
                        <Route path="/" component={CatList} />
                    </Switch>

                </div>

                <div className="footer py-4">
                    <div className="container-fluid text-center">
                        <p>
                            Copyright ©<script>document.write(new Date().getFullYear());</script>2021 All rights reserved ({process.env.NODE_ENV} - {process.env.REACT_APP_VERSION})     
                        </p>
                        <span className="d-none">
                            Version: {process.env.REACT_APP_VERSION}
                            <br />
                            Environment: {process.env.NODE_ENV}
                            <br />
                            BaseUrl: {process.env.PUBLIC_URL}
                        </span>
                    </div>
                </div>

                <ReduxToastr timeOut={3000} preventDuplicates position="top-left" transitionIn="fadeIn" transitionOut="fadeOut" closeOnToastrClick progressBar />

            </div>
        </Provider>        
    );
}

export default App;
