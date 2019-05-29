# Section 4 - Working with Lists and Conditionals 

## Rendering Content Conditionally (Section 4, lecture 51)

Let's say we want to output content conditionally when we click on the button that we have assigned earlier to switch names. This means, that until we will click on this button, React will not render the 3 `<Person>` components and only upon a click of the button will we output them to the DOM.

First of all, we would like to wrap all of the `<Person>` elements in a `<div>`, and place this wrapping `<div>` between two curly braces so it will become a JavaScript expression, that later we could hide/show through a conditional statement.

```js
return (
        {
            <div>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                >
                    is a Future Programmer
                </Person>
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    click={this.clickHandler.bind(this, 'kewliyo')}
                    change={this.handleNameChange}
                >
                    is a Future MD
                </Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}
                />
            </div>
        }
);
```

Then we will add a boolean property to our state, by default set it to `false`. We can use this boolean property as a flag, as long as it is set to `false`, the `<div>` will not be rendered to the UI, switching it to `true` will show the `<div>` with all the `<Person>` elements.

```js
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
		showPersons: false,
	};
```

### JSX and rendering dynamically with conditional expressions

In other JavaScript frameworks, like Vue for example we could use a directive like `v-if` to show/hide elements dynamically, but in React we use pure JavaScript to do that. JSX looks like HTML but it is in fact a pure JavaScript code, thanks to the `React` code we're importing to the app, it will be converted to `React.createElement()`, and so we need to remember that all this time we're writing and outputing JavaScript code. Keeping this in mind, we know we could pass other JavaSCript code into the JSX code to dynamically show/hide the elements we specify, and so into the curly braces we set earlier, we could input a conditional ternary operator to check if `showPersons` is set to `true` or `false`.

We pass the ternary operator right before the code we want to condionally render, basically setting the `true` condition to render the whole JSX block of our choosing, and for the `false` condition we return a `null`, basically not rendering anything as long as we have a `false`.

```js
{
    this.state.showPersons ? (
        <div>
            <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}
            >
                is a Future Programmer
            </Person>
            <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.clickHandler.bind(this, 'kewliyo')}
                change={this.handleNameChange}
            >
                is a Future MD
            </Person>
            <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}
            />
        </div>
    ) : null
    }
```

This way we make use of the fact we're working with pure JavaScript, both to output a JavaScript expression to check for condition and to display other JavaScript when the condition checks. The ternary operator will return a `React.createElement` method block if the condition checks, and not really a JSX code.

Now for the last step, we set the `clickHandler` callback function to set the state of the `showPersons` boolean property upon a click.

```js
clickHandler = () => {
    let showPersonBool = this.state.showPersons;
    this.setState({
        showPersons: !showPersonBool,
    });
};
```

We set this callback function inside the `onClick` event listener on the `<button>` tag as we did before. In turn, when we load the page we see that the `<Person>` tags are missing, and if we open the dev tools, we can see that these elements are not hidden, but not rendered on the page entirely. Upon clicking the button, The <`div>` containing the `<Person>` tags apears and we can see the elements in the DOM.

## Handling Dynamic Content "The JavaScript Way" (Section 4, lecture 53)

Let's use the fact that we write everything in JavaScript and take it a step further. Using the ternary operator as we did in the last lecture is not the most optimal or clean way to conditionally render elements to the page, and it can get messier if we have multiple conditional render cases on our JSX code and keep track of which expression renders which element, as our app grows.

There's a cleaner solution which will allow our JSX code in the `return` statement to look cleaner. As we said before, everything in React is JavaScript, and we're basically returning a JavaScript expression in the form of JSX inside a `render` method. When React decides what to render to the screen, it executes this `render` method, computing the entire code it holds, and not only what's inside the `return` statement. We can take advantage of this and pass some code to be checked and executed before the `return` statememt will be evaluated and returned. 

First, we will remove the ternary operator and the curly braces inside the `return` statement block. Inside the `render` method, before the `return` block, and there pass some code. We will create a variable called `persons` and set it to `null` by default, next up we can set an `if` statement, checking if `this.state.showPersons` is `true`, then we would like to set `persons` to output the `<div>` with the `<Person>` components.

