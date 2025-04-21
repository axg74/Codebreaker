/**
 * some helper functions
 */

class Util {
    static _errorMessagePrefix = ' *** ENGINE ERROR *** ';
    
    static isSet(variable, errorMessage) {
        if (typeof(variable) === 'undefined') {
            throw(Util._errorMessagePrefix + errorMessage);
        }
    }

    static isNumber(variable) {
        if (typeof(variable) !== 'number') {
            throw(Util._errorMessagePrefix + 'numeric value expected!');
        }
    }

    static isInRange(property, minValue, maxValue) {
        Util.isNumber(property);

        if (property < minValue || property > maxValue) {
            throw(Util._errorMessagePrefix + 'numeric value is out of specified range!');
        }
    }

    static throwError(errorMessage) {
        throw(Util._errorMessagePrefix + errorMessage);
    }

    static vibrate(duration) {
        if ('vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }
}

export default Util;
