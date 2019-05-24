# Section 3 - Understanding the Base Features & Syntax

## Using Create React App (Section 3, lecture 26)

After installation we pass `create-react-app` in the folder where we would like to set up a new React project, and then pass on the name of the project, in our case it will be `section-3-app`. Because we want the file structure to be the same Max has in the course, we will also pass the flag `--scripts-version 1.1.5`, which will set the outputted files to be specific and matching to those that Max will go over (Though this is not a downgrade in the React version, we still use the latest one). After the installation has finished, we will enter the folder and type `npm start` to run the dev server.

## Understanding Components Basics (Section 3, lecture 28)

After we've adjusted the initial files that we get with the Create React App, we can start understanding what we actually see. What we will always see in React are components, and the core idea of React is creating UI using components, and so this is what a class based component looks like:

```js
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

These components are almost like some custom HTML elements, but actually they are all syntactic sugar that will be compiled to valid JavaScript by Babel.

We currently have 2 .js files, the App.js and index.js. The index.js file is the file that registers React to one root component, in our case and many other cases, it'll be a `<div>` with the id of `root`, where inside we will nest all other components we create using React. It is possible to be done thanks to the `ReactDOM` library that we `import` from, which will basically parse the React code to the DOM.

```js
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

The `App` component that we saw above is our first and main component that will host other components we create. It is a class based component since it is created as subclass that inherits from the `Component` of the main React library, that we `import` from the node_modules, with the `extends` keyword.

```js
import React, { Component } from 'react';
```

Every component has a `render` function that returns JSX code, which will in turn be rendered to the DOM. All the JSX will be nested inside a single parent element, since the `return` statement can only return a single expression, and so all the content needs to be nested within a single parent node. The JSX allows us to "write HTML" using JavaScript code

## Understanding JSX (Section 3, lecture 29)

We need to understand that JSX in the end of the day is simply a JavaScript code, while the HTML-like look is basically a syntactic sugar that makes it more comfortable to write code in React.

What we see as this:

```js
render() {
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
        </div>
    )
}
```

Will actually be compiled to this JavaScript code:

```js
render() {
    return React.createElement(
        'div',
        { className: 'App' },
        React.createElement('h1', null, 'Hi, I\'m a React App')
    );
}
```

We can do this thanks to the `React` library we're importing, and it is important to use it when writing JSX, even though we're not specifically passing it anywhere in our code, but at compile time it is used to access the `createElement` method, that allows us to create the DOM nodes.

## JSX Restrictions (Section 3, lecture 29)

JSX has some limitations:

-   Most attributes could be passed as we would with regular HTML attributes, but in other cases, we will need to pass them as we would when we write JavaScript, since as we know JSX is actually JavaScript. And so, this is why we pass `className` and not `class`, as this is the JavaScript way to pass a class on an HTML element.
-   We cannot `return` multiple nodes, all the code needs to be wrapped in a single root element, usually a `<div>`. React version 16+ does introduce a way to pass adjacent elements, but we will only touch this subject by the end of the course.

The `return` statement has parantheses because it allows us to create a single multi-line expression, that then we could structure like a normal HTML structure, and allow us to avoid errors.

## Creating a Functional Component (Section 3, lecture 30)

As stated before, React is all about building and working with components, and so this is what we will do now. WE will create a function based component (In contrast with the class based component we saw our root App component is made with).

For this, in the `src` folder we will add a new folder which will bear our component name, and inside will host the component .js file, which will also has the same name - `Person`. It is a convention to create a separate folder for each component, and name them with a capital first letter, and try to make the name as descriptive as possible. It is important to provide components a capital first letter since lower case tags are reserved for HTML code, and so to prevent errors and distinguish components, we will pass them with a capital first letter.

Inside the `Person.js` file, we will create a new functional component, which is also known as a 'dumb' component, since (up until React Hooks) does not hold its own state, but simply renders JSX. We can create it easily using the React snippets and passing `rface`, to immediately create an arrow function component, with the proper `import` and `export` statements. We don't `import` or use `Component` because we're not passing a class based Component, and so we do not need to `extend` the React `Component` superclass.

