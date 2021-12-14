
const mongoose = require('mongoose')
const UserM = require('./models/User')
const TeamM = require('./models/Team')
const User = require('./models/User')

/**
 * @description establish the connection with the database by using the variable located in /config/config.env
 */
module.exports.openConnectionDB = async function openConnectionDB() {
  try {
      const connection = await mongoose.connect(process.env.MONGO_URI)
  } catch(e) {
    onsole.error(e)
    process.exit(1)
  }
}
/**
 * @description takes the teamname and will return the file found inside the mondodb
 * @param {string} teamname
 * @returns the team bson file within the db using the query of teamname
 */
module.exports.loadTeam = async function loadTeam(teamname) {
    const query = {teamName: teamname}
    var data = TeamM.findOne(query)
    return data
}

/**
 * @description returns all the teams in the table in an array format
 * @returns an array of all teams in the metatable
 */
module.exports.loadAllTeams = async function loadAllTeams() {
  var query = TeamM.find()
  return query
}

/**
 * @description inserts a new team inside the database with a list of members, duplicate errors are handled here as well
 * @param {string} teamname 
 * @param {list} memberNames 
 * @param {string} scrumMaster 
 */
module.exports.insertTeam = async function insertTeam(teamname, memberEmails, scrumMasterEmail, counter) {
    var validate = false
    const query = {teamName: teamname}
    if(!(await TeamM.findOne(query))) {
      validate = true
      const numMembers = memberEmails.length
      const newFile = new TeamM({
        "teamName": teamname.toLowerCase().trim(),
        "members": memberEmails,
        "scrumMaster": scrumMasterEmail.toLowerCase().trim(),
        "totalMembers": numMembers,
        "sprints": [], 
        }, )
        newFile.save(function(err, team) {
          if(err)
            console.error(err)
            else
            console.log(`${newFile.team_name} created`)
        })
    } else {
      console.error(`${teamname} already exists`)
    }
    return validate
}

/**
 * @description adds new sprint to the team
 * @param {string} teamname 
 * @param {int} sprint_number
 */
 module.exports.new_sprint = async function new_sprint(teamname, memberData, counter) {
  
  TeamM.findOneAndUpdate({teamName: teamname, counter}, { $push: {sprints:{'sprintnum': counter, 'stars': memberData}}},
  function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })

 }

 /**
 * @description updates sprint values
 * @param {string} teamname 
 * @param {int} sprint_number
 */
  module.exports.update_sprint = async function update_sprint(teamname, update_data, sprint) {
  
    TeamM.findOneAndUpdate({teamName: teamname, sprint}, { $set: {sprints:{'sprintnum': sprint, 'stars': update_data}}},
    function (error, success) {
      if (error) {
        console.log(error)
      } else {
        console.log(success)
      }
    })
  
   }

/**
 * @description this will delete the file of the teamname specified
 * @param {string} teamname 
 */
module.exports.deleteTeam = async function deleteTeam(teamname) {
    const query = {teamName: teamname}

    await TeamM.deleteOne(query)
    console.log(`${response.team_name} deleted`)
}

/**
 * @description allows you to check the database for an email
 * @param {String} emailToCheck 
 * @returns boolean
 */
module.exports.check_email = async function check_email(emailToCheck) {
  const validate = false
  const query = {email: emailToCheck}

  if(await UserM.findOne(query)) {
    validate = true
  }
  return validate
}