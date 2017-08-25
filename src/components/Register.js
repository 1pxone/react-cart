import React from 'react';
import axios from 'axios';

import Form from "react-jsonschema-form";
const log = (type) => console.log.bind(console, type);
const registerForm = {
  "title": "Зарегистрироваться",
  "description": "Заполните форму для регистрации",
  "type": "object",
  "required": [
    "firstName",
    "email",
    "password",
    "password2",
    "telephone"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "Ваше имя"
    },
    "lastName": {
      "type": "string",
      "title": "Ваша фамилия"
    },
    "email": {
      "type": "string",
      "title": "Ваш E-mail"
    },
    "password": {
      "type": "string",
      "title": "Пароль",
      "minLength": 6
    },
    "password": {
      "type": "string",
      "title": "Пароль",
      "minLength": 6
    },
    "password2": {
      "type": "string",
      "title": "Повторите пароль",
      "minLength": 6
    },
    "telephone": {
      "type": "string",
      "title": "Телефон",
      "minLength": 10
    }
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
      <div className="row text-center">
        <div className="col">
          <Form
          schema={registerForm}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
          validate={validate}
          ErrorList={ErrorListTemplate}  >
          <div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </Form>
      </div>
      </div>
    );
  }
}



export default Register;
