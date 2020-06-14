import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';

class App extends Component{
  constructor(props) {
    super(props)
    var startValueRaw = 235000;
    var startMonths = 12;

    this.rent = {
      poup: 0.0017,
      cdb: 0.00283,
      way: 0.007,
    }


    this.state = {
      months:startMonths,
      startValue:startValueRaw,
      poupTotalValue: startValueRaw + (this.rent.poup * startValueRaw)*startMonths,
      cdbTotalValue: startValueRaw + (this.rent.cdb * startValueRaw)*startMonths,
      poupValue: this.rent.poup * startValueRaw,
      cdbValue: this.rent.cdb * startValueRaw,
      wayValue: this.rent.way * startValueRaw,
      

    }

    //console.log(this.state);

  }
  calculateValues = () =>{
    this.setState({
      poupTotalValue: this.state.startValue + (this.rent.poup * this.state.startValue)*this.state.months

    })
    this.setState({
      cdbTotalValue: this.state.startValue + (this.rent.cdb * this.state.startValue)*this.state.months
    })

  }
  calculateRentValues = () =>{

    this.setState({
      poupValue: this.rent.poup * this.state.startValue
    })
    this.setState({
      cdbValue: this.rent.cdb * this.state.startValue
    })
    this.setState({
      wayValue: this.rent.way * this.state.startValue
    })

  }

  handleMonthsChange = (event) => {
    this.setState({
      months: event.target.value
    }, () => {
      this.calculateValues();
    });
  }

  handleValueChange = (event) => {

    this.setState({
      startValue: +event.target.value
    }, () => {
      this.calculateValues();
      this.calculateRentValues();
    });

    /* this.setState({
      startValue: event.target.value
    }) */

    

  }

  render (){
    return (
      <div className="App container ">
        <div className="calc-header text-center my-3">
          <h2 className="p-2 text-white text-uppercase">calculadora de investimentos</h2>
        </div>
  
        <div className="calc-body mt-3 p-2 p-md-5 pb-mob-55">
          <h4 className="text-center mb-4 pb-5">Compare 1 unidade Way com investimentos na poupança ou CDB.</h4>
  
          <div className="row">
            <div className="col-md-6">
              <p className="text-gray">Investimento Way</p>
              <h3 className="mb-4"><span className="text-weight-normal mr-1 mr-md-5">R$</span>
                <NumberFormat value={this.state.startValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
              *</h3>
              <p className="text-gray">Tempo de Investimento</p>
              <label htmlFor="myRange">{this.state.months} meses</label>
              <br/>
              <input type="range" className=" slider" min="0" max="12" value={this.state.months} onChange={this.handleMonthsChange} id="myRange" />
  
            </div>
  
            <div className="col-md-6  pl-md-0">
              <div className="row mt-5 mt-md-0">
                <div className="col-6 rend-box">
                  <h3 ><span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                    <NumberFormat value={this.state.poupTotalValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
                  </h3>
                  <div className="bg-dark p-2">
                    <p className="text-white ">Rendimento na Poupança</p>
                  </div>
                </div>
                <div className="col-6 rend-box">
                  <h3 ><span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                    <NumberFormat value={this.state.cdbTotalValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
                  </h3>
                  <div className="bg-dark p-2">
                    <p className="text-white ">Rendimento na CDB</p>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <h4 className="text-center mb-0 mt-5">a Way valorizou</h4>
                  <h4 className="text-center mb-4 pb-0 pb-md-5 text-bold-custom">mais de 10% desde janeiro</h4>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="text-gray">
                <small> 
                  Considerações utilizadas na simulação: 1. Data da última atualização: 07/05/2020. 2. de rentabilidade da Poupança: 0,17% a.m. 3. CDB e LC: 127% do CDI.
                  <br/>
                  * Valores referentes a data da última atualizaçãoe podem sofrer alterações de acordo com o mercado.
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="calc-body calc-body-bottom p-2 p-md-5 mb-5 pt-mob-55">
          <button className="btn btn-dark btn-center btn-custom" data-toggle="modal" data-target="#exampleModal">Simular com outro valor</button>
          <div className="row">
            <div className="col-12 text-center">
            <h4 className="text-center mb-5 mt-4">Rentabilidade para aluguel.</h4>
            <p className="text-gray mb-2">Valor de 1 unidade Way</p>
              <h3 className="mb-5"><span className="text-weight-normal mr-1 mr-md-3">R$</span>
                <NumberFormat value={this.state.startValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
              *</h3>

            </div>
            <div className="col-5 vl">
              <div className="text-center">
                <h4>1 unidade Way, depois <br /> de pronta, alugada.</h4>
                <div className="graph mt-3"><div style={{ height: (100 * (this.rent.way * this.state.months)) / (this.rent.way * 12)+"%" }} className="graph-fill"></div></div>
                <div className="graph-base mb-3 bg-dark text-white">
                  <p>Aluguel</p>
                </div>
                <h3>
                  <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                    <NumberFormat value={this.state.wayValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
                  <span className="text-weight-normal text-gray ml-2"><br className="d-md-none"/><small>a.m.</small></span>
                </h3>
              </div>
            </div>
            <div className="col-7 ">
              <div className="text-center">
                <h4 className="text-normal-invest">Comprado com o rendimento mensal do sistema funanceiro.</h4>
  
                <div className="row">
                  <div className="col-6">
                    <div className="graph mt-3"><div style={{ height: (100 * (this.rent.poup * this.state.months)) / (this.rent.way * 12)+"%" }} className="graph-fill"></div></div>
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p>Poupança</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                        <NumberFormat value={this.state.poupValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
                      <span className="text-weight-normal text-gray ml-2"><br className="d-md-none"/><small>a.m.</small></span>
                    </h3>
                  </div>
                  <div className="col-6">
                    <div className="graph mt-3"><div style={{ height: (100 * (this.rent.cdb * this.state.months)) / (this.rent.way * 12)+"%" }} className="graph-fill"></div></div>
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p>CDB</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                        <NumberFormat value={this.state.cdbValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}/>
                      <span className="text-weight-normal text-gray ml-2"><br className="d-md-none"/><small>a.m.</small></span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <p className="text-gray">
                <small> 
                  Considerações utilizadas na simulação: 1. Data da última atualização: 07/05/2020. 2. de rentabilidade da Poupança: 0,17% a.m. 3. CDB e LC: 127% do CDI.
                  4. Resultado do Way baseado em estudo de balor de localização, descontando condomínio e imposto de renda.
                  <br/>
                  * Valores referentes a data da última atualizaçãoe podem sofrer alterações de acordo com o mercado.
                </small>
              </p>
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
                    <input type="number" className="form-control" value={this.state.startValue} onChange={ this.handleValueChange } placeholder="R$"  />
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
