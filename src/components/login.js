import React from 'react';
import axios from 'axios';

import Form from "react-jsonschema-form";
const log = (type) => console.log.bind(console, type);
const loginForm = {
  "title": "Войти",
  "description": "Уже зарегистрированы? Войдите:",
  "type": "object",
  "required": [
    "email",
    "password"
  ],
  "properties": {
    "email": {
      "type": "string",
      "title": "Ваш E-mail или телефон"
    },
    "password": {
      "type": "string",
      "title": "Пароль",
      "minLength": 6
    }
  }
};
const uiSchema = {
  "email": {
    "ui:autofocus": true,
    "ui:emptyValue": ""
  },
  "password": {
    "ui:widget": "password"
  }
};
function ErrorListTemplate(props) {
  const {errors} = props;
  return (
    <div>
    <legend>Ошибка(и)</legend>
      {errors.map((error, i) => {
        return (
          <div className="alert alert-danger" role="alert" key={i}>
            {error.stack}
          </div>
        );
      })}
    </div>
  );
}
function validate(formData, errors) {
  if (formData.password !== formData.password2) {
    errors.password2.addError("Пароли не совпадают :(");
  }
  return errors;
}


class Register extends React.Component {
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

      <div className="col-4">
        <Form
          schema={loginForm}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
          ErrorList={ErrorListTemplate} >
            <div>
              <button type="submit" className="btn btn-primary">Войти</button>
            </div>
        </Form>
      </div>

    );
  }
}



export default Register;
