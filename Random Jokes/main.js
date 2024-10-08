import { createApp } from "petite-vue";
import axios from "axios";

createApp({
  joke: "",
  modal: false,
  get showQuote() {
    return this.joke.length > 0;
  },
  // methods
  hideModal() {
    this.modal = false;
  },
  fetchNewJoke() {
    let vm = this;
    axios
      .get(
        "https://api.humorapi.com/jokes/random?api-key=c1be3de018d14210981b291d6e2b3dde"
      )
      .then(function (response) {
        vm.joke = response.data.joke;
      })
      .catch(function (error) {
        vm.modal = true;
        console.log(error);
      });
  }
}).mount();
