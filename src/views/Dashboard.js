import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import ReactTable from "components/ReactTable/ReactTable.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleSelect: null,
      alumnos: [],
      grados:[],
      envios:[],
      modal:null,
      obs:null,
      sinenvio:null,
      activos:[],
      revisados:[],
      totalrevisados:0,
      parabuscar:null,
      asignatura_tareas_activas:{
        value:null,
        label:null
      },
      materias_tareas_activas:null,
      data: [],
    };
  };

  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.verEnvios();
    console.log("Pagina Refrescada")
  };

  setGrado = (value) => {
    this.setState({ singleSelect: value })
    if(value.value>6){
      this.setState({materias:this.props.Secundaria})
    }else{
      this.setState({materias:this.props.Primaria})
    }
    console.log(value)
  };

  setGrado_tareas_activas = (value) => {
    let grado = this.props.gradofijo;
    if(grado!="" || grado!==undefined){
      grado=grado.substr(7,1).toUpperCase();
    };
    console.log(grado)
    if(grado!=undefined){
      this.setState({ asignatura_tareas_activas: value })
      if(grado>6){
        this.setState({materias_tareas_activas:this.props.Secundaria})
        console.log("Secundaria")
      }else{
        this.setState({materias_tareas_activas:this.props.Primaria})
        console.log("Primaria")
      }
    };
    console.log(value)
  };

  async componentDidMount() {
    this.props.verColegio()
    if(!this.props.colegio.id){
      this.props.history.push("/auth/login");
    }
    await this.props.verAlumnos(this.props.colegio.id, this.props.gradofijo, this.props.materiafija);
    await this.verEnvios();
    this.setState({sinenvio:this.props.alumnos.length-this.state.activos.length})
  };

  removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  verEnvios = async () => {
    let grado = this.props.gradofijo;
    let materia = this.props.materiafija;
    if(grado!="" || grado!==undefined){
      grado=grado.substr(3,6).toUpperCase();
      materia=materia.substr(10);
    };
    console.log(grado);
    console.log(materia);
    const data = {
      id:this.props.colegio.id,
      grado: grado,
      materia: materia
    };
    console.log(data)
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/verRespuestas';
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
    console.log(result)
    let alumnos=[];
    result[0].forEach(envio => {
      if(alumnos.filter(alumno=>alumno==envio.alumno).length==0){
        alumnos.push(envio.alumno)
      }
    });
    let totalrevisados = "0";
    if(result[2][0]!==undefined){
      totalrevisados = result[2][0].total;
    }else{
      totalrevisados = "0";
    }
    this.setState({envios:result[0], revisados:result[1],
      activos: alumnos, totalrevisados:totalrevisados
    });
  };

  enviarVista = async (objectid, valor) =>{
    const data = {
      id:objectid,
      valor: valor
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/guardarVista';
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
    console.log(result);
  };

  enviarObs = async (objectid, obs) =>{
    const data = {
      id:objectid,
      observacion: obs
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/guardarObs';
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
    this.setState({modal:null, obs:null});
  };

  ponerModal = (tarea) => {
    this.setState({
      modal: (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.setState({modal:null})}
          onCancel={() => this.setState({modal:null})}
          confirmBtnBsStyle="info"
          btnSize=""
          title={
            <p>
              Feedback al Alumno
            </p>
          }
          >
            <Row>
              <Col md={4}>
              <Button className="btn-round"
                color="warning"
                outline
                onClick={()=>this.enviarVista(tarea,"1")}
              >
                <i className="fa fa-check" />
              </Button>
            </Col>
            <Col md={4}>
              <Button className="btn-round"
                color="info"
                outline
                onClick={()=>this.enviarVista(tarea,"2")}
              >
                <i className="fa fa-plus" />
              </Button>
            </Col>
            <Col md={4}>
              <Button className="btn-round"
                color="success"
                outline
                onClick={()=>this.enviarVista(tarea,"3")}
              >
                <i className="fa fa-heart" />
              </Button>
            </Col>
          </Row>
        </ReactBSAlert>
      ),
    });
  };

  ponerModalconCaja = (tarea) => {
    this.setState({
      modal: (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.enviarObs(tarea, this.state.obs)}
          onCancel={() => this.setState({modal:null})}
          confirmBtnBsStyle="info"
          btnSize=""
          title={
              <b>Observacion al Alumno</b>
          }
          >
            <FormGroup>
              <Input placeholder=""
                type="text"
                value={this.state.obs}
                onChange={(texto) =>
                    this.setState({ obs:texto.target.value })
                  }
                />
            </FormGroup>
        </ReactBSAlert>
      )
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-send" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Tareas por Revisar</p>
                        <CardTitle tag="p">{this.state.envios.filter(envios=>envios.estatus=="1").length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh" />
                    {this.props.gradofijo.length ? this.props.gradofijo.substr(10): this.props.gradofijo.substr(3,6)}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-spaceship text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                      <p className="card-category">Tareas Revisadas</p>
                        <CardTitle tag="p">{this.state.totalrevisados}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar-o" />
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-ruler-pencil text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Alumnos Activos</p>
                        <CardTitle tag="p">{this.state.activos.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-clock-o" />
                    {/* Inscritos: {this.props.alumnos.length} */}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Alumnos Inactivos</p>
                        <CardTitle tag="p">{this.state.sinenvio}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats text-danger">
                    <i className="fa fa-refresh" />
                    {((this.state.sinenvio/this.props.alumnos.length)*100).toFixed(0)} % de Inactividad
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            {this.state.modal}
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="6">
                      <CardTitle tag="h4">
                        <Button
                          className="btn-round btn-icon"
                          className="btn-link"
                          color="info"
                          onClick={this.handleRefresh}
                        >
                          <i className="nc-icon nc-refresh-69" />
                        </Button>
                        Tareas por revisar
                      </CardTitle>
                      <p className="card-category">
                        Resumen
                      </p>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="table-full-width table-hover">
                  <Row>
                    <Col md="12">
                      <Table responsive>
                      <thead>
                        <tr>
                          <th>Grado</th>
                          <th>Area</th>
                          <th>Alumno</th>
                          <th>Fecha</th>
                          <th>Comentario del Alumno</th>
                          <th>Tarea</th>
                          <th>Visto</th>
                          <th>Observacion al Alumno</th>
                        </tr>
                      </thead>
                        <tbody>
                          {this.state.envios.filter(tarea=>tarea.estatus=="1").map(tarea=>(
                            <>
                              <tr className="table-warning">
                                <td>{tarea.grado}</td>
                                <td>{this.removeAccents(tarea.materia)}</td>
                                <td>{this.removeAccents(tarea.alumno)}</td>
                                <td>{tarea.fecha}</td>
                                <td>{tarea.mensaje ? (<b class="text-danger">{tarea.mensaje}</b>) : (<b class="text-info"> Sin Comentario </b>)}</td>
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="primary"
                                        outline
                                        href={tarea.direccion}
                                            target="_blank"
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                                {tarea.estatus=="1" ? (
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="danger"
                                        outline
                                        onClick={()=>this.ponerModal(tarea._id)}
                                      >
                                        <i className="fa fa-eye" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                                ) : (
                                <td className="td-actions text-left">
                                  {tarea.direccion ? (
                                    <div className="timeline-footer">
                                    <Button className="btn-round"
                                      color="success"
                                      outline
                                      onClick={()=>this.ponerModal(tarea._id)}
                                    >
                                      {tarea.vista=="1" ? (
                                        <i className="fa fa-check" />
                                      ):(
                                        tarea.vista=="2" ? (
                                          <i className="fa fa-plus" />
                                        ) : (
                                          <i className="fa fa-heart" />
                                        )
                                      )}
                                    </Button>
                                    </div>
                                  ) : (null)}
                                </td>
                                )}
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="warning"
                                        outline
                                        onClick={()=>this.ponerModalconCaja(tarea._id)}
                                      >
                                        <i className="fa fa-send" />
                                      </Button>
                                      {"  "}{tarea.observacion}
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <Button
                      className="btn-round btn-icon"
                      className="btn-link"
                      color="info"
                      onClick={this.handleRefresh}
                    >
                      <i className="nc-icon nc-refresh-69" />
                    </Button>
                    Tareas Vistas
                  </CardTitle>
                  <p className="card-category">
                    Utimas 50
                  </p>
                </CardHeader>
                <CardBody className="table-full-width table-hover">
                  <Row>
                    <Col md="12">
                      <Table responsive>
                      <thead>
                        <tr>
                          <th>Grado</th>
                          <th>Area</th>
                          <th>Alumno</th>
                          <th>Tarea</th>
                          <th>Visto</th>
                          <th>Observacion al Alumno</th>
                        </tr>
                      </thead>
                        <tbody>
                          {this.state.revisados.filter(tarea=>tarea.estatus=="2").map(tarea=>(
                            <>
                              <tr className="table-success">
                                <td>{tarea.grado}</td>
                                <td>{tarea.materia}</td>
                                <td>{tarea.alumno}</td>
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="primary"
                                        outline
                                        href={tarea.direccion}
                                            target="_blank"
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                                {tarea.estatus=="1" ? (
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="danger"
                                        outline
                                        onClick={()=>this.ponerModal(tarea._id)}
                                      >
                                        <i className="fa fa-eye" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                                ) : (
                                <td className="td-actions text-left">
                                  {tarea.direccion ? (
                                    <div className="timeline-footer">
                                    <Button className="btn-round"
                                      color="success"
                                      outline
                                      onClick={()=>this.ponerModal(tarea._id)}
                                    >
                                      {tarea.vista=="1" ? (
                                        <i className="fa fa-check" />

                                      ):(
                                        tarea.vista=="2" ? (
                                          <i className="fa fa-plus" />
                                        ) : (
                                          <i className="fa fa-heart" />
                                        )
                                      )}
                                    </Button>
                                    </div>
                                  ) : (null)}
                                </td>
                                )}
                                <td className="td-actions text-left">
                                    {tarea.direccion ? (
                                      <div className="timeline-footer">
                                      <Button className="btn-round"
                                        color="warning"
                                        outline
                                        onClick={()=>this.ponerModalconCaja(tarea._id)}
                                      >
                                        <i className="fa fa-send" />
                                      </Button>
                                      {"  "}{tarea.observacion}
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
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

export default connect(mapStateToProps, mainActions )(Dashboard);
