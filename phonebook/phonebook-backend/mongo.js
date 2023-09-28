const mongoose = require("mongoose")

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log("Wrong number of arguments!")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackuser:${password}@cluster0.disc4ny.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then((result) => {
    console.log(`${result.name} saved!`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
