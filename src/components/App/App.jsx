import './App.css';
import React, { Component } from 'react';
import Field from '../Field/Field';
import Engine from '../../horseJumper';

class App extends Component {
  constructor (props) {
    super(props);
    this.engine = new Engine(8, 8, () => this.forceUpdate());
  }

  render() {
    return (
      <div className="app">
        <header>
          <span>Some fancy header</span>
        </header>
        <Field field={this.engine.field.field}/>
      </div>
    );
  }
}

export default App;
