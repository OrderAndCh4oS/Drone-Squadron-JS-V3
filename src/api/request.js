const request = (request, params, values) => {
    return request({params, values}).then(
        response => {
            switch(response.status) {
                case 200:
                    return handleSuccessfulResponse(response);
                case 401:
                    return handleAuthenticationErrorResponse(response);
                case 403:
                    return handleUnauthorisedResponse(response);
                case 404:
                    return handleNotFoundResponse(response);
                default:
                    return response;
            }
        },
        error => {
            return error;
        });
};

const handleSuccessfulResponse = (response) => response.json()
    .then(data => data);

const handleAuthenticationErrorResponse = (response) => response.json()
    .then(data => data);

const handleUnauthorisedResponse = (response) => response.json()
    .then(data => data);

const handleNotFoundResponse = (response) => response.json()
    .then(data => data);

export default request;
