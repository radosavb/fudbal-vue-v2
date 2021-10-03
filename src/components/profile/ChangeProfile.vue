<template>
  <base-dialog show v-if="isLoading" title="Šaljem podatke na gej server...">
    <base-spinner></base-spinner
  ></base-dialog>
  <form @submit.prevent="changeProfile">
    <table>
      <tr>
        <td><label for="name">*Ime:</label></td>
        <td><input id="name" name="name" type="text" v-model.trim="name" /></td>
      </tr>
      <tr>
        <td><label for="surname">*Prezime:</label></td>
        <td>
          <input
            id="surname"
            name="surname"
            type="text"
            v-model.trim="surname"
          />
        </td>
      </tr>
    </table>

    <div class="">
      <div>
        <label for="slika">*Dodaj sliku:</label>
        <input id="slika" type="file" @change="previewImage" accept="image/*" />
      </div>
      <div>
        <p>
          Progress: {{ uploadValue.toFixed() + "%" }}
          <progress id="progress" :value="uploadValue" max="100"></progress>
        </p>
      </div>
      <!-- <div v-if="imageData != null">
        <img class="preview" :src="picture" />
      </div> -->
    </div>

    <base-button class="outline">Pošalji podatke</base-button>

    <base-button
      mode="outline-danger"
      type="button"
      @click="closeChangeProfile"
      v-if="isUser"
      >Zatvori</base-button
    >
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script>
import firebase from "firebase";
export default {
  emits: ["close-profile"],
  data() {
    return {
      name: "",
      surname: "",
      password: "",
      uploadedImage: null,
      photoUrl: "",
      error: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      isLoading: false,
    };
  },
  computed: {
    isUser() {
      return this.$store.getters.isUser;
    },
    email() {
      return this.$store.getters.getEmail;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {},
    changeProfile() {
      this.error = "";
      if (this.name === "" || this.surname === "" || this.imageData === null) {
        this.error = "Unesite ime, prezime i sliku";
        return;
      }
      this.isLoading = true;
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.userId}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
          this.error = error;
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            this.$store.dispatch("updateProfile", {
              displayName: this.name + " " + this.surname,
              photoUrl: url,
            });
            this.$store.dispatch("addNewUser", {
              email: this.email,
              name: this.name + " " + this.surname,
              userId: this.userId,
              userPhoto: this.url,
            });
            localStorage.setItem("photo", url);
            this.$store.dispatch("setUserPhoto", url);
            this.isLoading = false;
            this.closeChangeProfile();
          });
        }
      );
    },
    closeChangeProfile() {
      this.$emit("close-profile");
    },
  },
};
</script>

<style scoped>
form {
  padding: 1rem;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1rem;
  width: 80%;
  margin: 1rem auto;
}

label {
  margin-right: 0.5rem;
  font-weight: bold;
}
input[type="email"],
input[type="text"] {
  padding: 0.2rem;
  outline: none;
  border: 1px solid lightblue;
}
.form-control {
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 0;
}
img {
  width: 200px;
  height: 200px;
}
.error {
  padding: 0.5rem 1rem;
  background-color: rgb(233, 45, 45);
  color: white;
  font-weight: bold;
  margin-top: 1rem;
}
@media screen and(max-width:765px) {
  form {
    width: 100%;
  }
  /* .form-control {
    display: block;
  } */
}
</style>
