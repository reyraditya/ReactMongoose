import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux'

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';

import {keepLogin} from '../actions/index'

const cookie = new Cookies()

class App extends Component {
    componentDidMount(){
        this.props.keepLogin(cookie.get("masihLogin"), cookie.get("idLogin"))
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path='/' exact component = {Home}/>
                    <Route path='/login' component = {Login}/>
                    <Route path='/register' component = {Register}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect (null, {keepLogin})(App);