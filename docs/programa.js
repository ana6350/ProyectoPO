var map = L.map('map').setView([4.6208079, -74.0721415], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function CargarPuntos() {
    try {
        const response = await fetch("microondas.geojson");
        const data = await response.json();

        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                const popupContent = `
                    <strong>Modelo:</strong> ${props.Modelo}<br>
                    <strong>Precio:</strong> $${props.Precio}<br>
                    <strong>Precio con Descuento:</strong> $${props.PrecioDescuento}<br>
                    <strong>Dimensiones (Alto x Ancho x Profundidad):</strong> ${props.Alto} x ${props.Ancho} x ${props.Profundidad}<br>
                    <strong>Capacidad:</strong> ${props.Capacidad}<br>
                    <strong>Potencia:</strong> ${props.Potencia}<br>
                    <strong>Voltaje:</strong> ${props.Voltaje}
                `;
                layer.bindPopup(popupContent);
            }
        }).addTo(map);
    } catch (error) {
        console.error("Error al cargar el archivo GeoJSON:", error);
    }
}

CargarPuntos();

