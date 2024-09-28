const express = require('express');
const router = express.Router();
const ticket = require('../modules/tickets');
const Comment = require('../modules/comments');
router.post('/add', (req, res) => {
    data = req.body;
   
    usr = new ticket(data);
    usr.creatAt= new Date();
    usr.save()
        .then((saveduser) => {
            res.status(200).send(saveduser)
        }
        )
        .catch((err) => {
            res.status(400).send(err)
        })

});
router.post('/creat', async (req, res) => {
    try {
        data = req.body;
        usr = new ticket(data);
        saveduser = await usr.save();
        res.status(200).send(saveduser)
    } catch (err) {
        res.status(400).send(err)
    }
});

router.get('/getall', async (req, res) => {
   
    try {
        users = await ticket.find();
        res.status(200).send(users);


    } catch (err) {
        res.send(err)
    }

});
//find tickets of user{id}
router.get('/getall/:id', async (req, res) => {
    id = req.params.id
    try {
        tickets = await ticket.find({userid : id});
        if(tickets){
        res.status(200).json(tickets);}
        else{
            res.send([]);
        }


    } catch (err) {
        res.send(err)
    }

});
// find ticket par son id
router.get('/getbyId/:id', async (req, res) => {
    try {
        id = req.params.id
        users = await ticket.findById({ _id: id });
        res.status(200).send(users);


    } catch (err) {
        res.send(err)
    }

});




router.put('/update/:id', async (req, res) => {
    try {
        id = req.params.id;
        newdata = req.body;
        newticket = await ticket.findByIdAndUpdate({ _id: id }, newdata);
        res.status(200).send(newticket);


    } catch (err) {
        res.send(err);
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Find the ticket to be deleted
        const ticketToDelete = await ticket.findById(id);

        if (!ticketToDelete) {
            return res.status(404).send("Ticket not found");
        }

        // Delete all comments associated with the ticket
        await Comment.deleteMany({ _id: { $in: ticketToDelete.comments } });

        // Delete the ticket
        await ticketToDelete.deleteOne(); // Corrected line

        res.status(200).send("Ticket and associated comments deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});



router.get('/nbrtickets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tickets = await ticket.find({ userid: id });
        if (tickets) {
            const nbr = tickets.length;
            res.status(200).send(nbr.toString()); // Convert nbr to a string before sending
        } else {
            res.status(200).send('0'); // If no tickets found, send '0'
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;