```js
import React from 'react';

const Person = () => {
	return <div />;
};

export default Person;
```

This will be the default skeleton of a functional component. inside the `return` statement we could pass JSX code. And so we could pass any valid DOM node that will be converted to HTML and presented in the DOM, as long as it is a single expression (a single Node or couple of elements wrapped inside a single node), and so we will just pass a `<p>` that has some text inside of it. Because it is a single line `return` statement, we won't need parentheses.

```js
import React from 'react';

const Person = () => {
	return <p>I'm a person component!</p>;
};

export default Person;
```

Now due to having the `export` statement, we could pass this component to different files, between different components, using the `import` statement to import the file from the `Person` folder. We will go ahead and insert it inside of the root App component, when we pass an HTML element that bears the component name, and since it does not nest any content or other components inside of it, we can make it a self-closing tag: `<Person />`.

```js
import Person from './Person/Person';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<Person />
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

Now the page renders the `<p>` tag element to the DOM, having the text we passed between the `Person` component `<p>` tags.

## Working with Components & Re-using Them (Section 3, lecture 33)

Componenets are essentially a reusable pieces of code, where we should be able to use them throughout our app, as they all should be modular and independent. Keeping this in mind, we can simply pass our `Person` component as many times as we would like, and it we render out whatever we've input inside of its `return` statement. This makes the notion of building an app composed of many components more simple and awesome.

```js
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<Person />
				<Person />
				<Person />
				<img src={logo} alt="" style={{ height: 300, width: 300 }} />
			</div>
		);
	}
}
```

## Outputing Dynamic Components (Section 3, lecture 34)

What if we want to pass some dynamic, JavaScript code into a component JSX so it will be displayed in the DOM? We can pass JavaScript expressions into component by passing valid JavaScript code between single curly braces. We can pass variables, functions, one line expressions etc, though we can't define a a JavaScript class inside of it or any complex expression like that.

```js
const Person = () => {
	return <p>I'm a person, I'm {Math.floor(Math.random() * 30)} years old</p>;
};
```

Now when we refresh the page, we will see each `Person` component has the string with a random number between 0 and 30.

## Working with Props (Section 3, lecture 35)

As in normal HTML, we can pass attributes, such as `class`, `id`, `value` for `<input>` etc. For our custom elements, our components, we could also pass in custom attributes into them, that later we could use as data that we can pass into the component, making it more dynamic and flexible.

```js
    <Person name="Eliad" age="27">
    is a Future Programmer
    </Person>
    <Person name="Jakob" age="27">
    is a Future MD
    </Person>
    <Person name="Ada" age="21" />
```

These attributes are called `props` in React, and we could pass `props` at the parent component level, where the components are being rendered, and use them inside the component which they were passed again. At the component itself, we can access the props by passing `props` in the component function arguments. Then, inside the curly braces block where we pass the JavaScript expressions, we can access the specific props by passing the "attribute" name, like `props.name`.

```js
const Person = props => {
	return (
		<p>
			I'm {props.name}, I'm {props.age} years old
		</p>
	);
};
```

In turn, each component will render itself with its coresponding props data. We should note that if it is a class based component, we should access the props with `this`, so we will pass `this.props.name`, for example.

## Understanding the Children Property (Section 3, lecture 36)

How would we output whatever we passed between our opening and closing tags of our components? We would first want to go to the component, wrap the `return` statement with parantheses, as we will output a multi-line JSX statement, and pass another element, for example another `<p>` tag. Inside the tag, we will pass `{props.children}`. The `children` is a reserved React property, which basically points out to the content being passed between the custom component tags.

```js
<Person name="Eliad" age="27">
	is a Future Programmer
</Person>
<Person name="Jakob" age="27">
	is a Future MD
