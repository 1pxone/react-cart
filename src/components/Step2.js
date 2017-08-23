import React from 'react';
import axios from 'axios';

import Form from "react-jsonschema-form";

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
      "title": "Ваш E-mail"
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
    "ui:widget": "password",
    "ui:help": "Минимум 6 символов"
  }
}

const log = (type) => console.log.bind(console, type);
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

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   cart : [],
    //   step: {
    //     component: "step2",
    //     title: "Выбор доставки",
    //     stepnum:2
    //   }
    // };
  }

  componentDidMount() {
    // var that = this;
    // var url = 'http://localhost:3001/cart';
    //
    // axios.get(url)
    //   .then(res => {
    //     const cart = res.data.map(obj => obj.data);
    //     this.setState({ cart });
    //     console.log({cart})
    //   });
  }

  render() {
    return (
      <div  className="row">
        <div className="col-12 py-0">
          <h1>{this.props.heading}</h1>
        </div>
        <div className="col">
          <Form
          schema={loginForm}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
          ErrorList={ErrorListTemplate} >
          <div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </Form>
        </div>
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



export default Step2;
