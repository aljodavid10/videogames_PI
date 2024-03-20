const { Videogame, Genre, Platform } = require('../db.js');

const postVideogame = async (req, res) =>{
    try {
        const { name, description, image, release, rating, platforms, genres } = req.body;

        if( ![ name, description, image, release, rating, platforms, genres ].every(Boolean) || (rating < 0 && rating > 5)) 
            return res.status(401).json({message: "Faltan datos"});

        
        const [newVideogame, created ] = await Videogame.findOrCreate({
            where:{
                name
            }, defaults: {
                description,
                image,
                release,
                rating
            }
        })

        if(created){
            const platformsNew = [];
            const genresNew = [];


            for(const namePlatform of platforms){
                let [ platform ] = await Platform.findOrCreate({where: {name: namePlatform}})
                platformsNew.push(platform);
            }

            for(const nameGenre of genres){
                let [ genre ] = await Genre.findOrCreate({where: {name: nameGenre}});
                genresNew.push(genre);
            }

                newVideogame.addPlatforms(platformsNew);
                newVideogame.addGenres(genresNew);
                return res.status(200).send(newVideogame);
        }

        return res.status(500).json({ message: `El videojuego ${name} ya existe en la base de datos` });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = postVideogame;