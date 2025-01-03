<template name="MyAccountPage">
  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"

export default defineComponent({
  name: 'MyAccountPage',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const router = useRouter()

    if (!isLoggedIn.value) {
      router.push('/')
    }

    return {
      isLoggedIn
    }

  }

})

</script>
