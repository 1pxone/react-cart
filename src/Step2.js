import React, { Component } from 'react';
import axios from 'axios';

import Form from "react-jsonschema-form";

const newAdress = {
  title: "Добавить новый адрес",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Название", default: "Домашний адрес"},
    country: {type: "string",title: "Страна", enum: ["Россия", "Казахстан", "Беларусь"],enumNames: ["Россия", "Казахстан", "Беларусь"],default: "Россия"},
    city: {type: "string", title: "Город"},
    address: {type: "string", title: "Адрес"},
    postcode: {type: "string", title: "Индекс"},
    additionalInfo: {type: "string", title: "Дополнительная информация"}
  }
};

const log = (type) => console.log.bind(console, type);

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
    // var that = this;
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
        <div className="row">
          <h1>{this.props.heading}</h1>
        </div>
        <div className="row">
          <p>У вас нет адресов! Добавить?</p>
        </div>
        <div className="row">
          <Form className="col-md-6"
          schema={newAdress}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
        </div>
      </div>
    );
  }
}



export default Step2;
