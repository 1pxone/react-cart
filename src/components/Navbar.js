import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Login from './Login'






class Navbar extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {

  }

  render() {
    const { name, surname, age } = this.props.user;

    switch (this.props.isAuth) {
      case true:
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <a className="navbar-brand" href="#">BRAND</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <h6 className="dropdown-header">{name} {surname} {age}</h6>
                    <a className="dropdown-item" href="#"><i className="fa fa-user-o" aria-hidden="true"></i> Личный кабинет</a>
                    <a className="dropdown-item" href="#"><i className="fa fa-id-card-o" aria-hidden="true"></i> Настройки</a>
                    <a className="dropdown-item" href="#"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Мои заказы <span className="badge badge-warning">1</span></a>
                    <a className="dropdown-item" href="#"><i className="fa fa-map-marker" aria-hidden="true"></i> Мои адреса</a>
                    <a className="dropdown-item" href="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Выйти</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        )
        break;
      case false:
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <a className="navbar-brand" href="#">BRAND</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    
                    <Login col="col-12"/>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        )
        break;
      default:
        break;
    }
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}



export default connect(mapStateToProps)(Navbar);