</Person>
<Person name="Ada" age="21" />
```

```js
const Person = props => {
	return (
		<div>
			<p>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
		</div>
	);
};
```

This in turn will create another `<p>` tag in the DOM that will display the contents of the component. This content could also be complex HTML code, React components etc, and not only text. If we inspect the elements on the page, we will see that the `<p>` tag are being rendered with the text inside of them, while the component without the inner contnet has an empty `<p>` tag, since its `children` property values is `null`.

## Understanding and using State (Section 3, lecture 37)

We saw that Props allowed us to pass some data outside of a component as an attribute, at the parent level, and get that data inside of the component using the `props` argument. But what if we want to have data inside of the component? something that allows us to store data inside of the component and allow the component to interact and change it too. That's the concept of State.

In our App.js file, lets say we also want to add a `<button>` that will have a name switch functionality. But first, we would like to define the names of the Person components in a non-hardcoded way, basically in a more dynamic way.

### The `state`

The App component is a `class`, or more precisely a subclass that extends the React `Component` superclass, thus it has properties. And so, whenever we `import` React and extend `Component`, we get access to the `state` property, which is a special and reserved React property which will allow us to store data that is relevant to that component (or children of that component), and also to dynamically change that data. The `state` is an object that allows us to store various data properties which we could also use in the component.

This is in contrast to the `props`; as they are set and passed from outside of the component, as we set `name` and `age` to the `Person` component at the `App` component, in the App.js file (and not within the Person.js file), `state` is managed within the component.

```js
class App extends Component {
	state = {
		// An object that stores the component Data
	};

	render() {
		// Render JSX
	}
}
```

**Note on `state` and non-class based components -** Up until the introduction of Hooks in React 16.8, `state` was only possible to set and pass in a class based components, meaning that only components which extend `Component` could have access to the `state` property. So up to the part where we will learn about Hooks, later in the course, `state` will only be set in class based components, and we will never set it in a functional component. Still, we would like to use functional components as much as possible, because we should use State with care and responsibility.

The special thing is, that upon changing the data, or setting the state, React will automatically re-render the page to match the changes that were made in the state of the component with what is being presented in the DOM.

In our case, we would like to pass an array of `persons` in the state, which will be made of objects that include all the data about a person which we could input into the `Person` component. Note that in contrast with the hard-coded code that we passed as props, the `state` is a pure JavaScript code, and so, for example, the `age` will have a number which is a number type, and not a string.

```js
class App extends Component {
	state = {
		persons: [
			{
				name: 'Eliad',
				age: 27,
			},
			{
				name: 'Jakob',
				age: 27,
			},
			{
				name: 'Ada',
				age: 21,
			},
		],
	};
}
```

### Passing the state as `props` to the child components

Now that we have our `state` property data, we could pass it to the `<Person>` component instead of the hard-coded name and age. We could do that by opening curly braces to input a JavaScript expression, and then pass the relevant state property using `this`, since we're still inside the `class` and have access to the `this` keyword.

```js
render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<button>Switch name!</button>
				<Person
					name={this.state.persons[0].name}
					age={this.state.persons[0].age}
				>
					is a Future Programmer
				</Person>
				<Person
					name={this.state.persons[1].name}
					age={this.state.persons[1].age}
				>
					is a Future MD
				</Person>
				<Person
					name={this.state.persons[2].name}
					age={this.state.persons[2].age}
				/>
				<img
					src={logo}
					alt="React logo"
					style={{ height: 300, width: 300 }}
				/>
			</div>
		);
	}
