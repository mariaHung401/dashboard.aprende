
import React  from "react";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample4,
  chartExample9,
  chartExample10,
  chartExample11,
  chartExample12,
} from "variables/charts.js";

import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';

const ejes = {
  yAxes: [
    {
      ticks: {
        fontColor: "#9f9f9f",
        beginAtZero: false,
        maxTicksLimit: 5,
        //padding: 20
      },
      gridLines: {
        drawBorder: false,
        zeroLineColor: "transparent",
        color: "rgba(255,255,255,0.05)",
      },
    },
  ],

  xAxes: [
    {
      gridLines: {
        drawBorder: false,
        color: "rgba(255,255,255,0.1)",
        zeroLineColor: "transparent",
        display: false,
      },
      ticks: {
        padding: 20,
        fontColor: "#9f9f9f",
      },
    },
  ],
};
const datos1 =  {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    
  ],
  datasets: [
    {
      label: "Dia",
      borderColor: "#6bd098",
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      borderWidth: 3,
      barPercentage: 1.6,
      data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610],
    },
  ],
};

const data1 = {
  data:datos1,
  options: {
    legend: {
      display: false,
    },

    tooltips: {
      enabled: false,
    },

    scales: ejes,
  },
}

const options2 = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        gridLines: {
          drawBorder: false,
          zeroLineColor: "transparent",
          color: "rgba(255,255,255,0.05)",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent",
          display: false,
        },
        ticks: {
          padding: 5,
          fontColor: "#9f9f9f",
        },
      },
    ],
  },
};


const optionspie = {
  legend: {
    display: true,
  },
  tooltips: {
    enabled: true,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          drawBorder: false,
          zeroLineColor: "transparent",
          color: "rgba(255,255,255,0.05)",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          drawBorder: false,
          color: "rgba(255,255,255,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
}
const datapie = {
  data: {
    labels: ["Asignaciones", "Respuestas"],
    datasets: [
      {
        label: "Asignaciones", 
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ["#e3e3e3", "#fcc468"],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480],
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            drawBorder: false,
            zeroLineColor: "transparent",
            color: "rgba(255,255,255,0.05)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  },
};

const data3options = {
  tooltips: {
    tooltipFillColor: "rgba(0,0,0,0.5)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily:
      "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
  },
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#9f9f9f",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20,
        },
        gridLines: {
          zeroLineColor: "transparent",
          display: true,
          drawBorder: false,
          color: "#9f9f9f",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          zeroLineColor: "white",
          display: false,
          drawBorder: false,
          color: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9f9f9f",
          fontStyle: "bold",
        },
      },
    ],
  },
};


const data3 = {
  data: {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      
    ],
    datasets: [
      {
        label: "Data",
        borderColor: "#fcc468",
        fill: true,
        backgroundColor: "#fcc468",
        hoverBorderColor: "#fcc468",
        borderWidth: 5,
        barPercentage: 0.4,
        data: [
          100,
          120,
          80,
          100,
          90,
          130,
          110,
          100,
          80,
          110,
          
        ],
      },
    ],
  },
  options: {
    tooltips: {
      tooltipFillColor: "rgba(0,0,0,0.5)",
      tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      tooltipFontSize: 14,
      tooltipFontStyle: "normal",
      tooltipFontColor: "#fff",
      tooltipTitleFontFamily:
        "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      tooltipTitleFontSize: 14,
      tooltipTitleFontStyle: "bold",
      tooltipTitleFontColor: "#fff",
      tooltipYPadding: 6,
      tooltipXPadding: 6,
      tooltipCaretSize: 8,
      tooltipCornerRadius: 6,
      tooltipXOffset: 10,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#9f9f9f",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 20,
          },
          gridLines: {
            zeroLineColor: "transparent",
            display: true,
            drawBorder: false,
            color: "#9f9f9f",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            zeroLineColor: "white",
            display: false,
            drawBorder: false,
            color: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9f9f9f",
            fontStyle: "bold",
          },
        },
      ],
    },
  },
};



