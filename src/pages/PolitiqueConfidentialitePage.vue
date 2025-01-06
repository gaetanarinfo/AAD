<template name="PolitiqueConfidentialitePage">

  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

    <!-- Logo -->
    <transition v-show="logo" appear enter-active-class="animated fadeIn" style="margin-top: 30px;"
      leave-active-class="animated fadeOut">
      <div class="w-100 flex flex-center column form-w">

        <q-img src="~assets/logo.png" spinner-color="light-blue-9" style="max-width: 150px; min-height: 150px"
          alt="AAD - Services à la personne"></q-img>

        <div class="wrapper">
          <div class="line"></div>
          <h1 class="title text-center">
            AAD
          </h1>
          <div class="line"></div>
        </div>
        <p class="title">Services à la personne</p>

      </div>
    </transition>

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="bloc_show" appear enter-active-class="animated fadeIn" style="margin-bottom: 90px;;"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Politique de confidentialité</h5>

        <div class="bloc-informations">
          <p>Le site web AAD - Services à la personne est détenu par AAD - Services à la personne, qui est un contrôleur
            de données de vos données
            personnelles.</p>
          <p>Nous avons adopté cette politique de confidentialité, qui détermine la manière dont nous traitons les
            informations collectées par AAD - Services à la personne, qui fournit également les raisons pour lesquelles
            nous devons
            collecter certaines données personnelles vous concernant. Par conséquent, vous devez lire cette politique de
            confidentialité avant d'utiliser le site web de AAD - Services à la personne.</p>
          <p>Nous prenons soin de vos données personnelles et nous nous engageons à en garantir la confidentialité et la
            sécurité.</p>
          <p><span class="text-bold">Connexion via la plateforme google</span></p>
          <p><span class="text-bold">Les informations personnelles que nous collectons :</span><br> Votre image de
            profil, ainsi que l'adresse email, le nom, le prénom, ces données ne sont ni vendu ni partagé à des tiers
            personnes ou qui pourrait servir de rémunération à AAD - Services à la personne. </p>
          <p><span class="text-bold">Les informations personnelles que nous collectons :</span><br> Lorsque vous visitez
            le AAD - Services à la personne, nous recueillons automatiquement certaines informations sur votre appareil,
            notamment des
            informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies
            installés sur votre appareil. En outre, lorsque vous naviguez sur le site, nous recueillons des informations
            sur les pages web ou les produits individuels que vous consultez, sur les sites web ou les termes de
            recherche qui vous ont renvoyé au site et sur la manière dont vous interagissez avec le site. Nous désignons
            ces informations collectées automatiquement par le terme "informations sur les appareils". En outre, nous
            pourrions collecter les données personnelles que vous nous fournissez (y compris, mais sans s'y limiter, le
            nom, le prénom, l'adresse, les informations de paiement, etc.) lors de l'inscription afin de pouvoir
            exécuter le contrat. Nous récoltons aussi votre localisation pour vous offrir la meilleure expérience
            possible. Nous nous engageons à ne pas enregistrer votre localisation. Cela sert simplement à vous localiser
            et à trouver des boulangeries dans les alentours. Il est possible de la désactiver à tout moment.</p>
          <p><span class="text-bold">Pourquoi traitons-nous vos données ?</span><br> Notre priorité absolue est la
            sécurité des données des clients et, à ce titre, nous ne pouvons traiter que des données minimales sur les
            utilisateurs, uniquement dans la mesure où cela est absolument nécessaire pour maintenir le site web. Les
            informations collectées automatiquement sont utilisées uniquement pour identifier les cas potentiels d'abus
            et établir des informations statistiques concernant l'utilisation du site web. Ces informations statistiques
            ne sont pas autrement agrégées de manière à identifier un utilisateur particulier du système.</p>
          <p>Vous pouvez visiter le site web sans nous dire qui vous êtes ni révéler d'informations, par lesquelles
            quelqu'un pourrait vous identifier comme un individu spécifique et identifiable. Toutefois, si vous
            souhaitez utiliser certaines fonctionnalités du site web, ou si vous souhaitez recevoir notre lettre
            d'information ou fournir d'autres détails en remplissant un formulaire, vous pouvez nous fournir des données
            personnelles, telles que votre e-mail, votre prénom, votre nom, votre ville de résidence, votre
            organisation, votre numéro de téléphone. Vous pouvez choisir de ne pas nous fournir vos données
            personnelles, mais il se peut alors que vous ne puissiez pas profiter de certaines fonctionnalités du site
            web. Par exemple, vous ne pourrez pas recevoir notre bulletin d'information ou nous contacter directement à
            partir du site web. Les utilisateurs qui ne savent pas quelles informations sont obligatoires sont invités à
            nous contacter via <a
              href="mailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a>.</p>
          <p><span class="text-bold">Vos droits :</span><br> Si vous êtes un résident européen, vous disposez des droits
            suivants liés à vos données personnelles :</p>
          <p>Le droit d'être informé.<br> Le droit d'accès.<br> Le droit de rectification.<br> Le droit à
            l'effacement.<br> Le droit de restreindre le traitement.<br> Le droit à la portabilité des données.<br> Le
            droit d'opposition.<br> Les droits relatifs à la prise de décision automatisée et au profilage.<br> Si vous
            souhaitez exercer ce droit, veuillez nous contacter via les coordonnées ci-dessous.</p>
          <p>En outre, si vous êtes un résident européen, nous notons que nous traitons vos informations afin d'exécuter
            les contrats que nous pourrions avoir avec vous (par exemple, si vous passez une commande par le biais du
            site), ou autrement pour poursuivre nos intérêts commerciaux légitimes énumérés ci-dessus. En outre,
            veuillez noter que vos informations pourraient être transférées en dehors de l'Europe, y compris au Canada
            et aux États-Unis.</p>
          <p><span class="text-bold">Liens vers d'autres sites web :</span><br> Notre site web peut contenir des liens
            vers d'autres sites web qui ne sont pas détenus ou contrôlés par nous. Sachez que nous ne sommes pas
            responsables de ces autres sites web ou des pratiques de confidentialité des tiers. Nous vous encourageons à
            être attentif lorsque vous quittez notre site web et à lire les déclarations de confidentialité de chaque
            site web susceptible de collecter des informations personnelles.</p>
          <p><span class="text-bold">Sécurité de l'information :</span><br> Nous sécurisons les informations que vous
            fournissez sur des serveurs informatiques dans un environnement contrôlé et sécurisé, protégé contre tout
            accès, utilisation ou divulgation non autorisés. Nous conservons des garanties administratives, techniques
            et physiques raisonnables pour nous protéger contre tout accès, utilisation, modification et divulgation non
            autorisés des données personnelles sous son contrôle et sa garde. Toutefois, aucune transmission de données
            sur Internet ou sur un réseau sans fil ne peut être garantie.</p>
          <p><span class="text-bold">Divulgation légale :</span><br> Nous divulguerons toute information que nous
            collectons, utilisons ou recevons si la loi l'exige ou l'autorise, par exemple pour nous conformer à une
            citation à comparaître ou à une procédure judiciaire similaire, et lorsque nous pensons de bonne foi que la
            divulgation est nécessaire pour protéger nos droits, votre sécurité ou celle d'autrui, enquêter sur une
            fraude ou répondre à une demande du gouvernement.</p>
          <p><span class="text-bold">Informations de contact :</span><br> Si vous souhaitez nous contacter pour
            comprendre davantage la présente politique ou si vous souhaitez nous contacter concernant toute question
            relative aux droits individuels et à vos informations personnelles, vous pouvez envoyer un courriel à
            <a href="ùailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a>.
          </p>
        </div>

      </div>

    </transition>

  </q-page>

</template>

<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"
import { SessionStorage, useQuasar, exportFile } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  bloc_show = ref(false)

export default defineComponent({
  name: 'PolitiqueConfidentialitePage',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const router = useRouter()
    const $q = useQuasar()

    return {
      bloc_show,
      moment: moment,
      loader,
      logo,
      onLine: navigator.onLine,
      connexionState,
      folderAPI,
    }

  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") connexionState.value = false
      if (e.type == "online") connexionState.value = true
    },
    heightAuto (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `auto` : 'auto' }
    }
  },
  watch: {
    onLine (v) {
      if (v) {
        connexionState.value = true
        setTimeout(() => {
          connexionState.value = false
        }, 1000)
      }
    }
  },
  mounted () {

    bloc_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      bloc_show.value = true
    }, 4000);

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