```

Now upon reloading the app we see the same output as before, but this time we use the `state` property. If we were to change one of the properties or values in the state, it will lead React to automatically update, or re-render, the DOM without the need to reload the page.

## Props & State (Section 3, lecture 37)

In React, to add an event listener to a JSX element, we would do that by passing an inline attribute named `on(Event)`, and so in our case, since we want to listen to a click of a button, it will be `onClick`. Then we pass a JavaScript expression, within curly braces, that will refer to a callback function we will input within the class, above the `render` method, using the `this` keyword since we're refering to a method within our class component.

The callback function we will declare is a method of our Person class based component. The convention about its name is to indicate it is a handler, corresponding to an event listener set up in our JSX code. We will write it in the ES6 syntax, using an arrow function, so we will automatically refer `this` to the class itself, and not to the global object.

```js
clickHandler = () => {};

	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<button onClick={this.clickHandler}>Switch name!</button>
				<Person
					name={this.state.persons[0].name}
					age={this.state.persons[0].age}
				>
				{//...}
		)
	}
```

## Manipulating The Satate (Section 2, lecture 41)

When we want to manipulate the state, change it in any way in our code, we could not do it by directly mutating the `state` object, by doing this:

```js
clickHandler = () => {
	this.state.persons[0].name = // Some code
};
```

Directly mutating the state object is forbiden in React, and React will not recognize these changes and actually will throw warnings in the console. Instead we need to use a built in method of the React `Component` superclass, the `this.setState` method.

This method allows us to specifically change the state of the component in a way that will not mutate the original state. The changes to the State that we will pass to the `setState` method will be compared to the original state, and then React will reflect the changes in the DOM.

The method takes an object, and inside we can pass the `persons` array again, and make some changes to it. React will then "merge" the new state with the old state and reflect the changes in the DOM, causing a re-render when the State changes take effect, in our case, upon clicking on the button with the callback function that calls the `setState` method.

```js
clickHandler = () => {
	this.setState({
		persons: [
			{
				name: 'Eliad Touksher',
				age: 27,
			},
			{
				name: 'Jakob Blecher',
				age: 27.5,
			},
			{
				name: 'Ada Chen',
				age: 21,
			},
		],
	});
};
```

React will only update the relevant data in the `state` object, and will leave the other unchanged State as it was. Now when we will click on the button, only the values of `name` and `age` that were changed from the original state will be changed in the DOM immediately. This means that React will only look for the specific changes that we made for the state and will only reflect these changes, which is good since we're not interested in affecting the whole State data structure anew.

So what basically triggers the DOM re-render? The changes we made in the State, but also the changes made in the Props! We need to remember that the changes we made now in the State are actually being passed as Props to the `Person` component and used in the `render` method, and so this triggers updates in that component too, although it does not hold any state.

## Using the useState() Hook for State Manipulation (Section 3, lecture 43)

Now we will have q sneak peak to the new React 16.8+ feature of Hooks, which will allow us to set and manipulate State on functional based components, instead of having State available only to class based components. We will see it now in action, but we will not use it up until the 2 modules that will dive deep into the hooks features, and rebuilding the entire course project with hooks, and so up until then we will continue to use the class based components for the State.

### What are Hooks and how do they look like?

React Hooks is a new feature that was introduced by React on version 16.8, and its basically a name for a collection of functions exposed by React and could be used to a functional components, and so for our demonstration we will convert our `App` class based component to a functional component for now. Because of that, we can get rid of the `state` object we had and the event handler callback function that changes the state, and we can get rid of the `render` method, and just have a `return` statement that returns a JSX expression.

```js
const App = props => {
	return (
		<div className="App">
			<h1>Hi, I'm a React App</h1>
			<button onClick={this.clickHandler}>Switch name!</button>
			<Person
				name={this.state.persons[0].name}
				age={this.state.persons[0].age}
			>
				is a Future Programmer
			</Person>
			<Person
				name={this.state.persons[1].name}
				age={this.state.persons[1].age}
			>
				is a Future MD
			</Person>
			<Person
				name={this.state.persons[2].name}
				age={this.state.persons[2].age}
			/>
			<img
				src={logo}
				alt="React logo"
				style={{ height: 300, width: 300 }}
			/>
		</div>
	);
};
export default App;
```

Now our `App` component is a normal functional component, and we can use the React Hooks functions on it.

### Importing the `useState` Hook

If we have React 16.8+ then we should have the React Hooks functions available for us from the React package. We go to the `import` statement where we get import `React` and `{ Component }`, and instead of the `Component`, which we won't need since we're not extending a class, we will import `{ useState }`. All of the React Hooks functions start with a `use` and then pass the name of the Hook we need.

```js
import React, { useState } from 'react';
```

### The `useState` hook functionality

Inside of our functional component, we call the `useState` hook as a function, and inside of it we can pass our original State object of `persons`.

```js
const stateArr = useState({
	persons: [
		{
			name: 'Eliad',
			age: 27,
		},
		{
			name: 'Jakob',
			age: 27,
		},
		{
			name: 'Ada',
			age: 21,
		},
	],
});
```

This function will always return an array with exactly 2 elements, and always 2 elements:

-   The current state element - The original state object that we passed into the `useState` function, and whenever we change it, it will be the updated state.
-   a function that allows us to update the state - This will allow React to note the changes made in the State and re-render the component upon detecting changes, which is exactly what happens with `setState` method in a class-based component.

Since the `useState` function returns 2 elements in ana array, we can use array destructuring to set these 2 elements into their own variables, one which will represent the current state, which we will name `personsState` and the second one which sets the state will be `setPersonsState`. Now we will change all the `this.state` statements in the `return` body, to `personsState`.

```js
const [personsState, setPersonsState] = useState({
	persons: [
		{
			name: 'Eliad',
			age: 27,
		},
		{
			name: 'Jakob',
			age: 27,
		},
		{
			name: 'Ada',
			age: 21,
		},
	],
});

