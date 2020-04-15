
function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}

async function collect_data(){
    let start_date = document.querySelector("#start_date");
    let end_date = document.querySelector("#end_date");    
    let earthquakes;
    earthquakes = await eel.do_request(start_date.value, end_date.value, 4)();
    let tablebody = document.querySelector("#tbl_earthquake > tbody");

    tablebody.innerHTML = "";

    for(let r of earthquakes){
        // console.log(r['magnitude']);
        
        // tablebody.appendChild(elt("tr", elt("td", r["magnitude"])), 
        //     elt("td", r["location"]), elt("td", r["time"]));

        let trow = tablebody.appendChild(document.createElement("tr"));
        for(let record in r){            
            let td = trow.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(r[record]));
        }

    }
}