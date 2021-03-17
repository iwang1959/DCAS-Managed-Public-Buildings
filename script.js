$.ajaxSetup({async: false});
var data; //global variable

//function to load JSON data
function getData(){
    var apiURL = "https://data.cityofnewyork.us/resource/7xt9-rk8d.json";
    data = $.getJSON(apiURL).responseJSON;
}  
function showBorough(){
    var ent_boro = document.getElementById("request").value;
    ent_boro = ent_boro.toLowerCase();
    var output = document.getElementById("output");
    var template = document.getElementById("Template").innerHTML;
    var build = "";
    var count = 0;
    
    for (var i=0; i<data.length; i++){
      var address = data[i].location_1_address;
      var borough = data[i].borough;
      var building = data[i].building;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;
      var supervisor_name = data[i].custodial_borough_supervisor_name;
      var supervisor_number = data[i].custodial_borough_supervisor_phone;
      var engineering = data[i].engineering;
      var security = data[i].security;
      var url = "https://www.mapquestapi.com/staticmap/v5/map?key=uFLPy1ABKLxeC5gHQT4VdCgeO4VKf9Yt&locations="  +latitude+ "," +longitude+ "&zoom=14&size=@2x";
      

      try{

          if(ent_boro == borough.toLowerCase()){
            count +=1
            build += Mustache.render(template, data[i]);
          }


      }catch(err){}
    }

    if(ent_boro != borough.toLowerCase()){
      console.log("Not Found. Please check spelling");
    }

    output.innerHTML = count + " out of " + data.length + " buildings." +"<br>" + build;

}
function showAddress(){
    var ent_addr = document.getElementById("request2").value;
    ent_addr = ent_addr.toLowerCase();
    var output = document.getElementById("output");
    var template = document.getElementById("Template").innerHTML;
    var build2 = "";
    var num = 0;
    
    for (var i=0; i<data.length; i++){
      var address = data[i].location_1_address;
      var borough = data[i].borough;
      var building = data[i].building;
      var latitude = data[i].latitude;
      var longitude = data[i].longitude;
      var supervisor_name = data[i].custodial_borough_supervisor_name;
      var supervisor_number = data[i].custodial_borough_supervisor_phone;
      var engineering = data[i].engineering;
      var security = data[i].security;
      var url = "https://www.mapquestapi.com/staticmap/v5/map?key=uFLPy1ABKLxeC5gHQT4VdCgeO4VKf9Yt&locations="  +latitude+ "," +longitude+ "&zoom=14&size=@2x";
      
      try{

          if(ent_addr == address.toLowerCase()){
            num += 1;
            build2 += Mustache.render(template, data[i]);
          }


      }catch(err){}
    }
    if(ent_addr != address.toLowerCase()){
      console.log("Not Found. Please check spelling");
    }
      
    
    output.innerHTML = num + " out of " + data.length + " buildings." +"<br>" + build2;

}

function Graph(){
  var man = 0; var brook = 0; var queens = 0; var bronx = 0; var stat = 0; 

  for (var i=0; i<data.length; i++){
    var borough = data[i].borough;

    if(data[i].borough == "Queens"){
            queens++;
          }else if(data[i].borough == "Brooklyn"){
            brook++;
          }else if(data[i].borough == "Bronx"){
            bronx++;
          }else if(data[i].borough == "Manhattan"){
            man++;
          }else if(data[i].borough == "Staten Island"){
            stat++;
        }
  }
  var chartData = [
            ["Queens", queens],
            ["Brooklyn",brook],
            ["Bronx", bronx],
            ["Manhattan", man],
            ["Staten Island", stat],
        ];

        var chart = c3.generate({
          bindto: "#myChart",
          data: {
            columns: chartData,
            type: "donut" //end columns				
          } //end data
        }); // end generate	
      

setTimeout(function Graph() {
    chart.transform('pie');
}, 5000);

setTimeout(function Graph() {
    chart.transform('bar');
}, 10000);

setTimeout(function Graph() {
    chart.transform('donut');
}, 15000);

}
    
      
