<script>
import { computed } from "vue";
import { logInFirebase, logInWithGoogle } from "../models/firebase/auth.js";

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      showPassword: false,
    };
  },
  components: {},
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Invertir el valor de showPassword al hacer clic en el botón
    },
    goHome() {
      this.$router.push("/");
    },
    handleContacts() {
      //   this.$router.push("/contacts");
    },
    async signIn() {
      //Iniciamos y guardamos sesión
      const response = await logInFirebase({
        email: this.user.email,
        password: this.user.password,
      });

      if (!response) {
        await this.$swal({
          title: "¡Error al intentar iniciar sesión!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      } else {
        console.log("response.isAdmin: ", response.isAdmin);
        //Si el responde.admin es true quiere decir que es administrador entonces se le redirecciona al dashboard
        if (response.isAdmin === true) {
          this.$router.push("/homeAdmin");
        } else {
          this.$router.push("/");
        }
      }
    },
    async signInGoogle(){
      console.log("HOLA");
      const res = await logInWithGoogle();
      
      if (!res) {
        await this.$swal({
          title:
            "Ocurrió un error al iniciar sesión con Google, intenta otra vez.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        return;
      }else{
        this.$router.push("/");
      }
    },
  },
  mounted() {
    // const store = useUserStore();
    // const user = computed(() => {
    //   return store.getUser;
    // });
    // console.log("User at navBar: ", user);
    // return { user };
  },
};
</script>

<template>
  <div class="container px-4 py-5 mx-auto">
    <div class="card card0">
      <div class="d-flex flex-lg-row flex-column-reverse">
        <div class="card card1">
          <div class="row justify-content-center my-auto">
            <div class="col-md-12 col-12 my-5">
              <div class="row justify-content-center px-3 mb-3">
                <img
                  id="logo"
                  src="../assets/images/kvmi-en-blanco_redes-AzGj93a4EkuxVrkB.avif"
                />
              </div>
              <h3 class="mb-5 text-center heading">Somos Chocolate</h3>

              <h6 class="msg-info">Por favor, ingrese a su cuenta</h6>

              <div class="form-group">
                <label class="form-control-label text-muted"
                  >Nombre de usuario</label
                >
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Phone no or email id"
                  class="form-control"
                  v-model="user.email"
                />
              </div>

              <div class="form-group">
                <label class="form-control-label text-muted">Contraseña</label>
                <input
                  type="password"
                  id="psw"
                  name="psw"
                  placeholder="Password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>

              <div class="row justify-content-center my-3 px-3">
                <button class="btn-block btn-color" @click="signIn()">Ingresar a KVMI</button>
              </div>

              <div class="row justify-content-center my-2">
                <a href="#"
                  ><small class="text-muted">Olvidaste la contraseña?</small></a
                >
              </div>

              <button class="gsi-material-button" @click="signInGoogle()">
                <div class="gsi-material-button-state"></div>
                <div class="gsi-material-button-content-wrapper">
                  <div class="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style="display: block"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span class="gsi-material-button-contents"
                    >Ingresar con Google</span
                  >
                </div>
              </button>

            </div>
          </div>
          <div class="bottom text-center mb-5">
            <p class="sm-text mx-auto mb-3">
              No tienes cuenta?<button class="btn btn-white ml-2">
                <a href="/register">Crer una</a>
              </button>
            </p>
          </div>
        </div>

        <div class="card card2">
          <div class="my-auto mx-md-5 px-md-5 right">
            <h3 class="text-white">KVMI, más que solo chocolate</h3>
            <small class="text-white"
              >Marca de chocolates de lujo elaborados con un raro grano de cacao
              amazónico. Creadores de mezclas exclusivas de temporada y
              experiencias alucinantes para tus cinco sentidos.</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 0;
  border: none;
}

.card1 {
  width: 50%;
  padding: 40px 30px 10px 30px;
}

.card2 {
  width: 50%;
  background-image: linear-gradient(to right, rgb(89, 76, 66), rgb(65, 39, 39));
}

#logo {
  width: 200px;
  height: 120px;
}

.heading {
  margin-bottom: 60px !important;
}
</style>
