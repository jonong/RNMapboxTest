/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@react-native-mapbox-gl/maps';


Mapbox.setAccessToken("<access token here>");

type Props = {};
export default class App extends Component<Props> {
  render() {
    const pin = require('./assets/images/pin.png');
    const dot = require('./assets/images/dot.png');
    const point = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [103.8198, 1.3521],
      },
    };
    const line = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [103.79666, 1.35030],
          [103.82275, 1.34447],
          [103.83820, 1.35854],
        ],
      },
    };
    const geojson = {
      type: 'FeatureCollection',
      features: [ point, line ],
    };
    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          style={{ flex: 1 }}
          showUserLocation
          pitchEnabled={false}
          rotateEnabled={false}
          logoEnabled={false}
          compassEnabled={false}
        >
          <Mapbox.Camera
            zoomLevel={10}
            animationDuration={300}
            centerCoordinate={[103.8198, 1.3521]}
          />
          <Mapbox.Images images={{ pin, dot }} />
          <Mapbox.ShapeSource
            id="main_source"
            shape={geojson}>
            <Mapbox.SymbolLayer
              id="point_layer"
              filter={['==', ['geometry-type'], 'Point']}
              style={{ iconImage: 'pin' }}
            />
            <Mapbox.SymbolLayer
              id="line_layer"
              filter={['==', ['geometry-type'], 'LineString']}
              style={{
                symbolPlacement: 'line',
                iconImage: 'dot',
                symbolSpacing: ['interpolate', ['linear'], ['zoom'], 0, 6, 15, 8],
                iconAllowOverlap: true,
                iconIgnorePlacement: true
              }}
            />
          </Mapbox.ShapeSource>
        </Mapbox.MapView>
      </View>
    );
  }
}
