// Import des modules nécessaires
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require('../modules/user');
const password= async(email)=>{
    user = await User.findOne({email:email});
    return user ? user.password: null;
}


// Fonction pour envoyer un email
const nodemailerfun = async (email) => {
   const  userpas=await password(email);
    try {
        // Création du transporteur SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "houssemnaffouti28@gmail.com",
                pass: "ixfp aemd pcok pmfm",
            },
        });

        // Définition du message à envoyer
        const message = {
            from: '"houssem naffouti" <houssemnaffouti28@gmail.com>',
            to: email,
            subject: "votre password",
            text: "votre password est  :"+ userpas,
            html: "<b>votre password est :</b>"+userpas,
        };

        // Envoi du mail avec le transporteur défini
        const info = await transporter.sendMail(message);
        console.log("Mail sent: " + info.response);
    } catch (err) {
        console.error(err);
    }
};



const emailbyid = async (id) => {
    try {
        const user = await User.findOne({ _id: id });
        return user;
    } catch (err) {
        console.error(err);
        return null; // Gérer l'erreur ou retourner une valeur par défaut
    }
}


const nodemailerupdate = async (id) => {
   // const  userpas=await password(email);
     try {
         // Création du transporteur SMTP
         const transporter = nodemailer.createTransport({
             host: "smtp.gmail.com",
             port: 465,
             secure: true,
             auth: {
                 user: "houssemnaffouti28@gmail.com",
                 pass: "ixfp aemd pcok pmfm",
             },
         });
         const emaill = await emailbyid(id);
         // Définition du message à envoyer
         const message = {
             from: '"houssem naffouti" <houssemnaffouti28@gmail.com>',
             to: emaill.email,
             subject: "Notification",
             text: "Your report has been replied, go and check",
             html: `Your report has been replied, go and check`,
         };
 
         // Envoi du mail avec le transporteur défini
         const info = await transporter.sendMail(message);
         console.log("Mail sent: " + info.response);
     } catch (err) {
         console.error(err);
     }
 };
// Route pour envoyer un mot de passe
router.post('/getpassword', async (req, res) => {
    const { email } = req.body;
    
    // Check if the email exists in your database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({ message: "Email not found.", find:"non"});
    }

    // If the email exists, proceed to send the password reset email
    await nodemailerfun(email);
    
    res.status(200).json({ message: "Email sent successfully.",find:"oui" });
});


router.get('/updateprofile/:id', async (req, res) => {
    id = req.params.id
    await nodemailerupdate(id);
    
    res.status(200).json({ message: "Email sent successfully." });
});
// Export du router
module.exports = router;
