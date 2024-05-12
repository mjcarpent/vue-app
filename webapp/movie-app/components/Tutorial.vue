<!-- Please remove this file from your project -->
<template>
    <div>
        <form @submit.prevent="findMovie">
            <input v-model="text" required placeholder="Enter movie title">
            <button>Search!</button>
        </form>
        <h1 v-if="populated">Results for '{{ queryText }}'</h1>
        <ul v-if="populated">
            <div v-for="movie in movies">
                <div class="column1">
                    <img src={{ movie.poster_image_url }}>
                </div>
                <div class="column2"></div>
            </div> 
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const text = ref('')
const queryText = ref('')
const populated = ref(false)
const movies = ref([])

async function findMovie() {

    if (text.value.length > 0) {

        queryText.value = text.value;

        //Get data
        const { data } = await axios.get("http://localhost:8000/movies?search=" + text.value);
        console.log(JSON.stringify(data));

        if (data.length > 0) {
            movies.value = movies.value.filter((t) => t !== '')
            console.log("MOVIES: " + JSON.stringify(movies));
            movies.value = data;
            populated.value = true;
        }

        console.log("MOVIES: " + JSON.stringify(movies));
    }
    else {
        populated.value = false;
    }
    
    text.value = ''
}
</script>
