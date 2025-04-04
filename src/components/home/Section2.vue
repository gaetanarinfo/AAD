<template name="Section2Component">

  <!-- Filter -->
  <transition v-show="filters" v-if="isLoggedIn && user.user_type <= 1 && services.length >= 1" appear
    enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="fixed-bottom-right"
      style="z-index: 1;width: 44px; height: 44px;margin-right: 16px;margin-bottom: 62px;">
      <q-btn glossy @click="showFilter()" round icon="filter_alt" v-ripple padding="10px" dense color="light-blue-9">
      </q-btn>
    </div>
  </transition>

  <q-item-section v-show="loaderPrestation" class="text-center flex-center" style="margin-bottom:50px">
    <q-spinner-oval color="light-blue-9" size="50px" />
  </q-item-section>

  <transition v-show="services_list" v-if="isLoggedIn && user.user_type <= 1" appear
    enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    <div class="column text-center w-100" style="margin-bottom: 50px;">

      <h5 class="q-mt-md q-mb-md">Mes demandes de prestation</h5>

      <div v-if="services.length >= 1" class="q-mb-sm flex" style="justify-content: flex-start;align-items: center;">
        <q-badge color="blue-grey-7" rounded class="q-mr-sm" />Programmée
        <q-badge color="light-blue-9" rounded class="q-ml-sm q-mr-sm" />En cours
        <q-badge color="red-9" rounded class="q-ml-sm q-mr-sm" />Expiré
      </div>

      <q-list v-if="services.length >= 1" style="text-align: left;">

        <q-item v-for="service in services" class="q-mb-sm"
          :active-class="(moment(service.date_start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) ? 'bg-light-blue-9 glossy text-white' : (moment(service.date_start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) ? 'bg-red-9 glossy text-white' : (moment(service.date_start).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) ? 'bg-blue-grey-7 glossy text-white' : ''"
          :active="(moment(service.date_start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) ? true : (moment(service.date_start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) ? true : (moment(service.date_start).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(service.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) ? true : false">

          <q-item-section style="width: 50px; height: 30px; max-width: 30px;">
            <q-img style="width: 30px; height: 30px;" :src="folderAPI + '/services/' + service.icone" />
          </q-item-section>

          <q-item-section class="text-left" style="margin-left: 16px;margin-right: 16px;">
            <q-item-label caption lines="1" style="font-size: 14px;"><strong>{{ service.service_name
                }}</strong></q-item-label>

            <q-item-label caption lines="2" style="font-size: 12px;">Du {{
              moment(service.date_start).format('DD/MM/YYYY') }} à {{
                replace(':', 'h', service.hour_start) }}</q-item-label>
            <q-item-label caption lines="3" style="font-size: 12px;">au {{
              moment(service.date_end).format('DD/MM/YYYY') }} à {{ replace(':', 'h', service.hour_end)
              }}</q-item-label>
          </q-item-section>

          <q-item-section style="max-width: 40px;margin-left: 0;">
            <q-btn @click="showPrestation(service)" v-ripple class="glossy" size="md" dense color="light-green-9">
              <q-icon size="16px" name="chevron_right" />
            </q-btn>
          </q-item-section>

        </q-item>

      </q-list>

      <q-item v-else style="align-items: center;flex-direction: column;">
        <q-icon size="xl" name="warning" class="text-orange-9 q-mb-md" /> <span class="text-bold"
          style="font-size: 16px;">Vous n'avez aucune
          demande de
          prestation
          pour le moment !</span>
      </q-item>

    </div>

  </transition>

  <q-dialog v-model="filterDialog" position="right">

    <q-card class="q-pb-md" style="max-width: 250px;padding: 0 1rem">

      <q-toolbar class="q-mt-md">

        <q-icon name="filter_alt" size="md" />

        <q-toolbar-title><span class="text-weight-bold">Filtrer</span></q-toolbar-title>

      </q-toolbar>

      <q-form @submit="loadFilter()">

        <q-item-label header class="q-pl-none">Filtrer par état</q-item-label>

        <q-radio v-model="filter" color="blue-grey-7" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1"
          label="Prestation programmée" />
        <q-radio v-model="filter" color="light-blue-9" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
          val="2" label="Prestation en cours" />
        <q-radio v-model="filter" color="red-9" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3"
          label="Prestation expiré" />

        <q-btn type="submit" style="margin-top: 16px" glossy v-ripple padding="5px" class="w-100" dense
          color="light-blue-9">
          <div style="font-weight: 600;text-transform:none;">Filtrer</div>
        </q-btn>

        <q-btn @click="deleteFilter()" v-ripple padding="5px" class="w-100 q-mt-md q-mb-md" dense color="grey-4">
          <div style="font-weight: 600;text-transform:none;color: black;">Supprimer les Filtres</div>
        </q-btn>

      </q-form>

    </q-card>

  </q-dialog>

  <q-dialog v-model="prestationDialog" position="bottom">

    <q-card class="q-pb-md" style="width: 100%;padding: 0 1rem; padding-bottom: 1rem;">

      <q-toolbar class="q-mt-md">

        <q-toolbar-title><span class="text-weight-bold">Informations détaillées</span></q-toolbar-title>

      </q-toolbar>

      <q-item-label class="q-pb-none" header>
        Nom de la prestation :
      </q-item-label>

      <q-item style="min-height: auto;padding-bottom: 16px;">
        {{ show_prestation.service_name }}
      </q-item>

      <hr style="margin: 0 16px;">

      <q-item-label class="q-pb-none" header>
        Statut de la prestation :
      </q-item-label>

      <q-item style="align-items: center;padding-bottom: 16px;"
        v-if="moment(show_prestation.date_start).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD') && moment(show_prestation.date_end).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')">
        <q-badge color="blue-grey-7" rounded class="q-mr-sm" />Prestation programmée
      </q-item>

      <q-item style="align-items: center;padding-bottom: 16px;"
        v-if="moment(show_prestation.date_start).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') && moment(show_prestation.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')">
        <q-badge color="light-blue-9" rounded class="q-mr-sm" />Prestation en cours
      </q-item>

      <q-item style="align-items: center;padding-bottom: 16px;"
        v-if="moment(show_prestation.date_start).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && moment(show_prestation.date_end).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')">
        <q-badge color="red-9" rounded class="q-mr-sm" />Prestation expiré
      </q-item>

      <hr style="margin: 0 16px;">

      <q-item-label class="q-pb-none" header>
        Total de la prestation :
      </q-item-label>

      <q-item style="min-height: auto;padding-bottom: 16px;">
        {{ show_prestation.total_ttc }} €
      </q-item>

      <hr style="margin: 0 16px;">

      <q-item-label class="q-pb-none" header>
        Date de la prestation :
      </q-item-label>

      <q-item style="min-height: auto;padding-bottom: 16px;flex-direction: column;">
        <div>Du {{
          moment(show_prestation.date_start).format('DD/MM/YYYY') }} à {{
            replace(':', 'h', show_prestation.hour_start) }} au {{ moment(show_prestation.date_end).format('DD/MM/YYYY')
          }}
          à {{
            replace(':', 'h', show_prestation.hour_end) }}
        </div>
        <div>Nombre de jours : {{ show_prestation.total_days }}</div>
        <div>Nombre d'heures : {{ show_prestation.total_hours }}</div>
      </q-item>

      <hr style="margin: 0 16px;">

      <q-item-label class="q-pb-none" header>
        Statut de la prestation :
      </q-item-label>

      <q-item style="min-height: auto;align-items: center;padding-bottom: 16px;">
        <q-icon class="q-mr-xs" :color="(show_prestation.status === 2) ? 'green-9' : 'red-9'"
          :name="(show_prestation.status === 2) ? 'task_alt' : 'cancel'" /> {{
            show_prestation.status_name }}
      </q-item>

      <hr style="margin: 0 16px;">

      <q-item-label class="q-pb-none" header>
        Coordonnées de l'agence :
      </q-item-label>

      <q-item style="min-height: auto;align-items: start;flex-direction: column;padding-bottom: 16px;">

        <q-item class="q-pl-none q-pr-none" style="align-items: center;">
          <q-img style="width: 50px;" class="q-mr-sm" :src="show_prestation.logo" />
          <span class="text-bold">{{ show_prestation.name }}</span>
        </q-item>

        <span class="q-mt-sm text-bold"><q-icon class="q-mr-xs" name="location_on" style="color:#27a4dc" />{{
          show_prestation.adresse
          }}</span>

        <span class="q-mt-sm flex text-bold" style="align-items: center;"><q-icon class="q-mr-xs" style="color:#27a4dc"
            name="call" /><a :href="'tel:' + show_prestation.phone_pro" style="text-decoration: none; color:inherit">{{
              show_prestation.phone_pro }}</a></span>

      </q-item>

      <hr style="margin: 0 16px;"
        v-if="moment(show_prestation.date_start).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') && moment(show_prestation.date_start).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(show_prestation.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && show_prestation.status === 2">

      <q-item class="q-mt-sm" style="justify-content: flex-end;"
        v-if="moment(show_prestation.date_start).format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') && moment(show_prestation.date_start).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(show_prestation.date_end).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && show_prestation.status === 2">
        <q-btn @click="refundPrestation(show_prestation.id, show_prestation.paypal_id, show_prestation.companie_id)"
          v-ripple class="glossy" color="red-9"><span class="text-bold" style="text-transform: initial;">Annuler la
            prestation</span></q-btn>
      </q-item>

    </q-card>

  </q-dialog>

</template>

<script>

import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import axios from 'axios'
import { ref } from 'vue'
import moment from 'moment'
import { useQuasar } from 'quasar'

const services = ref([]),
  services_list = ref(false),
  folderAPI = ref(process.env.API),
  filterDialog = ref(false),
  prestationDialog = ref(false),
  filters = ref(false),
  loaderPrestation = ref(false)

// Dialog prestation
const show_prestation = ref([])

// Form
const filter = ref(0)

moment.locale('fr')

export default defineComponent({
  name: 'Section2Component',
  components: {
  },
  setup () {

    const $q = useQuasar(),
      userStore = useUserStore(),
      { isLoggedIn, user } = storeToRefs(userStore)

    return {
      user,
      isLoggedIn: isLoggedIn,
      moment: moment,
      services,
      services_list,
      folderAPI,
      filterDialog,
      prestationDialog,
      show_prestation,
      filters,
      loaderPrestation,

      filter,

      showFilter () {
        (filterDialog.value) ? filterDialog.value = false : filterDialog.value = true
      },
      showPrestation (service) {
        (prestationDialog.value) ? prestationDialog.value = false : prestationDialog.value = true
        show_prestation.value = service
      },
      loadFilter () {

        filterDialog.value = false
        services_list.value = false
        filters.value = false

        setTimeout(() => {
          loaderPrestation.value = true
        }, 1200);

        // Liste des services

        axios.get(process.env.API + '/api/user/services/' + userStore.stateUser.user.email + '/' + filter.value)
          .then(res => {

            if (res.data.succes) {

              services.value = res.data.services

              setTimeout(() => {
                loaderPrestation.value = false
              }, 3500);

              setTimeout(() => {
                services_list.value = true
                filters.value = true
              }, 4000);

            } else {

              loaderPrestation.value = false
              services_list.value = true
              filters.value = true
              services.value = []

            }

          })

      },
      deleteFilter () {

        filter.value = 0

        filterDialog.value = false
        services_list.value = false
        filters.value = false

        setTimeout(() => {
          loaderPrestation.value = true
        }, 1200);

        // Liste des services

        axios.get(process.env.API + '/api/user/services/' + userStore.stateUser.user.email + '/' + filter.value)
          .then(res => {

            if (res.data.succes) {

              setTimeout(() => {
                services.value = res.data.services
                loaderPrestation.value = false
              }, 3500);

              setTimeout(() => {
                services_list.value = true
                filters.value = true
              }, 4000);

            } else {

              services.value = []

              setTimeout(() => {
                loaderPrestation.value = false
              }, 3500);

              setTimeout(() => {
                services_list.value = true
                filters.value = true
              }, 4000);

            }

          })

      },
      refundPrestation (id, tokenPaiement, compagnieId) {

        filter.value = 0

        prestationDialog.value = false
        services_list.value = false
        filters.value = false

        setTimeout(() => {
          loaderPrestation.value = true
        }, 1200);

        axios.post(process.env.API + '/api/paypal/order-refund-services', {
          userId: userStore.stateUser.user.id,
          prestationId: id,
          compagnieId,
          tokenPaiement
        })
          .then(res => {

            if (res.data.succes) {

              $q.notify({
                timeout: 2000,
                color: 'green-5',
                textColor: 'white',
                icon: 'cloud_done',
                message: res.data.message,
                progress: true,
                classes: 'glossy',
              })

              axios.get(process.env.API + '/api/user/services/' + userStore.stateUser.user.email + '/' + filter.value)
                .then(res => {

                  if (res.data.succes) {

                    setTimeout(() => {
                      services.value = res.data.services
                      loaderPrestation.value = false
                    }, 3500);

                    setTimeout(() => {
                      services_list.value = true
                      filters.value = true
                    }, 4000);

                  } else {

                    setTimeout(() => {
                      services.value = []
                      loaderPrestation.value = false
                    }, 3500);

                    setTimeout(() => {
                      services_list.value = true
                      filters.value = true
                    }, 4000);

                  }

                })

            } else {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: res.data.message,
                progress: true,
                classes: 'glossy',
              })

            }

          })

      }
    }

  },
  mounted () {

    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    services_list.value = false
    filters.value = false

    if (this.connexionState && this.isLoggedIn && userStore.stateUser.user.user_type <= 1) {

      setTimeout(() => {
        services_list.value = true
        filters.value = true
      }, 4000);

      // Liste des services

      services.value = []

      axios.get(process.env.API + '/api/user/services/' + userStore.stateUser.user.email + '/' + filter.value)
        .then(res => {

          if (res.data.succes) {
            services.value = res.data.services
          } else {
            services.value = []
          }

        })

    }

  },
  methods: {
    replace: function (st, rep, repWith) {
      const result = repWith.replace(st, rep)
      return result;
    }
  },
  props: {
    connexionState: {
      tyoe: Boolean
    }
  }

})

</script>
