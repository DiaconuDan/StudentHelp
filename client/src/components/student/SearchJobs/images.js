export const barmanPicture =  require('./images/barman.jpg') ;
export const cashierPicture = require('./images/cashier.jpg') ;
export const deliveryPicture =  require('./images/delivery.jpg') ;
export const waiterPicture =  require('./images/waiter.jpg');
export const generalPicture =  require('./images/general.jpg');
export const noResultPicture=  require('./images/noResult.jpg');
export const receptionistPicture =  require('./images/receptionist.png') ;


export function getPictureOfJobDescription(jobDescription) {
    if ( jobDescription === "barman" ) {
        return barmanPicture;
    }
    if ( jobDescription === "cashier" ) {
        return cashierPicture;
    }
    if ( jobDescription === "delivery" ) {
        return deliveryPicture;
    }
    if ( jobDescription === "waiter" ) {
        return waiterPicture;
    }
    if ( jobDescription === "receptionist" ) {
        return receptionistPicture;
    }
    return generalPicture ;
}