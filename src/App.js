import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumberFormat from 'react-number-format';
import Currency from 'react-currency-formatter';

class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
      months:0,
      startValue:235000,
      poupTotalValue:0,
      poupValue:0,
      cdbTotalValue:0,
      cdbValue:0,
    }

    this.rent = {
      poup: 0.0017,
      cdb: 0.00283,
      way:0.07,
    }
  }
  calculateValues = () =>{
    var poupTotalValueRaw = this.state.startValue + (this.rent.poup * this.state.startValue)*this.state.months;
    console.log((Math.round(poupTotalValueRaw * 100) / 100).toFixed(2));
    this.setState({
      poupTotalValue: this.state.startValue + (this.rent.poup * this.state.startValue)*this.state.months

    })
    this.setState({
      cdbTotalValue: this.state.startValue + (this.rent.cdb * this.state.startValue)*this.state.months
    })

  }
  handleMonthsChange = (event) => {
    this.calculateValues();

    this.setState({
      months: event.target.value
    })
  }

  handleValueChange = (event) => {
    this.calculateValues();

    this.setState({
      startValue: event.target.value
    })
  }
  
  render (){
    return (
      <div className="App container ">
        <div className="calc-header text-center my-3">
          <h2 className="p-2 text-white text-uppercase">calculadora de investimentos</h2>
        </div>
  
        <div className="calc-body mt-3 p-2 p-md-5">
          <h4 className="text-center mb-4 pb-5">Compare 1 unidade Way com investimentos na poupança ou CDB.</h4>
  
          <div className="row">
            <div className="col-6">
              <p className="text-gray">Investimento Way</p>
              <h3 ><span className="text-weight-normal mr-5">R$</span>
                <NumberFormat value={this.state.startValue} displayType={'text'} thousandSeparator={','} decimalSeparator={'.'} decimalScale={2} fixedDecimalScale={true}/>
              </h3>
              <p className="text-gray">Tempo de Investimento</p>
  
              <label htmlFor="myRange">{this.state.months} meses</label>
              <br/>
              <input type="range" className=" slider" min="0" max="12" value={this.state.months} onChange={this.handleMonthsChange} id="myRange" />
  
            </div>
  
            <div className="col-6 row">
              <div className="col-6 rend-box">
                <h3 ><span className="text-weight-normal text-gray mr-3"><small>R$</small></span>
                  <NumberFormat value={this.state.poupTotalValue} displayType={'text'} thousandSeparator={','} decimalSeparator={'.'} decimalScale={2} fixedDecimalScale={true}/>
                </h3>
                <div className="bg-dark p-2">
                  <p className="text-white ">Rendimento na Poupança de 2.04%</p>
                </div>
              </div>
              <div className="col-6 rend-box">
                <h3 ><span className="text-weight-normal text-gray mr-3"><small>R$</small></span>
                  <NumberFormat value={this.state.cdbTotalValue} displayType={'text'} thousandSeparator={','} decimalSeparator={'.'} decimalScale={2} fixedDecimalScale={true}/>
                </h3>
                <div className="bg-dark p-2">
                  <p className="text-white ">Rendimento na CDB de 3.39%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="calc-body calc-body-bottom p-2 p-md-5">
          <button className="btn btn-dark btn-center d-none" data-toggle="modal" data-target="#exampleModal">Simular com outro valor</button>
          <div className="row">
            <div className="col-7 vl">
              <div className="text-center">
                <h3 ><span className="text-weight-normal text-gray mr-3"><small>R$</small></span>235.000,00</h3>
                <h4>1 unidade Way, aplicadas <br /> no sistema financeiro.</h4>
  
                <div className="row">
                  <div className="col-6">
                    <div className="graph mt-3"><div style={{ height: "10%" }} className="graph-fill"></div></div>
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p>Poupança</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-3"><small>R$</small></span>
                      399,50
                      <span className="text-weight-normal text-gray ml-2"><small>a.m.</small></span>
                    </h3>
                  </div>
                  <div className="col-6">
                    <div className="graph mt-3"><div style={{ height: "20%" }} className="graph-fill"></div></div>
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p>CDB</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-3"><small>R$</small></span>
                      665,05
                      <span className="text-weight-normal text-gray ml-2"><small>a.m.</small></span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="text-center">
                <h3 ><span className="text-weight-normal text-gray mr-3"><small>R$</small></span>235.000,00</h3>
                <h4>1 unidade Way, depois <br /> de pronta, alugada.</h4>
                <div className="graph mt-3"><div style={{ height: "100%" }} className="graph-fill"></div></div>
                <div className="graph-base mb-3 bg-dark text-white">
                  <p>Aluguel</p>
                </div>
                <h3>
                  <span className="text-weight-normal text-gray mr-3"><small>R$</small></span>
                  1.645,00
                  <span className="text-weight-normal text-gray ml-2"><small>a.m.</small></span>
                </h3>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
              <h5 className="modal-title" id="exampleModalLabel">Simular com outro valor</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><ion-icon name="close-outline"></ion-icon></span>
                </button>
                <form>
                  <div className="form-group">
                    <input type="number" className="form-control" value={this.state.startValue} onChange={this.handleValueChange} placeholder="R$"  />
                  </div>
                  <div className="form-group">
                    <input type="name" className="form-control" placeholder="Nome"  />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" placeholder="E-mail" />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Telefone" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button data-dismiss="modal" className="btn btn-primary">Enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
