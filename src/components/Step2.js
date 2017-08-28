import React from 'react';
import axios from 'axios';

// import Form from "react-jsonschema-form";
import Register from '../components/Register';
import Login from '../components/Login';


// function ErrorListTemplate(props) {
//   const {errors} = props;
//   return (
//     <div>
//     <legend>Ошибка(и)</legend>
//       {errors.map((error, i) => {
//         return (
//           <div className="alert alert-danger" role="alert" key={i}>
//             {error.stack}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// function validate(formData, errors) {
//   if (formData.password !== formData.password2) {
//     errors.password2.addError("Пароли не совпадают :(");
//   }
//   return errors;
// }

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registration: true,
      isOrganization: true
    };
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
    switch (this.state.registration) {
      case true:
        return (
          <div  className="row py-5 ">
            <div className="col-12 py-0">
              <h1>{this.props.heading}</h1>
            </div>
            <Register isOrganization={this.state.isOrganization}/>
          </div>
        );

        break;
      case false:
        return (
          <div  className="row py-5 justify-content-center">
            <div className="col-12 py-0">
              <h1>{this.props.heading}</h1>
            </div>
            <Login />
          </div>
        );

        break;
      default:
        break;

    }

  }
}



export default Step2;
