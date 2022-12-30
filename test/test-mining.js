const dotEnv = require('dotenv');
dotEnv.config('./env');

const miningApi = require('../api/mining')();

miningApi.getUser().then((data) => {
    console.log('daya', data.user_id);
}).catch((e) => {
    console.log('e', e);
});
