module.exports = function(mongoose){

	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		email: String,
		password: String,
		name : String,
		emailVerified : Boolean,
		emailVerificationCode : String,
		provider: String,
		salt : String,
		createdAt : Date
	});

	return mongoose.model('User', userSchema);

};