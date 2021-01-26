import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import Person from "./Person/Person";

const StyledButton = styled.button`
      background-color: ${(props) => (props.alt ? "red" : "green")};
      font: inherit;
      border: 1px solid blue;
      padding: 8px;
      cursor: pointer;
      color: white;
      &:hover {
        background-color: ${(props) => (props.alt ? "salmon" : "lightgreen")};
        color: black;
      },

`;
class App extends Component {
  state = {
    persons: [
      { id: "frfv", name: "Max", age: 23 },
      { id: "frfga", name: "Kirti", age: 29 },
      { id: "nubwy", name: "Risha", age: 31 },
    ],

    otherState: "some other value",
    showPersons: false,
  };

  /*   switchNameHandler = (newName) => {
    //console.log("handler");

    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: "Kirti", age: 29 },
        { name: "burak", age: 31 },
      ],
    });
  }; */

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };
    person.name = event.target.value;
    //const person=Object.assign({},this.state.persons[personIndex]);
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
    /* this.setState({
      persons: [
        {id:"frfv", name: "Max", age: 23 },
        { id="ffrer",name: event.target.value, age: 29 },
        { id="njbv",name: "burak", age: 31 },
      ],
    }); */
  };

  deletePersonHandler = (personIndex) => {
    //  const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  render() {
    const style = {};

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person) => {
            return (
              <Person
                click={this.deletePersonHandler}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => {
                  this.nameChangedHandler(event, person.id);
                }}
              />
            );
          })}
        </div>
      );
      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black",
      };
    }
    //let classes = ["red", "bold"].join(" ");
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push("red");
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }
    return (
      <div className="App">
        <h1>Hi I am a react App</h1>
        <p className={classes.join(" ")}>This is really working</p>
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Switch Name
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
