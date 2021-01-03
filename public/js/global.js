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
              <h5 class="card-title">${data[i].data[j].name}</h5>
              <button class="btn btn-primary" onclick="window.location.href = '/orders/flvs/${i}/${j}'">Rs. ${data[i].data[j].rate}</button>
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
                    <div class="row" onclick="window.location.href = '/orders/${nameofUrl == 'menu2' ? "mexa" : "hexa"}/${i}/${j}'">
                        <div class="col-sm">
                        ${(data[i].data[j].isVeg === "true") ? "<img src=\"/images/veg.jpg\" height='21px' width='21px'>" : ((data[i].data[j].isVeg.split(' ').join('') === "false/true") ? "<img src=\"/images/non-veg.png\" height='21px' width='21px'><img src=\"/images/veg.jpg\" height='21px' width='21px'>" : "<img src=\"/images/non-veg.png\" height='21px' width='21px'>") }
                        </div>
                        <div class="col-sm" style="cursor: pointer;">
                            <h5 class="text-primary">${data[i].data[j].name}</h5> <br />
                            <b>Rs. ${data[i].data[j].rate}</b>
                        </div>
                    </div>`;
                    }
                } else {
                    const child2 = document.createElement('ul');
                    child2.innerHTML += `<h3 class="text-danger" style="font-family: Segoe Print;">${data[i].data[j].name}</h3>`;
                    child2.setAttribute('class', 'list-group list-group-flush container');
                    li.appendChild(child2);
                    for (let k = 0; k < data[i].data[j].subordinates.length; k++) {
                        if (data[i].data[j].subordinates[k].rate != "") {
                            const li2 = document.createElement('li');
                            child2.appendChild(li2);
                            li2.setAttribute('class', 'list-group-item');
                            li2.innerHTML = `
                        <div class="row" onclick="window.location.href = '/orders/${nameofUrl == 'menu2' ? "mexa" : "hexa"}/${i}/${j}/${k}'">
                            <div class="col-sm" style="cursor: pointer;">
                            ${(data[i].data[j].subordinates[k].isVeg === "true") ? "<img src=\"/images/veg.jpg\" height='21px' width='21px'>" : ((data[i].data[j].subordinates[k].isVeg.split(' ').join('') === "false/true") ? "<img src=\"/images/non-veg.png\" height='21px' width='21px'><img src=\"/images/veg.jpg\" height='21px' width='21px'>" : "<img src=\"/images/non-veg.png\" height='21px' width='21px'>") }
                            </div>
                            <div class="col-sm text-primary" style="font-family: Malgun Gothic; letter-spacing: 0.2em;">
                            ${data[i].data[j].subordinates[k].name} <br />
                            <b>Rs. ${data[i].data[j].subordinates[k].rate}</b>
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