import Vue from 'vue';
import Vuex from 'vuex';
import apiRequest from '../plugins/api-worker'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 0,
    movies: [],
    selectedGenres: []
  },
  getters:{
    getPage: state => {
      return state.page;
    },
  },
  mutations: {
    nextPage: (state) =>{
      state.page +=1;
    },
    setCurrentPage: (state, page) => {
      state.page = page;
    },
    setMovies: (state, payload) =>{
      state.movies = [...state.movies, ...payload.results];
    },
    setSelectedGenres: (state, selectedGenres) => {
      state.selectedGenres = selectedGenres;
    }
  },
  actions: {
    getMoviesAsync: (context) => {
      context.commit('nextPage');
      return apiRequest("discover/movie", {
        page: context.getters.getPage
      }).then(response => {
        context.commit('setMovies', response.data);
        context.commit('setCurrentPage', response.data.page);
      });
    },
    setSelectedGenresAsync: (context,selectedGenres) => {
      context.commit('setSelectedGenres', selectedGenres);
    }
  },
  modules: {
  }
})
