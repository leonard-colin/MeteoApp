import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import _ from "lodash"

import Weather from "./Weather"

export default function CurrentWeather({ data }) {
  const [forecasts, setForecasts] = useState([])
  useEffect(() => {
    const forecastsData = data.list.map(f => {
      const dt = new Date(f.dt * 1000)
      return ({
        date: f.dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr })
      })
    })

    // Logique pour regrouper les éléments par journée (name)
    const groupedForcastData = _.groupBy(forecastsData, 'name')

    setForecasts(groupedForcastData)
  }, [data])

  return(
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      directionalLockEnabled={true}
      // contentContainerStyle={styles.scroll}
      // scrollEnabled={scrollEnabled}
      style={styles.scroll}
    >
      {Object.keys(forecasts).map(f => (
        <View>
          <Text style={styles.date}>{f}</Text>
          {forecasts[f].map(data => (
              <Weather forecast={data} />
          ))}
        </View>
      ))}
      
    </ScrollView>
  )
  
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  date: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10
  }
})