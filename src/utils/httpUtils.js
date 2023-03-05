const axios = require('axios');

const getDatausaRequest = async (URL) => {
    try{
        const response = await axios.get(URL);
        const { data } = response.data;
      
        return data;
    } catch (e) {
        throw new Error(`Error getting datausa response: ${console.log(e)}`);
    }
}

module.exports = {
  getDatausaRequest,
}
