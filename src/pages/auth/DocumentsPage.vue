<template name="EmployeePages">

  <q-page
    :class="(!connexionState) ? 'disabled q-page q-page-start q-page-no-padding' : 'q-page q-page-start q-page-no-padding'"
    :style-fn="heightAuto">

    <!-- Back -->
    <transition v-show="back" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="absolute-left" style="z-index: 1;width: 44px; height: 44px;margin-left: 16px;margin-top: 16px;">
        <q-btn glossy @click="showBack()" round icon="arrow_back" v-ripple padding="10px" dense color="light-blue-9">
        </q-btn>
      </div>
    </transition>

    <!-- Logo -->
    <transition v-show="logo" appear enter-active-class="animated fadeIn" style="margin-top: 30px;"
      leave-active-class="animated fadeOut">
      <div class="w-100 flex flex-center column form-w">

        <q-img src="~assets/12291247.svg" spinner-color="light-blue-9" alt="AAD - Services à la personne"></q-img>

      </div>
    </transition>

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="documents_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Mes documents
        </h5>

        <div class="w-100 text-left q-pl-md q-pr-md">

          <div class="row" style="align-items: center;justify-content: space-between;">

            <div class="col-6">
              <p style="text-transform: initial;font-weight: 500;letter-spacing: normal;font-size: 16px;">{{
                filter }}
              </p>
            </div>

            <div class="col-6" style="max-width: 150px;">
              <q-select standout @update:model-value="val => changeYear(val)" borderless style="margin-bottom: 16px;"
                dense v-model="filter" map-options :options="options" emit-value transition-show="scale"
                transition-hide="scale">

                <template v-slot:prepend>
                  <q-icon size="xs" name="calendar_month" />
                </template>

                <template v-slot:option="{ itemProps, opt }">

                  <q-item v-bind="itemProps">

                    <q-item-section>
                      <q-item-label v-html="opt.label" />
                    </q-item-section>

                  </q-item>

                </template>

              </q-select>
            </div>

          </div>

        </div>

        <q-list v-if="documents.length >= 1" separator class="w-100 q-mb-md">

          <q-item @click="showDocument(document.id)" clickable v-ripple v-for="document in documents"
            style="padding-bottom: 1rem;padding-top: 1rem;">

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="description" />
            </q-item-section>

            <q-item-section class="text-left">
              <q-item-label
                :class="(document.status === 1) ? 'text-orange-9' : (document.status === 2) ? 'text-green-9' : (document.status === 3) ? 'text-red-9' : ''"
                style="text-overflow: initial;white-space: initial;overflow: initial;" caption lines="1"><strong>{{
                  document.statusName }}</strong></q-item-label>
              <q-item-label
                style="text-overflow: initial;white-space: initial;overflow: initial;text-transform: initial;" caption
                lines="2">{{
                  String(document.fileName).split('/')[3].split('.')[0] }}</q-item-label>
              <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                lines="3"><strong>{{
                  moment(document.created_at).format('DD MMMM') }}</strong></q-item-label>
            </q-item-section>

            <q-item-section style="justify-content: flex-start;" avatar>
              <q-icon color="light-blue-9" name="keyboard_arrow_right" />
            </q-item-section>

          </q-item>

        </q-list>

        <div v-else>
          <span class="text-weight-bold">Aucun document pour l'année {{ filter }}</span>
        </div>

      </div>

    </transition>

    <transition v-show="document_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;;">

        <h6 class="h6">{{ fileName }}</h6>

        <div class="w-100 bloc-document" style="padding: 0 1rem;">

          <span class="text-grey-9">ÉTAT</span>
          <p
            :class="(document_detail.status === 1) ? 'text-orange-9' : (document_detail.status === 2) ? 'text-green-9' : (document_detail.status === 3) ? 'text-red-9' : ''">
            {{ document_detail.statusName }}</p>

          <span class="text-grey-9">CONTEXTE</span>
          <p>{{ document_detail.content }}</p>

          <span class="text-grey-9">TYPDE DE DOCUMENT</span>
          <p style="text-transform: uppercase;">{{ document_detail.sousType }}</p>

          <span class="text-grey-9">MODE D'ENVOI</span>
          <p>Transmis vis l'application le {{ moment(document_detail.created_at).format('DD MMMM YYYY') }}</p>

        </div>

        <div class="w-100" style="padding: 0 1rem; margin-top: 1rem;">
          <q-btn target="_blank" :href="folderAPI + document_detail.name" glossy v-ripple dense class="w-100 q-pa-sm"
            color="light-blue-9" style="font-weight: 600;">Voir</q-btn>
        </div>

      </div>

    </transition>

    <transition v-show="upload_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Vous souhaitez envoyer des documents
          pour
          :
        </h5>

        <div class="w-100 text-left q-pl-md q-pr-md">

          <q-list class="w-100 q-mb-md">

            <q-item clickable v-ripple class="bg-grey-3 q-mb-md" @click="showSousType(types.id, types.name)"
              v-for="types in documents_type" style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;">

              <q-item-section class="text-left">
                <q-item-label
                  style="text-overflow: none;white-space: initial;overflow: initial;text-transform: none;letter-spacing: normal;"
                  caption lines="1"><strong>{{ types.content }}</strong></q-item-label>
              </q-item-section>

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon color="light-blue-9" name="keyboard_arrow_right" />
              </q-item-section>

            </q-item>

          </q-list>

        </div>

      </div>

    </transition>

    <transition v-show="upload2_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">{{ type }}
        </h5>

        <div class="w-100 text-left q-pl-md q-pr-md">

          <q-list class="w-100 q-mb-md">

            <q-item clickable @click="uploadSousType(sous_type.id, sous_type.name, sous_type.file, sous_type.ext)"
              v-ripple class="bg-grey-3 q-mb-md" v-for="sous_type in documents_sous_type"
              style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;">

              <q-item-section class="text-left">
                <q-item-label
                  style="text-overflow: none;white-space: initial;overflow: initial;text-transform: none;letter-spacing: normal;"
                  caption lines="1"><strong>{{ sous_type.name }}</strong></q-item-label>
              </q-item-section>

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon color="light-blue-9" name="keyboard_arrow_right" />
              </q-item-section>

            </q-item>

          </q-list>

        </div>

      </div>

    </transition>

    <transition v-show="upload3_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">{{ sous_type }}
        </h5>

        <div class="w-100 text-center q-pl-md q-pr-md">

          <q-form @submit="onSubmitDocument()" class="q-mt-md">

            <q-uploader v-if="file_ext" class="w-100" lazy-rules :form-fields="[{ name: 'name', value: 'value' }]"
              color="light-blue-9" dense filled style="margin-bottom:40px;" @added="fileSelected"
              label="Cni / Passeport (Format : Image) / (Taille : < 5mo)" :filter="checkFileSize" @rejected="onRejected"
              :accept="file_ext">

              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs glossy">

                  <q-spinner v-if="uploadPercent" class="q-uploader__spinner" />

                  <div class="col">

                    <div class="q-uploader__title">(Format : Image / Pdf)</div>
                    <div class="q-uploader__title">(Taille : < 5mo)</div>

                    </div>

                    <q-btn v-if="uploadPercent" :disable="true" icon="add_box" round dense flat>
                    </q-btn>

                    <q-btn v-else-if="scope.files.length < 1" type="a" icon="add_box"
                      @click="scope.pickFiles, fichier_upload = ''" round dense flat>
                      <q-uploader-add-trigger />
                    </q-btn>

                  </div>
              </template>

              <template v-slot:list="scope">

                <q-list separator>

                  <q-item v-for="file in scope.files" :key="file.__key" style="flex-direction: column;">

                    <q-item-section v-if="file.__img && String(file.name).split('.')[1] !== 'pdf'" class="q-mb-md"
                      style="display: block;width:100%;height: 100%; margin-left: 0;padding-right: 0;" thumbnail>
                      <img :src="file.__img.src" style="width: 140px;height: 100%;">
                    </q-item-section>

                    <q-item-section class="text-left" style="display: flex;flex-direction: row;align-items: center;">

                      <q-item-label style="word-break: break-word;max-width: 235px;">
                        {{ file.name }}
                      </q-item-label>

                      <q-item-section style="align-items: flex-end;">
                        <q-btn size="16px" color="red" flat dense round icon="delete"
                          @click="scope.removeFile(file), fichier_upload = ''" />
                      </q-item-section>

                    </q-item-section>

                  </q-item>

                </q-list>

              </template>

            </q-uploader>

            <div class="row-center w-100" style="margin-top: 30px;margin-bottom: 90px;;">

              <q-btn type="submit" glossy v-ripple padding="10px" class="w-100" dense color="light-blue-9">

                <q-icon left size="2em" name="upload" />
                <div style="font-weight: 600;">Envoyer</div>

              </q-btn>

            </div>

          </q-form>

        </div>

      </div>

    </transition>

    <!-- Submit Documents -->
    <q-page-sticky v-show="documents_show" position="bottom" :offset="[18, 18]">

      <q-btn glossy @click="upload()" v-ripple padding="10px" dense color="light-blue-9">

        <q-icon left size="2em" name="upload" />
        <div style="font-weight: 600;">Envoyer des documents</div>

      </q-btn>

    </q-page-sticky>

    <FooterComponent />

  </q-page>

