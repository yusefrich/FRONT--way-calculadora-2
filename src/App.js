import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';
import CurrencyInput from 'react-currency-input';

class App extends Component {
  constructor(props) {
    super(props)
    var startValueRaw = 34650;
    var startMonths = 12;

    this.rent = {
      anualSelic: 0.0225,
      poupComBaseNaSelic: 0.7,
      cdbAA: 0.0458,
      /* dados legacy com base na tabela */
      poup: 0.001300, /* am */
      cdb: 0.00184,
      way: 0.007,
    }


    this.state = {
      months: startMonths,
      startValue: startValueRaw,
      poupTotalValue: startValueRaw + (this.rent.poup * startValueRaw) * startMonths,
      cdbTotalValue: startValueRaw + (this.rent.cdb * startValueRaw) * startMonths,
      poupValue: this.rent.poup * startValueRaw,
      cdbValue: this.rent.cdb * startValueRaw,
      wayValue: this.rent.way * startValueRaw,
    }

    //console.log(this.state);
  }
  componentDidMount(){
    this.calculateValues();
  }
  calculateValues = () => {
    var newPoupTotalValue = this.state.startValue;
    for (let i = 0; i < this.state.months; i++) {
      newPoupTotalValue = newPoupTotalValue + (this.rent.poup * newPoupTotalValue);
    }
    var newCdbTotalValue = this.state.startValue;
    for (let i = 0; i < this.state.months; i++) {
      newCdbTotalValue = newCdbTotalValue + (this.rent.cdb * newCdbTotalValue);
    }

    this.setState({
      poupTotalValue: /* this.state.startValue + (this.rent.poup * this.state.startValue) * this.state.months */ newPoupTotalValue

    })
    this.setState({
      cdbTotalValue: /* this.state.startValue + (this.rent.cdb * this.state.startValue) * this.state.months */ newCdbTotalValue
    })

  }
  calculateRentValues = () => {

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

  handleValueChange = (event, maskedvalue, floatvalue) => {

    this.setState({
      startValue: floatvalue
    }, () => {
      this.calculateValues();
      this.calculateRentValues();
    });

    /* this.setState({
      startValue: event.target.value
    }) */



  }

  render() {
    return (
      <div className="App container ">
        <div className="calc-header text-center my-3">
          <h2 className="p-2 text-white text-uppercase">calculadora de investimentos</h2>
        </div>

        {/* <div className="calc-body mt-3 p-2 p-md-5 pb-mob-55">
          <h4 className="text-center mb-4 pb-5">Compare 1 unidade do Way com investimento na poupança ou CDB.</h4>

          <div className="row">
            <div className="col-md-6">
              <p className="text-gray">Investimento Way</p>
              <div className="form-group d-inline-flex justify-content-start starter-text-input">
                <span className="currency-form text-weight-normal mr-1 mr-md-4">R$</span>
                <CurrencyInput id="money-input" decimalSeparator="," thousandSeparator="." className="form-control" value={this.state.startValue} onChangeEvent={this.handleValueChange} placeholder="R$" />
                <span className="info-badge">(b)</span>
              </div> */}

              {/* <h3 className="mb-4"><span className="text-weight-normal mr-1 mr-md-5">R$</span>
                <NumberFormat value={this.state.startValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} />
                <span className="info-badge">(b)</span>
              </h3> */}
              {/* <div className="form-group">
                  <CurrencyInput className="form-control"  onChange={ this.handleValueChange }   />
                </div> */}

              {/* <p className="text-gray">Tempo de Investimento</p>
              <label htmlFor="myRange">{this.state.months} meses</label>
              <br />
              <input type="range" className=" slider" min="0" max="12" value={this.state.months} onChange={this.handleMonthsChange} id="myRange" />

            </div>

            <div className="col-md-6  pl-md-0">
              <div className="row mt-5 mt-md-0">
                <div className="col-6 rend-box">
                  <h3 ><span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                    <NumberFormat value={this.state.poupTotalValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} />
                    <span className="info-badge">(c)</span>
                  </h3>
                  <div className="bg-dark p-2">
                    <p className="text-white ">Rendimento na Poupança</p>
                  </div>
                </div>
                <div className="col-6 rend-box">
                  <h3 ><span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                    <NumberFormat value={this.state.cdbTotalValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} />
                    <span className="info-badge">(d)</span>
                  </h3>
                  <div className="bg-dark p-2">
                    <p className="text-white ">Rendimento na CDB</p>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <h4 className="text-center mb-0 mt-5">o Way valorizou</h4>
                  <h4 className="text-center mb-4 pb-0 pb-md-5 text-bold-custom">mais de 10% desde janeiro/2020<span className="info-badge">(a)</span></h4>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="text-gray line-height-sm">
                <small>
                  (a) O rendimento mencionado é obtido com a venda do imóvel após um período de valorização. O % demonstrado refere-se a valorização da tabela de vendas desde o lançamento. (b) Valor de entrada da unidade R4 em jun/2020. (c) Considerações usadas na simulação: Fonte: Banco Central do Brasil. Consulta em jun/2020. Remuneração da Poupança conforme legislação atual de 0,13% a.m.. Depósitos a partir de 04.05.2012. (d) CDB com 120% de CDI. Todos os valores são referentes a pesquisas feitas em jun/2020 e podem sofrer alterações de acordo com o mercado.
                </small>
              </p>
            </div>
          </div>
        </div> */}
        <div className="calc-body calc-body-bottom p-2 p-md-5 mb-5 pt-mob-55">
          {/* <button className="btn btn-dark btn-center btn-custom" data-toggle="modal" data-target="#exampleModal">Simular com outro valor</button> */}
          <div className="row">
            <div className="col-12 text-center">
              <h4 className="text-center mb-5 mt-4">Rentabilidade para aluguel.</h4>
              <p className="text-gray mb-2">Valor médio de 1 unidade Way</p>
              <h3 className="mb-5"><span className="text-weight-normal mr-1 mr-md-3">R$</span>
                280.000,00
                {/* <NumberFormat value={this.state.startValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} /> */}
                <span className="info-badge">(e)</span>
              </h3>

            </div>
            <div className="col-5 vl">
              <div className="text-center">
                <h4>1 unidade Way, depois <br /> de pronta, alugada.</h4>
                <div className="graph fix mt-3"><div style={{ height:  "100%" }} className="graph-fill"></div></div>{/* (100 * (this.rent.way * this.state.months)) / (this.rent.way * 12) + */}
                <div className="graph-base mb-3 bg-dark text-white">
                  <p className="font-weight-bold">Locação</p>
                </div>
                <h3>
                  <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                  2.402,00
                  {/* <NumberFormat value={this.state.wayValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} /> */}
                  <span className="text-weight-normal text-gray ml-2"><br className="d-md-none" /><small>a.m.</small></span>
                  <span className="info-badge">(f)</span>
                </h3>
                <div className="investment-info d-desk">
                  <p className="text-gray ">Valor de diárias x taxa de ocupação
                    x dias do mês - despesas diversas</p>
                  <div className="investment-info-box">
                    <p className="font-weight-bold investment-info-box-title">O que indica o resultado:</p>
                    <p><small className="font-weight-bold"> 
                      • 65% de ocupação mensal <br/>
                      • Diária média de R$ 200,00 <br/>
                      • Despesas diversas já descontadas<br/></small></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-7 ">
              <div className="text-center">
                <h4 className="text-normal-invest">Comparado com o rendimento mensal do sistema financeiro.</h4>
                <div className="row">
                  <div className="col-6">
                    <div className="graph mt-3" style={{ height: "130px" }}><div style={{ height: "7%" }} className="graph-fill"></div></div>{/* (100 * (this.rent.poup * this.state.months)) / (this.rent.way * 12) +  */}
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p className="font-weight-bold">Poupança</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                      364,00
                      {/* <NumberFormat value={this.state.poupValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} /> */}
                      <span className="text-weight-normal text-gray ml-2"><br className="d-md-none" /><small>a.m.</small></span>
                    </h3>
                  </div>
                  <div className="col-6">
                    <div className="graph mt-3" style={{ height: "130px" }}><div style={{ height:  "40%" }} className="graph-fill"></div></div> {/* (100 * (this.rent.cdb * this.state.months)) / (this.rent.way * 12) + */}
                    <div className="graph-base mb-3 bg-dark text-white">
                      <p className="font-weight-bold">CDB</p>
                    </div>
                    <h3>
                      <span className="text-weight-normal text-gray mr-1 mr-md-3"><small>R$</small></span>
                      515,20
                      {/* <NumberFormat value={this.state.cdbValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} /> */}
                      <span className="text-weight-normal text-gray ml-2"><br className="d-md-none" /><small>a.m.</small></span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-5">
              <div className="investment-info d-mob mb-4">
                <p className="text-gray ">Valor de diárias x taxa de ocupação
                  x dias do mês - despesas diversas</p>
                <div className="investment-info-box">
                  <p className="font-weight-bold investment-info-box-title">O que indica o resultado:</p>
                  <p><small className="font-weight-bold"> 
                    • 65% de ocupação mensal <br/>
                    • Diária média de R$ 200,00 <br/>
                    • Despesas diversas já descontadas<br/></small></p>
                </div>
              </div>
              <p className="text-gray line-height-sm">
                <small>
                (e) Valor médio de 1 unidade Way de 27 m² em jun/2020. (f) Considerações utilizadas na simulação: 1. Diária média de R$ 200,00 calculada a partir de um estudo da região levando em consideração todas as variáveis que correspondem à empreendimentos que tenham características semelhantes (não inclui taxa de limpeza). 2. 65% de ocupação mensal. 3. Desconto de 38,4% do valor encontra através de (1)*(2)*30 com despesas diversas (Taxa canal, Gateway, IPTU, Gestão, Luz, TV/Wifi). As projeções aqui apresentadas são estimativas e estão baseadas em dados obtidos através de estudos de viabilidade e de acordo com o cenário atual do mercado. Não são garantias de resultados futuros. Dados referentes ao cenário econômico do mês de Junho de 2020. Informações sujeitas a alteração.
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
                    <CurrencyInput id="money-input" decimalSeparator="." thousandSeparator="," className="form-control" value={this.state.startValue} onChangeEvent={this.handleValueChange} placeholder="R$" />
                  </div>
                  {/* <div className="form-group">
                    <input type="name" className="form-control" placeholder="Nome"  />
                  </div> */}
                  {/* <div className="form-group">
                    <input type="email" className="form-control" placeholder="E-mail" />
                  </div> */}
                  {/* <div className="form-group">
                    <input type="text" className="form-control" placeholder="Telefone" />
                  </div> */}
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
