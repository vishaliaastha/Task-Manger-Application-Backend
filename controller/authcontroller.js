const UserModels = require("../model/UserModel")
const bcrypt = require("bcrypt")
const  SECRET_KEY = "Node_API"
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {

    const { name, email, password } = req.body

    try {


        const isUserPersent = await UserModels.findOne({ email: email });
        if (isUserPersent) {
            return res.status(400).json({ message: "User already exist" })
        }


        const hasedPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModels.create({
            email: email,
            password: hasedPassword,
            name: name

        });

        const token = jwt.sign({ email: createUser.email, id: createUser._id }, SECRET_KEY);
        res.status(201).json({ user: createUser, token: token })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });

    }

}

const signin = async (req, res) => {


    const { email, password } = req.body;

    try {

        const existingUser = await UserModels.findOne({ email: email })

        if (!existingUser) {
            return res.status(404).json({ message: "user not found  " })
        }


        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid" })

        }


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY , { expiresIn: "2h" });

        res.status(201).json({ user: existingUser, token: token })
 
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }

}


module.exports = { signup, signin }