return (
	<div className="App">
		<h1>Hi, I'm a React App</h1>
		<button onClick={this.clickHandler}>Switch name!</button>
		<Person
			name={personsState.persons[0].name}
			age={personsState.persons[0].age}
		>
			is a Future Programmer
		</Person>
		<Person
			name={personsState.persons[1].name}
			age={personsState.persons[1].age}
		>
			is a Future MD
		</Person>
		<Person
			name={personsState.persons[2].name}
			age={personsState.persons[2].age}
		/>
		<img src={logo} alt="React logo" style={{ height: 300, width: 300 }} />
	</div>
);
```

This in turn will allow us to pass the state as Props to the JSX code, and now the data in the State that we pass to the Props will be displayed in the DOM.

### Changing the State

Now we would like to change the state by clicking on the button. We will create a function inside of the functional component and set our `clickHandler` function inside of it, allowing us to have the same callback function available to us. We should note though that we need to remove the `this` keyword from the call on the event handler, in the `return` statement.

Now we won't call `setState` anymore, but switch it with `setPersonsState` as the function that will update our state.

```js
const [personsState, setPersonsState] = useState({
	persons: [
		{
			name: 'Eliad',
			age: 27,
		},
		{
			name: 'Jakob',
			age: 27,
		},
		{
			name: 'Ada',
			age: 21,
		},
	],
});

