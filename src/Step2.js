import React, { Component } from 'react';
import axios from 'axios';

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      step: {
        component: "step1",
        title: "Выбор доставки",
        stepnum:1
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
        <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>img</th>
                <th>Title</th>
                <th>Price</th>
                <th>count</th>
              </tr>
            </thead>
            <tbody>
            {this.state.cart.map(cartitem =>
              <tr key={cartitem.id}>
                <th><img src={cartitem.image} className="img-fluid rounded" width="50px"/></th>
                <td>{cartitem.title}</td>
                <td>{cartitem.price}</td>
                <td>{cartitem.count}</td>
              </tr>
            )}
            </tbody>
          </table>

        </div>


      </div>
    );
  }
}



export default Step2;
