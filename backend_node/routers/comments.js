const express = require('express');
const router = express.Router();
const Comment = require('../modules/comments');

const Ticket = require('../modules/tickets'); 

router.post('/addcomment/:ticketId', async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).send("Ticket not found");
        }

        const commentData = req.body;
        const newComment = new Comment({
            ...commentData,
            creatAt: new Date() // Utiliser getTime() pour obtenir le temps en millisecondes
        });
        const savedComment = await newComment.save();

        // Vérifier si la liste de commentaires existe dans le ticket
        if (!ticket.comments) {
            ticket.comments = [];
        }

        // Ajouter le nouvel ID de commentaire à la liste des commentaires du ticket
        ticket.comments.push(savedComment);

        // Sauvegarder le ticket mis à jour avec le nouvel ID de commentaire
        const updatedTicket = await ticket.save();

        res.status(200).send(updatedTicket);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});



router.post('/creat', async (req, res) => {
    try {
        const data = req.body;
        const newComment = new Comment(data);
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/getall', async (req, res) => {
    try {
        commentss = await Comment.find();
        res.status(200).send(commentss);


    } catch (err) {
        res.send(err)
    }

});

router.get('/getbyId/:id', async (req, res) => {
    try {
        id = req.params.id
        commentss = await Comment.findById({_id: id });
        res.status(200).send(commentss);


    } catch (err) {
        res.send(err)
    }

});




router.put('/update/:id', async (req, res) => {
    try {
        id = req.params.id;
        newdata = req.body;
        newuser = await Comment.findByIdAndUpdate({ _id: id }, newdata);
        res.status(200).send(newuser);


    } catch (err) {
        res.send(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        id = req.params.id;
        commentdell = await Comment.findByIdAndDelete({ _id: id })
        res.status(200).send(commentdell);

    } catch (err) {
        res.send(err)
    }







});



module.exports = router;