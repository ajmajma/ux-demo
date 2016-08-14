import superagent from 'superagent';

function displayErrorMessage(reject, errorMessage, err) {
    reject(new Error(errorMessage, err));
}

function post(url, formData) {
    return new Promise((resolve, reject) => {
        superagent.post(url)
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


export const postForm = post.bind(null);