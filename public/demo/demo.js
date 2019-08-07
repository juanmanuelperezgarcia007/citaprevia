import "@babel/polyfill";
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import "@webcomponents/webcomponentsjs/webcomponents-bundle";
import "@webcomponents/custom-elements/custom-elements.min";
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import BorRoutesBorCore from './demo.routes';
import AppointmentForm from './../../src/components/AppointmentForm/AppointmentForm'
import NavComponent from './../../src/components/NavComponent/NavComponent';


export class MyElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        //this.attachShadow({mode: 'open'});
        //let shadow = this.createShadowRoot();
        let customElement = document.querySelector('bankia-cita-previa');
        ReactDOM.render(
            <section className="bankia-cita-previa-container">
                <BorRoutesBorCore />
                <NavComponent></NavComponent>
                <AppointmentForm></AppointmentForm>
            </section>
            , customElement);
    }
}

window.customElements.define('bankia-cita-previa', MyElement);
