<!-- Please remove this file from your project -->
<template>
    <div>
        <form @submit.prevent="findMovie">
            <input v-model="text" required placeholder="Enter movie title">
            <button>Search!</button>
        </form>
        <h1 v-if="populated">Results for '{{ queryText }}'</h1>
        <ul v-if="populated">
            <div class="row" v-for="movie in movies">
                <div class="column1" style="float: left;width: 30%;">
                    <h4>{{ movie.title }}</h4><br/><h6>{{ movie.popularity_summary }}</h6>
                </div>
                <div class="column2" style="float: left;width: 50%;">
                    <img v-bind:src="movie.poster_image_url" width="86px" height="128px" alt="">
                </div>
            </div>
        </ul>
    </div>
</template>

<style scoped>
.row:after {
    content: "";
    display: table;
    clear: both;
}
</style>

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
