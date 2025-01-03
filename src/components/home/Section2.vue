<template name="Section2Component">

  <transition v-show="services_list" v-if="isLoggedIn && user.user_type <= 1" appear
    enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    <div class="column text-center w-100">

      <h5 class="q-mt-md q-mb-md">Mes dernières demandes de service</h5>

      <q-list v-if="services.length >= 1" style="min-width: 300px; text-align: left;" bordered separator>

        <q-item v-for="service in services" clickable v-ripple :active="active"
          active-class="bg-light-blue-9 glossy text-white">

          <q-item-section avatar>
            <q-icon name="check" />
          </q-item-section>

          <q-item-section>Je créer mon compte</q-item-section>

        </q-item>

      </q-list>

      <q-item style="align-items: center;flex-direction: column;">
        <q-icon size="xl" name="warning" class="text-orange-9 q-mb-md" /> <span class="text-bold"
          style="font-size: 16px;">Vous n'avez aucune
          demande de
          service
          pour le moment !</span>
      </q-item>

    </div>

  </transition>

</template>

<script>

import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import axios from 'axios'
import { ref } from 'vue'

const services = [],
  services_list = ref(false)

export default defineComponent({
  name: 'Section2Component',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    return {
      user,
      isLoggedIn: isLoggedIn,
      services,
      services_list
    }

  },
  mounted () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    services_list.value = false

    if (this.connexionState && this.isLoggedIn) {

      setTimeout(() => {
        services_list.value = true
      }, 4000);

      // Liste des services

      services.value = []

      axios.get(process.env.API + '/api/user/services/' + userStore.stateUser.user.email)
        .then(res => {

          if (res.data.succes) {
            services.value = res.data.services
          } else {
            services.value = []
          }

        })

    }

  },
  props: {
    connexionState: {
      tyoe: Boolean
    }
  }

})

</script>
