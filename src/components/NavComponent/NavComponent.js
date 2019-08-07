import React from 'react';
import { CONTROLS, } from '../../constants/formConstants'
import PropTypes from 'prop-types';
import { get } from 'https';

export default class NavComponent extends React.Component {


    render() {
        return (
            <div>
                <ul>
                    <li>Cita previa</li>
                    <li>Peticion de cita</li>
                </ul>
            </div>
        );
    }
}

