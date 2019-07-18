/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType
} from "react-native-maps";

const { width, height } = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 24.889831,
        longitude: 67.0672087,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5 * (width / height)
      },
      urlTemplate: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      polygons: [
        {
          coordinates: [
            { latitude: 24.80855120296181, longitude: 67.03557014465332 },
            { latitude: 24.805493205908192, longitude: 67.04031229019165 },
            { latitude: 24.802298784481714, longitude: 67.03735113143921 },
            { latitude: 24.80459721795997, longitude: 67.03323125839233 }
          ],
          open: false
        },
        {
          coordinates: [
            { latitude: 24.80642814294996, longitude: 67.04509735107422 },
            { latitude: 24.80284417933238, longitude: 67.04968929290771 },
            { latitude: 24.800136659859945, longitude: 67.04707145690918 },
            { latitude: 24.803759658152476, longitude: 67.0425009727478 }
          ],
          open: false
        },
        {
          coordinates: [
            { latitude: 24.800837893597965, longitude: 67.04607367515564 },
            { latitude: 24.79905558341104, longitude: 67.04832673072815 },
            { latitude: 24.79590969472415, longitude: 67.04537630081177 },
            { latitude: 24.797769966717116, longitude: 67.04296231269836 }
          ],
          open: false
        }
      ]
    };
  }

  render() {
    const mapOptions = {
      scrollEnabled: true
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          mapType={MAP_TYPES.HYBRID}
          style={styles.map}
          initialRegion={this.state.region}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

App.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
