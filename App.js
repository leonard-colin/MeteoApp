import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from "expo-location"
import axios from "axios"

import CurretWeather from "./components/CurrentWeather"
import Forecasts from "./components/Forecasts"

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9988eaf8be4f07cda52d466f7fed9f76&lang=fr&units=metric`

export default function App() {
  // 1 - récupérer les coordonnées de suer
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()
      getWeather(userLocation)
    }

    getCoordinates()

  }, [])

  // 2 - réaliser une requête vers notre serveur
  // City
  // Météo du moment
  // Prévisions 

  const getWeather = async (location) => {
    try{
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

      setData(response.data)
      setLoading(false)
      
    } catch(e) {
      console.log(`Erreur dans getWeather: ${e}`)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        horizontal={false}
        
      >
        <CurretWeather data={data} />
        <Forecasts data={data} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6E1',
    padding: 8,
  },
  scroll: {
    width: "100%",
    height: "10%"
  }
});
