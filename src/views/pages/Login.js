
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";
import * as mainActions from "../../actions/mainActions";
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo:"",
      clave:""
    };
  }
  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  autenticar = async () => {
    const data = {
      codigo:this.state.codigo,
      clave:this.state.clave,
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/accesoColegio';
    let respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
    let result = await respuesta.json();
    if(result.respuesta=="200"){
      this.props.setColegio(result.datos[0],this.state.codigo);
      this.props.history.push("/admin/dashboard");
    };
  };

  render() {
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h5 className="header text-center">Micolegio Aprende</h5>
                      <h3 className="header text-center">Registrate</h3>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Usuario"
                        type="text"
                        value={this.state.codigo}
                        onChange={(e)=>
                          this.setState({codigo:e.target.value})}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Clave"
                        type="password"
                        autoComplete="on"
                        value={this.state.clave}
                        onChange={(e)=>
                          this.setState({clave:e.target.value})}
                      />
                    </InputGroup>
                    <br />
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3"
                      color="warning"
                      href="#pablo"
                      onClick={() => this.autenticar()}
                    >
                      Ingresa
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage:`url(${require("assets/img/loginmicol.png")})`,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.mainReducer;
}

export default connect(mapStateToProps, mainActions )(Login);