</template>

<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"
import { SessionStorage, useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  documents_show = ref(false),
  document_show = ref(false),
  upload_show = ref(false),
  upload2_show = ref(false),
  upload3_show = ref(false),
  documents = ref([]),
  document_detail = ref({}),
  user = ref([]),
  filter = ref(''),
  options = ref([]),
  documents_type = ref([]),
  fileName = ref(''),
  back = ref(false),
  type = ref(''),
  sous_type = ref(''),
  documents_sous_type = ref([]),
  uploadPercent = ref(false),
  file_type = ref(''),
  file_ext = ref(''),
  fichier_upload = ref(''),
  typeId = ref(0),
  sousTypeId = ref(0)

export default defineComponent({
  name: 'MyAccountCompaniePage',
  components: {
    FooterComponent
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const router = useRouter()
    const $q = useQuasar()

    if (!isLoggedIn.value) {
      router.push('/')
    } else if (isLoggedIn.value && userStore.stateUser.user.user_type <= 1) {
      router.push('/')
    } else if (!SessionStorage.getItem('card_pro')) {
      router.push('/')
    }

    if (connexionState.value && isLoggedIn.value) {

      documents.value = []
      documents_type.value = []
      options.value = []
      user.value = userStore.stateUser.user

      if (user.value.user_type === 2) {

        axios.get(process.env.API + '/api/companie/documents/' + userStore.stateUser.companie.id + '/' + moment().format('YYYY'))
          .then(res => {

            if (res.data.succes) {

              documents.value = res.data.documents

              filter.value = moment().format('YYYY')

              for (let i = 0; i <= 3; i++) {

                options.value.push({
                  label: moment().subtract(i, 'years').format('YYYY'),
                  value: moment().subtract(i, 'years').format('YYYY')
                })

              }

            } else {

              documents.value = []
            }

          })

        axios.get(process.env.API + '/api/companie/documents-type')
          .then(res => {

            if (res.data.succes) {

              documents_type.value = res.data.documents_type

            } else {

              documents_type.value = []
            }

          })

      }

    }

    function onRejected (rejectedEntries) {

      $q.notify({
        timeout: 2000,
        color: 'red-5',
        textColor: 'white',
        icon: 'warning', message: 'Veuillez sélectionner un autre fichier !',
        progress: true,
        classes: 'glossy',
      })

    }

    function checkFileSize (files) {
      return files.filter(file => file.size < 5048000)
    }

    return {
      checkFileSize,
      onRejected,
      fileSelected (file) {

        uploadPercent.value = true

        let formData = new FormData();

        formData.append("file", file[0]);
        formData.append("destination", '/entreprises/' + file_type.value + '/')

        axios({
          method: "POST",
          url: folderAPI.value + '/api/upload/document',
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {

          if (res.data.succes) {

            uploadPercent.value = false
            fichier_upload.value = res.data.fichier

            $q.notify({
              timeout: 2000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Votre fichier a été enregistré avec succès.',
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
      onSubmitDocument () {

        documents_show.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false
        back.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        if (!fichier_upload.value) {

          $q.notify({
            timeout: 2000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'N\'oubliez pas d\'ajouter votre document !',
            progress: true,
            classes: 'glossy',
          })

          setTimeout(() => {
            logo.value = true
            upload3_show.value = true
            back.value = true
          }, 4000);

        } else {

          axios.post(folderAPI.value + '/api/companie/add/document',
            {
              fichier: fichier_upload.value,
              companieId: userStore.stateUser.companie.id,
              type: typeId.value,
              sous_type: sousTypeId.value
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

              if (connexionState.value && isLoggedIn.value) {

                documents.value = []
                documents_type.value = []
                options.value = []
                user.value = userStore.stateUser.user

                if (user.value.user_type === 2) {

                  axios.get(process.env.API + '/api/companie/documents/' + userStore.stateUser.companie.id + '/' + moment().format('YYYY'))
                    .then(res => {

                      if (res.data.succes) {

                        documents.value = res.data.documents

                        filter.value = moment().format('YYYY')

                        for (let i = 0; i <= 3; i++) {

                          options.value.push({
                            label: moment().subtract(i, 'years').format('YYYY'),
                            value: moment().subtract(i, 'years').format('YYYY')
                          })

                        }

                      } else {

                        documents.value = []
                      }

                    })

                  axios.get(process.env.API + '/api/companie/documents-type')
                    .then(res => {

                      if (res.data.succes) {

                        documents_type.value = res.data.documents_type

                      } else {

                        documents_type.value = []
                      }

                    })

                }

              }

              setTimeout(() => {
                logo.value = true
                documents_show.value = true
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
                logo.value = true
                upload3_show.value = true
                back.value = true
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
              logo.value = true
              upload3_show.value = true
              back.value = true
            }, 4000);

          })


        }

      },
      uploadSousType (id, name, file, ext) {

        sousTypeId.value = id
        sous_type.value = name
        file_type.value = file
        file_ext.value = ext
        documents_show.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false
        back.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          upload3_show.value = true
          back.value = true
        }, 4000);

      },
      showSousType (id, name) {

        typeId.value = id
        type.value = name
        documents_show.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false
        back.value = false

        if (connexionState.value && isLoggedIn.value) {

          documents_sous_type.value = []

          if (user.value.user_type === 2) {

            axios.get(process.env.API + '/api/companie/sous-type/' + typeId.value)
              .then(res => {
                console.log(res.data)
                if (res.data.succes) {

                  documents_sous_type.value = res.data.sous_type

                } else {

                  documents_sous_type.value = []
                }

              })

          }

        }

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          upload2_show.value = true
          back.value = true
        }, 4000);

      },
      showBack () {

        documents_show.value = false
        back.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          documents_show.value = true
          logo.value = true
        }, 4000);

      },
      showDocument (documentId) {

        documents_show.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false
        back.value = false

        if (connexionState.value && isLoggedIn.value) {

          document_detail.value = []

          if (user.value.user_type === 2) {

            axios.get(process.env.API + '/api/companie/document/' + userStore.stateUser.companie.id + '/' + documentId)
              .then(res => {

                if (res.data.succes) {

                  document_detail.value = res.data.document
                  fileName.value = String(document_detail.value.fileName).split('/')[3].split('.')[0]

                } else {

                  document_detail.value = []
                }

              })

          }

        }

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          document_show.value = true
          logo.value = true
          back.value = true
        }, 4000);

      },
      upload () {

        documents_show.value = false
        document_show.value = false
        upload_show.value = false
        upload2_show.value = false
        upload3_show.value = false
        logo.value = false
        back.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          upload_show.value = true
          logo.value = true
        }, 4000);

      },
      changeYear (val) {

        if (connexionState.value && isLoggedIn.value) {

          documents.value = []

          if (user.value.user_type === 2) {

            axios.get(process.env.API + '/api/companie/documents/' + userStore.stateUser.companie.id + '/' + val)
              .then(res => {

                if (res.data.succes) {

                  documents.value = res.data.documents

                } else {

                  documents.value = []
                }

              })

          }

        }

      },
      typeId,
      sousTypeId,
      fichier_upload,
      file_type,
      file_ext,
      uploadPercent,
      type,
      sous_type,
      documents_sous_type,
      back,
      fileName,
      documents_type,
      upload_show,
      upload2_show,
      upload3_show,
      options,
      filter,
      documents,
      document_detail,
      moment: moment,
      user,
      loader,
      logo,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      documents_show,
      document_show,
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

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    documents_show.value = false
    document_show.value = false
    upload_show.value = false
    upload2_show.value = false
    upload3_show.value = false
    logo.value = false
    back.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      documents_show.value = true
      logo.value = true
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
