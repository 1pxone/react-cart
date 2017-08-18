import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Form from "react-jsonschema-form";

// step components
import Step1 from './Step1';
import Step2 from './Step2';

const registerForm = {
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "bio": {
      "type": "string",
      "title": "Bio"
    },
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
};

const log = (type) => console.log.bind(console, type);

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
            id:1,
            isActive: true,
            title: "Дом",
            country: "Россия",
            city:"Москва",
            address:"ул. Пушкина, д. 777, кв. 111",
            postcode: 123322,
            additionalInfo:"домофон сломан, кричите, что есть сил"
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
  };


  previous(){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Ваш заказ",
        stepnum:1
      }
    });
  }

  next(){
    this.setState({
      cart: this.state.cart,
      user: this.state.user,
      step: {
        component: "Step1",
        title: "Выбор доставки",
        stepnum:2
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
          <div>
            <Step1 heading="Ваш заказ"/>
            <button onClick={this.next}>
              Выбор доставки
            </button>
          </div>
        )
        break;

      case 2:
        switch(this.state.user.isAuth) {
          case true:
            return (
              <div>
                <Step2 heading="Выбор доставки"/>
                <button onClick={this.logout}>
                  Выйти
                </button>
                <button onClick={this.previous}>
                  Назад
                </button>

              </div>
            )
            break;

          case false:
          return (
            <div className="container">
            <div className="row">
              <p>вы войдите сначала, молодой человек, ну или зарегистрируйтесь в конце-то концов!</p>
              </div>
              <div className="row">
              <Form className="col-md-6"
              schema={registerForm}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")} />
              </div>
              <div className="row">
              <button onClick={this.login}>
                Войти
              </button>
              <button onClick={this.previous}>
                Назад
              </button>
              </div>
            </div>
          )
            break;

          default:
            console.log('default')
            break;
        }

        break;

      default:
        console.log('default')
        break;
    }
  }
}



export default Cart;
