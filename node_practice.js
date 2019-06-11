const fs = require('fs');

const program = require('commander')
const { prompt}= require('inquirer')
const {newContactPrompts} = require('./prompts')
const {getContacts, saveContacts} = require('./utils')

const reqFile = require('../../testFile')

const file = fs.readFileSync('./node_practice.js', { encoding: 'UTF-8' }).toString()

// console.log(file)
// console.log('reqFile is ', reqFile)

program
  .version('0.0.1')
  .description('Address book CLI program')

program
  .command('new')
  .alias('n')
  .description('add a new contact')
  .action(() => {
    prompt(newContactPrompts)
      .then(({firstName, lastName, phoneNumber}) => {
        const key = firstName + ' ' + lastName
        const contacts = getContacts()
        contacts[key] = {firstName, lastName, phoneNumber}
        saveContacts(contacts)
      })
  })

  program
  .command('list')
  .alias('l')
  .description('list all contacts')
  .action(() => {
    const contacts = getContacts()
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select a contact',
        choices: Object.keys(contacts)
      }
    ])
      .then(({selected}) => {
        const contact = contacts[selected]
        console.log(JSON.stringify(contact, null, 2))
      })
  })

    program.parse(process.argv)