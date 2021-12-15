'use strict'

const {db, models: {User, Applications} } = require('../server/db')
const jobs = require('./Application')
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }) // clears db and matches models to tables
    console.log('db synced!')

    // Creating Users
    const users = await Promise.all([
      User.create({ username: 'cody', password: '123', email: 'cody@gmail.com' }),
      User.create({ username: 'murphy', password: '123', email: 'murphy@banana.com' }),
    ])

    const apps = await Promise.all(
      jobs.map((jobsApp) => {
        return Applications.create(jobsApp)
      })
    )
      console.log(Object.keys(User.prototype)) // magic methods

    await Promise.all(users.map((user)=>
      user.addApplication(apps[Math.floor(Math.random() * apps.length)])
    ))

    // await users[0].addApplication(apps[0])
    // await users[0].addApplication(apps[1])
    // await users[0].addApplication(apps[2])

    // await users[1].addApplication(apps[0])
    // await users[1].addApplication(apps[1])
    // await users[1].addApplication(apps[2])

    console.log(`seeded ${users.length} users`)
    console.log(`seeded successfully`)
    return {
      users: {
        cody: users[0],
        murphy: users[1]
      }
    }

  } catch(error) {
    console.log(error)
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
