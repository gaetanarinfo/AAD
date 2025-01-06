<template name="BonjourComponent">

  <transition v-show="bonjour" v-if="isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100">

      <h6 class="q-mt-md q-mb-md">Bonjour {{ user.firstname }},</h6>

    </div>

  </transition>

</template>

<script>

import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import axios from 'axios'
import { ref } from 'vue'

const bonjour = ref(false)

export default defineComponent({
  name: 'BonjourComponent',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    return {
      user,
      isLoggedIn: isLoggedIn,
      bonjour
    }

  },
  mounted () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    bonjour.value = false

    if (this.connexionState && this.isLoggedIn) {

      setTimeout(() => {
        bonjour.value = true
      }, 4000);

    }

  },
  props: {
    connexionState: {
      tyoe: Boolean
    }
  }

})

</script>
