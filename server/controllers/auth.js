const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register(req, res) {
    const {firstname, lastname, email, password} = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear el usuario" });
        } else {
            res.status(200).send(userStorage);
        }
    })
}

function login(req, res) {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contaseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
           bcrypt.compare(password, userStorage.password, (bcrypterror, check) => {
                if (bcrypterror) {
                    res.status(500).send({ msg: "Error del servidor" });
                } else if (!check) {
                    res.status(400).send({ msg: "Datos de acceso incorrectos" });
                } else if (!userStorage.active) {
                    res.status(401).send({ msg: "Usuario no autorizado" });
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage),
                    });
                }
           });
        }
    });
}

function refreshAccessToken(req, res) {
    const { token } = req.body;
    const { user_id } = jwt.decode(token);
    
    User.findOne({ _id: user_id }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
};