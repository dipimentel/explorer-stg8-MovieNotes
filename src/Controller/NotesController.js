const knex = require("../database/knex");
const AppError = require("../utils/AppError")

class NotesController {

    async create(req, res) {
        const { title, description, rating, tags } = req.body;
        const user_id = req.user.id;

        if (rating > 5 || rating <1) {
            throw new AppError("A nota deve estar entre 1 e 5.")
        } 

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id,
                user_id
            }
        })
        await knex("movie_tags").insert(tagsInsert);

        return res.status(201).json();
    }

    async show(req, res) {
        const { note_id } = req.params;

        const note = await knex("movie_notes").where({ id: note_id }).first();
        const tags = await knex("movie_tags").where({ note_id }).orderBy("name");

        return res.json({
            ...note,
            tags
        });
    }

    async delete(req, res) {
        const { note_id } = req.params;

        await knex("movie_notes").where({ id: note_id }).del();

        return res.json();
    }

    async index(req, res) {
        const { user_id, title, tags } = req.query;

        let notes;

        if (tags) {
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("movie_tags")
                .select(
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id"
                )
                .where("movie_notes.user_id", user_id)
                .whereLike("movie_notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
                .orderBy("movie_notes.title")
                .groupBy("movie_notes.title");

        } else {
            notes = await knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                tags: noteTags
            }
        })

        return res.json(notesWithTags);
    }

}

module.exports = NotesController;