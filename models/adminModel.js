var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	emailAdmin: String,
	passwordAdmin: String
})

User = mongoose.model('Admin', userSchema);

module.exports = User
