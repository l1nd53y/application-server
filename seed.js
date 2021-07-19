const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') //Q: WHY import these models from index vs. from each separate model file?

//Q: Why do you think each object inside of the arrays are structured the way that they are?
//Q: What do you think will happen when we 'seed' this file?
const seedRestaurant = [
  {
    name: 'Pizza Planet',
    location: 'San Francisco',
    cuisine: 'Galactic',
    image: '/img/PizzaPlanet.png'
  },
  {
    name: 'Gusteau\'s',
    location: 'Paris',
    cuisine: 'French',
    image: '/img/Gusteaus.jpg'
  },
  {
    name: 'The Snuggly Duckling',
    location: 'Forest of Corona',
    cuisine: 'German',
    image: '/img/SnugglyDuckling.jpg'
  },
  {
    name: 'Harryhausen\'s',
    location: 'Monstropolis',
    cuisine: 'Japanese',
    image: '/img/Harryhausens.jpg'
  },
  {
    name: 'Tiana\'s Palace',
    location: 'New Orleans',
    cuisine: 'Southern',
    image: '/img/TianasPalace.jpg'
  },
]

const seedMenu = [
  {
    title: 'Breakfast',
    restaurant_id : 1,
  },
  {
    title: 'Lunch',
    restaurant_id : 2,
  },
  {
    title: 'Dinner',
    restaurant_id : 3,
  },
]

const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true,
    menu_id : 3,
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false,
    menu_id : 2,
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false,
    menu_id : 1,
  }
]

//Q: Try to decifer the following function.
//Q: Why are we using async and await?
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true})
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })

