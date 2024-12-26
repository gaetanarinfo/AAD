<template>
  <q-layout view="lHh Lpr lFf">

    <q-header :class="(!connexionState) ? 'disabled' : ''" elevated>

      <q-toolbar class="glossy bg-light-blue-9">

        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-space />

        <q-btn flat dense round class="q-mr-md" icon="notifications" aria-label="Notifications">
          <q-badge color="red" text-color="white" floating>
            0
          </q-badge>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>

        <q-btn flat dense class="q-mr-xs" round aria-label="Espace utilisateur">
          <q-avatar size="26px">
            <img src="~assets/utilisateur.png">
          </q-avatar>
          <q-tooltip>Espace utilisateur</q-tooltip>
        </q-btn>

      </q-toolbar>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" :class="(!connexionState) ? 'disabled' : ''" show-if-above bordered :width="246">

      <q-scroll-area class="fit">

        <q-list>

          <MenuComponent v-for="link in linksList" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Réseaux Sociaux
          </q-item-label>

          <MenuComponent v-for="link in linksList2" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple @click="settings">
            <q-item-section avatar>
              <q-icon class="fa-solid fa-cog" color="grey" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="title-menu">Paramètres</q-item-label>
            </q-item-section>
          </q-item>

          <MenuComponent v-for="link in linksList3" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a v-for="footer in footers" :key="footer.text" class="q-footer-layout"
                @click="this.$router.push(footer.link)">
                {{ footer.text }}
              </a>
            </div>
          </div>

        </q-list>

        <q-item class="flex-center">
          <q-img src="~assets/logo.png" class="d-flex" style="max-width: 100px" spinner-color="light-blue-9"></q-img>
        </q-item>

        <q-item class="flex-center version">
          Version {{ version }}
        </q-item>

        <q-item class="flex-center">
          © Copyright par Gaëtan Seigneur - {{ moment().format('YYYY') }}. Concu par Dev72.
        </q-item>

        <q-item></q-item>

      </q-scroll-area>

    </q-drawer>

    <q-drawer v-model="leftDrawerOpenSettings" :class="(!connexionState) ? 'disabled' : ''" show-if-above bordered>
      <q-list>
        <SettingsComponent />
      </q-list>

      <q-item class="flex-center">
        <q-img src="~assets/logo.png" class="d-flex" style="max-width: 100px" spinner-color="light-blue-9"></q-img>
      </q-item>

      <q-item class="flex-center version">
        Version {{ version }}
      </q-item>

      <q-item class="flex-center">
        © Copyright par Gaëtan Seigneur - {{ moment().format('YYYY') }}. Concu par Dev72.
      </q-item>

      <q-item></q-item>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import MenuComponent from 'src/components/Menu.vue'
import SettingsComponent from 'src/components/Settings.vue'
import { defineComponent } from 'vue'
import moment from 'moment'

moment.locale('fr')

const leftDrawerOpen = ref(false),
  leftDrawerOpenSettings = ref(false),
  connexionState = ref(true)

export default defineComponent({
  name: 'MainLayout',
  components: {
    MenuComponent,
    SettingsComponent
  },
  setup () {

    return {
      moment,
      connexionState,
      onLine: navigator.onLine,
      version: process.env.VERSION,
      leftDrawerOpen,
      leftDrawerOpenSettings,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      settings () {
        leftDrawerOpenSettings.value = !leftDrawerOpenSettings.value
      },
      linksList: [
        {
          title: 'Accueil',
          icon: 'fa-solid fa-house',
          link: '/',
          enable: false,
          color: 'grey'
        },
        {
          title: 'Qui somme nous ?',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: 'grey'
        },
        {
          title: 'Contact',
          icon: 'fa-solid fa-at',
          link: '/',
          enable: false,
          color: 'grey'
        }
      ],
      linksList2: [
        {
          title: 'Twitter',
          icon: 'fa-brands fa-x-twitter',
          link: 'https://twitter.quasar.dev',
          enable: true,
          color: 'blue-8'
        },
        {
          title: 'Facebook',
          icon: 'fa-brands fa-facebook-f',
          link: 'https://facebook.quasar.dev',
          enable: true,
          color: 'pink-8'
        },
        {
          title: 'Linkedin',
          icon: 'fa-brands fa-linkedin-in',
          link: 'https://awesome.quasar.dev',
          enable: true,
          color: 'brown-8'
        }
      ],
      linksList3: [
        {
          title: 'Signaler un bug ?',
          icon: 'fa-solid fa-flag',
          link: '/',
          enable: false,
          color: 'grey'
        },
        {
          title: 'Aide',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: 'grey'
        }
      ],
      footers: [
        {
          text: 'Politique de confidentialité',
          link: '/'
        },
        {
          text: 'Condition général d\'utilisation',
          link: '/'
        },
        {
          text: 'Condition général de vente',
          link: '/'
        }
      ]
    }

  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") connexionState.value = false
      if (e.type == "online") connexionState.value = true
    }
  },
  watch: {
    onLine (v) {
      if (v) {
        this.showBackOnline = true
        setTimeout(() => {
          this.showBackOnline = false
        }, 1000)
      }
    }
  },
  mounted () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)

    document.addEventListener("deviceready", function () {

      const networkState = navigator.connection.type

      const states = {}
      // eslint-disable-next-line no-undef
      states[Connection.UNKNOWN] = false
      // eslint-disable-next-line no-undef
      states[Connection.ETHERNET] = true
      // eslint-disable-next-line no-undef
      states[Connection.WIFI] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL_2G] = false
      // eslint-disable-next-line no-undef
      states[Connection.CELL_3G] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL_4G] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL] = false
      // eslint-disable-next-line no-undef
      states[Connection.NONE] = false

      if (states[networkState] === true) {
        //
      } else {
        setInterval(() => {
          connexionState.value = states[networkState]
        }, 5000)
      }

    })

  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },

})
</script>
