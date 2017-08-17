import React, { Component } from 'react';
import axios from 'axios';

import Form from "react-jsonschema-form";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
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
          <Form schema={schema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")} />
        </div>
      </div>
    );
  }
}



export default Step2;
