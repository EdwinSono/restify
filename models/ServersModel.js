var config = require('../config');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config[process.env.ENVIRONMENT].database);
var Schema = mongoose.Schema;
var data = new Schema({
	ip		: { type: String, require: true },
	port	: { type: String, require: true },
	users	: Number,
	active	: { type: Boolean, default: true }
});
module.exports = conn.model('servers', data);