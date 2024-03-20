require("dotenv").config();
const { URL, API_KEY } = process.env;
const getResultAPI = require('./getResultsAPI')
const { Videogame, Genre, Platform } = require('../db.js');
const axios = require("axios");

const getVideogamesById = async (req, res) =>{
    try {
        const id = req.params.id;
        let respuesta = {};
        console.log(id)
        if((isNaN(id)) && (id.length === 36)){
            let videogameDB = await Videogame.findByPk(id, {
                include: [{
                    model: Genre,
                    through: 'videogame_genre',
                    as: 'genres'
                },
                {
                    model: Platform,
                    through: 'videogame_platform',
                    as: 'platforms'
                }]
            })
            
            respuesta = { 
                id: videogameDB.dataValues.id,
                name: videogameDB.dataValues.name,
                description: videogameDB.dataValues.description,
                image: videogameDB.dataValues.image,
                release: videogameDB.dataValues.release,
                raiting: videogameDB.dataValues.rating,
                platforms: videogameDB.platforms.map(platform => platform.dataValues.name),
                genres: videogameDB.genres.map(genre => genre.dataValues.name),
                location: 'DB'
            }

            return res.status(200).json(respuesta);
        }else if(Number(id)){
            const { data } = await axios.get(`${URL}/games/${id}?key=${API_KEY}`);
            if(data.id){
                const { id, name, background_image, platforms, description, released, rating, genres } = data;
                
                const platformsAPI = [];
                const genresAPI = [];
                platforms.map(Platform => {
                    platformsAPI.push(Platform.platform.name)
                })
                genres.map(genre => {
                    genresAPI.push(genre.name)
                })
                const videogameAPI = { 
                    id, 
                    name, 
                    image: background_image,
                    description, 
                    released, 
                    rating,
                    platforms: platformsAPI, 
                    genres: genresAPI,
                    location: 'API'
                }


                return res.status(200).json(videogameAPI);
            }
        }else 
            return res.status(404).send("Id no valido.");
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getVideogamesById;