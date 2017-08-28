import React from 'react';
import axios from 'axios';





class FastOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userorders: []
    };

  }

  componentDidMount() {
    var url = 'http://localhost:3001/users/1';
    axios.get(url)
      .then(res => {
        const userorders = res.data.orders.map(obj => obj.summary);
        this.setState({ userorders });
      });
  }

  render() {
    return (
      <div  className="container py-5">
          {this.state.userorders.map((order,key) =>
            <div className="card mb-3" key={key}>
              <div className="card-body">
                <h4 className="card-title">Ваш прошлый заказ</h4>
                <div className="col-6">
                  <h5>Доставка:</h5>
                  <p className="card-text">{order.delivery.description}</p>
                  <p className="card-text">{order.delivery.address}</p>
                </div>
                <div className="col-6">
                  <h5>Оплата:</h5>
                  <p className="card-text">{order.payment.description}</p>
                </div>
                <a href="#" className="btn btn-primary">Продолжить с этими настройками?</a>

              </div>
            </div>
          )}
      </div>
    )}
}



export default FastOrder;
