import Calendar from "views/Calendar.js";
// import Charts from "views/Charts.js";
import Dashboard from "views/Dashboard.js";
import Login from "views/pages/Login.js";
import ReactTables from "views/ReactTables.js";
import Widgets from "views/Widgets.js";
import Mensajes from "views/Mensajes.js";

const routes = [
  {
    path: "/dashboard",
    name: "Panel",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/react-tables",
    name: "Grados",
    mini: "G",
    icon: "nc-icon nc-tile-56",
    component: ReactTables,
    layout: "/admin",
  },
  {
    path: "/widgets",
    name: "Tareas",
    icon: "nc-icon nc-box",
    component: Widgets,
    layout: "/admin",
  },
  // {
  //   path: "/charts",
  //   name: "Estadisticas",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Charts,
  //   layout: "/admin",
  // },
  {
    path: "/mensajes",
    name: "Mensajes",
    icon: "nc-icon nc-email-85",
    component: Mensajes,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Agenda",
    icon: "nc-icon nc-calendar-60",
    component: Calendar,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Cerrar sesion",
    icon: "nc-icon nc-circle-10",
    component: Login,
    layout: "/auth",
  },
];

export default routes;