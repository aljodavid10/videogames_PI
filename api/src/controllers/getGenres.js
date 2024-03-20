const { Genre } = require('../db.js');

const getGenres = async (req, res) =>  {
    try {
        const genres = await Genre.findAll();
        if(genres.length)
            return res.status(200).json(genres);
        return res.status(404).send('No se encontraron los generos.')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = getGenres