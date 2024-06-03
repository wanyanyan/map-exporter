export default {
  "styleId": "dGMsEhsYUx.draft",
  "owner": "admin",
  "type": "style",
  "name": "google地图",
  "tags": [],
  "metadata": {},
  "version": 8,
  "center": [
    47.8073958583384,
    30.559128093745
  ],
  "zoom": 11.5648314769358,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "google-ADKfomZJne": {
      "type": "raster",
      "tiles": ["https://www.google.com/maps/vt?lyrs=y@189&gl=en&x={x}&y={y}&z={z}"],
      "tileSize": 256
    }
  },
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "rgba(0,0,0,0)"
      }
    },
    {
      "id": "google",
      "paint": {},
      "layout": {},
      "source": "google-ADKfomZJne",
      "type": "raster",
      "minzoom": 0,
      "maxzoom": 22
    }
  ],
  "createdAt": "2024-05-30T10:52:21.821Z",
  "updatedAt": "2024-05-30T10:52:21.821Z"
}