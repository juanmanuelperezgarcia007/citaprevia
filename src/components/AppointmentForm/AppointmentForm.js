import React, { Component } from 'react';
import { FORM } from '../../constants/formConstants'
import InputSimple from '../inputSimple/inputSimple';
import { cont } from '../../constants/inputContants'


const stateInitial = {
    validate: {
        Nombre: false,
        Apellidos: false,
        Telefono: false,
        DNI: false,
        Oficina: false,
        Fecha: false,
        Oficina: false
    }, values: {
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        DNI: "",
        Oficina: "",
        Fecha: "",
        Oficina: "",
    }
}

const inputsData = [cont.name, cont.surnames, cont.phone, cont.dni]
const inputsDate = [cont.office, cont.date, cont.procedure]



class AppointmentForm extends Component {
    state = { ...stateInitial, error: true }

    handleChange = (_event, _name, _valid) => {
        this.setState({
            validate: {
                ...this.state.validate,
                [_name]: _valid
            },
            values: {
                ...this.state.values,
                [_name]: _event.target.value
            }
        })

    }
    getClass = (_validate, _label) => {
        console.log(_validate, _label)



    }

    handleSubmit = e => {
        e.preventDefault()
        const errors = Object.values(this.state.validate).find(value => value == false)
        console.log(errors)
        if (errors == false) {
            console.log(false)
            return false;
        }

        console.log('true')
        return true;
    }

    generateInputsData = (_inputs) => {
        let allControls = [];
        _inputs.forEach(_objectValues => {

            allControls.push(
                <InputSimple
                    className={_objectValues.className}
                    type={_objectValues.type}
                    label={_objectValues.label}
                    name={_objectValues.name}
                    id={_objectValues.id}
                    onChange={(_event, _name, valid) => this.handleChange(_event, _name, valid)}
                    regex={_objectValues.regex}

                />
            );
        });
        return allControls;
    };

    render() {
        return (

            <div className="contenedor">
                <h1 className="title">Cita previa</h1>

                <h4>Datos Personales:</h4>
                <form

                    name="cita-form"
                    method={FORM.METHOD.POST}
                    encType={FORM.ENCTYPE.URL_ENCODE}
                    onSubmit={this.handleSubmit}
                >

                    <div className="row ">
                        {this.generateInputsData(inputsData)}
                    </div>
                    <hr />
                    <h4>Cita:</h4>
                    <div className="row">
                        {this.generateInputsData(inputsDate)}
                        {this.valid == false && <span>{this.props.errorMessage}</span>}
                    </div>

                    <div className="button">
                        <button className=" col-4 btn ">Enviar</button>

                    </div>
                </form>

            </div >
        )


    }
}

export default AppointmentForm;