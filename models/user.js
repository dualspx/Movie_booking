var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	name: String,
	email: String,
	password: String
})

User = mongoose.model('User', userSchema);

module.exports = User
