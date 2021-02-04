const { createServer } = require('http');
const { readFileSync, readFile, writeFile, rename, write } = require('fs');
const { parse } = require('querystring');
const jfjfjrr = require('./dataj.json');

function whatMatters(re) {
    if (re.url.endsWith('\.css')) return "text/css";
    else if (re.url.endsWith('\.js')) return "text/javascript";
    else if (re.url.endsWith('\.png')) return "image/png";
    else if (re.url.endsWith('\.jpg')) return "image/jpeg";
    else return "text/plain";
}
createServer(function(req, res) {
if(req.url.indexOf("/login/") == 0) {
  const [email, pass, ...garb] = req.url.replace("/login/", "").split('/');
  let isFound = true;
  res.writeHead(200, {"Content-Type": "application/json"});
  for(let iii = 0; iii < jfjfjrr.length; iii++){
    if (jfjfjrr[iii].name == email && jfjfjrr[iii].password == pass) {res.end("{\"login\": true, \"data\": "+JSON.stringify(jfjfjrr[ii])+"}"); isFound = false;}
  }
  if (isFound)res.end("{\"login\": false}");
}else if(req.url == "/apiji/posts") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(readFileSync('./datak.json').toString());
} else if (req.url === "/chefssignature-menu" || req.url === "/chefssignature-menu/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync('./views/menu.html').toString().replace("{navbar}", readFileSync('./components/navbar.html').toString().replace("{imgurl}", "Chef's Signature")));
    } else if (req.url === "/" || req.url === "") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync('./views/index.html').toString().replace("{navbar}", readFileSync('./components/navbar.html').toString().replace("{imgurl}", "hello")));
    } else if (req.url === "/xingfupanda-menu" || req.url === "/xingfupanda-menu/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync('./views/menu2.html').toString().replace("{navbar}", readFileSync('./components/navbar.html').toString().replace("{imgurl}", "Indo Asian")));
    } else if (req.url === "/indomexican-menu" || req.url === "/indomexican-menu/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync('./views/menu3.html').toString().replace("{navbar}", readFileSync('./components/navbar.html').toString().replace("{imgurl}", "Indo Mexican")));
    } else if (req.url == "/backend/menu") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(readFileSync('./data/menu.json').toString());
    } else if (req.url == "/backend/menu2") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(readFileSync('./data/menu2.json').toString());
    } else if (req.url == "/backend/menu3") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(readFileSync('./data/visiting.json').toString());
    } else if (req.url == "/backend/menu4") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(readFileSync('./data/menu3.json').toString());
    } else if (req.url == "/visiting") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync('./views/visting.html').toString().replace(`"{placeholder}"`, readFileSync('./data/visiting.json').toString()));
    } else if (req.url == "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/png" })
        res.end(readFileSync(`./public/images/favicon.png`));
    } else if (req.url == "/admin") {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(readFileSync(`./views/admin.html`).toString());
    } else if (req.url.indexOf("/backend/confpass") == 0 && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" })
        if (req.url.split('/backend/confpass/').join('') == process.env.PASSWORD)
            res.end(readFileSync(`./views/administration.html`).toString().replace("jjf{{{{jjf", readFileSync('./data/order.json').toString()).replace('jjf}}}}jjf', readFileSync("./data/order2.json").toString()).replace("jgjjmightyjjg", readFileSync('./data/order3.json').toString()));
        else res.end("false");
    } else if (req.url == "/backend/changes" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            writeFile("./data/visiting.json", JSON.stringify(a, null, 2), "utf-8", e => { if (e) console.log(e) })
            res.end('Done');
        });
    } else if (req.url == "/backend/changes/" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            writeFile("./data/menu.json", JSON.stringify(JSON.parse(a.data), null, 2), "utf-8", e => { if (e) console.log(e) })
            res.end('Done');
        });
    } else if (req.url == "/backend/changes/2" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            writeFile("./data/menu2.json", JSON.stringify(JSON.parse(a.data), null, 2), "utf-8", e => { if (e) console.log(e) })
            res.end('Done');
        });
    } else if (req.url == "/backend/changes/3" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            writeFile("./data/menu3.json", JSON.stringify(JSON.parse(a.data), null, 2), "utf-8", e => { if (e) console.log(e) })
            res.end('Done');
        });
    } else if (req.url.indexOf("/backend/order/mexa") > -1 && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            const spobject = { name: a.name, phone: a.phone, qs: a.qs, address: a.address, isConfirmed: "false", isDelivered: "false" };
            const real = JSON.parse(readFileSync('./data/order2.json').toString());
            real.push(spobject);
            writeFile('./data/order2.json', JSON.stringify(real, null, 2), 'utf-8', e => {
                if (!e) {
                    res.end("Success !!! You Will Recieve A Phone Call Soon !!! Stay Tuned !!!")
                }
            });
        });
    } else if (req.url.indexOf("/backend/order/hexa") > -1 && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            const spobject = { name: a.name, phone: a.phone, qs: a.qs, isConfirmed: "false", isDelivered: "false", address: a.address };
            const real = JSON.parse(readFileSync('./data/order2.json').toString());
            real.push(spobject);
            writeFile('./data/order3.json', JSON.stringify(real, null, 2), 'utf-8', e => {
                if (!e) {
                    res.end("Success !!! You Will Recieve A Phone Call Soon !!! Stay Tuned !!!")
                }
            });
        });
    } else if (req.url.indexOf("/backend/order/") == 0) {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            const spobject = {
                name: a.name,
                phone: a.phone,
                qs: a.qs,
                isConfirmed: "false",
                isDelivered: "false",
                address: a.address
            };
            const d = JSON.parse(readFileSync("./data/order.json").toString());
            d.push(spobject);
            writeFile("./data/order.json", JSON.stringify(d, null, 2), "utf-8", e => { if (!e) res.end("Success !!! You Will Recieve A Phone Call Soon !!! Stay Tuned !!!") })
        });
    } else if (req.url == "/backend/orderChanges" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            var newOb = [];
            const oneTime = JSON.parse(a.data);
            for (let i = 0; i < oneTime.length; i++) {
                if (oneTime[i].isDelivered != "true") newOb.push(oneTime[i]);
            }
            writeFile("./data/order.json", JSON.stringify(newOb, null, 2), "utf-8", e => { if (!e) res.end("hi") });
        });
    } else if (req.url == "/backend/finallyFreedom" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            var newOb = [];
            const oneTime = JSON.parse(a.data);
            for (let i = 0; i < oneTime.length; i++) {
                if (oneTime[i].isDelivered != "true") newOb.push(oneTime[i]);
            }
            writeFile("./data/order2.json", JSON.stringify(newOb, null, 2), "utf-8", e => { if (!e) res.end("hi") });
        });
    } else if (req.url == "/backend/lastOfff" && req.method == "POST") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var body = "";
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const a = parse(body);
            var newOb = [];
            const oneTime = JSON.parse(a.data);
            for (let i = 0; i < oneTime.length; i++) {
                if (oneTime[i].isDelivered != "true") newOb.push(oneTime[i]);
            }
            writeFile("./data/order3.json", JSON.stringify(newOb, null, 2), "utf-8", e => { if (!e) res.end("hi") });
        });
    } else {
        const ajh = (whatMatters(req));
        readFile(`./public${req.url.split('%20').join(' ')}`, (err, data) => {
            if (err) {
                res.writeHead(400);
                res.end(readFileSync('./views/404.html').toString());
            } else {
                res.writeHead(200, { "Content-Type": ajh });
                res.end((ajh != "image/png" && ajh != "image/jpeg") ? data.toString() : data);
            }
        });

    }
}).listen(process.env.PORT || 80);
