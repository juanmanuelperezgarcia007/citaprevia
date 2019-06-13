import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { PERSONALINFORMATION } from '../../constants/formConstants'

const initialState = {

    inputOffice: "",
    inputDate: "",
    inputProcedure: "",
    inputName: "",
    inputSurname: "",
    inputPhone: "",
    inputDni: "",
    ErrorinputOffice: "",
    ErrorinputDate: "",
    ErrorinputProcedure: "",
    ErrorinputName: "",
    ErrorinputSurname: "",
    ErrorinputPhone: "",
    ErrorinputDni: ""


}

class AppointmentForm extends Component {
    constructor(props) {
        super(props)

        this.state = initialState
    }

    handleSubmit = e => {
        e.preventDefault()

        const isValid = this.validate();
        if (isValid) {
            console.log(this.state)
            //clear form
            this.setState(initialState)

        }

    }


    validate = () => {
        let ErrorinputOffice = "";
        let ErrorinputDate = "";
        let ErrorinputProcedure = "";
        let ErrorinputName = "";
        let ErrorinputSurname = "";
        let ErrorinputPhone = "";
        let ErrorinputDni = "";
        let errorMessageDni = "*El formato es 12345670-A"
        let errorMessage = "*Este campo no puede estar vacio"


        if (!this.state.inputDni.includes("-")) {
            ErrorinputDni = errorMessageDni
        }

        if (!this.state.inputSurname) {
            ErrorinputSurname = errorMessage
        }
        if (!this.state.inputPhone) {
            ErrorinputPhone = errorMessage
        }
        if (!this.state.inputDni) {
            ErrorinputDni = errorMessage
        }
        if (!this.state.inputDate) {
            ErrorinputDate = errorMessage
        }
        if (!this.state.inputProcedure) {
            ErrorinputProcedure = errorMessage
        }
        if (!this.state.inputOffice) {
            ErrorinputOffice = errorMessage
        }


        if (ErrorinputName || ErrorinputSurname || ErrorinputPhone || ErrorinputDni || ErrorinputDate || ErrorinputProcedure || ErrorinputOffice) {
            this.setState({ ErrorinputName, ErrorinputSurname, ErrorinputPhone, ErrorinputDate, ErrorinputDni, ErrorinputProcedure, ErrorinputOffice });
            return false
        }
        return true
    }

    render() {
        return (

            <div className="container">
                <h1 className="title">Cita previa</h1>

                <h4>Datos Personales:</h4>
                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="name">{PERSONALINFORMATION.NAME}</label>
                            <input
                                placeholder={PERSONALINFORMATION.NAME}
                                onChange={e => this.setState({ inputName: e.target.value })}
                                id="name"
                                name="name"
                                type="text"
                                value={this.state.inputName} />


                            <div className="error">
                                {this.state.ErrorinputName}
                            </div>

                        </div>


                        <div className="col-6">
                            <label htmlFor="surnames">{PERSONALINFORMATION.SURNAMES}</label>
                            <input
                                placeholder={PERSONALINFORMATION.SURNAMES}
                                onChange={e => this.setState({ inputSurname: e.target.value })}
                                id="surnames"
                                name="surnames"
                                type="text"
                                value={this.state.inputSurname} />
                            <div className="error">
                                {this.state.ErrorinputSurname}
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="phone">{PERSONALINFORMATION.PHONE}</label>
                            <input
                                placeholder={PERSONALINFORMATION.PHONE}
                                onChange={e => this.setState({ inputPhone: e.target.value })}
                                id="phone"
                                name="phone"
                                type="text"
                                value={this.state.inputPhone} />
                            <div className="error">
                                {this.state.ErrorinputPhone}
                            </div>
                        </div>

                        <div className="col-6">
                            <label htmlFor="dni">{PERSONALINFORMATION.DNI}</label>
                            <input
                                placeholder={PERSONALINFORMATION.DNI}
                                onChange={e => this.setState({ inputDni: e.target.value })}
                                id="dni"
                                name="dni"
                                type="text"
                                value={this.state.inputDni} />
                            <div className="error">
                                {this.state.ErrorinputDni}
                            </div>
                        </div>

                    </div>
                    <hr />
                    <h4>Datos de la cita:</h4>
                    <div className="row">

                        <div className="col-4">
                            <label htmlFor="office">{PERSONALINFORMATION.OFFICE}</label>
                            <input
                                placeholder={PERSONALINFORMATION.OFFICE}
                                onChange={e => this.setState({ inputOffice: e.target.value })}
                                id="office"
                                type="text"
                                name="office"
                                value={this.state.inputOffice} />
                            <div className="error">
                                {this.state.ErrorinputOffice}
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="date">{PERSONALINFORMATION.DAY}</label>
                            <input

                                onChange={e => this.setState({ inputDate: e.target.value })}
                                type="date"
                                id="date"
                                name="date"

                            />
                            <div className="error">
                                {this.state.ErrorinputDate}
                            </div>
                        </div>

                        <div className="col-4">
                            <label htmlFor="procedure">{PERSONALINFORMATION.PROCEDURE}</label>
                            <input
                                placeholder={PERSONALINFORMATION.PROCEDURE}
                                onChange={e => this.setState({ inputProcedure: e.target.value })}
                                id="procedure"
                                type="text"
                                name="procedure"
                                value={this.state.inputProcedure} />
                            <div className="error">
                                {this.state.ErrorinputProcedure}
                            </div>
                        </div>
                    </div>


                    <div className="button">
                        <button className=" col-4 btn ">Enviar</button>

                    </div>
                </form>

            </div>
        )
    }


}

export default AppointmentForm;