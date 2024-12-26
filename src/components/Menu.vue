<template name="MenuComponent">
  <q-item v-if="enable" clickable v-ripple tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :class="icon" :color="color" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="title-menu">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item v-else clickable v-ripple @click="this.$router.push(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :class="icon" :color="color" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="title-menu">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuComponent',
  components: {
  },
  setup () {

    return {

    }
  },
  props: {

    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '/',
    },

    icon: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: ''
    },

    enable: {
      type: Boolean,
      default: false
    }
  }
})
</script>
