import React from 'react';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import About from './components/display/About/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/about" component={About} />
						<Route path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
