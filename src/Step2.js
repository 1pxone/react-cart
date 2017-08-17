import React, { Component } from 'react';
import axios from 'axios';

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      step: {
        component: "step2",
        title: "Выбор доставки",
        stepnum:2
      }
    };
  }

  componentDidMount() {
    var that = this;
    var url = 'http://localhost:3001/cart';

    axios.get(url)
      .then(res => {
        const cart = res.data.map(obj => obj.data);
        this.setState({ cart });
        console.log({cart})
      });
  }

  render() {
    return (
      <div  className="container">
        <h1>{this.state.step.title}</h1>
        <div className="row">
        <p>У вас нет адресов! Добавить?</p>

        </div>


      </div>
    );
  }
}



export default Step2;
