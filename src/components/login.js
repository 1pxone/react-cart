import React from 'react';
import axios from 'axios';





class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 1
    };

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="row text-center">
        <div className="col">
          <button className="btn btn-primary">
            Корзина
          </button>
        </div>
        <div className="col">
          <button className="btn btn-info" disabled="disabled">
            Выбор доставки
          </button>
        </div>
        <div className="col">
          <button className="btn btn-info" disabled="disabled">
            Выбор оплаты
          </button>
        </div>
        <div className="col">
          <button  className="btn btn-info" disabled="disabled">
            Подтверждение
          </button>
        </div>
      </div>
    );
  }
}



export default login;
