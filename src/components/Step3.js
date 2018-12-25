import React, { Component } from "react";
import Steps from "./Steps";
import JSONData from "./../data/dishes.json";

export class Step3 extends Component {

  state = {
    dish: "",
    servings: "",
    touched: {
      dish: false,
      servings: false
    }
  };

  availableDishes = JSONData.dishes.map(dish => {
      if (dish.restaurant.includes(this.props.restaurant)) {
        return dish.name;
      }
    });

  dishes = this.availableDishes.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  });

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleChange, addDish, removeDish } = this.props;
    const { step, dishes, numberOfPeople } = this.props;
    const totalDishCount = dishes.reduce((sum, dish, index) => { 
      return sum += Number(dish.servings)
    } , 0)
    const isEnabled = totalDishCount >= Number(numberOfPeople) ? true : false

    return (
      <div>
        <Steps step={step} />
        <div className="step3-container">
          <div className="titles">
            <h3>Please Select a Dish</h3>
            <h3>Please enter no. of servings</h3>
          </div>
          <br />

          {/* Dynamic Form */}

          {dishes.map((val, index) => {
            let dishId = `dish-${index}`,
              servingsId = `servings-${index}`;
            return (
              <div key={index}>
                {
                  isEnabled ? ('') : (<div style={{color: 'red'}}>Dish count over flow</div>)
                }
                <label htmlFor={dishId}>{`Dish #${index + 1}`}</label>
                <input
                  onChange={handleChange("dish")}
                  value={dishes[index].dish}
                  list="dishes"
                  placeholder="---"
                  type="text"
                  name="dish"
                  data-id={index}
                  id={dishId}
                  className="dish"
                />
               
                <datalist id="dishes">
                  {this.dishes.map((dish, index) => (
                    <option key={index} value={dish} />
                  ))}
                </datalist>
                <label htmlFor={servingsId}>Servings</label>
                <input
                  onChange={handleChange("servings")}
                  value={dishes[index].servings}
                  type="number"
                  name="servings"
                  min="1"
                  max="10"
                  step="1"
                  data-id={index}
                  id={servingsId}
                  className="servings"
                />
                <button className="remove-button" onClick={() => removeDish(index)} type="button">X</button>
              </div>
            );
          })}
        </div>
        <br />
        <div className="add-button">
          <button onClick={addDish} type="button">
            Add
          </button>
        </div>
        <br />
        <div className="buttons">
          <button onClick={this.back} type="button">
            Previous
          </button>
          <button disabled={!isEnabled} onClick={this.continue} type="button">
            Next
          </button>
        </div>
        <div className="image">
          <img
            src="zenport_logo.png"
            alt="zenport_logo"
            width="370"
            height="100"
          />
        </div>
      </div>
    );
  }
}

export default Step3;