class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadisticas: [],
      data1:data1,
      data2:data1,
      data3:data3,
      data4:{labels:[]},
      datapie:datapie,
    };
    
  }

  verEstadisticas = async (id) => {
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/estadisticasRecursos?id='+id;
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
    let estadisticas = await respuesta.json();
    const dias = estadisticas[0].map(dia=>dia.dia);
    const valores = estadisticas[0].map(dia=>parseInt(dia.total));
    const datos1 =  {
      labels: dias,
      datasets: [
        {
          label: "Dia",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          barPercentage: 1.6,
          data: valores,
        },
      ],
    };
    if(estadisticas[1].lenght>0){
      const dias2 = estadisticas[1].map(dia=>dia.dia);
      const valores2 = estadisticas[1].map(dia=>parseInt(dia.total));
      const datos2 =  {
        labels: dias2,
        datasets: [
          {
            label: "Dia",
            borderColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            barPercentage: 1.6,
            data: valores2,
          },
        ],
      };
    

      const data1 = {
        data:datos1,
        options: {
          legend: {
            display: false,
          },
      
          tooltips: {
            enabled: false,
          },
      
          scales: ejes,
        },
      }
      const data2 = {
        data:datos2,
        options: options2,
      }
      const asignaciones = valores.reduce((a,b)=>a+b);
      const respuestas = valores2.reduce((a,b)=>a+b);

      
      const datapie = {
        data: {
          labels: ["Asignaciones", "Respuestas"],
          datasets: [
            {
              label: "Asignaciones", 
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#e3e3e3", "#fcc468"],
              borderWidth: 0,
              barPercentage: 1.6,
              data: [asignaciones, respuestas],
            },
          ],
        },
        options: optionspie,
      };

      const subidas = estadisticas[2].map(dia=>parseInt(dia.total));

      
      const data3 = {
        data: {
          labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            
          ],
          datasets: [
            {
              label: "Datos",
              borderColor: "#fcc468",
              fill: true,
              backgroundColor: "#fcc468",
              hoverBorderColor: "#fcc468",
              borderWidth: 5,
              barPercentage: 0.4,
              data: subidas,
            },
          ],
        },
        options: data3options,
      };
      this.setState({ data1:data1, data2:data2, datapie:datapie, data3:data3});
    }else{
      this.setState({ data1:data1});
    }
    if(estadisticas[3].length>0){
      const descargaDias = estadisticas[3].map(descarga=>descarga.fecha);
      const descargaValores = estadisticas[3].map(descarga=>parseInt(descarga.kb));
      const descargaDatos =  {
        labels: descargaDias,
        datasets: [
          {
            label: "Dia",
            borderColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            barPercentage: 1.6,
            data: descargaValores,
          },
        ],
      };
      this.setState({ data4:descargaDatos});
    }

  }
  
  componentDidMount = async () => {
    this.props.verCredenciales();
    if(!this.props.colegio.id){
      this.props.history.push("/auth/login");
    }
    await this.verEstadisticas(this.props.colegio.id);
  }
  
  render() {
    return (
      <>
        <div className="content">
          <p>
            Estadisticas de uso {" "}
            
          </p>
          {this.state.data4.labels.length>0 ? (
          <Row>
            <Col md="12" lg="12">
              <Card>
                <CardHeader>
                  
                    <p className="card-category">
                      Descargas por Dia
                    </p>
                </CardHeader>
                <CardBody className="table-responsive">
                  <Line
                    data={this.state.data4}
                    options={chartExample9.options}
                  />
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
          ) : (null)}
          <Row>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Cargas de tareas del Mes</CardTitle>
                  <p className="card-category">por Dia</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={this.state.data1.data}
                    options={chartExample9.options}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Tipos de Archivos</CardTitle>
                  <p className="card-category">Docs - Videos - Audios</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={chartExample9.data}
                    options={chartExample9.options}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Ultimos envios de Tareas </CardTitle>
                  <p className="card-category">Respuestas de Estudiantes</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={this.state.data2.data}
                    options={this.state.data2.options}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="car-chart">
                <CardHeader>
                  <CardTitle>Carga de Respuestas</CardTitle>
                  <p className="card-category">Mbytes Enviados a la Plataforma</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={this.state.data3.data}
                    options={this.state.data3.options}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle>Asignaciones vs Respuestas</CardTitle>
                  <p className="card-category">Tareas Asignadas / Respuestas de los alumnos</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={this.state.datapie.data}
                    options={this.state.datapie.options}
                    width={456}
                    height={300}
                  />
                </CardBody>
                <CardFooter>
                  
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" />
                    Ratio Asignaciones / Respuestas
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <CardTitle>Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={chartExample12.data}
                    options={chartExample12.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
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

export default connect(mapStateToProps, mainActions )(Charts);
