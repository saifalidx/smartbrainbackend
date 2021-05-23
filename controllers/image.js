const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey:'4936e78c924b44a48c2a74c0fcd17eff'
});

const handleApiCall = (req,res)=> {
	 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	 .then(data => {
	 	res.json(data);
	 })
	 .catch(err=>res.status(400).json('unable to get API'))
}

const handleImage= (req,res,db)=> {
		const { id } = req.body;
		db('users').where('id','=',id)
		.returning('entries')
		.increment('entries',1)
		.then(entries=> {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
	}

	module.exports={
		handleImage,
		handleApiCall
	}