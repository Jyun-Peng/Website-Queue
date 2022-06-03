const httpGet = function (url) {
    fetch(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    }).then((response) => {
        console.log(response);
    });
};

export { httpGet };
