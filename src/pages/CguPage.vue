<template name="CguPage">

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

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Condition général d'utilisation</h5>

        <div class="bloc-informations">

          <p class="text-bold">Préambule</p>
          <p>Les présentes conditions générales d'utilisation sont conclues entre :</p>
          <p>- le gérant du site internet, ci-après désigné « l’Éditeur »,</p>
          <p>- toute personne souhaitant accéder au site et à ses services, ci-après appelé « l’Utilisateur ».</p>
          <p class="text-bold">Article 1 - Principes</p>
          <p>Les présentes conditions générales d'utilisation ont pour objet l'encadrement juridique de l’utilisation
            du site AAD - Services à la personne</p>
          <p>et de ses services.</p>
          <p>Le site Internet <a data-fr-linked="true"
              href="https://aad-services-a-la-personne.fr">https://aad-services-a-la-personne.fr</a> est un
            service de :</p>
          <p>L'entreprise individuelle AAD - Services à la personne</p>
          <p>située 125 Avenue Félix Geneslay 72100 Le Mans, France</p>
          <p>adresse URL du site : <a data-fr-linked="true"
              href="https://aad-services-a-la-personne.fr">https://aad-services-a-la-personne.fr</a></p>
          <p>e-mail : <a data-fr-linked="true"
              href="mailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a></p>
          <p>numéro de téléphone : 0650558731</p>
          <p>Les conditions générales d'utilisation doivent être acceptées par tout Utilisateur, et son accès au site
            vaut acceptation de ces</p>
          <p>conditions.</p>
          <p class="text-bold">Article 2 - Evolution et durée des CGU</p>
          <p>Les présentes conditions générales d'utilisation sont conclues pour une durée indéterminée. Le contrat
            produit ses effets à</p>
          <p>l'égard de l'Utilisateur à compter du début de l’utilisation du service. </p>
          <p>Le site LEP - Location entre particulier se réserve le droit de modifier les clauses de ces conditions
            générales d’utilisation à</p>
          <p>tout moment et sans justification.</p>
          <p class="text-bold">Article 3 - Accès au site</p>
          <p>Tout Utilisateur ayant accès à internet peut accéder gratuitement et depuis n’importe où au site My
            Bakery .</p>
          <p>Les frais supportés par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc.) ne
            sont pas à</p>
          <p>la charge de l’Éditeur.</p>
          <p>Le site et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à
            l’occasion d’une</p>
          <p>maintenance, sans obligation de préavis ou de justification.</p>
          <p>Le site comprend un espace membre payant réservé aux utilisateurs inscrits. Ces utilisateurs pourront y
            accéder en utilisant</p>
          <p>leurs identifiants de connexion.</p>
          <p>Les services réservés aux membres sont les suivants : Création, modification, suppression d'annonce
            soumis à abonnement. .</p>
          <p class="text-bold">Article 4 - Responsabilités</p>
          <p>La responsabilité de l'Éditeur ne peut être engagée en cas de défaillance, panne, difficulté ou
            interruption de fonctionnement,</p>
          <p>empêchant l'accès au site ou à une de ses fonctionnalités.</p>
          <p>Le matériel de connexion au site utilisée est sous l'entière responsabilité de l'Utilisateur qui doit
            prendre toutes les mesures</p>
          <p>appropriées pour protéger le matériel et les données notamment d'attaques virales par Internet.
            L'utilisateur est par ailleurs le</p>
          <p>seul responsable des sites et données qu'il consulte.</p>
          <p>L'Éditeur ne pourra être tenu responsable en cas de poursuites judiciaires à l'encontre de l'Utilisateur
            :</p>
          <p>- du fait de l'usage du site ou de tout service accessible via Internet ;</p>
          <p>- du fait du non-respect par l'Utilisateur des présentes conditions générales.</p>
          <p>L'Éditeur n'est pas responsable des dommages causés à l'Utilisateur, à des tiers et/ou à l'équipement de
            l'Utilisateur du fait de</p>
          <p>sa connexion ou de son utilisation du site et l'Utilisateur renonce à toute action contre l'Éditeur de ce
            fait.</p>
          <p>Si l'Éditeur venait à faire l'objet d'une procédure amiable ou judiciaire à raison de l'utilisation du
            site par l'Utilisateur, il</p>
          <p>pourra retourner contre lui pour obtenir indemnisation de tous les préjudices, sommes, condamnations et
            frais qui pourraient</p>
          <p>découler de cette procédure.</p>
          <p>Il est permis à l'Utilisateur de publier sur le site AAD - Services à la personne :Il est permis à
            l'Utilisateur de publier
            sur le site AAD - Services à la personne :</p>
          <p>- Annonce professionel.</p>
          <p>L'Utilisateur s’engage à tenir des propos respectueux des autres et de la loi et accepte que ces
            publications soient modérées</p>
          <p>ou refusées par l’Éditeur, sans obligation de justification.</p>
          <p>En publiant sur le site, l’Utilisateur cède à la société éditrice le droit non exclusif et gratuit de
            représenter, reproduire,</p>
          <p>adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé.</p>
          <p>L’Éditeur s'engage toutefois à citer le membre en cas d’utilisation de sa publication.</p>
          <p class="text-bold">Article 5 - Propriété intellectuelle</p>
          <p>Tous les documents techniques, produits, photographies, textes, logos, dessins, vidéos, etc., sont soumis
            à des droits d'auteur</p>
          <p>et sont protégés par le Code de la propriété intellectuelle. Lorsqu'ils sont remis à nos clients, ils
            demeurent la propriété</p>
          <p>exclusive de AAD - Services à la personne , seul titulaire des droits de propriété intellectuelle sur ces
            documents, qui</p>
          <p>doivent lui être rendus à sa demande.</p>
          <p>Nos clients s'engagent à ne faire aucun usage de ces documents, susceptible de porter atteinte aux droits
            de propriété</p>
          <p>industrielle ou intellectuelle du fournisseur et s'engagent à ne les divulguer à aucun tiers, en dehors
            d'une autorisation</p>
          <p>expresse et préalable donnée par l'Editeur.</p>
          <p class="text-bold">Article 6 - Liens hypertextes</p>
          <p>La mise en place par l'Utilisateur de tous liens hypertextes vers tout ou partie du site est strictement
            interdite, sauf</p>
          <p>autorisation préalable et écrite de l'Éditeur, sollicitée par courriel à l'adresse suivante : <a
              data-fr-linked="true"
              href="mailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a></p>
          <p>.</p>
          <p>L'Éditeur est libre de refuser cette autorisation sans avoir à justifier de quelque manière que ce soit
            sa décision. Dans le cas</p>
          <p>où l'Éditeur accorderait son autorisation, celle-ci n'est dans tous les cas que temporaire et pourra être
            retirée à tout moment,</p>
          <p>sans obligation de justification à la charge de l'Éditeur.</p>
          <p>Dans tous les cas, tout lien devra être retiré sur simple demande de l'Éditeur.</p>
          <p>Toute information accessible via un lien vers d'autres sites n'est pas sous le contrôle de l'Éditeur qui
            décline toute</p>
          <p>responsabilité quant à leur contenu.</p>
          <p class="text-bold">Article 7 - Protection des données personnelles</p>
          <p>Données collectées</p>
          <p>Les données à caractère personnel qui sont collectées sur ce site sont les suivantes :</p>
          <p>- ouverture de compte : lors de la création du compte de l'utilisateur : nom ; prénom ; adresse
            électronique ; n° de</p>
          <p>téléphone ; adresse postale ;</p>
          <p>- connexion : lors de la connexion de l'utilisateur au site web, celui-ci enregistre, notamment, ses nom,
            prénom, données de</p>
          <p>connexion, d'utilisation, de localisation et ses données relatives au paiement ;</p>
          <p>- profil : l'utilisation des prestations prévues sur le site web permet de renseigner un profil, pouvant
            comprendre une adresse</p>
          <p>et un numéro de téléphone ;</p>
          <p>- paiement : dans le cadre du paiement des produits et prestations proposés sur le site web, celui-ci
            enregistre des données</p>
          <p>financières relatives au compte bancaire ou à la carte de crédit de l'utilisateur ; </p>
          <p>- communication : lorsque le site web est utilisé pour communiquer avec d'autres membres, les données
            concernant les</p>
          <p>communications de l'utilisateur font l'objet d'une conservation temporaire ;</p>
          <p>- cookies : les cookies sont utilisés, dans le cadre de l'utilisation du site. L'utilisateur a la
            possibilité de désactiver les cookies</p>
          <p>à partir des paramètres de son navigateur.</p>
          <p>Utilisation des données personnelles</p>
          <p>Les données personnelles collectées auprès des utilisateurs ont pour objectif la mise à disposition des
            services du site web,</p>
          <p>leur amélioration et le maintien d'un environnement sécurisé. Plus précisément, les utilisations sont les
            suivantes :</p>
          <p>- accès et utilisation du site web par l'utilisateur ;</p>
          <p>- gestion du fonctionnement et optimisation du site web ;</p>
          <p>- organisation des conditions d'utilisation des Services de paiement ;</p>
          <p>- vérification, identification et authentification des données transmises par l'utilisateur ;</p>
          <p>- proposition à l'utilisateur de la possibilité de communiquer avec d'autres utilisateurs du site web ;
          </p>
          <p>- mise en oeuvre d'une assistance utilisateurs ;</p>
          <p>- personnalisation des services en affichant des publicités en fonction de l'historique de navigation de
            l'utilisateur, selon ses</p>
          <p>préférences ;</p>
          <p>- prévention et détection des fraudes, malwares (malicious softwares ou logiciels malveillants) et
            gestion des incidents de</p>
          <p>sécurité ;</p>
          <p>- gestion des éventuels litiges avec les utilisateurs ;</p>
          <p>- envoi d'informations commerciales et publicitaires, en fonction des préférences de l'utilisateur.-
            envoi d'informations commerciales et publicitaires, en fonction des préférences de l'utilisateur.</p>
          <p>Partage des données personnelles avec des tiers</p>
          <p>Les données personnelles peuvent être partagées avec des sociétés tierces, dans les cas suivants :</p>
          <p>- lorsque l'Utilisateur utilise les services de paiement, pour la mise en oeuvre de ces services, le site
            web est en relation avec</p>
          <p>des sociétés bancaires et financières tierces avec lesquelles elle a passé des contrats ;</p>
          <p>- lorsque l'Utilisateur publie, dans les zones de commentaires libres du site web, des informations
            accessibles au public ;</p>
          <p>- lorsque l'Utilisateur autorise le site web d'un tiers à accéder à ses données ;</p>
          <p>- lorsque le site web recourt aux services de prestataires pour fournir l'assistance utilisateurs, la
            publicité et les services de</p>
          <p>paiement. Ces prestataires disposent d'un accès limité aux données de l'utilisateur, dans le cadre de
            l'exécution de ces</p>
          <p>prestations, et ont une obligation contractuelle de les utiliser en conformité avec les dispositions de
            la réglementation</p>
          <p>applicable en matière protection des données à caractère personnel ;</p>
          <p>- si la loi l'exige, le site web peut effectuer la transmission de données pour donner suite aux
            réclamations présentées contre</p>
          <p>le site web et se conformer aux procédures administratives et judiciaires ;</p>
          <p>- si le site web est impliquée dans une opération de fusion, acquisition, cession d'actifs ou procédure
            de redressement</p>
          <p>judiciaire, elle pourra être amenée à céder ou partager tout ou partie de ses actifs, y compris les
            données à caractère</p>
          <p>personnel. Dans ce cas, les utilisateurs seraient informés, avant que les données à caractère personnel
            ne soient transférées à</p>
          <p>une tierce partie.</p>
          <p>Sécurité et confidentialité</p>
          <p>Le site web met en oeuvre des mesures organisationnelles, techniques, logicielles et physiques en matière
            de sécurité du</p>
          <p>numérique pour protéger les données personnelles contre les altérations, destructions et accès non
            autorisés. Toutefois, il est</p>
          <p>à signaler qu'internet n'est pas un environnement complètement sécurisé et le site web ne peut pas
            garantir la sécurité de la</p>
          <p>transmission ou du stockage des informations sur internet.</p>
          <p>Mise en oeuvre des droits des utilisateurs</p>
          <p>En application de la réglementation applicable aux données à caractère personnel, les utilisateurs
            disposent des droits</p>
          <p>suivants, qu'ils peuvent exercer en faisant leur demande à l'adresse suivante : <a data-fr-linked="true"
              href="mailto:contact@aad-services-a-la-personne.fr">contact@aad-services-a-la-personne.fr</a>.</p>
          <p>le droit d’accès : ils peuvent exercer leur droit d'accès, pour connaître les données personnelles les
            concernant. Dans</p>
          <p>ce cas, avant la mise en œuvre de ce droit, le site web peut demander une preuve de l'identité de
            l'utilisateur afin d'en</p>
          <p>vérifier l'exactitude.</p>
          <p>le droit de rectification : si les données à caractère personnel détenues par le site web sont inexactes,
            ils peuvent</p>
          <p>demander la mise à jour des informations.</p>
          <p>le droit de suppression des données : les utilisateurs peuvent demander la suppression de leurs données à
            caractère</p>
          <p>personnel, conformément aux lois applicables en matière de protection des données.</p>
          <p>le droit à la limitation du traitement : les utilisateurs peuvent de demander au site web de limiter le
            traitement des</p>
          <p>données personnelles conformément aux hypothèses prévues par le RGPD.</p>
          <p>le droit de s’opposer au traitement des données : les utilisateurs peuvent s’opposer à ce que ses données
            soient</p>
          <p>traitées conformément aux hypothèses prévues par le RGPD.</p>
          <p>le droit à la portabilité : ils peuvent réclamer que le site web leur remette les données personnelles
            qui lui sont</p>
          <p>fournies pour les transmettre à un nouveau site web.</p>
          <p>Evolution de la présente clause</p>
          <p>Le site web se réserve le droit d'apporter toute modification à la présente clause relative à la
            protection des données à</p>
          <p>caractère personnel à tout moment. Si une modification est apportée à la présente clause de protection
            des données à</p>
          <p>caractère personnel, le site web s'engage à publier la nouvelle version sur son site. Le site web
            informera également les</p>
          <p>utilisateurs de la modification par messagerie électronique, dans un délai minimum de 15 jours avant la
            date d'effet. Si</p>
          <p>l'utilisateur n'est pas d'accord avec les termes de la nouvelle rédaction de la clause de protection des
            données à caractère</p>
          <p>personnel, il a la possibilité de supprimer son compte.</p>
          <p class="text-bold">Article 8 - Cookies</p>
          <p>Le site LEP - Location entre particulier peut collecter automatiquement des informations standards.
            Toutes les informations</p>
          <p>collectées indirectement ne seront utilisées que pour suivre le volume, le type et la configuration du
            trafic utilisant ce site,</p>
          <p>pour en développer la conception et l'agencement et à d'autres fins administratives et de planification
            et plus généralement</p>
          <p>pour améliorer le service que nous vous offrons.</p>
          <p class="text-bold">Article 9 - Loi applicable</p>
          <p>Les présentes conditions générales d'utilisation sont soumises à l'application du droit français.</p>
          <p>Si les parties n'arrivent pas à résoudre un litige à l'amiable, le litige sera soumis à la compétence des
            tribunaux français.Si les parties n'arrivent pas à résoudre un litige à l'amiable, le litige sera soumis à
            la compétence des tribunaux français.</p>

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
  name: 'CguPage',
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
