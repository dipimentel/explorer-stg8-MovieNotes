const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")
const bcrypt = require("bcrypt")


class UserController {

    async create(req, res) {
        const { name, email, password } = req.body;

        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso")
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await database.run(`
            INSERT INTO users
            (name, email, password)
            VALUES
            (?, ?, ?)`, [name, email, hashedPassword]
        );

        return res.status(201).json();

    }

    async update(req, res) {
        const { name, email, password, oldPassword } = req.body;
        const { id } = req.user;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [ id ]);

        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [ email ]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        user.email = email ? email : user.email;
        user.name = name ? name : user.name;

        if (password && !oldPassword) {
            throw new AppError("É necessário informar a senha antiga");
        }

        if (oldPassword && !password) {
            throw new AppError("É necessário informar a nova senha");
        } 

        if (password && oldPassword) {
            const checkOldPassword = await bcrypt.compare(oldPassword, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga está incorreta.")
            }

            user.password = await bcrypt.hash(password, 8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [ user.name, user.email, user.password, id]

        );

        return res.json();
    }
}

module.exports = UserController;
