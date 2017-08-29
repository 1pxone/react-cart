import React from 'react';
import axios from 'axios';





class FastOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: [],
      payment:[]
    };

  }

  componentDidMount() {
    var url = 'http://localhost:3001/users/1';
    axios.get(url)
      .then(res => {
        var order = [];
            order.push(res.data.orders.slice(-1)[0]);
        const delivery = order.map(obj => obj.summary.delivery);
        const payment = order.map(obj => obj.summary.payment);
        const orderid = res.data.orders.slice(-1)[0].id;
        const ordercreated = res.data.orders.slice(-1)[0].created;
        this.setState({ delivery, payment, orderid, ordercreated });
      });
  }

  render() {
    let orderid = this.state.orderid;
    let ordercreated = this.state.ordercreated
    return (

        <div className="row" >
        <div className="col-12" >
          <div className="card mb-3" >
            <div className="card-header bg-warning h5">Доставить и оплатить с настройками Вашего предыдущего заказа #{orderid} от {ordercreated} ?</div>
              <div className="card-body">
                  <div className="row">
                  {this.state.delivery.map((order,key) =>
                    <div className="col-md-6" key={key}>
                      <h5>Доставка:</h5>
                      <p className="card-text">Тип: {order.description}</p>
                      <p className="card-text">Адрес: {order.address}</p>

                      <div className="row justify-content-around" >
                        <button type="button" className="btn btn-outline-primary">Изменить адрес</button>
                        <button className="btn btn-outline-success">Выбрать этот адрес</button>
                      </div>
                    </div>
                  )}
                  {this.state.payment.map((order,key) =>
                    <div className="col-md-6" key={key}>
                      <h5>Оплата:</h5>
                      <p className="card-text">{order.description}</p>

                      <div className="row justify-content-around " >
                        <button type="button" className="btn btn-outline-primary">Изменить способ оплаты</button>
                        <button className="btn btn-outline-success ">Выбрать этот способ оплаты</button>
                      </div>
                    </div>
                  )}
                  </div>
              </div>

            </div>

          </div>

        </div>

    )}
}



export default FastOrder;
