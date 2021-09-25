import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../redux/store';

import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Header from '../components/Header';

import * as serviceWorker from '../serviceWorker'
import Home from '../views/Home';
import ProfileIndex from '../views/Profile/Index';
import ProfileEdit from '../views/Profile/Edit';
import PostCreate from '../views/Post/Create';
import PostShow from '../views/Post/Show';
import PostIndex from '../views/Post/Index';
import Modal from '../components/Modal';

import '../style/App.css'

const App = () => {

    useEffect(() => {
        window.history.scrollRestoration = 'manual'
    }, []);

    return (
        // <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Modal />
                <main className="main-container container">
                    {/* <div className="container"> */}
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile/:username' component={ProfileIndex} exact />
                    <Route path='/profile/:username/edit' component={ProfileEdit} exact />
                    <Route path='/' component={PostIndex} exact />
                    <Switch>
                        <Route path='/post/create' component={PostCreate} exact />
                        <Route path='/post/:id' component={PostShow} />
                    </Switch>


                    {/* </div> */}
                    {/* <Route path='/' component={Home} exact /> */}

                </main>
            </BrowserRouter>
        // </Provider>
    );

}

export default App
// ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister()