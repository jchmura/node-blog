'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
	date: Date,
	content: String,
	media: {
        images: [String],
        videos: [String]
	},
    comments: [
        {
            author: String,
            content: String,
            date: Date
        }
    ]
	
});

module.exports = mongoose.model('Story', StorySchema);