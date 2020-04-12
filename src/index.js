import React, {useEffect, useState} from 'react'

import {SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'

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

  async function handleAddProject(){
    const response = await api.post('/projects',{
      title:`Novo Projeto ${Date.now()}`,
      owner: 'Lucas Rego'
    })

    setProjects([...projects, response.data])
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

          <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.button}
            onPress={handleAddProject}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
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
  },
  button: {
    backgroundColor: '#fff',
    margin:20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 16
  }
})