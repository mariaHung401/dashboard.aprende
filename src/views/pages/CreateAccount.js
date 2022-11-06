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

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      codigo:"",
      clave:""
    };
  }

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  autenticar = async () => {
    const data = {
      email:this.state.email,
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
    }
  }

  render() {
    return (
      <div className="register-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-register">
                  <CardHeader>
                    <CardHeader>
                      <h5 className="header text-center">Micolegio Aprende</h5>
                      <h3 className="header text-center">Crea una cuenta</h3>
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
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email"
                        type="text"
                        value={this.state.email}
                        onChange={(e)=>
                          this.setState({email:e.target.value})}
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
                      href="#"
                      onClick={() => this.autenticar()}
                    >
                      Crear cuenta
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
            backgroundImage: `url(${require("assets/img/createMicol.png")})`,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.mainReducer;
}

export default connect(mapStateToProps, mainActions )(CreateAccount);