```js
	let persons = null;
    if (this.state.showPersons) {
        persons = (
            <div>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                >
                    is a Future Programmer
                </Person>
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    click={this.clickHandler.bind(this, 'kewliyo')}
                    change={this.handleNameChange}
                >
                    is a Future MD
                </Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}
                />
            </div>
        );
    }
```

With the code that should be rendered bound to a single variable, we can remove the conditional in the `return` block and simply output the `persons` variable inside between the JSX code inside the curly braces, where the `<div>` used to be.

```js
    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
            {persons}
            <button onClick={this.clickHandler} style={buttonStyle}>
                Toggle Persons!
            </button>
        </div>
    );
```

We could also set `persons` to a ternary operator, making the conditional code a bit shorter.

```js
let persons = this.state.showPersons ? (
        <div>
            <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}
            >
                is a Future Programmer
            </Person>
            <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.clickHandler.bind(this, 'kewliyo')}
                change={this.handleNameChange}
            >
                is a Future MD
            </Person>
            <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}
            />
        </div>
    ) : null;
```

This in turn gives us the same desired result of rendering the `<div>` conditionally, but in a more elegant and cleaner way, and this is the preferred way to handle conditionally displaying JSX.

## Outputting Lists - Intro (Section 4, lecture 54)

We learned to take advantage of the full power of JavaScript to handle various tasks with React, and now we should continue with this notion and use JavaScript to dynamically output lists. We have in our state, our "single source of truth" an array of persons, and we output them into our code by seeting them into the Person component and outputing 3 of them, hardcoding their values into each `<Person>` tag. This is extremely inflexible and not dynamic at all, what if we had a database with 1000 persons? we would like to loop over the `persons` array and output an element for each one, and if we will add or remove elements in that array, it will be represented in the UI as well, dynamically.

## Outputing Lists (Section 4, lecture 55)

If we look at our `state` property, we can see that we have an array with 3 objects. Once again, due to React being all about JavaScript, we can utilize this in order to generate a list in a dynamic way. We start with inserting curly braces into the the `<div>` that should hold all the `<Person>` tags. We would like to render the objects in our `persons` array in the state, each object will have its own `<Person>` tag. For React to recognize this array and be able to display it properly in the DOM, we need to convert this array or JavaScript objects to JSX.

JavaScript offers us a method to convert arrays, and that is the `map` method. This method maps over the elements in the given array and performs an action we specify in an inline callback function we set in the method parentheses. This allow us to perform a variety of actions on each array element, including converting into different forms. We take an argument of the current element in the array, in our case we will call it `person`, and we will use the callback function to `return` JSX element for each object in the array, because that way React could input the code into the UI. 

So what shall be returned is a `<Person>` tag that also pass Props to the `Person` component, as `name` and `age`, like we done before when we hard-coded the components. Because we're accessing the current element in the `map` method, we can use it to refer to the elements properties, and then pass them as Props for each element.

```js
let persons = this.state.showPersons ? (
        <div>
            {this.state.persons.map(person => {
                return <Person name={person.name} age={person.age} />;
            })}
        </div>
    ) : null;
```

Upon clicking on the button, the persons appear again on the DOM. The `<Person>` tags were rendered again inside the `<div>` element. If we open the console, we can see that there's a warning, saying that each element in the list should have a `key` prop, which is an indication that the maping of a list of array elements from the State does work.

## Lists & State (Section 4, lecture 56)

Now we will look at how the lists we input using JavaScript, like we did with the `map` method, can work and be updated with the State of the app. For this, we will upgrade the event listener we have on the `Person` component, which calls the `props.click` reference to a callback function, instead of listening to clicks to change the name when we click on the `<p>` tag, now we would like it to delete that `<Person>` tag.

```js
const Person = props => {
	return (
		<div className="Person">
			<p onClick={props.click}>
				I'm {props.name}, I'm {props.age} years old
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.change} value={props.name} />
		</div>
	);
};
```

In the `App.js` we will create a new callback function that is called `handleDelete` and we will leave it empty for now, but it will handle the change in the State to remove an object from the `persons` array in the state, which will reflect a removal of a `<Person>` element, since it is being output as a list that is based on the array, dynamically. To the `<Person>` element we will render, we pass a prop named `click` (corresponding to the `props.click` in the `Person` component file), and pass `this.handleDelete` as the callback function.

