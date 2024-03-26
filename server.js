const express = require('express'); //เรียกใช้ express ที่ตั้งตั้งไว้
const app = express();  //  เก็บ Express ไว้ในตัวแปร app เพื่อกำหนด routes และตัวแสดงผลของแอปพลิเคชั

require("dotenv").config();
const PORT = process.env.PORT;

//parse request of content-type - application/json
app.use(express.json());

//parse request of content-type - application/json/x-www-urlencoded
app.use(express.urlencoded({extended: true}));

const db = require('./app/models/')
db.sequelize.sync({force:false}).then(() => {
    console.log('Database Syncing...');
});

app.get('/', (req, res) =>  {  //การทำงานของ callback function เป็น object ที่ใช้ในการจัดการ request และ response ที่เข้ามายังเว็บแอปพลิเคชัน
     res.send('#### Defaukt Route ####')
});

require('./app/routes/employee.route')(app);

app.listen(PORT, () => {  //เริ่มต้นเซิร์ฟเวอร์บนพอร์ต 5000 ส่งข้อความ "Hello World!" กลับไปเมื่อมีการเข้าถึงเส้นทาง
    console.log(`Server is running no port ${PORT}`); //แสดงข้อมูลบนคอนโซลของเบราว์เซอร์ หรือโปรแกรมที่รัน
}); 