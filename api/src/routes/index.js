const router = require("express").Router();
const getVideogames = require('../controllers/getVideogames.js');
const getGenres = require('../controllers/getGenres.js');
const getVideogamesById = require("../controllers/getVideogamesById.js");
const getVideogamesByName = require("../controllers/getVideogamesByName.js");
const postVideogame = require("../controllers/postVideogame.js");
const getPlatforms = require("../controllers/getPlatforms.js");
router.get("/videogames", (req, res) => {
    if(req.query.name)
        getVideogamesByName(req, res);
    else
        getVideogames(req, res);
});
router.get("/genres", getGenres);
router.get("/platforms", getPlatforms)
router.get("/videogames/:id", getVideogamesById);
router.post("/videogames", postVideogame);

module.exports = router;