Now how would we know which person we want to delete, and subsequently remove from the array in the State when we click? We can use the `index` property which the `map` method allow to have in our arguments, which points to the index value of the current iteration of the `map` method. We pass it as a second argument in the `map` argument, and then pass it to the `this.handleDelete` callback function as an argument, and for that we will turn the callback function call into an arrow function, so we could pass the argument (and avoid using `.bind` on it otherwise).

```js
{this.state.persons.map((person, index) => {
            return (
                <Person
                    name={person.name}
                    age={person.age}
                    click={() => this.handleDelete(index)}
                />
            );
        })}
```

Now back at the `handleDelete` callback function, we will take `index` as a parameter, and we will use it to update the state. Next we will create a new variable named `persons` which will reflect the current state, then we will call the `splice` method against it and pass `index` as the first argument, indicating the starting position, and 1 as the number of items to remove. Lastly, we will call the `this.setState` method and set `persons` in the state to the value of the `persons` variable in the function, basically assigning the new spliced array as the new current state.

```js
handleDelete = index => {
		const persons = this.state.persons;
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};
```

Now upon reloading the app, and clicking on one of the `<p>` tags inside the `<Person>` in the UI, the card gets deleted entirely and the page re-renders automatically to reflect the change. We can do that to any `Person` component, since they are being rendered as a list that is being reflected by the current State of the app. 

This approach has a a flaw though, which we will look up next.

## Updating State Immutably (Section 4, lectrue 57)

The only problem with what what we done in the `handleDelete` function is that we're mutating the State of our app directly by assigning persons to the same reference of the `persons` array. To solve that issue, we need to create a shallow copy of the `person` array, and then mutate that copy and the assign in to the State with the `setState` method.

We have 2 ways to copy the array:

- We can use the `slice` method on the array when assigning it to a different value, essentially copying the content of the array to a different reference.

```js
handleDelete = index => {
		const persons = this.state.persons.slice();
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};
```

- The more modern way will be to use the spread operator to create a copy of that array into a new one, and then assign the new array to the `persons` variable.

```js
handleDelete = index => {
		const persons = [...this.state.persons];
		persons.splice(index, 1);
		this.setState({ persons: persons });
	};
```

## Lists & Keys (Section 4, lecture 58)

Next we would like to take care of that "key" warning message we get in the console when we render the list. We get this warning as when we render lists, React wants to keep track of the elements in the list so it can better re-render the list in the DOM, in case the list changes. Basically, the `key` prop is set to a unique value for each item, and that helps React to keep track of the list items, their position and status, and so whenever we output a list of elements, we should also assign the `key` prop to be equal to unique key.

This is done thanks to the Virtual DOM React employs, it is essentially a copy of the DOM React keeps, and whenever React needs to update the DOM, whenever the State or Props have a change in them, it compares the state of the Virtual DOM copy with the current actual DOM, and then re-renders the changes from the Virtual DOM to the actual DOM in the right places, instead of re-rendering the entire DOM a new. We will look at the Virtual DOM in depth later.

And so, we would first like to go to our `state` object and assign some unique values to it. Note that we can't use the `index` argument as a unique id, as the index values in arrays change when we remove/add elements to the array, they are not unique, but dynamic.

```js
state = {
		persons: [
			{
				id: 'aaa21',
				name: 'Eliad',
				age: 27,
			},
			{
				id: '1bbb2',
				name: 'Jakob',
				age: 27,
			},
			{
				id: 'cc3c1',
				name: 'Ada',
				age: 21,
			},
		],
		showPersons: false,
	};
```

Now we will simply pass the `id` property as a prop named `key` to the `<Person>` element.

```js
let persons = this.state.showPersons ? (
			<div>
				{this.state.persons.map((person, index) => {
					return (
						<Person
							key={person.id}
							name={person.name}
							age={person.age}
							click={() => this.handleDelete(index)}
						/>
					);
				})}
			</div>
		) : null;
```

Now when we reload the app, we see that the warning is gone and that every element in the list has its own unique id. Now React can inspect the elements in the list better, maping and observing which elements had changes in them and which didn't, and re-rendering the DOM accordingly.

## Flexible Lists (Section 4, lecture 59)