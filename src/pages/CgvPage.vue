<template name="CgvPage">

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

    <transition v-show="bloc_show" appear enter-active-class="animated fadeIn" style="margin-bottom: 30px;"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Condition général de vente</h5>

        <div class="bloc-informations">

          <div class="container py-5">
            <p class="text-bold"> Les présentes conditions générales régissent l’utilisation de ce site
              aad-services-a-la-personne.fr.
            </p>
            <p> Ce site appartient et est géré par Gaëtan Seigneur </p>
            <p> En utilisant ce site, vous indiquez que vous avez lu et compris les conditions d’utilisation et que vous
              acceptez de les respecter en tout temps. </p>
            <p class="text-bold"> Type de site : e-commerce </p>
            <p class="text-bold"> Propriété intellectuelle </p>
            <p> Tout contenu publié et mis à disposition sur ce site est la propriété de Gaëtan Seigneur et de ses
              créateurs. Cela comprend, mais n’est pas limité aux images, textes, logos, documents, fichiers
              téléchargeables et tout ce qui contribue à la composition de ce site. </p>
            <p class="text-bold"> Contributions d'utilisateur </p>
            <p> Les utilisateurs peuvent publier les informations suivantes sur notre site : </p>
            <p> Commentaire du public </p>
            <p class="text-bold"> Ajout ou modification d'un établissement </p>
            <p> En affichant publiquement sur notre site, vous acceptez de ne pas agir illégalement ou violer les
              conditions d’utilisation acceptable énumérées dans ce document. </p>
            <p class="text-bold"> Comptes </p>
            <p class="text-bold"> Lorsque vous créez un compte sur notre site, vous acceptez ce qui suit : </p>
            <p> que vous êtes seul responsable de votre compte et de la sécurité et la confidentialité de votre compte,
              y compris les mots de passe ou les renseignements de nature délicate joints à ce compte, et que tous les
              renseignements personnels que vous nous fournissez par l’entremise de votre compte sont à jour, exacts et
              véridiques et que vous mettrez à jour vos renseignements personnels s’ils changent. Nous nous réservons le
              droit de suspendre ou de résilier votre compte si vous utilisez notre site illégalement ou si vous violez
              les conditions d’utilisation acceptable. </p>
            <p class="text-bold"> Ventes des biens et services </p>
            <p> Ce document régit la vente des biens et services mis à disposition sur notre site. </p>
            <p class="text-bold"> Les biens que nous offrons comprennent : </p>
            <p> Licence 1 mois </p>
            <p> Licence 3 mois </p>
            <p> Licence 6 mois </p>
            <p> Licence 9 mois </p>
            <p> Licence 12 mois </p>
            <p> Les biens et services liés à ce document sont les biens et services qui sont affichés sur notre site au
              moment où vous y accédez. Cela comprend tous les produits énumérés comme étant en rupture de stock. Toutes
              les informations, descriptions ou images que nous fournissons sur nos biens et services sont décrites et
              présentées avec la plus grande précision possible. Cependant, nous ne sommes pas légalement tenus par ces
              informations, descriptions ou images car nous ne pouvons pas garantir l’exactitude de chaque produit ou
              service que nous fournissons. Vous acceptez d’acheter ces biens et services à vos propres risques. </p>
            <p class="text-bold"> Paiements </p>
            <p class="text-bold"> Nous acceptons les modes de paiement suivants sur ce site : </p>
            <p> Mollie </p>
            <p> Lorsque vous nous fournissez vos renseignements de paiement, vous nous confirmez que vous avez autorisé
              l’utilisation et l’accès à l’instrument de paiement que vous avez choisi d’utiliser. En nous fournissant
              vos détails de paiement, vous confirmez que vous nous autorisez à facturer le montant dû à cet instrument
              de paiement. </p>
            <p> Si nous estimons que votre paiement a violé une loi ou l’une de nos conditions d’utilisation, nous nous
              réservons le droit d’annuler votre transaction. </p>
            <p class="text-bold"> Services </p>
            <p> Les services seront facturés en totalité à la commande du service. </p>
            <p class="text-bold"> Remboursement </p>
            <p> Les demandes de remboursement peuvent être faites dans les délais de 14 jours après la réception de vos
              biens et services. </p>
            <p class="text-bold"> Limitation de responsabilité </p>
            <p> Gaëtan Seigneur ou l’un de ses employés sera tenu responsable de tout problème découlant de ce site.
              Néanmoins, Gaëtan Seigneur et ses employés ne seront pas tenus responsables de tout problème découlant de
              toute utilisation irrégulière de ce site. </p>
            <p class="text-bold"> Indemnité </p>
            <p> En tant qu’utilisateur, vous indemnisez par les présentes Gaëtan Seigneur de toute responsabilité, de
              tout coût, de toute cause d’action, de tout dommage ou de toute dépense découlant de votre utilisation de
              ce site ou de votre violation de l’une des dispositions énoncées dans le présent document. </p>
            <p class="text-bold"> Lois applicables </p>
            <p> Ce document est soumis aux lois applicables en France et vise à se conformer à ses règles et règlements
              nécessaires. Cela inclut la réglementation à l’échelle de l’UE énoncée dans le RGPD. </p>
            <p class="text-bold"> Divisibilité </p>
            <p> Si, à tout moment, l’une des dispositions énoncées dans le présent document est jugée incompatible ou
              invalide en vertu des lois applicables, ces dispositions seront considérées comme nulles et seront
              retirées du présent document. Toutes les autres dispositions ne seront pas touchées par les lois et le
              reste du document sera toujours considéré comme valide. </p>
            <p class="text-bold"> Modifications </p>
            <p> Ces conditions générales peuvent être modifiées de temps à autre afin de maintenir le respect de la loi
              et de refléter tout changement à la façon dont nous gérons notre site et la façon dont nous nous attendons
              à ce que les utilisateurs se comportent sur notre site. Nous recommandons à nos utilisateurs de vérifier
              ces conditions générales de temps à autre pour s’assurer qu’ils sont informés de toute mise à jour. Au
              besoin, nous informerons les utilisateurs par courriel des changements apportés à ces conditions ou nous
              afficherons un avis sur notre site. </p>
            <p class="text-bold"> Contact </p>
            <p class="text-bold"> Veuillez communiquer avec nous si vous avez des questions ou des préoccupations. Nos
              coordonnées sont les suivantes : </p>
            <p> 06 50 55 87 31 </p>
            <p> contact@aad-services-a-la-personne.fr<a data-fr-linked="true"
                href="mailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a> </p>
            <p> 125 AVENUE FELIX GENESLAY, 72100, Le Mans </p>
            <p class="text-bold"> Date d'entrée en vigueur : le 3 janvier 2025 </p>
          </div>

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
  name: 'CgvPage',
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
