export const PERSONALINFORMATION = {
    NAME: 'Nombre',
    PHONE: 'Telefono',
    DNI: 'DNI',
    SURNAMES: 'Apellidos',
    OFFICE: 'Oficina',
    DAY: 'Fecha',
    PROCEDURE: 'Tramite'
}

export const CONTROLS = {
    INPUT: {
        TYPE: {
            TEXT: 'text',
            PASSWORD: 'password',
            CHECKBOX: 'checkbox',
            RADIO: 'radio',
            NUMBER: 'number',
            BUTTON: 'button',
            FILE: 'file'
        },
        AUTOFILL: {
            OFF: 'off'
        }
    }
};

export const REGEX = {
    EMAIL: /(^[\d\w|$|#|_|-]+@[\d\w]+\.[\w]{2,3}$)/,
    PHONE: /(^[0-9]{9}$)/
};
