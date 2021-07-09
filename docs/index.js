function renderHeatmap(map) {
  const { greenHeatmapData, amberHeatmapData, redHeatmapData } = data.reduce(
    (obj, countryData) => {
      const latlng = new google.maps.LatLng(
        countryData.location.lat,
        countryData.location.lng,
      );
      return {
        red: {
          ...obj,
          redHeatmapData: [...obj.redHeatmapData, latlng],
        },
        amber: {
          ...obj,
          amberHeatmapData: [...obj.amberHeatmapData, latlng],
        },
        green: {
          ...obj,
          greenHeatmapData: [...obj.greenHeatmapData, latlng],
        },
      }[countryData.status];
    },
    {
      greenHeatmapData: [],
      amberHeatmapData: [],
      redHeatmapData: [],
    },
  );

  const radius = 5;
  new google.maps.visualization.HeatmapLayer({
    data: greenHeatmapData,
    dissipating: false,
    map,
    radius,
    maxIntensity: 0.1,

    gradient: ["transparent", "rgb(0,255,127)", "rgb(0,255,127)"],
  });

  new google.maps.visualization.HeatmapLayer({
    data: amberHeatmapData,
    dissipating: false,
    map,
    radius: radius,
    maxIntensity: 1,
    gradient: ["transparent", "rgba(255,215,0,0.7)", "rgba(255,255,0,0.7)"],
  });

  new google.maps.visualization.HeatmapLayer({
    data: redHeatmapData,
    dissipating: false,
    map,
    radius,
    gradient: ["transparent", "rgba(255,69,0,0.7)", "rgba(255,69,0,0.7)"],
  });
}

function renderMarkers(map) {
  const markers = data.map(
    ({ country: title, location: position, changes, status }) => {
      const icon = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: status === "amber" ? "orange" : status,
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
        anchor: new google.maps.Point(15, 30),
      };

      const marker = new google.maps.Marker({
        position,
        map,
        title,
        icon,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: /* html */ `
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">${title}</h1>
          <div id="bodyContent">
            ${changes ? `<p>${changes}</p>` : ""}
          </div>
        </div>
      `,
      });
      return { marker, infoWindow };
    },
  );

  markers.forEach(({ marker, infoWindow }) => {
    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 53, lng: -1 },
  });

  renderHeatmap(map);
  // renderMarkers(map);
}
