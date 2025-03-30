<template name="Section1Component">

  <!-- Logo -->
  <transition v-if="!isLoggedIn" v-show="logo" appear enter-active-class="animated fadeIn"
    :style="(register2 || register2_2 || register3 || register4 || register5 || register6 || register7 || register8 || paiement_pro) ? 'margin-top: 30px;' : ''"
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

  <transition v-else v-show="logo" appear enter-active-class="animated fadeIn"
    :style="(register2 || register2_2 || register3 || register4 || register5 || register6 || register7 || register8 || paiement_pro) ? 'margin-top: 30px;' : ''"
    leave-active-class="animated fadeOut">

    <div class="w-100 flex flex-center column form-w">
      <q-img src="~assets/42105457_8916293.svg" alt="AAD - Services à la personne" spinner-color="light-blue-9" />
    </div>

  </transition>

  <!-- Loader -->
  <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
      <q-spinner-tail size="50px" color="light-blue-9" />
    </div>

  </transition>

  <!--Register Or Login -->
  <transition v-show="defaults && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div id="step1" class="column text-center w-100 form-w">

      <div class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Bienvenue</h5>

        <q-list style="text-align: left;">

          <q-item style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
            :class="(!active) ? 'bg-grey-3 q-mb-md' : 'q-mb-md'" :active="active" @click="setStep('register')"
            active-class="bg-light-blue-9 glossy text-white">

            <q-item-section avatar>
              <q-icon name="check" />
            </q-item-section>

            <q-item-section>Je créer mon compte</q-item-section>

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="keyboard_arrow_right" />
            </q-item-section>

          </q-item>

          <q-item style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
            :class="(!active2) ? 'bg-grey-3 q-mb-md' : 'q-mb-md'" :active="active2" @click="setStep('login')"
            active-class="bg-light-blue-9 glossy text-white">

            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section>Je me connecte</q-item-section>

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="keyboard_arrow_right" />
            </q-item-section>

          </q-item>

        </q-list>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" :disable="disabled" @click="clickStep()" color="light-blue-9 glossy"
            style="max-width: 100px;" v-ripple dense rounded icon="arrow_forward"></q-btn>
        </div>

      </div>

    </div>

  </transition>

  <!-- Login -->
  <transition v-show="login && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div id="step3" class="column text-center w-100">

      <div class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Connexion</h5>

        <q-form @submit="onSubmitLogin" class="q-mt-md">

          <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
          (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

            <template v-slot:prepend>
              <q-icon size="xs" name="email" />
            </template>

          </q-input>

          <q-input dense filled v-model="password" id="current-password" name="current-password" label="Mot de passe *"
            lazy-rules :type="isPwd ? 'password' : 'text'"
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
            v-model="accept" style="margin-top: 16px">

            <span>Je suis d'accord avec la <a @click="this.$router.push('/cgu')"
                style="text-decoration:underline">licence et les
                conditions</a></span>

          </q-toggle>

          <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
            <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
              icon="arrow_forward"></q-btn>
          </div>

        </q-form>

      </div>

    </div>

  </transition>

  <!-- Register Choice 1 -->
  <transition v-show="register && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div id="step2" class="column text-center w-100 form-w">

      <div class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Êtes-vous ?</h5>

        <q-list style="text-align: left;">

          <q-item style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
            :class="(!active) ? 'bg-grey-3 q-mb-md' : 'q-mb-md'" :active="active"
            @click="setStep('registerParticulier')" active-class="bg-light-blue-9 glossy text-white">

            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section>Un particulier</q-item-section>

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="keyboard_arrow_right" />
            </q-item-section>

          </q-item>

          <q-item style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
            :class="(!active2) ? 'bg-grey-3 q-mb-md' : 'q-mb-md'" :active="active2"
            @click="setStep('registerProfessionnelle')" active-class="bg-light-blue-9 glossy text-white">

            <q-item-section avatar>
              <q-icon name="webhook" />
            </q-item-section>

            <q-item-section>Une entreprise</q-item-section>

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="keyboard_arrow_right" />
            </q-item-section>

          </q-item>

        </q-list>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" v-ripple :disable="disabled" @click="clickStep()" color="light-blue-9 glossy"
            style="max-width: 100px;" dense rounded icon="arrow_forward"></q-btn>
        </div>

      </div>

    </div>

  </transition>

  <!-- Register Choice Particulier -->
  <transition v-show="register6 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(6)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données personnelles</h5>

        <div class="flex-start column items-center" style="margin-bottom: 16px;">

          <q-item-label class="text-weight-bold">Civilité :</q-item-label>

          <div class="flex-start row items-start">

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mr" label="Mr" />

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mme" label="Mme" />

          </div>

        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="lastname" label="Nom *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="firstname" label="Prénom *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="fonction" label="Fonction *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="adresse" @keyup="getAdresse" label="Adresse *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>
        </div>

        <q-list bordered separator v-show="showAdresses" style="margin-bottom: 16px;">

          <q-item clickable v-ripple @click="setAdress(adress)" v-for="adress in adresses">

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="location_on" />
            </q-item-section>

            <q-item-section class="text-left">
              <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                lines="1"><strong>{{ adress.address_line1 + ', ' }}</strong></q-item-label>
              <q-item-label tyle="text-overflow: initial;white-space: initial;overflow: initial;" caption
                lines="2"><strong>{{ adress.postcode + ' ' + adress.city + ' ' + adress.country
                  }}</strong></q-item-label>
            </q-item-section>

          </q-item>

          <q-item v-if="loaderAdresse">

            <q-item-section class="text-center flex-center">
              <q-spinner-oval color="light-blue-9" size="30px" />
            </q-item-section>

          </q-item>

        </q-list>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="ville" label="Ville *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="codepostal" mask="#####" label="Code postal *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-select style="margin-bottom: 16px;" dense filled v-model="pays" label="Pays *" map-options
              :options="options" emit-value transition-show="scale" transition-hide="scale">

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
          </div>

          <div class="col-6">
            <q-input dense filled v-model="naissance" mask="##/##/####" label="Date de naissance *" lazy-rules
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
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone" label="Téléphone *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="smartphone" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
          </div>

        </div>
        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Particulier 2 -->
  <transition v-show="register8 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(8)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données de connexion</h5>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
            (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="email" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="password" id="current-password" name="current-password"
              label="Mot de passe *" lazy-rules :type="isPwd ? 'password' : 'text'"
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length > 7 || 'Votre mot de passe doit comporter au moins 8 caractères !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="password" />
              </template>

              <template v-slot:append>
                <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>

            </q-input>
          </div>
        </div>

        <q-toggle color="light-blue-9" class="q-mt-none text-left" checked-icon="check" unchecked-icon="clear"
          keep-color v-model="accept">

          <span>Je suis d'accord avec la <a @click="this.$router.push('/cgu')" style="text-decoration:underline">licence
              et les
              conditions</a></span>

        </q-toggle>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Particulier 3 -->
  <transition v-show="register7 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(7)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Photo de profil</h5>

        <q-uploader class="w-100" bordered :form-fields="[{ name: 'name', value: 'value' }]" color="light-blue-9" filled
          style="margin-bottom:40px;" @added="photoSelected" label="Photo (Format : Image) / (Taille : < 5mo)"
          :filter="checkFileSize" @rejected="onRejectedPhoto" accept="image/*">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="uploadPercent" class="q-uploader__spinner" />

              <div class="col">
                <div class="q-uploader__title">Insérer votre photo</div>
                <div class="q-uploader__title">(Format : Image) / (Taille : < 5mo)</div>
                </div>

                <q-btn v-if="uploadPercent" :disable="true" icon="add_box" round dense flat>
                </q-btn>

                <q-btn v-else type="a" icon="add_box"
                  @click="scope.pickFiles, scope.files.length = 0, validatePhoto = false" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>

              </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                <q-item-section v-if="file.__img" class="q-mb-md"
                  style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                  <img :src="file.__img.src" style="width: 140px;height: 100%;">
                </q-item-section>

                <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                  <q-item-label style="word-break: break-word;max-width: 235px;">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-section style="align-items: flex-end;">
                    <q-btn size="16px" color="red" flat dense round icon="delete"
                      @click="scope.removeFile(file), scope.files.length = 0, validatePhoto = false" />
                  </q-item-section>

                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 2/5 -->
  <transition v-show="register2 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(1)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données personnelles</h5>

        <div class="flex-start column items-center" style="margin-bottom: 16px;">

          <q-item-label class="text-weight-bold">Civilité :</q-item-label>

          <div class="flex-start row items-start">

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mr" label="Mr" />

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mme" label="Mme" />

          </div>

        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="lastname" label="Nom *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="firstname" label="Prénom *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="fonction" label="Fonction *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="adresse" @keyup="getAdresse" label="Adresse *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>
        </div>

        <q-list bordered separator v-show="showAdresses" style="margin-bottom: 16px;">

          <q-item clickable v-ripple @click="setAdress(adress)" v-for="adress in adresses">

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="location_on" />
            </q-item-section>

            <q-item-section class="text-left">
              <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                lines="1"><strong>{{ adress.address_line1 + ', ' }}</strong></q-item-label>
              <q-item-label tyle="text-overflow: initial;white-space: initial;overflow: initial;" caption
                lines="2"><strong>{{ adress.postcode + ' ' + adress.city + ' ' + adress.country
                  }}</strong></q-item-label>
            </q-item-section>

          </q-item>

          <q-item v-if="loaderAdresse">

            <q-item-section class="text-center flex-center">
              <q-spinner-oval color="light-blue-9" size="30px" />
            </q-item-section>

          </q-item>

        </q-list>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="ville" label="Ville *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input dense filled v-model="codepostal" mask="#####" label="Code postal *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="location_on" />
              </template>

            </q-input>
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-select style="margin-bottom: 16px;" dense filled v-model="pays" label="Pays *" map-options
              :options="options" emit-value transition-show="scale" transition-hide="scale">

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
          </div>

          <div class="col-6">
            <q-input dense filled v-model="naissance" mask="##/##/####" label="Date de naissance *" lazy-rules
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
          </div>
        </div>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone" label="Téléphone *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="smartphone" />
              </template>

            </q-input>
          </div>

          <div class="col-6">

          </div>
        </div>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 2.5/5 -->
  <transition v-show="register2_2 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(2)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Photo de profil</h5>

        <q-uploader class="w-100" bordered :form-fields="[{ name: 'name', value: 'value' }]" color="light-blue-9" filled
          style="margin-bottom:40px;" @added="photoSelected" label="Photo (Format : Image) / (Taille : < 5mo)"
          :filter="checkFileSize" @rejected="onRejectedPhoto" accept="image/*">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="uploadPercent" class="q-uploader__spinner" />

              <div class="col">
                <div class="q-uploader__title">Insérer votre photo</div>
                <div class="q-uploader__title">(Format : Image) / (Taille : < 5mo)</div>
                </div>

                <q-btn v-if="uploadPercent" :disable="true" icon="add_box" round dense flat>
                </q-btn>

                <q-btn v-else type="a" icon="add_box"
                  @click="scope.pickFiles, scope.files.length = 0, validatePhoto = false" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>

              </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                <q-item-section v-if="file.__img" class="q-mb-md"
                  style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                  <img :src="file.__img.src" style="width: 140px;height: 100%;">
                </q-item-section>

                <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                  <q-item-label style="word-break: break-word;max-width: 235px;">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-section style="align-items: flex-end;">
                    <q-btn size="16px" color="red" flat dense round icon="delete"
                      @click="scope.removeFile(file), scope.files.length = 0, validatePhoto = false" />
                  </q-item-section>

                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 3/5 -->
  <transition v-show="register3 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(3)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Votre entreprise</h5>

        <div style="font-size: 12px;font-weight: 600;" class="text-grey-8">Les
          documents
          sont systématiquement
          vérifiés !
        </div>

        <q-uploader class="w-100 q-mt-sm" lazy-rules :form-fields="[{ name: 'name', value: 'value' }]"
          color="light-blue-9" dense filled style="margin-bottom:40px;" @added="logoSelected"
          label="Logo (Format : Image) / (Taille : < 5mo)" :filter="checkFileSize" @rejected="onRejectedLogo"
          accept="image/*">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="uploadPercent" class="q-uploader__spinner" />

              <div class="col">
                <div class="q-uploader__title">Logo de l'entreprise</div>
                <div class="q-uploader__title">(Format : Image) / (Taille : < 5mo)</div>
                </div>

                <q-btn v-if="uploadPercent" :disable="true" icon="add_box" round dense flat>
                </q-btn>

                <q-btn v-else type="a" icon="add_box"
                  @click="scope.pickFiles, scope.files.length = 0, validateLogo = false" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>

              </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                <q-item-section v-if="file.__img" class="q-mb-md"
                  style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                  <img :src="file.__img.src" style="width: 140px;height: 100%;">
                </q-item-section>

                <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                  <q-item-label style="word-break: break-word;max-width: 235px;">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-section style="align-items: flex-end;">
                    <q-btn size="16px" color="red" flat dense round icon="delete"
                      @click="scope.removeFile(file), scope.files.length = 0, validateLogo = false" />
                  </q-item-section>

                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <q-uploader class="w-100" lazy-rules :form-fields="[{ name: 'name', value: 'value' }]" color="light-blue-9"
          dense filled style="margin-bottom:40px;" @added="kbisSelected" label="Kbis (Format : Pdf) / (Taille : < 5mo)"
          :filter="checkFileSize" @rejected="onRejectedKbis" accept="application/pdf">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="uploadPercent2" class="q-uploader__spinner" />

              <div class="col">
                <div class="q-uploader__title">Kbis</div>
                <div class="q-uploader__title">(Format : PDF) / (Taille : < 5mo)</div>
                </div>

                <q-btn v-if="uploadPercent2" :disable="true" icon="add_box" round dense flat>
                </q-btn>

                <q-btn v-else type="a" icon="add_box"
                  @click="scope.pickFiles, scope.files.length = 0, validateKbis = false" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>

              </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                <q-item-section v-if="file" class="q-mb-md"
                  style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                  {{ file.path }}
                </q-item-section>

                <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                  <q-item-label style="word-break: break-word;max-width: 235px;">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-section style="align-items: flex-end;">
                    <q-btn size="16px" color="red" flat dense round icon="delete"
                      @click="scope.removeFile(file), scope.files.length = 0, validateLogo = false" />
                  </q-item-section>

                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <q-uploader class="w-100" lazy-rules :form-fields="[{ name: 'name', value: 'value' }]" multiple max-files="2"
          color="light-blue-9" dense filled style="margin-bottom:40px;" @added="cniSelected"
          label="Cni / Passeport (Format : Image) / (Taille : < 5mo)" :filter="checkFileSize" @rejected="onRejectedCni"
          accept="image/*">

          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

              <q-spinner v-if="uploadPercent3" class="q-uploader__spinner" />

              <div class="col">

                <div class="q-uploader__title">Cni / Passeport (Recto / Verso)
                </div>

                <div class="q-uploader__title">(Format : Image) / (Taille : < 5mo)</div>
                </div>

                <q-btn v-if="uploadPercent3" :disable="true" icon="add_box" round dense flat>
                </q-btn>

                <q-btn v-else-if="scope.files.length < 2" type="a" icon="add_box"
                  @click="scope.pickFiles, validateCni = false" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>

              </div>
          </template>

          <template v-slot:list="scope">

            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                <q-item-section v-if="file.__img" class="q-mb-md"
                  style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                  <img :src="file.__img.src" style="width: 140px;height: 100%;">
                </q-item-section>

                <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                  <q-item-label style="word-break: break-word;max-width: 235px;">
                    {{ file.name }}
                  </q-item-label>

                  <q-item-section style="align-items: flex-end;">
                    <q-btn size="16px" color="red" flat dense round icon="delete"
                      @click="scope.removeFile(file), validateCni = false" />
                  </q-item-section>

                </q-item-section>

              </q-item>

            </q-list>

          </template>

        </q-uploader>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="companies_name" label="Nom de l'entreprise *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="title" />
              </template>

            </q-input>
          </div>

          <div class="col-6">
            <q-input @keyup="getSiretEntreprise" mask="##-##-##-##-##-##-##" dense filled v-model="siret"
              label="Numédo de siret *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
              val => val && val.length > 14 || 'Votre nuùéro de siret doit comporter 14 chiffres !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="dialpad" />
              </template>

            </q-input>
          </div>
        </div>

        <q-list bordered separator v-show="establishement" style="margin-bottom: 16px;">

          <q-item v-for="establishements in establishementInfo">

            <q-item-section avatar>
              <q-icon color="light-blue-9" name="domain" />
            </q-item-section>

            <q-item-section class="text-left">
              <q-item-label caption lines="1"><strong>Nom :</strong> {{ establishements.siege }}</q-item-label>
              <q-item-label caption lines="2"><strong>Siren :</strong> {{ establishements.siren }}</q-item-label>
              <q-item-label caption lines="3"><strong>Siret :</strong> {{ establishements.siret }}</q-item-label>
              <q-item-label caption lines="4"><strong>Date de création :</strong> {{ establishements.founding_date
                }}</q-item-label>
              <q-item-label caption lines="5"><strong>Adresse : </strong>{{ establishements.adresse }}</q-item-label>
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

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone_pro" label="Téléphone professionnel *"
              lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="phone" />
              </template>

            </q-input>
          </div>

          <div class="col-6 form-padding">
            <q-input dense filled fill-mask v-model="counterEmploye" label="Nombre d'employés *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="group" />
              </template>

            </q-input>
          </div>
        </div>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 4/5 -->
  <transition v-show="register4 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(4)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Vos services</h5>

        <q-list bordered separator style="margin-bottom: 32px;">

          <q-item v-for="service in services">

            <q-item-section style="width: 50px; height: 30px; max-width: 30px;">
              <q-img style="width: 30px; height: 30px;" :src="folderAPI + '/services/' + service.icone" />
            </q-item-section>

            <q-item-section class="text-left" style="margin-left: 16px;">
              <q-item-label>{{ service.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle color="light-blue-9" checked-icon="check" :val="service.id" unchecked-icon="clear" keep-color
                v-model="toggleService" />
            </q-item-section>

          </q-item>

        </q-list>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle 5/5 -->
  <transition v-show="register5 && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w">

      <q-form @submit="onSubmitRegister(5)" class="q-mt-md">

        <h5 class="q-mt-md q-mb-md">Données de connexion</h5>

        <div class="row row-form">
          <div class="col-6 form-padding">
            <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
            (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="email" />
              </template>

            </q-input>
          </div>

          <div class="col-6 form-padding">
            <q-input dense filled v-model="password" id="current-password" name="current-password"
              label="Mot de passe *" lazy-rules :type="isPwd ? 'password' : 'text'"
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length > 7 || 'Votre mot de passe doit comporter au moins 8 caractères !']">

              <template v-slot:prepend>
                <q-icon size="xs" name="password" />
              </template>

              <template v-slot:append>
                <q-icon size="xs" :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>

            </q-input>
          </div>
        </div>

        <q-toggle color="light-blue-9" class="q-mt-none text-left" style="margin-top: 16px" checked-icon="check"
          unchecked-icon="clear" keep-color v-model="accept">

          <span>Je suis d'accord avec la <a @click="this.$router.push('/cgu')" style="text-decoration:underline">licence
              et les
              conditions</a></span>

        </q-toggle>

        <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
          <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
            icon="arrow_forward"></q-btn>
        </div>

      </q-form>

    </div>

  </transition>

  <!-- Register Choice Professionnelle Paiement Licence -->
  <transition v-show="paiement_pro && !isLoggedIn" appear enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">

    <div class="column text-center w-100 form-w q-mt-md">

      <h5 class="q-mt-md q-mb-md">Licence d'activation de l'application</h5>

      <q-list bordered separator>

        <q-item :active="active_cart === product_licence.id" active-class="bg-light-blue-9 glossy text-white"
          v-for="product_licence in products_licences">

          <q-item-section style="width: 25px; height: 25px; max-width: 25px;">
            <q-icon name="key" size="25px" color="light-blue-9" />
          </q-item-section>

          <q-item-section class="text-left" style="margin-left: 16px;margin-right: 16px;">
            <q-item-label caption lines="1"><strong>{{ product_licence.name }}</strong></q-item-label>
            <q-item-label caption lines="2"
              style="margin-top: 0.5rem;overflow:initial;text-wrap: initial;text-transform: none;display: block !important;">{{
                product_licence.content
              }}</q-item-label>
            <q-item-label style="margin-top: 0.5rem;" caption lines="3"><strong>Prix HT :</strong> {{
              product_licence.price_ht }} €</q-item-label>
            <q-item-label caption lines="4"><strong>Prix TTC :</strong> {{ product_licence.price_ttc }} €</q-item-label>
          </q-item-section>

          <q-item-section style="max-width: 40px;margin-left: 0;">
            <q-btn :disable="(active_cart === product_licence.id) ? true : false"
              @click="addToCart(product_licence.id, product_licence.price_ht), active_cart = product_licence.id"
              v-ripple class="glossy" size="md" dense color="light-green-9">
              <q-icon size="16px" name="shopping_cart_checkout" />
              <q-tooltip>Ajouter au panier</q-tooltip>
            </q-btn>
          </q-item-section>

        </q-item>

      </q-list>

      <q-item class="w-100 justify-center" style="margin-top: 15px;">

        <q-toggle color="light-blue-9" class="q-mt-none text-left" checked-icon="check" unchecked-icon="clear"
          keep-color v-model="renouvellement_auto" label="Renouvellement automatique" />

      </q-item>

      <q-card class="text-white glossy bg-light-blue-9" bordered style="margin-top: 15px;">

        <q-item>

          <q-item-section class="text-right row content-end">
            <q-item-label><strong>TVA :</strong> {{
              tva }} %</q-item-label>
            <q-item-label><strong>Total HT :</strong> {{
              cart_ht }} €</q-item-label>
            <q-item-label><strong>Total TTC :</strong> {{ cart_ttc }} €</q-item-label>
          </q-item-section>

        </q-item>

      </q-card>

      <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
        <q-btn :disable="(active_cart === 0) ? true : false" style="font-weight: 600;font-size: 16px;" size="xl"
          @click="setStepPaiement" color="light-blue-9 glossy" v-ripple>Payer
          maintentant</q-btn>
      </div>

      <q-item style="margin-bottom: 30px;padding-top: 0;justify-content: center;" class="w-100">
        <q-img src="~assets/paiement-securise-cb.jpeg" style="max-width: 230px;" spinner-color="light-blue-9" />
      </q-item>

    </div>

  </transition>

  <q-dialog v-model="dialogPdf" persistent :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">

    <q-card class="bg-light-9 text-white">
      <q-bar>
        <q-space />

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-none">

        <iframe id="previewPdf"></iframe>

      </q-card-section>
    </q-card>

  </q-dialog>

</template>

<script>

import { SessionStorage, useQuasar } from 'quasar'
import { defineComponent, onMounted, computed } from 'vue'
import { ref } from 'vue'
import moment from 'moment/min/moment-with-locales';
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'
import { useRouter } from "vue-router"

moment.locale('fr')

const logo = ref(false),
  step = ref(1),
  choix = '',
  active = ref(false),
  active2 = ref(false),
  active_cart = ref(0),
  disabled = ref(true),
  register = ref(false),
  register2 = ref(false),
  register2_2 = ref(false),
  register3 = ref(false),
  register4 = ref(false),
  register5 = ref(false),
  register6 = ref(false),
  register7 = ref(false),
  register8 = ref(false),
  paiement_pro = ref(false),
  defaults = ref(false),
  login = ref(false),
  loader = ref(true)

// Forms
const email = ref(''),
  password = ref(''),
  lastname = ref(''),
  firstname = ref(''),
  naissance = ref(''),
  phone = ref(''),
  phone_pro = ref(''),
  isPwd = ref(true),
  accept = ref(true),
  civilite = ref('Mr'),
  siret = ref(''),
  establishement = ref(false),
  establishementInfo = ref([]),
  showAdresses = ref(false),
  loaderAdresse = ref(false),
  adresses = ref([]),
  fonction = ref(''),
  adresse = ref(''),
  ville = ref(''),
  codepostal = ref(''),
  pays = ref([]),
  options = ref([]),
  services = ref([]),
  products_licences = ref([]),
  folderAPI = ref(process.env.API),
  toggleService = ref([]),
  validateLogo = ref(false),
  validateKbis = ref(false),
  validatePhoto = ref(false),
  validateCni = ref(false),
  counterEmploye = ref(''),
  user_type = ref(1),
  logo_establishement = ref(''),
  companies_name = ref(''),
  photo_user = ref(''),
  kbis_user = ref(''),
  cni_passeport_user = ref(''),
  cni_passeport_user2 = ref(''),
  uploadPercent = ref(false),
  uploadPercent2 = ref(false),
  uploadPercent3 = ref(false),
  maximizedToggle = ref(false),
  dialogPdf = ref(false)

// Cart
const cart_ht = ref(0.00),
  cart_ttc = ref(0.00),
  tva = ref(20),
  renouvellement_auto = ref(true),
  product_id = ref(0),
  qte = ref(1)

export default defineComponent({
  name: 'Section1Component',
  components: {
  },
  setup () {

    const $q = useQuasar(),
      router = useRouter()

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    const user = computed(() => {
      return userStore.$state.stateUser.user
    })

    function checkFileSize (files) {
      return files.filter(file => file.size < 5048000)
    }

    function onRejectedLogo (rejectedEntries) {

      $q.notify({
        timeout: 2000,
        color: 'red-5',
        textColor: 'white',
        class: " glossy", icon: 'warning', message: 'Veuillez sélectionner un autre logo !',
        progress: true,
        classes: 'glossy',
      })

    }

    function onRejectedCni (rejectedEntries) {

      $q.notify({
        timeout: 2000,
        color: 'red-5',
        textColor: 'white',
        class: " glossy", icon: 'warning', message: 'Veuillez sélectionner un autre logo !',
        progress: true,
        classes: 'glossy',
      })

    }

    function onRejectedPhoto (rejectedEntries) {

      $q.notify({
        timeout: 2000,
        color: 'red-5',
        textColor: 'white',
        class: " glossy", icon: 'warning', message: 'Veuillez sélectionner une autre photo !',
        progress: true,
        classes: 'glossy',
      })

    }

    function onRejectedKbis (rejectedEntries) {

      $q.notify({
        timeout: 2000,
        color: 'red-5',
        textColor: 'white',
        class: " glossy", icon: 'warning', message: 'Veuillez sélectionner un autre fichier !',
        progress: true,
        classes: 'glossy',
      })

    }

    return {
      dialogPdf,
      maximizedToggle,
      user,
      isLoggedIn: isLoggedIn,
      checkFileSize,
      onRejectedLogo,
      onRejectedPhoto,
      onRejectedKbis,
      onRejectedCni,
      step,
      logoSelected (file) {

        uploadPercent.value = true

        let formData = new
          FormData(); formData.append("file", file[0]); axios({
            method: "POST", url: folderAPI.value
              + '/api/companie/upload/logo', data: formData, headers: { "Content-Type": "multipart/form-data" }
          }).then(res => {

            if (res.data.succes) {

              uploadPercent.value = false
              validateLogo.value = true
              logo_establishement.value = res.data.logo

              $q.notify({
                timeout: 2000,
                color: 'green-5',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Votre logo a été enregistré avec succès.',
                progress: true,
                classes: 'glossy',
              })
            } else {
              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'Une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })

              uploadPercent.value = false

            }

          }).catch(error => {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })

            uploadPercent.value = false

          })

      },
      photoSelected (file) {

        uploadPercent.value = true

        let formData = new
          FormData(); formData.append("file", file[0]); axios({
            method: "POST", url: folderAPI.value
              + '/api/user/upload', data: formData, headers: { "Content-Type": "multipart/form-data" }
          }).then(res => {

            if (res.data.succes) {

              uploadPercent.value = false
              validatePhoto.value = true
              photo_user.value = res.data.photo

              $q.notify({
                timeout: 2000,
                color: 'green-5',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Votre photo a été enregistré avec succès.',
                progress: true,
                classes: 'glossy',
              })
            } else {
              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'Une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })
            }

          }).catch(error => {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })

            uploadPercent.value = false
            validatePhoto.value = false
            photo_user.value = ''

          })

      },
      kbisSelected (file) {

        uploadPercent2.value = true

        let formData = new
          FormData(); formData.append("file", file[0]); axios({
            method: "POST", url: folderAPI.value + '/api/companie/upload/kbis', data: formData, headers: { "Content-Type": "multipart/form-data" }
          }).then(res => {

            if (res.data.succes) {

              uploadPercent2.value = false
              validateKbis.value = true
              kbis_user.value = res.data.pdf

              $q.notify({
                timeout: 2000,
                color: 'green-5',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Votre document a été enregistré avec succès.',
                progress: true,
                classes: 'glossy',
              })
            } else {
              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'Une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })
            }

          }).catch(error => {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })

            uploadPercent2.value = false
            validateKbis.value = false
            kbis_user.value = ''

          })

      },
      cniSelected (file) {

        uploadPercent3.value = true

        let formData = new FormData();

        formData.append("file", file[0]),
          formData.append("file", file[1])

        axios({
          method: "POST", url: folderAPI.value + '/api/companie/upload/cni-passeport', data: formData, headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {

          if (res.data.succes) {

            uploadPercent3.value = false
            validateCni.value = true
            cni_passeport_user.value = res.data.image
            cni_passeport_user2.value = res.data.image2

            $q.notify({
              timeout: 2000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Vos documents d\'identité ont bien été enregistré avec succès.',
              progress: true,
              classes: 'glossy',
            })
          } else {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })
          }

        }).catch(error => {
          $q.notify({
            timeout: 2000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'Une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

          uploadPercent3.value = false
          validateCni.value = false
          cni_passeport_user.value = ''
          cni_passeport_user2.value = ''

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
        } else if (value === 'registerParticulier3') {
          active2.value = false
          active.value = true
          user_type.value = 1
        } else if (value === 'registerProfessionnelle') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle2') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle2_2') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle3') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle4') {
          active2.value = true
          active.value = false
        } else if (value === 'registerProfessionnelle5') {
          active2.value = true
          active.value = false
          user_type.value = 2
        }

        disabled.value = false

      },
      addToCart (id, price_ht) {

        cart_ht.value = price_ht
        cart_ttc.value = (price_ht * (1 + tva.value / 100)).toFixed(2)
        product_id.value = id

      },
      setStepPaiement () {

        defaults.value = false
        login.value = false
        register.value = false
        register2.value = false
        register2_2.value = false
        register3.value = false
        register4.value = false
        register5.value = false
        register6.value = false
        register7.value = false
        register8.value = false
        paiement_pro.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        axios.post(process.env.API + '/api/paypal/order-insert',
          {
            email: email.value,
            cart_ht: cart_ht.value,
            cart_ttc: cart_ttc.value,
            product_id: product_id.value,
            renouvellement_auto: renouvellement_auto.value,
            qte: qte.value,
            companies: {
              name: companies_name.value,
              employes: counterEmploye.value,
              phone_pro: String(phone_pro.value).replaceAll('-', ' '),
              services: toggleService.value,
              establishement: establishementInfo.value,
              logo: logo_establishement.value,
              kbis: kbis_user.value,
              cni_passeport: cni_passeport_user.value,
              cni_passeport2: cni_passeport_user2.value
            }
          }
        ).then(res => {

          if (res.data.succes) {

            location.href = process.env.API + '/api/paypal/create/' + res.data.order_id

          } else {

            paiement_pro.value = true

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

      },
      onSubmitLogin () {

        if (accept.value !== true) {

          $q.notify({
            timeout: 2000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'Vous devez d\'abord accepter la licence et les conditions !',
            progress: true,
            classes: 'glossy',
          })

        } else {

          defaults.value = false
          login.value = false
          register.value = false
          register2.value = false
          register2_2.value = false
          register3.value = false
          register4.value = false
          register5.value = false
          register6.value = false
          register7.value = false
          register8.value = false
          paiement_pro.value = false
          logo.value = false

          setTimeout(() => {
            loader.value = true;
          }, 1200);

          fetch('https://api.ipify.org?format=json')
            .then(x => x.json())
            .then(({ ip }) => {

              axios.post(process.env.API + '/api/user/login',
                {
                  'email': email.value,
                  'password': password.value,
                  'ip': ip
                }).then((res) => {

                  if (res.data.succes === true) {

                    const token = res.data.token

                    userStore.$state.stateUser.token = token;

                    SessionStorage.setItem('token', token)

                    $q.notify({
                      timeout: 2000,
                      color: 'green-5',
                      textColor: 'white',
                      icon: 'cloud_done',
                      message: 'La connexion à votre compte a été effectuée avec succès.',
                      progress: true,
                      classes: 'glossy',
                    })

                    setTimeout(() => {
                      window.location.href = "/my-account"
                    }, 3500);

                  } else {

                    setTimeout(() => {
                      loader.value = false;
                    }, 3500);

                    setTimeout(() => {
                      logo.value = true;
                      login.value = true;
                    }, 4000);

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
                .catch((error) => {

                  setTimeout(() => {
                    loader.value = false;
                  }, 3500);

                  setTimeout(() => {
                    logo.value = true;
                    login.value = true;
                  }, 4000);

                  $q.notify({
                    timeout: 2000,
                    color: 'red-5',
                    textColor: 'white',

                    icon: 'warning',
                    message: 'Une erreur est survenue !',
                    progress: true,
                    classes: 'glossy',
                  })

                })

            })

        }

      },
      onSubmitRegister (value) {

        if (value === 1) { // Professionnel
          this.setStep('registerProfessionnelle2_2')
          this.clickStep()
        } else if (value === 2) { // Professionnel

          if (validatePhoto.value) {
            this.setStep('registerProfessionnelle3')
            this.clickStep()
          } else {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'N\'oubliez pas d\'ajouter votre photo de profil !',
              progress: true,
              classes: 'glossy',
            })
          }

        } else if (value === 3) { // Professionnel

          if (establishementInfo.value[0].active === true && validateKbis.value && validateLogo.value && validateCni.value) {

            this.setStep('registerProfessionnelle4')
            this.clickStep()

          } else {

            if (!validateCni.value) {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'N\'oubliez pas d\'ajouter votre cni ou passeport !',
                progress: true,
                classes: 'glossy',
              })

            }

            if (!validateKbis.value) {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'N\'oubliez pas d\'ajouter votre kbis !',
                progress: true,
                classes: 'glossy',
              })

            }

            if (!validateLogo.value) {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'N\'oubliez pas d\'ajouter votre logo !',
                progress: true,
                classes: 'glossy',
              })

            }

            if (establishementInfo.value[0].active === false) {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'Vous ne pouvez pas ajouter un établissement qui est fermé !',
                progress: true,
                classes: 'glossy',
              })

            }

          }

        } else if (value === 4) { // Professionnel
          this.setStep('registerProfessionnelle5')
          this.clickStep()
        } else if (value === 5) { // Professionnel

          if (accept.value !== true) {

            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Vous devez d\'abord accepter la licence et les conditions !',
              progress: true,
              classes: 'glossy',
            })

          } else {

            active.value = false
            active2.value = false
            disabled.value = true

            defaults.value = false
            login.value = false
            register.value = false
            register2.value = false
            register2_2.value = false
            register3.value = false
            register4.value = false
            register5.value = false
            register6.value = false
            register7.value = false
            register8.value = false
            paiement_pro.value = false
            logo.value = false

            setTimeout(() => {
              loader.value = true
            }, 1200);

            axios.post(folderAPI.value + '/api/user/register',
              {
                user_type: '2',
                fonction: fonction.value,
                email: email.value,
                password: password.value,
                lastname: lastname.value,
                firstname: firstname.value,
                naissance: String(naissance.value).replaceAll('/', '-').replaceAll('\/', '-'),
                phone: String(phone.value).replaceAll('-', ' '),
                civilite: civilite.value,
                adresse: adresse.value,
                ville: ville.value,
                codepostal: codepostal.value,
                pays: pays.value.value,
                photo: photo_user.value
              }
            ).then(res => {

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

                setTimeout(() => {
                  loader.value = false
                }, 3500);

                setTimeout(() => {
                  logo.value = true
                  login.value = false
                  paiement_pro.value = true
                }, 4000);

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


                setTimeout(() => {
                  loader.value = false
                }, 3500);

                setTimeout(() => {
                  logo.value = true
                  login.value = true
                  paiement_pro.value = false
                }, 4000);

              }

            }).catch(error => {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: res.data.message,
                progress: true,
                classes: 'glossy',
              })


              setTimeout(() => {
                loader.value = false
              }, 3500);

              setTimeout(() => {
                logo.value = true
                login.value = true
                paiement_pro.value = false
              }, 4000);

            })

          }

        } else if (value === 6) {
          this.setStep('registerParticulier2')
          this.clickStep()
        } else if (value === 7) {

          if (validatePhoto.value) {
            this.setStep('registerParticulier3')
            this.clickStep()
          } else {
            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'N\'oubliez pas d\'ajouter votre photo de profil !',
              progress: true,
              classes: 'glossy',
            })
          }

        } else if (value === 8) { // Particulier

          if (accept.value !== true) {

            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Vous devez d\'abord accepter la licence et les conditions !',
              progress: true,
              classes: 'glossy',
            })

          } else {

            active.value = false
            active2.value = false
            disabled.value = true

            defaults.value = false
            login.value = false
            register.value = false
            register2.value = false
            register2_2.value = false
            register3.value = false
            register4.value = false
            register5.value = false
            register6.value = false
            register7.value = false
            register8.value = false
            paiement_pro.value = false
            logo.value = false

            setTimeout(() => {
              loader.value = true
            }, 1200);

            fetch('https://api.ipify.org?format=json')
              .then(x => x.json())
              .then(({ ip }) => {
                axios.post(folderAPI.value + '/api/user/register',
                  {
                    user_type: '1',
                    fonction: fonction.value,
                    email: email.value,
                    password: password.value,
                    lastname: lastname.value,
                    firstname: firstname.value,
                    naissance: String(naissance.value).replaceAll('/', '-').replaceAll('\/', '-'),
                    phone: String(phone.value).replaceAll('-', ' '),
                    civilite: civilite.value,
                    adresse: adresse.value,
                    ville: ville.value,
                    codepostal: codepostal.value,
                    pays: pays.value.value,
                    photo: photo_user.value,
                    ip
                  }
                ).then(res => {

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

                    setTimeout(() => {
                      loader.value = false
                    }, 3500);

                    setTimeout(() => {
                      logo.value = true
                      login.value = true
                    }, 4000);

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


                    setTimeout(() => {
                      loader.value = false
                    }, 3500);

                    setTimeout(() => {
                      logo.value = true
                      register8.value = true
                    }, 4000);

                  }

                }).catch(error => {

                  $q.notify({
                    timeout: 2000,
                    color: 'red-5',
                    textColor: 'white',

                    icon: 'warning',
                    message: res.data.message,
                    progress: true,
                    classes: 'glossy',
                  })


                  setTimeout(() => {
                    loader.value = false
                  }, 3500);

                  setTimeout(() => {
                    logo.value = true
                    register8.value = true
                  }, 4000);

                })

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
        register2_2.value = false
        register3.value = false
        register4.value = false
        register5.value = false
        register6.value = false
        register7.value = false
        register8.value = false
        paiement_pro.value = false
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
            register6.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerParticulier2') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register7.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerParticulier3') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register8.value = true
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

        if (SessionStorage.getItem('step') === 'registerProfessionnelle2_2') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register2_2.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle3') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register3.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle4') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register4.value = true
          }, 4000);

        }

        if (SessionStorage.getItem('step') === 'registerProfessionnelle5') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            register5.value = true
          }, 4000);

        }

      },
      setAdress (value) {

        showAdresses.value = false
        adresses.value = []

        adresse.value = value.address_line1
        codepostal.value = value.postcode
        ville.value = value.city
        pays.value = {
          label: value.country,
          value: value.country
        }

      },
      getAdresse () {

        if (adresse.value.length >= 2) {

          loaderAdresse.value = true

          adresses.value = []

          showAdresses.value = true

          setTimeout(() => {
            axios.get('https://api.geoapify.com/v1/geocode/autocomplete?text=' + adresse.value +
              '&lang=fr&limit=20&bias=countrycode:fr&format=json&apiKey=' + process.env.API_KEY_GEOAPIFY)
              .then(res => {

                if (res.data.results.length >= 1) {

                  adresses.value = res.data.results

                  loaderAdresse.value = false

                } else {

                  adresses.value = []

                  showAdresses.value = false

                  // $q.notify({
                  // timeout: 2000,
                  // color: 'red-5',
                  // textColor: 'white',
                  //
                  // icon: 'warning',
                  // message: 'Une erreur est survenue value erreur !',
                  // progress: true,
                  // classes: 'glossy',
                  // })

                }

              }).catch(error => {

                adresses.value = []

                showAdresses.value = false

                $q.notify({
                  timeout: 2000,
                  color: 'red-5',
                  textColor: 'white',

                  icon: 'warning',
                  message: 'Une erreur est survenue erreur !',
                  progress: true,
                  classes: 'glossy',
                })

              })

          }, 1500);

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
                'siege': res.data.etablissement.uniteLegale.denominationUniteLegale,
                'founding_date': moment(res.data.etablissement.dateCreationEtablissement).format('DD/MM/YYYY'),
                'siret': res.data.etablissement.siret,
                'siren': res.data.etablissement.siren,
                'adresse': res.data.etablissement.adresseEtablissement.numeroVoieEtablissement + ' ' +
                  res.data.etablissement.adresseEtablissement.typeVoieEtablissement + ' ' +
                  res.data.etablissement.adresseEtablissement.libelleVoieEtablissement + ', ' +
                  res.data.etablissement.adresseEtablissement.codePostalEtablissement + ' ' +
                  res.data.etablissement.adresseEtablissement.libelleCommuneEtablissement
              }]

              if (res.data.etablissement.uniteLegale.etatAdministratifUniteLegale !== 'C') {
                disabled.value = false
              } else {
                disabled.value = true
              }

              establishement.value = true

            } else {

              establishementInfo.value = []

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'Une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })

            }

          }).catch(error => {

            establishementInfo.value

            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })

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
      register2_2,
      register3,
      register4,
      register5,
      register6,
      register7,
      register8,
      paiement_pro,
      login,
      loader,
      active_cart,

      email,
      password,
      lastname,
      firstname,
      phone,
      phone_pro,
      naissance,
      civilite,
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
      showAdresses,
      loaderAdresse,
      adresses,
      folderAPI,
      toggleService,
      validateLogo,
      validateKbis,
      validateCni,
      validatePhoto,
      photo_user,
      kbis_user,
      cni_passeport_user,
      cni_passeport_user2,
      counterEmploye,
      logo_establishement,
      services,
      products_licences,
      user_type,
      companies_name,
      uploadPercent,
      uploadPercent2,
      uploadPercent3,

      cart_ht,
      cart_ttc,
      tva,
      renouvellement_auto,
      product_id,
      qte,

      moment,
    }
  },
  mounted () {

    defaults.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      defaults.value = true
      logo.value = true
    }, 4000);

    if (this.connexionState) {

      // Liste des services
      services.value = []
      axios.get(process.env.API + '/api/services')
        .then(res => {

          if (res.data.succes === true) {

            services.value = res.data.services

          } else {

            services.value = []

          }

        })

      // Liste des pays
      pays.value = []
      axios.get(process.env.API + '/api/pays')
        .then(res => {

          if (res.data.succes === true) {

            pays.value = {
              value: 'France',
              label: 'France',
            }

            options.value = res.data.pays

          } else {

            options.value = []

          }

        })

      products_licences.value = []
      axios.get(process.env.API + '/api/licences')
        .then(res => {

          if (res.data.succes === true) {

            products_licences.value = res.data.licences

          } else {

            products_licences.value = []

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
