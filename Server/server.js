var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

var curriculums = [];

app.use(cors());
app.use(bodyParser.json())
app.use('/api',bodyParser.urlencoded({extended:true}),router);

router.route('/curriculums')
	.get((req,res)=>
	{
		res.send(curriculums);
	})
	.post((req,res)=>
	{
		if(req.body.c !='')
		{
			let curriculum = {
				id:curriculums.length+1,
				c:req.body.c // request course

			};
			curriculums.push(curriculum);
		}
		
		res.send(curriculums);
	});

router.route('/curriculums/:curriculum_id')
	.delete((req,res)=>{
		if(req.params.curriculum_id>0)
		{
			curriculums.splice(req.params.curriculum_id-1,1);
			for(var i=0;i<curriculums.length;i++)
				curriculums[i].id = i+1;
		}
		res.send(curriculums);
	})




app.listen(80);