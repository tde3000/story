var db = require('mongoose');
var Schema = db.Schema;

var UserSchema = new Schema({
    name: String
});

module.exports = db.model('User', UserSchema);