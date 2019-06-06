# Section 8 - The Burger Builder (Basic Version)

## Planning an App in React - Core Steps (section 8, lecture 147)

There are 3 important steps:

- Planning the component tree / Component structure - We have a basic app desgin, and now we have to split it into React components, which may look different than our original component structure, but it is important to have a rough estimate of what kind of components we'll have and how would they look like.
- Application State (The data) - The next big step is thinking about our application state and how would the application data would look like. For example, in the app we're about to build we will need to keep track about the ingredients a user added, because it determines what will be rendered to the app and eventually how much the user should pay in the end.
- Stateful components vs stateless component - Once we have the basic component structure figured out and we thought about the data we would need to pass, we can now think about which components in our app should be dumb, stateless components and which should be container, statefull components. Either class based components, or functional stateful (using Hooks) vs dumb functional components.

In the end our initial and basic outline for the app may differ from the end result, as we may find out that we might need more components or if we will merge components when the split doesn't make sense,and that's completley fine.

## Planning our App- Layout and Component Tree (Section 8, lecture 148)

First we would like to define our application and its goals. We're building the "Burger Builder" application, and the goal is for the user to be able to build a graphical representation of a hamburger, with its ingredients, and then be able to order it.

### Defining the layout

The general layout would be a page, that has a navbar which will contain a link to the main burger builder feature, order list and a logo. The landing page could be the builder tool itself. It will have an area that will display the burger that is being built, and the ingredients would be added dynamically and be low it there could be the total price. Under the display we will have a control box that will include the ingredients and a button to add '+' or remove '-' ingredients. Underneath the controls we would have a button that will allow us to checkout and place the order.

### Spliting the layout into components

Our primary component, as we know is the App.js root component, but we will define the base layout of the page in a `Layout` component, which will sit under `App`, and will act as the header and the part below the header. The `Layout` component will have several other components nested inside of him:

- `Navbar`, which will be the container for the navbar on the desktop layout. Inside we can contain a few components: `DrawerToggle`, `Logo`, `NavigationItems`.
- `Sidebar`, which will be the container for the navbar on a mobile layout. As for its components, we could share the same components the `Navbar` component is nesting, as these 2 components are almost the same, only displayed differently, depending on the viewport.
- `Backdrop`.
- `Props.Children`, This is a 'dynamic page' that will allow us to select and display different pages, depends on where we at inside the app currently. It is basically nesting of all the other non-permanent components we will have in the app, like the `Builder` component, `Orders` etc.

The pages that are hosted as the `Props.Children` will contain:

- `BurgerBuilder`, the page that has the main functionality of the app. It will contain the `Burger` which will have the visual preview of the burger by displaying a list of `Ingredient` components that are dynamically managed by the user. The `BuildControls`, which will allow us to dynamically customize the burger by displaying a list of individual `BuildControl` components. The last component we will have is `Modal` component which will display various boxes, like alerts, confirmations etc, by having a `Props.Children` prop which will be able to dynamically display what we need.
- We will create more pages in the future, like order list page.

## Planning the State (Section 8, lecture 149)

Now we can plan the State in our application, and this will also help us to decide which components will hold the State, and so which components will be stateful. 

What data will we need to manage in our app then?

- The ingredients that the user added, which will probably be a JavaScript object that holds the ingredient as a key and a quantitative value as a number.

```js
this.state = {
    ingredients: {
        meet: 1,
        cheese: 2,
        salad: 1,
    },
}
```

- We would also want to have a boolean value to check if the user has already purchased the burger or not.

```js
this.state = {
    ingredients: {
        meet: 1,
        cheese: 2,
        salad: 1,
    },
    purchased: false,
}
```

- Another thing important piece of data is the total price of the burger, so we can always see the price, dynamically calculate it and display it.

```js
this.state = {
    ingredients: {
        meet: 1,
        cheese: 2,
        salad: 1,
    },
    purchased: false,
    price: 12.25
}
```

### Where to manage the State?

We might think we should manage the State at the root `App` component (As we done with our state until now) but this would be the wrong thing to do. As we can see, our State has to do only with the burger build tool, basically having data regarding the burger itself, and so it would be much better to attach the State to the `BurgerBuilder` component, which is the page that holds all the features related to the building tool. Later when we will add other pages, like the order list page for example, they will not need to access that State, and so keeping the State at the root level will be redundant and useless, as it doesn't concern or affect the whole app, only one portion of it, which is the `BurgerBuilder` component, and so, for now, it will be our only stateful component.

The `App` component by default starts as a class based component, but it doesn't need to be if it doesn't manages state, and so we could just convert it to a function component.

As for `PureComponent` or `shouldComponentUpdate` lifecycle method, we shouldn't think about these now, as these will be decided as we code the components and realize that we would need to manage our rendering and previous state. This will be part of the optimization that we will do as we build the app, but in the case of our app, we might not even need to implement something like `PureComponent`.

## Setting Up the Project (Section 8, lecture 150)

