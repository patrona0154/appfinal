"use strict";

var Ingredient = React.createClass({
  displayName: "Ingredient",

  render: function render() {
    return React.createElement(
      "li",
      { className: "ingredient" },
      this.props.ingredient
    );
  }
});

var RecipeEntry = React.createClass({
  displayName: "RecipeEntry",

  getInitialState: function getInitialState() {
    return { showEntry: false, showModal: false };
  },
  showRecipe: function showRecipe() {
    this.state.showEntry ? this.setState({ showEntry: false }) : this.setState({ showEntry: true });
  },
  showRecipeModal: function showRecipeModal(e) {
    this.state.showModal ? this.setState({ showModal: false }) : this.setState({ showModal: true });
    var c = this.props.recipe;
    this.props.handleActiveRecipe(c);
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "list-group-item" },
        React.createElement(
          "h4",
          { className: "list-group-item-heading recipeHeading",
            onClick: this.showRecipe
          },
          React.createElement("i", { className: this.state.showEntry ? "glyphicon glyphicon-minus" : "glyphicon glyphicon-plus" }),
          " ",
          this.props.recipe.recipeName
        ),
        " ",
        React.createElement(
          "span",
          { className: "button-wrapper" },
          React.createElement(EditButton, { onUserClick: this.showRecipeModal }),
          " ",
          React.createElement(DeleteButton, { value: this.props.index, onClick: this.props.onDeleteClick })
        ),
        this.state.showEntry ? React.createElement(RecipeDetails, { recipe: this.props.recipe }) : null
      ),
      this.state.showModal ? React.createElement(EditModal, { handleDescription: this.props.handleDescription, handleIngredients: this.props.handleIngredients, value: this.props.index, recipe: this.props.recipe, onUserClick: this.showRecipeModal }) : null
    );
  }
});

var DeleteButton = React.createClass({
  displayName: "DeleteButton",

  render: function render() {

    return React.createElement(
      "button",
      {
        onClick: this.props.onClick,
        value: this.props.value,
        type: "button",
        className: "btn btn-default danger delete-button"
      },
      React.createElement("i", { className: "glyphicon glyphicon-remove" })
    );
  }
});

var EditButton = React.createClass({
  displayName: "EditButton",

  render: function render() {

    return React.createElement(
      "button",
      {
        onClick: this.props.onUserClick,
        type: "button",
        className: "btn btn-default edit-button"
      },
      React.createElement("i", { className: "glyphicon glyphicon-pencil" })
    );
  }
});

var EditModal = React.createClass({
  displayName: "EditModal",

  render: function render() {

    return React.createElement(
      "div",
      { className: "modal-back" },
      React.createElement(
        "div",
        { className: "container container-fluid" },
        React.createElement(
          "div",
          { className: "modal-front" },
          React.createElement(
            "h4",
            { className: "list-group-item-heading recipeHeading" },
            "Edit ",
            this.props.recipe.recipeName
          ),
          "      ",
          React.createElement(
            "div",
            { className: "container container-fluid" },
            React.createElement(
              "h5",
              null,
              "Ingredients:"
            ),
            React.createElement(
              "p",
              null,
              "seperated by commas"
            ),
            React.createElement("input", { type: "text", value: this.props.recipe.ingredients, onChange: this.props.handleIngredients, placeholder: "ingredients,go,here" }),
            React.createElement(
              "h5",
              null,
              "Instructions"
            ),
            React.createElement("textarea", { type: "text", value: this.props.recipe.description, onChange: this.props.handleDescription })
          ),
          React.createElement(
            "div",
            { className: "modal-buttons" },
            React.createElement(
              "button",
              {
                className: "btn btn-default danger",
                onClick: this.props.onUserClick
              },
              React.createElement("i", { className: "glyphicon glyphicon-ok" }),
              " Submit"
            )
          )
        )
      )
    );
  }
});

var RecipeDetails = React.createClass({
  displayName: "RecipeDetails",

  render: function render() {

    var ingredients = this.props.recipe.ingredients.map(function (ingredient, index) {
      return React.createElement(Ingredient, { key: index, ingredient: ingredient });
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "recipeDetails" },
        this.props.recipe.ingredients ? React.createElement(
          "h4",
          null,
          "Ingredients:"
        ) : null,
        React.createElement(
          "div",
          null,
          ingredients
        ),
        this.props.recipe.description ? React.createElement(
          "h4",
          null,
          "Preparation Instructions:"
        ) : null,
        React.createElement(
          "p",
          { className: "list-group-item-text" },
          this.props.recipe.description
        )
      ),
      React.createElement("div", { className: "recipeFooter" })
    );
  }

});

