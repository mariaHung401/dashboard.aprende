export const setColegio = (colegio, grado) => async (dispatch) => {
  dispatch({
    type: 'set_colegio',
    payload:[colegio,grado]
  })
}
export const verColegio= () => async (dispatch) => {
  dispatch({
    type: 'ver_colegio',
  })
}
export const setArchivoSubir = (archivo) =>  (dispatch) => {
  dispatch({
    type: 'set_archivosubir',
    payload: archivo
  })
}
export const verAlumnos = (id,grado) => async (dispatch) => {
  if(grado!="" || grado!==undefined){
    grado=grado.substr(3,6).toUpperCase();
  }
  let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/veralumnos?id='+id+'&grado='+grado;
  let respuesta = await fetch(url, {
      method: 'GET',
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
  })
  .catch(error => {
      console.log(error);
  });
  let result = await respuesta.json();
  dispatch({
    type: 'ver_alumnos',
    payload: result
  });
}

export const verCredenciales =  () => async (dispatch) => {
    const url = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/creds';
    let respuesta = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    }).catch(error => {
        console.log(error);
    });
    let insercion = await respuesta.json();
    dispatch({
        type: 'ver_credenciales',
        payload: insercion
    });
  }
