export const PERSONALINFORMATION = {
    NAME: 'Nombre',
    PHONE: 'Telefono',
    DNI: 'DNI',
    SURNAMES: 'Apellidos',
    OFFICE: 'Oficina',
    DATE: 'Fecha',
    PROCEDURE: 'Tramite'
}

export const FORM = {
    ENCTYPE: {
        URL_ENCODE: 'application/x-www-form-urlencoded',
        SEND_DATA: 'multipart/form-data',
        PLAIN: 'text/plan'
    },
    METHOD: {
        GET: 'GET',
        POST: 'POST'
    },
    TARGET: {
        BLANK: '_blank',
        SELF: '_self',
        PARENT: '_parent',
        TOP: '_top'
    }
};
export const CONTROLS = {
    INPUT: {
        TYPE: {
            DATE: 'date',
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
    PHONE: /(^[0-9]{9}$)/,
    TEXT: /[a-z]/gi,
    DNI: /^[0-9]{8,8}[A-Za-z]$/i,
    DATE: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
};
