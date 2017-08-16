import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

// step components
import Step1 from './Step1';
import Step2 from './Step2';

class Cart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:1
      }
    };
  };

  render() {
    switch(this.state.step.stepnum) {
      case 1:
        return (
          <div>
          <Step1 />
          <button className="btn btn-primary" onClick={this.setState({ step: {
            component: "Step2",
            title: "Выбор доставки",
            stepnum:2
          }
       })}>Выбор доставки</button>
          </div>
        )
        break;

      case 2:
      return (
        <div>
        <Step2 />
        <button className="btn btn-primary" onClick={this.setState({ step: {
          component: "Step2",
          title: "Выбор доставки",
          stepnum:2
        }
     })}>Выбор доставки</button>
        </div>
      )
        break;

      default:
        console.log('default')
        break;
    }
    if(this.state.step.stepnum == 1){

    }
  }
}



export default Cart;
