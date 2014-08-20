'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
	date: Date,
    title: String,
	content: String,
    slug: String,
    comments: [
        {
            author: String,
            content: String,
            date: Date
        }
    ]

});

module.exports = mongoose.model('News', NewsSchema);