var RecipeApp = React.createClass({
  displayName: "RecipeApp",

  getInitialState: function getInitialState() {

    return {
      recipes: [{ "recipeName": "Pizza", "ingredients": ["Bread", "Brocolli", "Tomato", "Onion", "Mushroom"], "description": "Add toppings to dough base and place into oven for 35 minutes on a high heat.\n\nBellissimo!" }, { "recipeName": "Spaghetti", "ingredients": ["Spaghetti", "Sauce", "Tomatoes", "Bacon", "Garlic"], "description": "Try not to get it all over your shirt." }, { "recipeName": "Meatballs", "ingredients": ["Minced Beef/Pork", "Onions", "Flour", "Chili Peppers", "Tomatoes", "Seasoning"], "description": "Roughly chop onions and mix with minced meat. Add flour for firmness until they hold their own shape. Place into pan on high heat with a brushing of oil until browned. Reduce heat until cooked through" }, { "recipeName": "Boiled Cabbage", "ingredients": ["Cabage", "Water"], "description": "Add cabbage to boiling water. Wait. Eat. Delicious - Maybe..." }, { "recipeName": "CheeseCake", "ingredients": ["Cream Cheese", "Whipping Cream", "Strawberries", "Ginger Snap Biscuits", "Sugar", "Butter"], "description": "Crumble the biscuits into a tin and mix with the butter. Heat for a few minutes to form a solid base. Mix the cream cheese and whipping cream until heavy, then apply to top of biscuit base.\n\n\nAdd strawberries for decoration and leave to rest in fridge for 12 hours." }],
      "active": 0
    };
  },

  componentWillMount: function componentWillMount() {
    if (localStorage && localStorage.getItem('kristarl_recipes')) {
      this.setState({ recipes: JSON.parse(localStorage.getItem('kristarl_recipes')) });
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    // disable when testing so storage doesn't need to be reset
    localStorage.setItem('kristarl_recipes', JSON.stringify(this.state.recipes));
  },

  createNewRecipe: function createNewRecipe(e) {
    e.preventDefault();
    if (e.currentTarget.value) {
      var newRecipeValue = e.currentTarget.value;
    } else {
      var newRecipeValue = "New Recipe";
    }

    this.setState({ recipes: this.state.recipes.concat({ "recipeName": newRecipeValue, "ingredients": [""], "description": "" }) });
  },

  onDeleteClick: function onDeleteClick(event, index) {
    var targetIndex = parseInt(event.currentTarget.value);
    this.setState(function (state) {
      state.recipes.splice(targetIndex, 1);
      return { recipes: state.recipes };
    });
  },

  handleDescription: function handleDescription(event, index) {
    var recipe = this.state.recipes.slice();
    recipe[this.state.active].description = event.target.value;
    this.setState({ "recipes": recipe });
  },

  handleIngredients: function handleIngredients(event) {
    var recipe = this.state.recipes.slice();
    recipe[this.state.active].ingredients = event.target.value.split(",");
    this.setState({ "recipes": recipe });
    console.log(this.state.recipes[this.state.active].ingredients);
  },
  handleActiveRecipe: function handleActiveRecipe(e) {
    this.setState({ "active": this.state.recipes.indexOf(e) });
  },

  render: function render() {
    var recipes = this.state.recipes.map(function (recipe, index) {
      return React.createElement(RecipeEntry, { handleActiveRecipe: this.handleActiveRecipe, key: index, index: index, recipe: recipe, onDeleteClick: this.onDeleteClick, handleDescription: this.handleDescription, handleIngredients: this.handleIngredients });
    }.bind(this));

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "React js Recipe Book"
      ),
      React.createElement(
        "div",
        { className: "list-group" },
        React.createElement(
          "div",
          null,
          recipes
        )
      ),
      React.createElement(NewRecipe, { recipes: this.state.recipes, onAddRecipe: this.createNewRecipe })
    );
  }
});

var NewRecipe = React.createClass({
  displayName: "NewRecipe",

  getInitialState: function getInitialState() {
    return { value: "" };
  },
  handleChange: function handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render: function render() {
    return React.createElement(
      "form",
      {
        id: "add-recipe",
        onSubmit: this.props.onAddRecipe,
        value: this.state.value
      },
      React.createElement("input", {
        placeholder: "Add New Recipe",
        type: "input",
        value: this.state.value,
        onChange: this.handleChange
      }),
      React.createElement("input", {
        type: "submit",
        value: "+ Add",
        className: "btn btn-default"
      })
    );
  }
});

React.render(React.createElement(RecipeApp, null), app);