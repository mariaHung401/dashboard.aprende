
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';
// core components
import ReactTable from "components/ReactTable/ReactTable.js";
import ReactBSAlert from "react-bootstrap-sweetalert";


class ReactTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: null,
      codcolegio:null
    };
  }

  async componentDidMount() {
    await this.ir();
    this.props.verColegio();
    if(!this.props.colegio.id){
      this.props.history.push("/auth/login");
    }
    this.setState({codcolegio:this.props.colegio.codigo});
    console.log(this.state.codcolegio)
    console.log(this.props.colegio.codigo)
  }

  ponerModalconCaja = (codigoweb, alumno) => {
    const texto = "Esta seguro de hacer el bloqueo?"
    this.setState({
      modal: (
        <ReactBSAlert
          warning
          showCancel
          confirmBtnText="Si, Bloquea!"
          confirmBtnBsStyle="danger"
          title={alumno}
          onConfirm={() => this.bloquearAlumno(codigoweb)}
          onCancel={() => this.setState({modal:null})}
          focusCancelBtn
        >
          {texto}
        </ReactBSAlert>
      )
    });
  }

  activarAlumno = async (objectId) => {
    let url = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/activarAlumno"
    const data = {
      codigocolegio:this.state.codcolegio,
      codigo:objectId
    };
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
    alert("Alumno Reactivado con exito");
    await this.ir();
  }

  bloquearAlumno = async (codigoweb) => {
    let url = "https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/bloquearAlumno"
    const data = {
      codigo:codigoweb
    };
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
    await this.ir();
  };

  ir = async ()=>{
    let table = this.props.alumnos.map((prop, key) => {
      return {
        id: prop._id,
        nombre: prop.nombre,
        apellido: prop.apellido,
        grado: prop.grado,
        codigo: prop.codigo,
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <Button
              onClick={() => {
                let obj = this.state.data.find((o) => o.id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ", \nposition: " +
                    obj.position +
                    ", \noffice: " +
                    obj.office +
                    ", \nage: " +
                    obj.age +
                    "\n}."
                );
              }}
              color="info"
              size="sm"
              className="btn-icon btn-link like"
            >
              <i className="fa fa-heart" />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>{" "}
            {/* use this button to remove the data row */}
            {prop.codigo=="------" ?
              ( <Button
                onClick={() => {
                  this.activarAlumno(prop._id);
                }}
                color="success"
                size="sm"
                className="btn-icon btn-link like"
              >
                <i className="fa fa-heart" />
              </Button>) : (
                <Button
                onClick={() => {
                  this.ponerModalconCaja(prop.codigo, prop.nombre);
                }}
                color="danger"
                size="sm"
                className="btn-icon btn-link remove"
              >
                <i className="fa fa-times" />
              </Button>
              )}
          </div>
        ),
      };
    });
    this.setState({data:table});
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {this.state.modal}
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Alumnos</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    columns={[
                      {
                        Header: "Nombre",
                        accessor: "nombre",
                      },
                      {
                        Header: "Apellido",
                        accessor: "apellido",
                      },
                      {
                        Header: "Grado",
                        accessor: "grado",
                      },
                      {
                        Header: "Codigo",
                        accessor: "codigo",
                      },
                      {
                        Header: "Acciones",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                    className="-striped -highlight primary-pagination"
                  />
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

export default connect(mapStateToProps, mainActions )(ReactTables);
