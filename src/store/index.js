import Vue from 'vue';
import Vuex from 'vuex';
import apiRequest from '../plugins/api-worker'
import moment from 'moment'

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
    getSelectedGenresIdsString: state => {
      return state.selectedGenres.map((value) => {return value.id}).join(",");
    }
  },
  mutations: {
    nextPage: (state) =>{
      state.page +=1;
    },
    setCurrentPage: (state, page) => {
      state.page = page;
    },
    setMovies: (state, payload) =>{
      if(payload.empty === true){
        state.movies = [];
      }else{
        state.movies = [...state.movies, ...payload.results];
      }

    },
    setSelectedGenres: (state, selectedGenres) => {
      state.selectedGenres = selectedGenres;
    }
  },
  actions: {
    getMoviesAsync: (context) => {
      context.commit('nextPage');
      return apiRequest("discover/movie", {
        page: context.getters.getPage,
        sort_by: "popularity.desc",
        primary_release_date: moment().format('YYYY-MM-DD'),
        with_genres: context.getters.getSelectedGenresIdsString
      }).then(response => {
        context.commit('setMovies', response.data);
        context.commit('setCurrentPage', response.data.page);
      });
    },
    setSelectedGenresAsync: (context,selectedGenres) => {
      context.commit('setSelectedGenres', selectedGenres);
      context.commit('setMovies', {empty: true});
      context.commit('setCurrentPage', {page: 0});
    }
  },
  modules: {
  }
})
