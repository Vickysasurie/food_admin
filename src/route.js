
import  React,{Component}  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders';
import Provider from './components/Provider';
import UpdateProvider from './components/UpdateProvider';
import Map1 from './components/Map1';
import Food_Info from './components/food_info';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/login' component={Login}>      </Route>
            <Route path='/signup' component={Home}></Route>
            <Route path='/order' component={Orders}></Route>
            <Route path='/foodorder' component={Home}></Route>
            <Route path='/provider' component={Provider}></Route>
            <Route path='/updateProvider/:PID' component={UpdateProvider}></Route>
            <Route path='/map' component={Map1}></Route>
            <Route path='/food_info' component={Food_Info}></Route>
  {          /* <Route path='/orderfood' component={OrderFood}></Route> */}

            {/* <Route path='*' component={NotFound}></Route> */}

        </Switch>
    </BrowserRouter>
)
export default Routes;