function Menu() {
    fetch('/backend/menu').then(dat => dat.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
            const h2 = document.createElement('h2');
            document.querySelector('.hi').appendChild(h2);
            h2.setAttribute('style', "text-align: center; font-family: 'Langar';");
            h2.innerHTML = data[i].column;
            const parent = document.createElement('div');
            document.querySelector('.hi').appendChild(parent);
            parent.setAttribute('class', 'row container-fluid text-capitalize');
            for (let j = 0; j < data[i].data.length; j++) {
                if (data[i].data[j].rate != "") {
                    const child = document.createElement('div');
                    parent.appendChild(child);
                    child.innerHTML = `
            <div class="card my-2 btn" style="width: 15rem;">
            ${(data[i].data[j].isVeg === "true") ? "<img src=\"/images/veg.jpg\" height='21px' width='21px'>" : ((data[i].data[j].isVeg.split(' ').join('') === "false/true") ? "<img src=\"/images/non-veg.png\" height='21px' width='21px'><img src=\"/images/veg.jpg\" height='21px' width='21px'>" : "<img src=\"/images/non-veg.png\" height='21px' width='21px'>") }
            <div class="card-body">
              <h5 class="card-title" id="asAlwaysName_${i}_${j}">${data[i].data[j].name}</h5>
              <button class="btn btn-primary my-2" id="asAlwaysCost_${i}_${j}">Rs. ${data[i].data[j].rate}</button>
              <button class="btn btn-danger my-2" onclick="JustAdd(${i}, ${j}, '', 'Chef\\'s Signature')">Add To Card</button>
            </div>
          </div>`;
                    child.setAttribute('class', "col-sm");
                }
            }
        }
    });
}

function Menu2(nameofUrl) {
    fetch('/backend/' + nameofUrl).then(res => res.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
            const h2 = document.createElement('h2');
            document.querySelector('.hi').appendChild(h2);
            h2.innerHTML = data[i].column;
            h2.setAttribute('style', 'text-align: center; font-family: \'Langar\';');
            const parent = document.createElement('div');
            document.querySelector('.hi').appendChild(parent);
            parent.setAttribute('class', 'container-fluid text-capitalize');
            const child = document.createElement('ul');
            child.setAttribute('class', 'list-group list-group-flush');
            parent.appendChild(child);
            for (let j = 0; j < data[i].data.length; j++) {
                const li = document.createElement('li');
                child.appendChild(li);
                li.setAttribute('class', 'list-group-item');
                if (!data[i].data[j].subordinates) {
                    if (data[i].data[j].rate != "") {
                        li.innerHTML = `
                    <div class="row"">
                        <div class="col-sm">
                        ${(data[i].data[j].isVeg === "true") ? "<img src=\"/images/veg.jpg\" height='21px' width='21px'>" : ((data[i].data[j].isVeg.split(' ').join('') === "false/true") ? "<img src=\"/images/non-veg.png\" height='21px' width='21px'><img src=\"/images/veg.jpg\" height='21px' width='21px'>" : "<img src=\"/images/non-veg.png\" height='21px' width='21px'>") }
                        </div>
                        <div class="col-sm">
                            <h5 class="text-primary" id="asAlwaysName_${i}_${j}">${data[i].data[j].name}</h5> <br />
                            <b id="asAlwaysCost_${i}_${j}">Rs. ${data[i].data[j].rate}</b>
                        </div>
                        <div class="col-sm">
                            <button class="btn btn-primary" onclick="JustAdd(${i}, ${j}, '', document.querySelector('#HeadMy').innerHTML.split('|')[0])">Add To Cart</button>
                        </div>
                    </div>`;
                    }
                } else {
                    const child2 = document.createElement('ul');
                    child2.innerHTML += `<h3 class="text-secendory" style="font-family: Segoe Print;">${data[i].data[j].name}</h3>`;
                    child2.setAttribute('class', 'list-group list-group-flush container');
                    li.appendChild(child2);
                    for (let k = 0; k < data[i].data[j].subordinates.length; k++) {
                        if (data[i].data[j].subordinates[k].rate != "") {
                            const li2 = document.createElement('li');
                            child2.appendChild(li2);
                            li2.setAttribute('class', 'list-group-item');
                            li2.innerHTML = `
                        <div class="row">
                            <div class="col-sm" style="cursor: pointer;">
                            ${(data[i].data[j].subordinates[k].isVeg === "true") ? "<img src=\"/images/veg.jpg\" height='21px' width='21px'>" : ((data[i].data[j].subordinates[k].isVeg.split(' ').join('') === "false/true") ? "<img src=\"/images/non-veg.png\" height='21px' width='21px'><img src=\"/images/veg.jpg\" height='21px' width='21px'>" : "<img src=\"/images/non-veg.png\" height='21px' width='21px'>") }
                            </div>
                            <div class="col-sm">
                            <h5 class='text-primary' id="asAlwaysName_${i}_${j}_${k}">${data[i].data[j].subordinates[k].name}</h5> <br />
                            <b id="asAlwaysCost_${i}_${j}_${k}">Rs. ${data[i].data[j].subordinates[k].rate}</b>
                            </div>
                            <div class="col-sm">
                            <button class="btn btn-primary" onclick="JustAdd(${i}, ${j}, ${k}, document.querySelector('#HeadMy').innerHTML.split('|')[0])">Add To Cart</button>
                        </div>
                        </div>
                        `;
                        }
                    }
                }
            }
        }
    });
}

function JustAdd(i, j, k, rest) {
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange;
    var request = window.indexedDB.open("chefssignature", 10);
    request.onupgradeneeded = function(e) {
        var db = request.result;
        let store = db.createObjectStore('orders', {
            keyPath: 'id'
        });
    };
    request.onsuccess = function(e) {
        let db = request.result;
        const today = new Date();
        if (db.objectStoreNames.contains('orders')) {
            var requestedjfdj = db.transaction(["orders"], "readwrite")
                .objectStore("orders")
                .add({
                    id: Math.random() + ['fjjfj', 'd', 'djg', 'sdfnnd', 'jjfjj'][Math.floor(Math.random() * 4)],
                    rest: rest,
                    dishName: document.getElementById("asAlwaysName_" + i + "_" + j + (k != '' ? `_${k}` : "")).innerHTML,
                    cost: document.getElementById('asAlwaysCost_' + i + "_" + j + (k != '' ? `_${k}` : "")).innerHTML
                });
            alert("Added To Cart")
        }
    };
}