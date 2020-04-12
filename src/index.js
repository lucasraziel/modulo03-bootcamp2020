import React, {useEffect, useState} from 'react'

import {SafeAreaView, Text, FlatList, StyleSheet, StatusBar, ListView} from 'react-native'

import api from './services/api'


export default function App(){
  const [projects, setProjects] = useState([])
  useEffect(()=>{
    loadData()
    
  },[])

  async function loadData(){
    const response = await api.get('/projects')
    setProjects(response.data)
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <SafeAreaView style={styles.container}>
        <FlatList
            data={projects}
            keyExtractor={project=>project.id}
            renderItem={({item:project})=>(
              <Text style={styles.project} key={project.id}>
                {project.title}
              </Text>
            )}
          />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#7159c1',
  },
  project: {
    color: '#fff',
    fontSize: 30,
  }
})