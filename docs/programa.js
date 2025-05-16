var map = L.map('map').setView([4.6208079, -74.0721415], 13);

// Añadir capa base de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Marcador principal (opcional)
var marker = L.marker([4.6208079, -74.0721415]).addTo(map);

// Función para cargar los puntos desde el GeoJSON
async function CargarPuntos() {
    try {
        // Cargar archivo GeoJSON
        var miArchivo = await fetch("microondad.geojson");
        var datos = await miArchivo.json();

        // Obtener el arreglo de features
        let listaFeatures = datos.features;

        for (let i = 0; i < listaFeatures.length; i++) {
            let feature = listaFeatures[i];

            // Obtener coordenadas (formato GeoJSON: [long, lat])
            let coords = feature.geometry.coordinates;
            let lat = coords[1];
            let lng = coords[0];

            // Crear marcador con popup
            let miMarcador = L.marker([lat, lng]).addTo(map);

            // Crear contenido del popup con propiedades del microondas
            let props = feature.properties;
            let popupContent = `
                <b>Modelo:</b> ${props.Modelo}<br>
                <b>Precio:</b> $${props.Precio}<br>
                <b>Precio con Descuento:</b> $${props.PrecioDescuento}<br>
                <b>Capacidad:</b> ${props.Capacidad}<br>
                <b>Voltaje:</b> ${props.Voltaje}<br>
                <b>Potencia:</b> ${props.Potencia}<br>
                <b>Dimensiones (cm):</b> ${props.Alto} x ${props.Ancho} x ${props.Profundidad}
            `;

            miMarcador.bindPopup(popupContent);
        }
    } catch (error) {
        console.error("Error al cargar el GeoJSON:", error);
    }
}

CargarPuntos();

