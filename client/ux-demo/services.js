import superagent from 'superagent';

function displayErrorMessage(reject, errorMessage, err) {
    reject(new Error(errorMessage, err));
}

export const postForm(formData) {
    return new Promise((resolve, reject) => {
        superagent.post("http://www.mocky.io/v2/566061f21200008e3aabd919")
            .send(formData)
            .end((err, response) => {
                if (err) {
                    displayErrorMessage(reject, "error posting", err);
                } else {
                    resolve(response.body);
                }
            });
    });
}

