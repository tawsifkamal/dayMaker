const axios = require('axios');

function createApiRequest(token) {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = {
  createApiRequest,
};
