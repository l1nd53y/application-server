const express = require("express");
const path = require('path'); //a node native module
const {Item, Restaurant, Menu} = require('./models/index');


const app = express();
const port = 3000;

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?

// 1)client makes a request -> request URL -> URL -> http request -> http response

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//will add routes
app.get('/items', async (req, res) => {
    //goes into the database and looks for all Items
    const allItems = await Item.findAll()
    //server will respond with all the items found in the database
    res.json(allItems)
})

app.get('/randomItem', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 3)
    const randomItem = await Item.findByPk(randomNum)

    res.json(randomItem)
})

//////// Assignment 7/14 code /////////

app.get('/flipcoin', async (req, res) => {
    const randomNumber = Math.floor(Math.random() * 2);
    const heads = "heads";
    const tails = "tails";
    if(randomNumber === 1){
        res.send(heads);
    }else{
        res.send(tails);
    }
});

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.findAll()
    res.json(allRestaurants)
})

//////// Assignment 7/15 code /////////

// Find by restaurant id, show menu & menu items for restaurant
app.get('/restaurants/:id', async (req, res) => {
    let restaurant = await Restaurant.findByPk(req.params.id, {include: Menu, nested: true});
    let menu  = await Menu.findByPk(req.params.id, {include: Item, nested: true});
	res.json({ restaurant, menu })
})

//////// CRUD Assignment 7/15 code /////////

// Add new restaurant
app.post('/restaurants', async (req, res) => {
    let newRestaurant = await Restaurant.create(req.body);
    res.send('Created restaurant~')
})
// Delete a restaurant
app.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.destroy({
        where : {id : req.params.id} // Destroy an Restaurant where this object matches
    })
    res.send("Deleted restaurant~")
})
// Update a restaurant (PUT)
app.put("/restaurants/:id", async (req, res) => {
    let updated = await Restaurant.update(req.body, {
        where : {id : req.params.id} // Update a restaurant where the id matches, based on req.body
    })
    res.send("Updated restaurant~")
})

//////// 7/16 ADDING PATCH /////////

// Partial update of a menu item (PATCH)
app.patch("/items/:id", async(req, res) => {
	await Item.update(req.body, {
		where : {id : req.params.id}
	})
	res.send("Updated item field~")
})

// Partial update a restaurant (PATCH)
app.patch("/restaurants/:id", async(req, res) => {
	await Restaurant.update(req.body, {
		where : {id : req.params.id}
	})
	res.send("Updated restaurant field~")
})

//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);

})
