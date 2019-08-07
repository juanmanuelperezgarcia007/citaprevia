import { PERSONALINFORMATION, CONTROLS, REGEX } from './formConstants'
export const cont = {
    name: {
        name: PERSONALINFORMATION.NAME,
        id: PERSONALINFORMATION.NAME,
        type: CONTROLS.INPUT.TYPE.TEXT,
        label: PERSONALINFORMATION.NAME,
        regex: REGEX.TEXT,
        className: 'col-xl-6',
    },
    surnames: {
        name: PERSONALINFORMATION.SURNAMES,
        id: PERSONALINFORMATION.SURNAMES,
        type: CONTROLS.INPUT.TYPE.TEXT,
        regex: REGEX.TEXT,
        label: PERSONALINFORMATION.SURNAMES,
        className: 'col-xl-6',
    },
    phone: {
        name: PERSONALINFORMATION.PHONE,
        id: PERSONALINFORMATION.PHONE,
        type: CONTROLS.INPUT.TYPE.TEXT,
        regex: REGEX.PHONE,
        label: PERSONALINFORMATION.PHONE,
        className: 'col-xl-6',
    },
    dni: {
        name: PERSONALINFORMATION.DNI,
        id: PERSONALINFORMATION.DNI,
        type: CONTROLS.INPUT.TYPE.TEXT,
        regex: REGEX.DNI,
        label: PERSONALINFORMATION.DNI,
        className: 'col-xl-6',
    },
    office: {
        name: PERSONALINFORMATION.OFFICE,
        id: PERSONALINFORMATION.OFFICE,
        type: CONTROLS.INPUT.TYPE.TEXT,
        className: 'col-xl-4',
        label: PERSONALINFORMATION.OFFICE,
        regex: REGEX.TEXT,
    },
    date: {
        name: PERSONALINFORMATION.DATE,
        id: PERSONALINFORMATION.DATE,
        type: CONTROLS.INPUT.TYPE.DATE,
        className: 'col-xl-4',
        label: PERSONALINFORMATION.DATE,
        regex: REGEX.DATE,
    },
    procedure: {
        name: PERSONALINFORMATION.PROCEDURE,
        id: PERSONALINFORMATION.PROCEDURE,
        type: CONTROLS.INPUT.TYPE.TEXT,
        className: 'col-xl-4',
        label: PERSONALINFORMATION.PROCEDURE,
        regex: REGEX.TEXT,
    },



}