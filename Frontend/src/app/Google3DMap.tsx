'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function TerrainMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        zoom: 12,
        center: [11.39085, 47.27574],
        pitch: 70,
        hash: true,
        maxZoom: 18,
        maxPitch: 85,
        style: {
          version: 8,
          sources: {
            satellite: {
              type: 'raster',
              tiles: [
                'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
              ],
              tileSize: 256,
              attribution:
                'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            },
            terrainSource: {
              type: 'raster-dem',
              url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
              tileSize: 256
            },
            hillshadeSource: {
              type: 'raster-dem',
              url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
              tileSize: 256
            }
          },
          layers: [
            {
              id: 'satellite-layer',
              type: 'raster',
              source: 'satellite'
            },
            {
              id: 'hills',
              type: 'hillshade',
              source: 'hillshadeSource',
              layout: { visibility: 'visible' },
              paint: { 'hillshade-shadow-color': '#473B24' }
            }
          ],
          terrain: {
            source: 'terrainSource',
            exaggeration: 1
          },
          sky: {}
        }
      });

      map.addControl(
        new maplibregl.NavigationControl({
          visualizePitch: true,
          showZoom: true,
          showCompass: true
        })
      );

      map.addControl(
        new maplibregl.TerrainControl({
          source: 'terrainSource',
          exaggeration: 1
        })
      );

      // 🌍 Add marker for Ooty
      new maplibregl.Marker({ color: 'green' })
      .setLngLat([11.39085, 47.27574])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Control Point)'))
      .addTo(map);
    
    new maplibregl.Marker({ color: 'red' })
      .setLngLat([11.35962, 47.26204])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Point 1)'))
      .addTo(map);
    
      new maplibregl.Marker({ color: 'red' })
      .setLngLat([11.34083,47.26925])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Point 2)'))
      .addTo(map);
      mapInstance.current = map;
    
    new maplibregl.Marker({ color: 'red' })
    .setLngLat([11.422258,47.284831])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Point 3)'))
    .addTo(map);
    mapInstance.current = map;
    new maplibregl.Marker({ color: 'yellow' })
    .setLngLat([ 11.417685,47.304474])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Tracker 1)'))
    .addTo(map);
    mapInstance.current = map;
    new maplibregl.Marker({ color: 'yellow' })
    .setLngLat([ 11.396225,47.294980])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Tracker 2)'))
    .addTo(map);
    mapInstance.current = map;
    new maplibregl.Marker({ color: 'yellow' })
    .setLngLat([ 11.374076,47.291477

    ])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Tracker 3)'))
    .addTo(map);
    mapInstance.current = map;
    new maplibregl.Marker({ color: 'yellow' })
    .setLngLat([ 11.337176,47.286339

    ])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Tracker 4)'))
    .addTo(map);
    mapInstance.current = map;

    new maplibregl.Marker({ color: 'yellow' })
    .setLngLat([11.341259, 47.275259

    ])
    .setPopup(new maplibregl.Popup({ offset: 25 }).setText('Ooty (Tracker 5)'))
    .addTo(map);
    mapInstance.current = map;
  }
  }, []);

  return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
}
