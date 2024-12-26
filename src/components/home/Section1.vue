<template name="Section1Component">

  <!-- Logo -->
  <transition v-show="logo" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div class="w-100 flex flex-center column">

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

    <div id="loader" class="column flex-center" style="min-height: 90vh; height: 100%;">
      <q-spinner-tail size="50px" color="light-blue-9" />
    </div>

  </transition>

  <!--Register Or Login -->
  <transition v-show="defaults" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step1" class="column text-center w-100">

      <div>

        <h5 class="q-mt-md q-mb-md">Êtes-vous inscit ?</h5>

        <q-list style="min-width: 300px; text-align: left;" bordered separator>
          <q-item clickable v-ripple :active="active" @click="setStep('register')"
            active-class="bg-light-blue-9 glossy text-white">
            <q-item-section avatar>
              <q-icon name="check" />
            </q-item-section>
            <q-item-section>Je créer mon compte</q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="active2" @click="setStep('login')"
            active-class="bg-light-blue-9 glossy text-white">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section>Je me connecte</q-item-section>
          </q-item>
        </q-list>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" :disabled="disabled" @click="clickStep()" color="light-blue-9 glossy"
            style="max-width: 100px;" dense rounded icon="arrow_forward"></q-btn>
        </div>

      </div>

    </div>

  </transition>

  <!-- Login -->
  <transition v-show="login" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step3" class="column text-center w-100">

      <div>

        <h5 class="q-mt-md q-mb-md">Connexion</h5>

        <q-form @submit="onSubmitLogin" class="q-gutter-md q-mt-md">

          <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
          (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

            <template v-slot:prepend>
              <q-icon size="xs" name="email" />
            </template>

          </q-input>

          <q-input dense filled v-model="password" label="Mot de passe *" lazy-rules
            :type="isPwd ? 'current-password' : 'text'"
            :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length > 7 || 'Votre mot de passe doit comporter au moins 8 caractères !']">

            <template v-slot:prepend>
              <q-icon size="xs" name="password" />
            </template>

            <template v-slot:append>
              <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>

          </q-input>

          <q-toggle color="light-blue-9" class="text-left" checked-icon="check" unchecked-icon="clear" keep-color
            v-model="accept" style="margin-top: 16px" label="Je suis d'accord avec la licence et les conditions" />

          <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
            <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
              icon="arrow_forward"></q-btn>
          </div>

        </q-form>

      </div>

    </div>

  </transition>

  <!-- Register Choice 1 -->
  <transition v-show="register" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step2" class="column text-center w-100">

      <div>

        <h5 class="q-mt-md q-mb-md">Vous êtes ?</h5>

        <q-list style="min-width: 300px; text-align: left;" bordered separator>
          <q-item clickable v-ripple :active="active" @click="setStep('registerParticulier')"
            active-class="bg-light-blue-9 glossy text-white">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>Un particulier</q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="active2" @click="setStep('registerProfessionnelle')"
            active-class="bg-light-blue-9 glossy text-white">
            <q-item-section avatar>
              <q-icon name="webhook" />
            </q-item-section>
            <q-item-section>Une entreprise</q-item-section>
          </q-item>
        </q-list>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" :disabled="disabled" @click="clickStep()" color="light-blue-9 glossy"
            style="max-width: 100px;" dense rounded icon="arrow_forward"></q-btn>
        </div>

      </div>

    </div>

  </transition>

  <!-- Register Choice Particulier -->
  <transition v-show="register5" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step-2-2" class="column text-center w-100">

      <q-form @submit="onSubmitRegister(5)" class="q-gutter-md q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données personnelles ?</h5>

        <div class="flex-start row items-center">

          <q-item-label>Civilité :</q-item-label>

          <q-radio v-model="sexe" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
            val="Mr" label="Mr" />

          <q-radio v-model="sexe" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
            val="Mme" label="Mme" />

        </div>

        <q-input dense filled v-model="lastname" label="Nom *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="firstname" label="Prénom *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="fonction" label="Fonction *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="adresse" label="Adresse *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-input dense filled v-model="ville" label="Ville *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-input dense filled v-model="codepostal" mask="#####" label="Code postal *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-select dense filled v-model="pays" label="Pays *" map-options :options="options" lazy-rules emit-value
          :rules="[val => val && val.length > 0 || 'Veuillez sélectionner un pays !']" transition-show="scale"
          transition-hide="scale">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

          <template v-slot:option="{ itemProps, opt }">

            <q-item v-bind="itemProps">

              <q-item-section style="max-width: 30px;margin-right: 5px;">
                <q-img spinner-color="light-blue-9" spinner-size="15px" style="max-width: 30px;"
                  :src="folderAPI + '/flags/' + opt.flag" />
              </q-item-section>

              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>

            </q-item>

          </template>

        </q-select>

        <q-input dense filled v-model="naissance" label="Date de naissance *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="naissance" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone" label="Téléphone *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="smartphone" />
          </template>

        </q-input>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Particulier 2 -->
  <transition v-show="register6" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step-2-2" class="column text-center w-100">

      <q-form @submit="onSubmitRegister(6)" class="q-gutter-md q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données de connexion ?</h5>

        <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
        (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="email" />
          </template>

        </q-input>

        <q-input dense filled v-model="password" label="Mot de passe *" lazy-rules
          :type="isPwd ? 'current-password' : 'text'"
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length > 7 || 'Votre mot de passe doit comporter au moins 8 caractères !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="password" />
          </template>

          <template v-slot:append>
            <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="isPwd = !isPwd" />
          </template>

        </q-input>

        <q-toggle color="light-blue-9" class="q-mt-none text-left" checked-icon="check" unchecked-icon="clear"
          keep-color v-model="accept" style="margin-top: 16px"
          label="Je suis d'accord avec la licence et les conditions" />

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 2/4 -->
  <transition v-show="register2" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step-2-2" class="column text-center w-100">

      <q-form @submit="onSubmitRegister(1)" class="q-gutter-md q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données personnelles ?</h5>

        <div class="flex-start row items-center">

          <q-item-label>Civilité :</q-item-label>

          <q-radio v-model="sexe" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
            val="Mr" label="Mr" />

          <q-radio v-model="sexe" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
            val="Mme" label="Mme" />

        </div>

        <q-input dense filled v-model="lastname" label="Nom *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="firstname" label="Prénom *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="fonction" label="Fonction *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="title" />
          </template>

        </q-input>

        <q-input dense filled v-model="adresse" label="Adresse *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-input dense filled v-model="ville" label="Ville *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-input dense filled v-model="codepostal" mask="#####" label="Code postal *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

        </q-input>

        <q-select dense filled v-model="pays" label="Pays *" map-options :options="options" lazy-rules emit-value
          :rules="[val => val && val.length > 0 || 'Veuillez sélectionner un pays !']" transition-show="scale"
          transition-hide="scale">

          <template v-slot:prepend>
            <q-icon size="xs" name="location_on" />
          </template>

          <template v-slot:option="{ itemProps, opt }">

            <q-item v-bind="itemProps">

              <q-item-section style="max-width: 30px;margin-right: 5px;">
                <q-img spinner-color="light-blue-9" spinner-size="15px" style="max-width: 30px;"
                  :src="folderAPI + '/flags/' + opt.flag" />
              </q-item-section>

              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>

            </q-item>

          </template>

        </q-select>

        <q-input dense filled v-model="naissance" label="Date de naissance *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="naissance" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone" label="Téléphone *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="smartphone" />
          </template>

        </q-input>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 3/4 -->
  <transition v-show="register3" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step-2-2" class="column text-center w-100">

      <q-form @submit="onSubmitRegister(2)" class="q-gutter-md q-mt-md">

        <h5 class="q-mt-md q-mb-md">Votre entreprise ?</h5>

        <q-uploader lazy-rules :form-fields="[{ name: 'name', value: 'value' }]" color="light-blue-9" dense filled
          style="margin-bottom:40px;" @added="logoSelected" label="Logo (Format : Image) / (Taille : < 5mo)"
          :filter="checkFileSize" @rejected="onRejected" accept="image/*">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />

              <div class="col">
                <div class="q-uploader__title">Insérer votre logo</div>
                <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
              </div>

              <q-btn v-if="scope.canAddFiles && scope.uploadedFiles.length === 0" type="a" icon="add_box"
                @click="scope.pickFiles" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Ajouter maintenant</q-tooltip>
              </q-btn>

            </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key">

                <q-item-section class="text-left" style="max-width: 180px;">

                  <q-item-label class="full-width">
                    {{ file.name }}
                  </q-item-label>

                </q-item-section>

                <q-item-section v-if="file.__img" style="display: block;max-width: 90px;height: 90px;padding-left: 0;"
                  thumbnail>
                  <img :src="file.__img.src" style="width: 100%;height: 100%;">
                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <q-input @keyup="getSiretEntreprise" mask="##-##-##-##-##-##-##" dense filled v-model="siret"
          label="Numédo de siret *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
          val => val && val.length > 14 || 'Votre nuùéro de siret doit comporter 14 chiffres !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="dialpad" />
          </template>

        </q-input>

        <q-list bordered separator v-show="establishement" style="margin-bottom: 32px;">

          <q-item v-for="establishements in establishementInfo">

            <q-item-section avatar>
              <q-icon color="light-blue-9" name="domain" />
            </q-item-section>

            <q-item-section class="text-left">
              <q-item-label caption lines="1">{{ establishements.given_name }}</q-item-label>
              <q-item-label caption lines="2">{{ establishements.adresse }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>
                <q-icon name="check_circle" size="sm" color="light-green-9" v-if="establishements.active">
                  <q-tooltip>Établissement ouvert</q-tooltip>
                </q-icon>
                <q-icon name="close" size="sm" color="red-9" v-else>
                  <q-tooltip>Établissement fermé</q-tooltip>
                </q-icon>
              </q-item-label>
            </q-item-section>

          </q-item>

        </q-list>

        <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone_pro" label="Téléphone professionnel *"
          lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="phone" />
          </template>

        </q-input>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 4/4 -->
  <transition v-show="register4" appear enter-active-class="animated rollIn" leave-active-class="animated rollOut">

    <div id="step-2-2" class="column text-center w-100">

      <q-form @submit="onSubmitRegister(4)" class="q-gutter-md q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données de connexion ?</h5>

        <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
        (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="email" />
          </template>

        </q-input>

        <q-input dense filled v-model="password" label="Mot de passe *" lazy-rules
          :type="isPwd ? 'current-password' : 'text'"
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length > 7 || 'Votre mot de passe doit comporter au moins 8 caractères !']">

          <template v-slot:prepend>
            <q-icon size="xs" name="password" />
          </template>

          <template v-slot:append>
            <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
              @click="isPwd = !isPwd" />
          </template>

        </q-input>

        <q-toggle color="light-blue-9" class="q-mt-none text-left" style="margin-top: 16px" checked-icon="check"
          unchecked-icon="clear" keep-color v-model="accept"
          label="Je suis d'accord avec la licence et les conditions" />

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

</template>

<script>

import { SessionStorage, useQuasar } from 'quasar'
import { defineComponent } from 'vue'
import { ref } from 'vue'
import moment from 'moment'
import axios from 'axios'

moment.locale('fr')

const logo = ref(true),
  step = ref(1),
  choix = '',
  active = ref(false),
  active2 = ref(false),
  disabled = ref(true),
  register = ref(false),
  register2 = ref(false),
  register3 = ref(false),
  register4 = ref(false),
  register5 = ref(false),
  register6 = ref(false),
  defaults = ref(true),
  login = ref(false),
  loader = ref(false)

// Forms
const email = ref(''),
  password = ref(''),
  lastname = ref(''),
  firstname = ref(''),
  naissance = ref(''),
  phone = ref(''),
  phone_pro = ref(''),
  isPwd = ref(true),
  accept = ref(false),
  sexe = ref('Mr'),
  siret = ref(''),
  establishement = ref(false),
  establishementInfo = ref([]),
  fonction = ref(''),
  adresse = ref(''),
  ville = ref(''),
  codepostal = ref(''),
  pays = ref(''),
  options = ref([]),
  services = ref([]),
  folderAPI = ref(process.env.API),
  toggleService = ref([]),
  validateLogo = ref(false)

export default defineComponent({
  name: 'Section1Component',
  components: {
  },
  setup () {

    const $q = useQuasar()

    function checkFileSize (files) {
      return files.filter(file => file.size < 5048000)
    }

    function onRejected (rejectedEntries) {

      $q.notify({
        timeout: 1000,
        color: 'red-5',
        textColor: 'white',
        class: "glossy",
        icon: 'warning',
        message: 'Veuillez sélectionner un autre logo !',
        progress: true,
        classes: 'glossy',
      })

    }

    return {
      checkFileSize,
      onRejected,
      step,
      logoSelected (file) {

        let formData = new FormData();
        formData.append("file", file[0]);

        axios({
          method: "POST",
          url: folderAPI.value + '/api/upload',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {

          if (res.data.succes) {

            validateLogo.value = true

            $q.notify({
              timeout: 1000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Votre logo a été enregistré avec succès.',
              progress: true,
              classes: 'glossy',
            })
          } else {
            $q.notify({
              timeout: 1000,
              color: 'red-5',
              textColor: 'white',
              class: "glossy",
              icon: 'warning',
              message: 'une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })
          }

        }).catch(error => {
          $q.notify({
            timeout: 1000,
            color: 'red-5',
            textColor: 'white',
            class: "glossy",
            icon: 'warning',
            message: 'une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })
        })

      },
      setStep (value) {

        SessionStorage.setItem('step', value)

        if (value === 'register') {
          active2.value = false
          active.value = true
        } else if (value === 'login') {
          active2.value = true
          active.value = false
        } else if (value === 'registerParticulier') {
          active2.value = false
          active.value = true
        } else if (value === 'registerParticulier2') {
          active2.value = false
          active.value = true
        } else if (value === 'registerProfessionnelle') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle2') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle3') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle4') {
          active2.value = true
          active.value = false
        }

        disabled.value = false

      },
      onSubmitLogin () {

        if (accept.value !== true) {
          $q.notify({
            timeout: 1000,
            color: 'red-5',
            textColor: 'white',
            class: "glossy",
            icon: 'warning',
            message: 'Vous devez d\'abord accepter la licence et les conditions !',
            progress: true,
            classes: 'glossy',
          })
        } else {

          login.value = false;

          $q.notify({
            timeout: 1000,
            color: 'green-5',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'La connexion à votre compte a été effectuée avec succès.',
            progress: true,
            classes: 'glossy',
          })
        }

      },
      onSubmitRegister (value) {

        if (value === 1) { // Professionnel
          this.setStep('registerProfessionnelle2')
          this.clickStep()
        } else if (value === 2) { // Professionnel

          if (validateLogo.value) {
            this.setStep('registerProfessionnelle3')
            this.clickStep()
          } else {
            $q.notify({
              timeout: 1000,
              color: 'red-5',
              textColor: 'white',
              class: "glossy",
              icon: 'warning',
              message: 'N\'oubliez pas d\'ajouter votre logo !',
              progress: true,
              classes: 'glossy',
            })
          }

        } else if (value === 3) { // Professionnel
          this.setStep('registerProfessionnelle4')
          this.clickStep()
        } else if (value === 4) { // Professionnel

          if (accept.value !== true) {

            $q.notify({
              timeout: 1000,
              color: 'red-5',
              textColor: 'white',
              class: "glossy",
              icon: 'warning',
              message: 'Vous devez d\'abord accepter la licence et les conditions !',
              progress: true,
              classes: 'glossy',
            })

          } else {

            if (establishementInfo.value.active) {

              setTimeout(() => {
                login.value = false
              }, 1500);

              $q.notify({
                timeout: 1000,
                color: 'green-5',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Votre compte a bien été créer avec succès.',
                progress: true,
                classes: 'glossy',
              })

            } else {

              $q.notify({
                timeout: 1000,
                color: 'red-5',
                textColor: 'white',
                class: "glossy",
                icon: 'warning',
                message: 'Vous ne pouvez pas ajouter un établissement qui est fermé !',
                progress: true,
                classes: 'glossy',
              })

            }

          }

        } else if (value === 5) {
          this.setStep('registerParticulier2')
          this.clickStep()
        } else if (value === 6) { // Particulier

          if (accept.value !== true) {

            $q.notify({
              timeout: 1000,
              color: 'red-5',
              textColor: 'white',
              class: "glossy",
              icon: 'warning',
              message: 'Vous devez d\'abord accepter la licence et les conditions !',
              progress: true,
              classes: 'glossy',
            })

          } else {

            setTimeout(() => {
              login.value = false
            }, 1500);

            $q.notify({
              timeout: 1000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Votre compte a bien été créer avec succès.',
              progress: true,
              classes: 'glossy',
            })

          }

        }

      },
      clickStep () {

        active.value = false
        active2.value = false
        disabled.value = true

        defaults.value = false
        login.value = false
        register.value = false
        register2.value = false
        register3.value = false
        register4.value = false
        register5.value = false
        register6.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        if (SessionStorage.getItem('step') === 'login') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            login.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'register') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerParticulier') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register5.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerParticulier2') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register6.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register2.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle2') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register3.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle3') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register4.value = true
          }, 4000);

        }

      },
      getSiretEntreprise () {

        if (siret.value.length >= 14) {

          axios.get('https://api.insee.fr/api-sirene/3.11/siret/' + siret.value.replaceAll('-', ''), {
            params: {
              'masquerValeursNulles': 'true'
            },
            headers: {
              'accept': 'application/json',
              'X-INSEE-Api-Key-Integration': process.env.API_KEY_GOUV
            }
          }).then(res => {

            if (res.data.header.statut === 200) {

              establishementInfo.value = [{
                'active': (res.data.etablissement.uniteLegale.etatAdministratifUniteLegale !== 'C') ? true : false,
                'given_name': res.data.etablissement.uniteLegale.sexeUniteLegale + ' ' + res.data.etablissement.uniteLegale.nomUniteLegale + ' ' + res.data.etablissement.uniteLegale.prenom1UniteLegale,
                'adresse': res.data.etablissement.adresseEtablissement.numeroVoieEtablissement + ' ' + res.data.etablissement.adresseEtablissement.typeVoieEtablissement + ' ' + res.data.etablissement.adresseEtablissement.libelleVoieEtablissement + ', ' + res.data.etablissement.adresseEtablissement.codePostalEtablissement + ' ' + res.data.etablissement.adresseEtablissement.libelleCommuneEtablissement
              }]

              if (res.data.etablissement.uniteLegale.etatAdministratifUniteLegale !== 'C') {
                disabled.value = false
              } else {
                disabled.value = true
              }

              establishement.value = true

            } else {

              $q.notify({
                timeout: 1000,
                color: 'red-5',
                textColor: 'white',
                class: "glossy",
                icon: 'warning',
                message: 'Une erreur est survenue value erreur : ' + res.data.header.statut + ' !',
                progress: true,
                classes: 'glossy',
              })

            }

          })

        }

      },

      choix,
      options,
      logo,
      active,
      active2,
      disabled,
      defaults,
      register,
      register2,
      register3,
      register4,
      register5,
      register6,
      login,
      loader,

      email,
      password,
      lastname,
      firstname,
      phone,
      phone_pro,
      naissance,
      sexe,
      siret,
      fonction,
      adresse,
      ville,
      codepostal,
      pays,
      isPwd,
      accept,
      establishement,
      establishementInfo,
      folderAPI,
      toggleService,
      validateLogo,
      services,

      moment,
    }
  },
  mounted () {

    if (this.connexionState) {

      // Liste des services
      services.value = []
      axios.get(process.env.API + '/api/services')
        .then(res => {

          if (res.data.succes === true) {

            services.value = res.data.services

          }

        })

      // Liste des pays
      pays.value = []
      axios.get(process.env.API + '/api/pays')
        .then(res => {

          if (res.data.succes === true) {

            options.value = res.data.pays

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
