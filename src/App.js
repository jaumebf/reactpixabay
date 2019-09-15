import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: 'Café',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    //Leer state pagina actual
    let pagina = this.state.pagina;

    //Leer si la pagina es 1, no ir atras
    if (pagina === 1) return null;

    //Restar 1 a la pagina actual
    pagina--;

    //Agregar cambio al state
    this.setState({
      pagina: pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
    
    // console.log(pagina);
  }
  
  paginaSiguiente = () => {
    //Leer state pagina actual
    let pagina = this.state.pagina;
    
    //Sumar 1 a la pagina actual
    pagina++;
    
    //Agregar cambio al state
    this.setState({
      pagina: pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    // console.log(pagina);
  }

  consultarApi = () => {
    let api_key = "13624024-ceb12e8afa50e5bb05d0c7390";
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=${api_key}&q=${this.state.termino}
    &per_page=20&page=${pagina}`;
    // console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
