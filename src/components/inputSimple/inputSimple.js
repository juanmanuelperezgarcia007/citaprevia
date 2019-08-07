import React from 'react';
import { CONTROLS, } from '../../constants/formConstants'
import PropTypes from 'prop-types';
import { get } from 'https';

export default class InputSimple extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        type: PropTypes.string,
        valid: PropTypes.bool,
        errorMessage: PropTypes.string,
        className: PropTypes.string,

    };

    static defaultProps = {
        valid: true,
        value: '',
        errorMessage: 'Rellena correctamente el campo',
        valid: true,
        autoComplete: CONTROLS.INPUT.AUTOFILL.OFF,
        type: CONTROLS.INPUT.TYPE.TEXT,
        name: ""
    };

    constructor(props) {
        super(props);
    }

    onChange = (_event, _className) => {
        let valid = this.props.regex.test(_event.target.value)
        this.props.onChange(_event, this.props.name, valid)

    };

    render() {
        return (
            <div className={this.props.className}>
                <label htmlFor={this.props.id} >{this.props.label} </label>
                <input

                    onChange={_event =>
                        this.onChange(_event)}
                    id={this.props.id}
                    type={this.props.type}
                    required
                />

            </div>
        );
    }
}
