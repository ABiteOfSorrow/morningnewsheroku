import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import {Menu, Icon} from 'antd'
import { Link, Redirect } from 'react-router-dom';

function Nav(props) {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
            <Link to="/ScreenSource">
                <Icon type="home" />
                Sources
            </Link>
        </Menu.Item>

        <Menu.Item key="test">
            <Link to="/ScreenMyArticles">
                <Icon type="read" />
                My Articles
            </Link>
        </Menu.Item>

        <Menu.Item key="app">
            <Link to="/">
                <Icon onClick={()=> props.handleSignOut()} type="logout" />
                Logout
            </Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}


function mapStateToProps (state) {
    return { user: state.user}
}   

function mapDispatchToProps (dispatch) {
    return {
        handleSignOut: function(user) {
          dispatch( {type: 'USER_SIGN_OUT', user} );
      },
    };
   };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
