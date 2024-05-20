const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password, phone, username } = req.body;

        if (!email || !password || !phone || !username) {
            return res.status(400).json({ error: 'Missing parameter' });
        }

        let existingUser = await User.findOne({email})

        if (existingUser) {
            return res.json('User already exists');
        }
        
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            phone: phone,   
            avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/jitsimeet-1234.appspot.com/o/person.jpg?alt=media&token=864aad43-e4cb-4b1b-bf93-9cff57e16d15',
            role: 3
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Created successfully!"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create! Try again!"
        });
    }
};

// user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing parameter' });
        }
        
        const user = await User.findOne({email});

        // if user doesn't exist
        if(!user)
        {
            return res.json('User not found');
        }

        // if the password is incorrect
        const isPasswordMatch = (req.body.password === user.password);

        if(!isPasswordMatch)
        {
            return res.json('Incorrect email or password');
        }

        const { _id, username, phone, avatarUrl, role } = user;

        const now = new Date()

        const token = jwt.sign({
            aud: 'jitsi',
            context: {
              user: {
                id: _id,
                name: username,
                avatar: avatarUrl,
                email: email,
                role: role,
                moderator: 'true',
              },
              features: {
                livestreaming: 'true',
                recording: 'true',
                transcription: 'true',
                "outbound-call": 'true'
              }
            },
            iss: 'chat',
            room: '*',
            sub: "vpaas-magic-cookie-aa87917959cf4f0f95d3b5eac48edb1e",
            exp: Math.round((now.setDate(now.getDate() + 5)) / 1000),
            nbf: (Math.round((new Date).getTime() / 1000) - 10)
          }, process.env.JWT_SECRET_KEY.replace(/\\n/g, '\n'), { algorithm: 'RS256', header: { kid: "vpaas-magic-cookie-aa87917959cf4f0f95d3b5eac48edb1e/272d95" } })


        res.status(200).json({
            success: true,
            token,
            message: "Successfully logged in",
            user: { _id, phone, email, avatarUrl, role, username },
        });

    } catch (err) {
        res.status(500)
            .json({
                success: false,
                message: 'Login failed!'
            });

            console.log(err)
    }
};

module.exports = {register, login}