const clickHandler = () => {
	setPersonsState({
		persons: [
			{
				name: 'Eliad Touksher',
				age: 27,
			},
			{
				name: 'Jakob Blecher',
				age: 27.5,
			},
			{
				name: 'Ada Chen',
				age: 21,
			},
		],
	});
};
```

Now upon the click of the button, the State will be updated and it will trigger a DOM re-render. Extracting the current state, the update function, setting the state object and assigning a function to trigger the state change all works just as it would in class-baded component.

### Differences from the class-based component `setState` method

To see the difference, we will first add another property to the initial state object, a simple string.

```js
const App = props => {
	const [personsState, setPersonsState] = useState({
		persons: [
			{
				name: 'Eliad',
				age: 27,
			},
			{
				name: 'Jakob',
				age: 27,
			},
			{
				name: 'Ada',
				age: 21,
			},
		],
		otherState: 'Some other value'
	});
```

If we will log `personState` to the console to see what the State holds now, we will see an object with 2 properties, as expected. By clicking on the button and changing the state, upon checking the State now in the console we see that the state does not include `otherState` anymore, but only the `persons` array. When we're using React Hooks, the second function which we call to perform the update of the array **does not merge the new state with the old state, but simply returns the new state that replace the old state.**

This is very important because now we need to make sure that whenever we update a certain piece of the State, we need to make sure we will also include the old state, or it will be gone upon the update. This could be done in different ways:

-   Manually adding the other pieces of the state to the update function. This will make sure that the update function will include the other part of the State, that will just be whatever is in the same place in the original state variable.

```js
const clickHandler = () => {
	setPersonsState({
		persons: [
			{
				name: 'Eliad Touksher',
				age: 27,
			},
			{
				name: 'Jakob Blecher',
				age: 27.5,
			},
			{
				name: 'Ada Chen',
				age: 21,
			},
		],
		otherState: personsState.otherState,
	});
};
```

-   Another more "elegant" way to approach this is by calling `useState` again and there pass our other non-changed state properties, this in turn will evaluate the state again and will add the non-changed state properties to the component state. We could actually have as many `useState` calls as we want.

```js
const [otherState, setOtherState] = useState({
	otherState: 'Some other value',
});
```

If what we're passing is a string, we could just pass it as the default value, we don't have to make it an object. It could then also be any primitive data type.

```js
const [otherState, setOtherState] = useState('Some other value');
```

Now as we set the `otherState` variable but we do not call `setOtherState` at all, it will just return the default state. This way we have couple of `useState` slices that set the state of our component.

## Stateless VS St stateful components (Section 3, lecture 44)

We learned a lot about State and Props, we learned that components, class-based or using hooks, can get and set State, but also get and use Props. If we have a component that has its own State, no matter if it's a class-based or functional using Hooks, it is a Stateful component, in a contrast with a Stateless component. A stateful component is a component that manages State, either with a `state` property or a `useState` hook. A component without its own state or any internal state management, like the `Person` component that we've created, is a stateless component.

More names for Stateful components can be: smart components, container components.
More names for Stateless components can be: dumb components, presentational components.

It is a good practice to create as many as possible stateless component and having as few state management as possible, because having a lot of State to manage is hard to maintain and can get the code very entangled and unmanageable fast. Also it is easier to track the data and know where it sits and why and how it is changed, this way we can better trace the code and not get lost in a spaghetti code.

## Passing Method References Between Componenets (Section 3, lecture 45)

Let's say we want to call our `handleClick` function not only upon clicking on th button, but also when we click on one of the `<p>` tags in our `Person` component, meaning that we want to pass the `handleClick` event handler from our `App` component to our `Person` component, and this is possible by utilizing Props, and passing the reference for this handler to the child component. THis is a very common pattern in React, and is utilized for a great effect.

Fist we will create a new prop for the `Person` component named `click`, where we will pass the event handler callback function.

```js
render() {
		return (
				{...}
				<Person
					name={this.state.persons[1].name}
					age={this.state.persons[1].age}
					click={this.clickHandler}
				>
					is a Future MD
				</Person>
				{...}
		);
```

Next, we can go to the `Person` component code and add the `click` prop on one of the `<p>` tags as the callback function to an `onClick` handler.

```js
const Person = props => {
	return (
		<div>
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
		</div>
	);
};
```

Now upon clicking on that `<p>` tag text in the DOM, the `setState` method is being called and will change the state, just as it would if we will click the button. This shows that we can pass methods as props and use it to change the state at methods that don't have, and shouldn't have, access to the state.

### Passing arguments to the callback function

We can also pass arguments into the callback function so that the state will change to the value of the argument we pass. We will pass `newName` to the `handleClick` callback function as a parameter, and then expect to receive an argument that would change the state.

```js
clickHandler = newName => {
	this.setState({
		persons: [
			{
				name: newName,
				age: 27,
			},
			{
				name: 'JB',
				age: 27.5,
			},
			{
				name: 'Ada Chen',
				age: 21,
			},
		],
	});
};
```

How would we go about passing the arguments? There are 2 ways to do that:

-   Using `bind`: We can call `bind` on the callback function that we pass in the `onClick` event listener, binding `this` and then passing one or more arguments that will act as the arguments that we pass in the method parameters.

```js
<Person
	name={this.state.persons[1].name}
	age={this.state.persons[1].age}
	click={this.clickHandler.bind(this, 'kewliyo')}
>
```

-   Using and arrow function: Another way is to pass a high order arrow function into the `onClick` event listener that would return the callback function, that will have arguments, and call it because it has parantheses. This way is a bit more "cleaner" than the `bind` method, but counts as having worse performance, as we have a function that calls a function, and should probably used less, although it depends on the size of our app.

```js
<button onClick={() => this.clickHandler('Eli T')}>Switch name!</button>
```

## Addint Two Way Binding (Section 3, lecture 45)

What if we want to change the name of one of our `Person` components on our own by passing it into a text input field? We could set a 2 way binding feature that will allow us to set the state of our `Person` component by passing in the value of the input field as the new state, as we type it.

First we will create a normal `<input>` element at the `Person` component, basically making every `Person` component also have an empty input field. That `<input>` tag will also have an `onChange` event listener that will listen to any change happening on this elements value, this will be effective to listen to inputing text. In the event listener we would like to call a callback function that will update the state upon change in the value of the input field.

```js
const Person = props => {
	return (
		<div>
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={} />
		</div>
	);
};
```

### The callback function

Now back in our `App` component, we would like to define our callback function for our `onChange` listener. We will call it `handleNameChange`, it takes the `event` object as a parameter (which I'll name `e`) and we would like to also call the `setState` method on it, as we do in the `handleClick` method.

We can use the `event` object to get access to the `value` property of our input field, and so we will set one of the names of one of the `persons` objects to have the value of whatever we will type in that input field, basically allowing us to render the new name "live".

```js
handleNameChange = e => {
	this.setState({
		persons: [
			{
				name: 'Eliad',
				age: 27,
			},
			{
				name: e.target.value,
				age: 27.5,
			},
			{
				name: 'Ada Chen',
				age: 21,
			},
		],
	});
};
```

Now we would need to pass `handleNameChange` as a Prop to the `Person` component so we could pass it into the `onChange` listener at the `<input>` tag. We would do that by setting a prop named `change` to one of the `Person` elements, which we will then pass to the `Person` component as a prop.

```js
<Person
	name={this.state.persons[1].name}
	age={this.state.persons[1].age}
	click={this.clickHandler.bind(this, 'kewliyo')}
	change={this.handleNameChange}
>
```

```js
const Person = props => {
	return (
		<div>
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.change} />
		</div>
	);
};
```

Now when we reload the page we see that all of the `Person` components have an empty text input fields. In the first and last input fields, if we will start typing, nothing will happen, but if we will pass something to the middle one, we will see that the name will change to whatever we pass in the input field dynamically. The `handleNameChange` method gets fired upon each letter that is being passed in the input field, changing the state dynamically.

### Adding the 2-way binding to also see the current value

If we really want to have a 2-way binding set to that input field, meaning that we will also see the initial value of the name being reflected in the input field by default, we could just add `props.name` into a `value` attribute, which is a default HTML attribute of the `<input>` element.

```js
const Person = props => {
	return (
		<div>
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.change} value={props.name} />
		</div>
	);
};
```

When we reload the page, we can see that all of the input fields are already set with the value of the `name` that is set in the state of the `App` component.

We get a warning in the console saying that we should attach an `onChange` listener to all of the `Person` components, and that is because we only have the actual callback function set to affect the middle `Person` tag, but the 2-way binding still works.

## Adding Styling with Stylesheets (Section 3, lecture 47)
