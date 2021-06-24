/** @format */
const express = require('express');
const cors = require('cors');
const pool = require('./pgconnect');
// const _3DES = require('nodejs3des');
const app = express();
const port = 3011;
const Vonage = require('@vonage/server-sdk')

// const fnc = require('./assets/js/function')
// const mahoa = require('./assets/js/MaHoa');
const { response } = require('express');
// const fileUpload = require('express-fileupload');
// const {save } = require('save-file')
// import xlsx from 'node-xlsx'
// import fs from 'fs'
app.use(express.static('public')); //to access the files in public folder
// app.use(fileUpload());

app.use(cors());
app.use(express.json());

app.use(cors());
app.listen(process.env.PORT || port, () => {
	console.log('Port : ' + port);
});

app.get('/0366262072/ChatZalo' , async (req,res)=>{
	try {
		const newTodo = await pool.query(`
			select * from chatzalo
		`)
		res.json(newTodo.rows)
	} catch (error) {
		
	}
})


app.post(`/0366262072/ChatZalo` , async (req,res)=>{
	try {
		const {id,name,image,profile,phone,note,sex,birthday} = req.body
		const checkQuery = await pool.query(`
		select * from chatzalo where id = ${id}
	`)
		if(checkQuery.rows.length > 0){
			const update = await pool.query(`
				update chatzalo set name=N'${name}',image=N'${image}',profile=N'${profile}',
				phone=N'${phone}',note= N'${note}',sex=N'${sex}',birthday=N'${birthday}'
				where id = ${id}
			`)
		}else{
			const excuteQuery = await pool.query(`
			insert into chatzalo(id,name,image,profile,phone,note,sex,birthday)
			values(${id},N'${name}',N'${image}',N'${profile}',N'${phone}',N'${note}',
			N'${sex}',N'${birthday}'
			)
		`)
		}
		res.json('Succes')
	} catch (error) {
		console.log(error)
	}
})



const vonage = new Vonage({
  apiKey: "65a5ab17",
  apiSecret: "TyQYNha71pPg0Ilk"
})

app.get(`/sendsms` , async (req,res)=>{
	try {
		const from = "ThanhTung"
		const to = "84366262072"
		const text = 'Chào mừng bạn tới đây'
		
		vonage.message.sendSms(from, to, text, (err, responseData) => {
			if (err) {
				console.log(err);
			} else {
				if(responseData.messages[0]['status'] === "0") {
					console.log("Message sent successfully.");
				} else {
					console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
				}
			}
		})
	} catch (error) {
		
	}
})