require("dotenv").config();
const { URL, API_KEY } = process.env;
const axios = require("axios");
const { Genre, Platform } = require('../db.js');
const getResultAPI = require("../controllers/getResultsAPI.js");

const saveGenres = async () => {
    try {
        const existingGenres = await Genre.findAll();
        const existingPlatforms = await Platform.findAll();
        if (existingGenres.length > 0 && existingPlatforms.length > 0) {
            console.log("La tabla Genre y la tabla Platforms ya tienen sus items guardados. No se realizará la solicitud.");
            return;
        }

        let genres = [];
        const { data } = await axios.get(`${URL}/genres?key=${API_KEY}`);
        const auxiliar = [...data.results]
        auxiliar.map(genre => {
            genres.push(genre.name)
        })

        let platformsDB = [];
        const respuestas = await getResultAPI(`${URL}/games?key=${API_KEY}`);
        for(const respuesta of respuestas){
            const { platforms } = respuesta;
            platforms.map(platformAUX => {
                const { platform } = platformAUX;
                platformsDB.push(platform.name);
            })
        }

        for(const platform of platformsDB) {
            try {
                await Platform.findOrCreate({
                    where: { name: platform }
                });
            } catch (error) {
                console.error('Error al guardar el equipo en la base de datos:', error);
            }
        }

        for(const genre of genres) {
            try {
                await Genre.findOrCreate({
                    where: { name: genre }
                });
            } catch (error) {
                console.error('Error al guardar el equipo en la base de datos:', error);
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = saveGenres;