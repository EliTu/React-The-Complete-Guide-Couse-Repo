import React from 'react';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import Orders from './components/containers/Orders/Orders';
import About from './components/display/About/About';
import SignUp from './components/containers/Authentication/SignUp/SignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/about" component={About} />
						<Route path="/signup" component={SignUp} />
						<Route path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
