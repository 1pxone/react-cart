import React from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import Form from "react-jsonschema-form";

// step components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


class Cart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      user:{
        isAuth: false,
        uid: 123,
        name:"Иван Кулек",
        addresses:[
          {
            "id": 1,
            "isActive": true,
            "title": "Дом",
            "country": "Россия",
            "city": "Москва",
            "address": "ул. Пушкина, д. 777, кв. 111",
            "postcode": 123322,
            "additionalInfo": "домофон сломан, кричите, что есть сил"
          },
          {
            "id": 2,
            "isActive": false,
            "title": "Работа",
            "country": "Россия",
            "city": "Москва",
            "address": "ул. Пушкина, д. 777, кв. 111",
            "postcode": 123322,
            "additionalInfo": "домофон сломан, кричите, что есть сил"
          }
        ]
      },
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:1
      }
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toPayment = this.toPayment.bind(this);
  };


  previous(count){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:this.state.step.stepnum - 1
      }
    });
  }

  next(count){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Выбор доставки",
        stepnum: this.state.step.stepnum + 1
      }
    });
  }
  toPayment(){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step4",
        title: "Выбор оплаты",
        stepnum:3
      }
    });
  }


  login(){
    this.setState({
      cart: this.state.cart,
      user: {
        isAuth: true,
        uid: this.state.user.uid,
        name:this.state.user.name,
        addresses:this.state.user.addresses
      },
      step: this.state.step,
    });
  }
  logout(){
    this.setState({
      cart: this.state.cart,
      user: {
        isAuth: false,
        uid: this.state.user.uid,
        name:this.state.user.name,
        addresses:this.state.user.addresses
      },
      step: this.state.step,
    });
  }


  render() {
    switch(this.state.step.stepnum) {
      case 1:
        return (
          <div className="container">
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
            <Step1 heading="Ваш заказ"/>
            <button onClick={this.next} className="btn btn-primary">
              Выбор доставки
            </button>
          </div>
        )
        // break;
      case 2:
        switch(this.state.user.isAuth) {
          case true:
            return (
              <div className="container">
                <div className="row text-center">
                  <div className="col">
                    <button onClick={this.previous} className="btn btn-success">
                      Корзина
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary">
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
                <Step3 heading="Выбор доставки"/>
                <button onClick={this.logout} className="btn btn-primary">
                  Выйти
                </button>
                <button onClick={this.previous} className="btn btn-primary">
                  Назад
                </button>
                <button onClick={this.next} className="btn btn-primary">
                  Выбор оплаты
                </button>
              </div>
            )
            // break;
          case false:
            return (
              <div className="container">
                <div className="row text-center">
                  <div className="col">
                    <button onClick={this.previous} className="btn btn-success">
                      Корзина
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-primary">
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
                <Step2 heading="Войти / Зарегистрироваться"/>
                <div className="row">
                <button onClick={this.login} className="btn btn-primary">
                  Войти
                </button>
                <button onClick={this.previous} className="btn btn-primary">
                  Назад
                </button>
                </div>
              </div>
            )

            // break;
          default:
            break;
        }

        break;
      case 3:
        return (
          <div className="container">
            <div className="row text-center">
              <div className="col">
                <button onClick={this.previous} className="btn btn-success">
                  Корзина
                </button>
              </div>
              <div className="col">
                <button onClick={this.previous} className="btn btn-success">
                  Выбор доставки
                </button>
              </div>
              <div className="col">
                <button className="btn btn-primary">
                  Выбор оплаты
                </button>
              </div>
              <div className="col">
                <button  className="btn btn-info" disabled="disabled">
                  Подтверждение
                </button>
              </div>
            </div>
            <Step4 heading="Выбор оплаты"/>
            <button onClick={this.previous} className="btn btn-primary">
              Назад
            </button>
          </div>
        )
        // break;
      default:
        break;
    }
  }
}



export default Cart;
