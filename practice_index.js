const program = require('commander')
const { prompt } = require('inquirer')
const {newContactPrompts} = require('./prompts')
const { getContacts, saveContacts } = require('./utils')

const fs = require('fs')

const templateData = fs.readFileSync('./_template/model.js', 'utf8')


async function readTemplate () {
  try {
    const data = await fs.readFile('./_template/model.js', (err,val) => {
      if (err) throw err
      let a = val;
      return a;
    });
  }
  catch (err) { console.error( err ) }
};

const templateDataAsync = readTemplate()

function test() {
  console.log('file added');
}

program
  .version('0.0.1')
  .description('Address book CLI program')

program
  .command('new')
  .alias('n')
  .description('add a new contact')
  .action(() => {
    prompt(newContactPrompts)
      .then(({ model}) => {
        fs.mkdir(model, 0o776, (err) => {
          try {
            fs.writeFileSync(`${model}/${model}.js`,`(${test.toString()}())`);
            fs.writeFileSync(`${model}/${model}.routes.js`,`${templateData}`)
            fs.writeFileSync(`${model}/${model}.controler.js`,`${test.toString()}`)
            fs.writeFileSync(`${model}/${model}.dummyData.js`,`${test.toString()}`)
          } catch (e) {
              console.log("File creation not possible",e)
          }
        })
       
        // const key = model + ' ' + route
        // const contacts = getContacts()
        // contacts[key] = {model, route, controller}
        // saveContacts(contacts)
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
