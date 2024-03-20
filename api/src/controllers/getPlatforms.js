const { Platform } = require('../db.js');

const getPlatforms = async (req, res) =>  {
    try {
        const platforms = await Platform.findAll();
        if(platforms.length)
            return res.status(200).json(platforms);
        return res.status(404).send('No se encontraron los generos.')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = getPlatforms