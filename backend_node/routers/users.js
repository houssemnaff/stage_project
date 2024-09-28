const express = require('express');
const router = express.Router();
const User = require('../modules/user');
const bcrypt = require('bcrypt');
router.post('/adduser', async (req, res) => {
    try {
        const userData = req.body;
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(200).json({ message: 'Cet utilisateur existe déjà' ,img:"yes"});
        }
      
        // Crée un nouvel utilisateur
       // const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt rounds
        //userData.password = hashedPassword;
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        res.status(200).json({ link: '/Client', message: 'Compte créé avec succès',img:"no" });
    } catch (error) {
        console.error('Erreur lors de la création du compte utilisateur :', error);
       
    }
});
router.post('/getuser', async (req, res) => {
    try {
        const data = req.body;
        const finduser = await User.findOne({email: data.email });
        if (!finduser) {
            return res.status(200).json({ link: '/Auth', message: "Ce compte n'existe pas",img:"yes" });
        }
       // const passwordMatch = await bcrypt.compare(data.password, finduser.password);

        if (finduser.password !== data.password) {
            return res.status(200).json({ link: '/Auth', message: "Le mot de passe est incorrect",img:"yes" });
        }

        if (finduser.role === 'admin') {
            return res.status(200).json({ link: '/admin', message: 'admin',user:finduser ,img:"no" });
        }

        
       // var token = jwt.sign({ finduser }, 'shhhhh');
        res.status(200).send({ link: '/Client' ,message:"client",user:finduser,img:"no"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur interne du serveur s'est produite" });
    }
});

router.get('/getall',async (req,res)=>{
    try {
        users = await User.find();
        res.status(200).send(users);


    } catch (err) {
        res.send(err)
    }


});
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id; // Ensure to use const for variables
    try {
        // Find the user by ID and delete it
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).send("User deleted");
        } else {
            res.status(400).send("User not found");
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
    }
});


router.put('/updateuser/:id', async (req, res) => {
    try {
        id = req.params.id;
        newdata = req.body;
        newuser = await User.findByIdAndUpdate({ _id: id }, newdata);
        res.status(200).send(newuser);


    } catch (err) {
        res.send(err);
    }
});
router.get('/getuserbyid/:id',async (req,res)=>{
    try {
        id = req.params.id
        user = await User.findById({ _id: id });
        if(user){
        res.status(200).send(user);
    }else{
        res.status(404).send("not found");
    }

    } catch (err) {
        res.send(err)
    }
});
module.exports = router;
