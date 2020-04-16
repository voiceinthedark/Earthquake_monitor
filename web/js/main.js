/**
 * Collect data
 * Asynchronus function to collect data from the python backend and display them in a table
 */
async function collect_data(){
    let start_date = document.querySelector("#start_date").value;
    let end_date = document.querySelector("#end_date").value;    
    let magnitude = document.querySelector("#magnitude").value;
    let earthquakes;
    // collect the data through eel python backend
    earthquakes = await eel.do_request(start_date, end_date, Number(magnitude))();
    let tablebody = document.querySelector("#tbl_earthquake > tbody");
    // clear the table body of any child elements
    tablebody.innerHTML = "";
    for(let r of earthquakes){      
        let trow = tablebody.appendChild(document.createElement("tr"));
        for(let record in r){            
            let td = trow.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(r[record]));
        }
    }
}