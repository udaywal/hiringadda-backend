const bcrypt = require('bcryptjs')
const saltRounds = 10

/* Custom Library */
let logger = require('../libs/loggerLib')

/* encrypting the password for security purpose */
let hashpassword = (myPlaintextPassword) => {
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(myPlaintextPassword, salt)
  return hash
}

// this is async. way (we are using it!)
let comparePassword = (oldPassword, hashpassword, cb) => {
  bcrypt.compare(oldPassword, hashpassword, (err, res) => {
    if (err) {
      logger.error(err.message, 'Comparison Error', 5)
      cb(err, null)
    } else {
      cb(null, res)
    }
  })
}

// this is sync. way (we will not use this)
let comparePasswordSync = (myPlaintextPassword, hash) => {
  return bcrypt.compareSync(myPlaintextPassword, hash)
}

module.exports = {
  hashpassword: hashpassword,
  comparePassword: comparePassword,
  comparePasswordSync: comparePasswordSync
}
