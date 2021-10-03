import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";

firebase.initializeApp({
  apiKey: "AIzaSyAfPtJQLYGQGgKqj0cx-rNU6L-9DazzExA",
  authDomain: "fudbal-app.firebaseapp.com",
  databaseURL:
    "https://fudbal-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fudbal-app",
  storageBucket: "fudbal-app.appspot.com",
  messagingSenderId: "560973237002",
  appId: "1:560973237002:web:74a7c5b750d1d9a22ac8f3",
});

const app = createApp(App);

app.use(store);
app.use(router);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);
app.mount("#app");
