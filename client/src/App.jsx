// import { useState } from 'react'
import './App.css'
import { Layout } from 'antd';
import Logo from './components/Logo';
import MenuList from './components/MenuList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Sider className='sidebar'>
          <Logo />
          <MenuList />
        </Sider>
        <Switch>
          <Route path='/home'> {/* Render Home Component */} </Route>
          <Route path='/following'> {/* Render Following Component */} </Route>
          <Route path='/search'> {/* Render Search Component */} </Route>
          <Route path='/notifications'> {/* Render Notifications Component */} </Route>
          <Route path='/messages'> {/* Render Messages Component */} </Route>
          <Route path='/upload'> {/* Render Upload Component */} </Route>
          <Route path='/profile'> {/* Render Profile Component */} </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

