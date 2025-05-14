var map = L.map('map').setView([4.6208079, -74.0721415,16], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([4.6208079, -74.0721415,16]).addTo(map);
marker.addTo(map);

//Abrir el archivo de GeoJson
// Javascript se ejecuta de tal manera que si una linea de codigo se demora, se pasa a la siguiente sin esperar

async function CargarPuntos(){
    var miArchvio= await fetch("microondad.geojson");
    
    //Convertir el archivo a Json: objeto js
    var datos= await miArchvio.json();
    //Obtener el arreglo  de la llavr features
    let listaFeatures= datos["features"];
    
    for(int i =0; i<10; i++){
    console.log(datos["features"][i]);
    //Obtener la geometria del primer elemento
    listaFeatures[i]["geometry"]["coordiantes"];
    var miMarcador = L.marker(misCoordenadas);
    marker.addTo(map);
    }

}
CargarPuntos();
