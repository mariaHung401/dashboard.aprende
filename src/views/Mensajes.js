
import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Label,
  FormGroup,
  Input,
  Alert,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import ReactDatetime from "react-datetime";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import Select from "react-select";
import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';

class Mensajes extends React.Component {
  constructor() {
    super();
    this.state = {
      singleSelect: null,
      subiendo: null,
      seccion:"*",
      titulo:null,
      fecha:null,
      Grado:[],
      Seccion:[],
      Primaria:[],
      Secundaria:[],
      modulos:[],
      itemscurriculo:[],
      curriculo:null,
      acepta:"*",
      parabuscar:null,
      subirRecurso:null,
      mensaje:null,
      mensajes:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
  };

  handleClick(e) {
    this.refs.fileInput.click();
  };

  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    });
    this.refs.fileInput.value = null;
  };

  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.verMensaje(this.props.colegio.codigo);
    console.log("Pagina Refrescada")
  };

  setGrado = (value) => {
    this.setState({ singleSelect: value })
    if(value.value>6){
      this.setState({materias:this.props.Secundaria})
    }else{
      this.setState({materias:this.props.Primaria})
    }
  };

  setSeccion = (value) => {
    this.setState({ seccion: value })
    console.log(value)
  };

  componentDidMount = async () => {
    this.props.verCredenciales();
    if(!this.props.colegio.id){
      this.props.history.push("/auth/login");
    }
    await this.verMensaje(this.props.colegio.codigo);
  };

  verMensaje = async (codigo) => {
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/leerMensajes?codigo='+codigo;
    let respuesta = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    }).catch(error => {
        console.log(error);
    });
    let mensajes = await respuesta.json();
    this.setState({ mensajes:mensajes });
  };

  enviarMensaje = async () =>{
    if (this.state.singleSelect == null) {
      let negado = (
        <Alert color="info">
          <span>Se require Grado</span>
        </Alert>
      )
      this.setState({subiendo:negado});
    } else {
      const data = {
      plantel:this.props.colegio.codigo,
      grado: this.state.singleSelect,
      seccion:this.state.seccion.value,
      fecha: this.state.fecha,
      mensaje:this.state.mensaje,
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/registrarMensaje';
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
    this.setState({
      // seccion:null,
      singleSelect:null,
      mensaje:null,
      fecha:null
    });
    await this.verMensaje(this.props.colegio.codigo);
    let result = await respuesta.json(data);
    console.log(result)
    }
  };

  quitarMensaje = async (id) => {
    const datadir = {
      codigo:id,
    };
    console.log(datadir)
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/quitarRecurso';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(datadir),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    })
    .then(async resp  => {
        await this.verMensaje(this.props.colegio.id);
    })
    .catch(error => {
        console.log(error);
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="6" lg="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Registro de Mensajes</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
                    <Row>
                      <Label md="3">Grado o año</Label>
                      <Col md="6">
                        <Select
                          className="react-select primary"
                          classNamePrefix="react-select"
                          name="singleSelect"
                          value={this.state.singleSelect}
                          onChange={(value) =>
                            this.setGrado(value)
                          }
                          options={this.props.Grado}
                          placeholder="Seleccion el Grado o año"
                        />
                      </Col>
                      <Col md="3">
                        <Select
                          className="react-select primary"
                          classNamePrefix="react-select"
                          name="seccion"
                          value={this.state.seccion.value}
                          onChange={(value) =>
                            this.setSeccion(value)
                          }
                          options={this.props.Seccion}
                          placeholder="Seccion"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Contenido del Mensaje</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Asunto del mensaje"
                            type="text"
                            value={this.state.mensaje}
                            onChange={(texto) =>
                              this.setState({ mensaje:texto.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Fecha de envio</Label>
                      <Col md="6">
                        <ReactDatetime
                          inputProps={{
                            className: "form-control",
                            placeholder: "Date Picker Here",
                          }}
                          timeFormat={false}
                          value={this.state.fecha}
                          onChange={(value) =>
                            this.setState({ fecha: value })
                          }
                        />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  {this.state.mensaje ? (
                    <Row>
                      <Col md="3" />
                      <Col md="9">
                        <Button className="btn-round"
                        color="info" type="button"
                        onClick={()=>this.enviarMensaje()}
                      >
                          Registrar mensaje
                        </Button>
                      </Col>
                    </Row>
                    ):(null)}
                  </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center" lg="12" md="12">
              <Row>
                <Col className="text-center" lg="12" md="12">
                  <Card className="card-tasks">
                    <CardHeader>
                      <Row>
                        <Col md="6">
                          <CardTitle tag="h3">
                            <Button
                              className="btn-round btn-icon"
                              className="btn-link"
                              color="info"
                              onClick={this.handleRefresh}
                            >
                              <i className="nc-icon nc-refresh-69" />
                            </Button>
                            Mensajes Activos
                          </CardTitle>
                        </Col>
                        {/* <Col md="6">
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="parabuscar"
                            value={this.state.parabuscar}
                            onChange={(value) => {
                              this.verMensaje(this.props.colegio.id,value,null);
                              this.setState({parabuscar: value });
                            }}
                            options={this.props.Grado}
                            placeholder="Seleccione Grado o Año"
                          />
                        </Col> */}
                      </Row>
                    </CardHeader>
                    <CardBody className="table-full-width table-hover">
                      <Row>
                        <Col md="12">
                          <Table responsive>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Grado</th>
                              <th>Seccion</th>
                              <th>Asunto</th>
                              <th>Fecha</th>
                              <th>Accion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.mensajes.map(mensaje=>(
                              <tr className="table">
                                <td>
                                  <div className="timeline-badge danger">
                                    <i className="nc-icon nc-single-copy-04" />
                                  </div>
                                </td>
                                <td className="text-left">
                                  {mensaje.grado.label}
                                </td><td className="text-left">
                                  {mensaje.seccion}
                                </td>
                                <td className="text-left">
                                  {mensaje.mensaje}
                                </td>
                                <td className="text-left">
                                  {mensaje.fecha} ({mensaje.hora})
                                </td>
                                <td className="td-actions text-right">
                                  <Button
                                    className="btn-round btn-icon"
                                    color="danger"
                                    type="button"
                                    onClick={()=>this.quitarMensaje(mensaje._id)}
                                  >
                                    <i className="nc-icon nc-simple-remove" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.mainReducer;
}

export default connect(mapStateToProps, mainActions )(Mensajes);
