import React from 'react';
import Layout from './components/containers/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Orders from './components/containers/Orders/Orders';
import About from './components/display/About/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Layout>
					<Switch>
						<Route
							path="/burger-builder"
							component={BurgerBuilder}
						/>
						<Route path="/orders" component={Orders} />
						<Route path="/about" component={About} />
					</Switch>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
