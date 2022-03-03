var axios = require('axios');
var express = require('express');
var app = express();

var timestamp = new Date().getTime();

var data = JSON.stringify({
    "signOnUser": {
        "userName": "userename@company",
    },
    "noPassword": true,
    "adminUser": {
        "userName": "admin@company",
        "password": "password"
    }
});

var config = {
    method: 'post',
    url: 'http://localhost/api/rpc/login-tokens/create-sso-token',
    headers: {
        'Accept': 'application/vnd.yellowfin.api-v1.3+json',
        'Authorization': `YELLOWFIN ts=${timestamp}, nonce=random`,
        'Content-Type': 'application/json'
    },
    data: data
};

axios(config).then(response => {
    var ssoToken = response.data.securityToken;

    app.get('/api', (req, res, next) => {
        res.json({ token: ssoToken });
    });

    app.listen(5000, () => {
        console.log('App listening on port 5000');
    });
}).catch(err => {
    if (err.response.status !== 200) {
        console.log(err.response.data.description);
    }
});