<script setup>
import { onMounted, ref } from 'vue';

let races = ref({})
let currentRace = ref({})


onMounted( async () => {
  let response = await fetch("https://raw.githubusercontent.com/sportstimes/f1/main/_db/f1/2022.json")

  races.value = await response.json()

  var now = new Date()

  for(var race of races.value.races) {

    var gp = new Date(race.sessions.gp)


    if(gp.getTime()-now.getTime() > 0) {

      for(let key in race.sessions) {
        race.sessions[key] = new Date(race.sessions[key])  
      }
      currentRace.value = race;
      currentRace.value.slug = currentRace.value.slug.replaceAll("-"," ")

      break; 
    }

  }


  
})

</script>


<template>
  <div v-if="currentRace && currentRace.sessions">
    <h1>
      {{ currentRace.slug }}
    </h1>
    {{ currentRace.sessions.gp }}
    {{ currentRace.sessions.gp }}
    {{ currentRace.sessions.gp }}
  </div>
</template>

<style>
body {
  background-color: black;
  font-family: Montserrat;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
}

h1 {
  color: orange;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
}

.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-transform: uppercase;
}

#gpName {
  text-transform: capitalize;  
}
</style>
