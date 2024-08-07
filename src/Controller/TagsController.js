const knex = require("../database/knex");

class TagsController {
    async index(req, res) {
        const user_id = req.user.id;

        const userTags = await knex("movie_tags").where({ user_id });

        return res.json(userTags);
    }
}

module.exports = TagsController;