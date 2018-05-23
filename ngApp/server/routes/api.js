const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://user1:userpass@ds243418.mlab.com:43418/videoplayertrial";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err) {
		console.error("Error! " + err);
	} else {
		console.log("Successfully connected with database");
	}
});

router.get('/videos', function(req, res) {
	console.log("Fetch all the videos");
	Video.find({})
	.exec(function(err, videos) {
		if(err) {
			console.log(err);
		} else {
			res.json(videos);
		}
	}); 
});

router.get('/video/:id', function(req, res) {
	console.log("Fetch a single video");
	Video.findById(req.params.id)
	.exec(function(err, video) {
		if(err) {
			console.log("Unable to fetch the data");
		} else {
			res.json(video);
		}
	}); 
});

router.post('/video', function(req, res) {
	console.log("Post a video");
	var newVideo = new Video();
	newVideo.title = req.body.title;
	newVideo.url = req.body.url;
	newVideo.description = req.body.description;
	newVideo.save(function(err, video) {
		if(err){
			console.log("Error saving video");
		} else {
			res.json(video);
		}
	});
});

router.put('/video/:id', function(req, res) {
	console.log("Update the video");
	Video.findByIdAndUpdate( req.params.id, 
		{
			$set: {title: req.body.title, url: req.body.url, description: req.body.description} 
		},
		{
			new: true
		},
		function(err, video) {
			if(err){
				console.log("Error updating video");
			} else {
				res.json(video);
			}
		}
	);
});

router.delete('/video/:id', function(req, res) {
	console.log("Delete a video");
	Video.findByIdAndRemove( req.params.id, function(err, video) {
		if(err){
			console.log("Error deleting video");
		} else {
			res.json(video);
		}
	});
});
 
module.exports = router;