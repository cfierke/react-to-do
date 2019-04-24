import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: false },
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newToDoDescription: ''
    };
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  deleteTodo(index) {
    this.setState(prevState => { const todos = prevState.todos.filter((todo, i) => i !== index);
    return { todos };
    });
  }

  handleChange(e) {
    this.setState({ newToDoDescription: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newToDoDescription) { return }
    const newToDo = { description: this.state.newToDoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newToDo], newToDoDescription: '' })
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos })
  }

  render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map( (todo, index) =>
            <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } deleteTodo={ () => this.deleteTodo(index) }/>
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <input type='text' value={ this.state.newToDoDescription } onChange={ (e) => this.handleChange(e) }/>
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
