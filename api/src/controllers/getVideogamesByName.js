require("dotenv").config();
const { URL, API_KEY } = process.env;
const getResultAPI = require('./getResultsAPI')
const { Videogame, Genre, Platform } = require('../db.js');
const axios = require("axios");
const { Op, fn, col } = require('sequelize');

const getVideogamesByName = async (req, res) => {
    try {
        
        const nameQuery = req.query.name;
        const lowerCaseName = nameQuery.toLowerCase();
        const formattedAPI = lowerCaseName.replace(/\s+/g, '-');
        
        const { data } = await axios.get(`${URL}/games?key=${API_KEY}&search=${formattedAPI}`);
        
        const datos = data.results;

        const videogamesAPI = []

        datos.map(({id, name, background_image,  genres, rating}) => {
            const genresAPI = [];
            genres.map(genre => {
                genresAPI.push(genre.name)
            })
            videogamesAPI.push({id, name, image:background_image, genres: genresAPI, rating, location: 'API'})
        })
        
        const videogamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `%${nameQuery}%`
                }
            }, include: [{
                model: Genre,
                through: 'videogame_genre',
                as: 'genres'
            }]
        });


        let modifiedVideogames = [];

        if(videogamesDB){
            modifiedVideogames = videogamesDB.map(videogame => {
                console.log(videogame);
                return {
                    id: videogame.dataValues.id,
                    name: videogame.dataValues.name,
                    rating: videogame.dataValues.rating,
                    genres: videogame.genres.map(genre => genre.dataValues.name),
                    location: 'DB'
                }
            })
        }

        const respuesta = [ ...modifiedVideogames, ...videogamesAPI ];
        if(respuesta.length > 0)
            res.status(200).json(respuesta);
        else
            res.status(404).send(`El videojuego con el nombre ${name} no fue encontrado`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getVideogamesByName;