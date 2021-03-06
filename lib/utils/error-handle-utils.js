const ObjectUtils = require('./object-utils');
const ErrorPrintUtils = require('./error-print-utils');

const hasAuthenticationError = response => response.status == '401';
const containsErrorMessage = response => !!ObjectUtils.readPropertyDeeply(response, 'data.errorMessages.length');


module.exports = {
  handleResponseError (err) {
    const response = err.response;

    if (!response) {
      ErrorPrintUtils.printUnexpectedError(err);
    } else {
      ErrorPrintUtils.printStatus(response);
      if (hasAuthenticationError(response)) {
        ErrorPrintUtils.printInvalidCredentialsError();
      } else if (containsErrorMessage(response)) {
        ErrorPrintUtils.printErrorMessage(response);
      }
    }
    process.exit();
  }
};
