const axios = require('axios');

const getResultAPI = async (url) => {
    try {
        const respuestasAPI = [];
        for (let index = 1; index <= 5; index++) {
            const { data } = await axios.get(`${url}&page=${index}`);
            respuestasAPI.push(data.results);
        }
        
        const  respuestas = [];
        for (const respuesta of respuestasAPI) {
            respuesta.map(item => {
                respuestas.push(item)
            })
        }
        return respuestas;
    } catch (error) {
        console.log(error.message);
        return [];
    }

}

module.exports = getResultAPI;
/* https://www.gather.town/ */ 

