require("dotenv").config();
const { URL, API_KEY } = process.env;
const getResultAPI = require('./getResultsAPI')
const { Videogame, Genre, Platform } = require('../db.js')

const getVideogames = async (req, res) =>{
    try {
        let videogames = [];
        const videogamesAPI = [];
        const respuestas = await getResultAPI(`${URL}/games?key=${API_KEY}`);
        for(const respuesta of respuestas){
            const {id, name, background_image, genres, rating} = respuesta;
            videogamesAPI.push({id, name, image: background_image, genres: genres.map(genre => genre.name), rating, location: 'API'});
        }

        const videogamesDB = await Videogame.findAll({
            include: [
                {
                    model: Genre,
                    through: 'videogame_genre',
                    as: 'genres'
                }
            ]
        })

        let modifiedVideogames = [];

        if(videogamesDB){
            modifiedVideogames = videogamesDB.map(videogame => {
                return {
                    id: videogame.dataValues.id,
                    name: videogame.dataValues.name,
                    image: videogame.dataValues.image,
                    rating: videogame.dataValues.rating,
                    genres: videogame.genres.map(genre => genre.dataValues.name),
                    location: 'DB'
                }
            })
        }

        if(videogamesAPI.length > 0 || videogamesDB > 0){
            videogames = [
                ...modifiedVideogames,
                ...videogamesAPI
            ]
        }
        if(videogames.length > 0){
            return res.status(200).send(videogames);
        }else{
            return res.status(404).send("No se encontraron datos en videogames.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
} 
module.exports = getVideogames;
