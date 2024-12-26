<template>
  <router-view v-if="show === true" />

  <transition v-if="show === false" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    <div class="loadings">

      <q-item>
        <img alt="Quasar logo" spinner-color="light-blue-9" src="~assets/logo.jpg"
          style="max-width: 350px; height: 100%" />
      </q-item>

      <div class="q-pa-md w-100">
        <q-linear-progress size="5px" dark indeterminate spinner-color="light-blue-9" color="light-blue-9"
          class="q-mt-sm" />
      </div>

    </div>

  </transition>

</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
  },
  data () {
    return {
      show: false,
    }
  },
  methods: {

    showLoading () {
      // hiding in 1.500s
      setTimeout(() => {
        this.show = true
      }, 1500)
    }
  },

  beforeUnmount () {
    // hiding in 1.500s
    setTimeout(() => {
      this.$q.loading.hide()
    }, 1500)
  },
  computed: {
  },

  mounted () {
    this.showLoading()
  }
})

</script>
