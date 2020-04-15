

function collect_data(){
    let start_date = document.getElementById("start_date");
    let end_date = document.getElementById("end_date");

    function print(t){
        console.log(t);
    }

    let data = eel.do_request(start_date.innerHTML, end_date.innerHTML, 4)( function(data) {
        console.log(data);
    });
    // console.log(data);
    

}