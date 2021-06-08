const http= require('http');
const fs= require("fs");

var requests = require("requests");

const homeFile = fs.readFileSync('home.html', "utf-8");

const replaceVal = (tempVal, orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    return temperature;
};

const server = http.createServer((req, res)=>
{
    if(req.url=="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=fc3f1cf4f299bd1945c0e4244bd593e8")
        .on('data',  (chunk)=> {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
        //  console.log(arrData[0].main.temp);
        const realTimeData= arrData.map((val)=>
        
        {

            replaceVal(homeFile,val);


            
        }
        
        
        
        ).join("");
        console.log(realTimeData);

        })
        .on('end', (err) => {
          if (err) return console.log('connection closed due to errors', err);
         res.end();
          console.log('end');
        }); 
    }
}
);

server.listen(3000, "127.0.0.1");
