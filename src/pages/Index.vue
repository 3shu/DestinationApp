<!-- @format -->

<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <h2 class="title-heading">Choose your destination & Enjoy it</h2>
      </div>
      <div class="col-12">
          <q-select
            filled
            v-model.trim="destination"
            use-input
            input-debounce="0"
            label="Destination"
            :options="destinations_options"
            @filter="filterDestination"
            style="width: 350px"
            color="dark"
            @input="setDestination"
          >
            <template v-if="destination" v-slot:append>
              <q-icon name="cancel" @click="clearSelected" class="cursor-pointer" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      <div class="row justify-center" style="margin-top: 20px;">
        <div class="col-12">
          <div class="q-gutter-md row items-start">
            <div class="grid" v-for="(exc, index) in getData" v-bind:key="index">
              <q-card class="my-card">
                <q-img
                  :src="exc.imagePath"
                  style="width: 100%"
                  :ratio="1"
                  basic
                  spinner-color="black"
                  class="rounded-borders"
                >
                  <div class="absolute-bottom text-h6">
                    <q-icon
                    clickable
                    name="visibility"
                    style="font-size: 20px;"
                    @click="
                      excDetails(
                        exc.imagePath
                      )
                    "
                  >
                    <q-tooltip>Show</q-tooltip></q-icon
                  >
                  </div>
                </q-img>

                <q-card-section>
                  {{ exc.title }}
                </q-card-section>
                <q-inner-loading :showing="visible">
                  <q-spinner-gears size="50px" color="dark" />
                </q-inner-loading>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center" style="margin-top: 20px;" v-if="destination !== ''">
       <div class="col-12">
          <q-pagination
                v-model="page"
                color="dark"
                :min="currentPage"
                :max="Math.ceil(list_excursions.length/totalPages)"
                :direction-links="true"
          >
          </q-pagination>
        </div>
      </div>
    <!-- Preview Modal-->
    <q-dialog
      v-model="preview_image"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="max-width: 900px">
        <q-bar class="bg-dark text-white">
          Preview Image
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="row justify-center" style="margin-top: 20px;">
            <div class="col-12">
              <div class="q-gutter row justify-center">
                <div class="q-pa-md">
                  <div class="q-pa-md">
                    <img
                      alt=""
                      :src="imgURL"
                      style="max-width: 800px; width: auto;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" color="dark" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Preview Modal-->
  </q-page>
</template>
<script>
// import helper from 'src/utils/helper'
export default {
  name: 'PageIndex',
  data () {
    return {
      destination: '',
      is_open: false,
      ports: [],
      destinations_options: [],
      arrayDestinations: [],
      list_ports: [],
      excursions: [],
      list_excursions: [],
      arrayExcursions: [],
      preview_image: false,
      visible: false,
      imgURL: '',
      page: 1,
      currentPage: 1,
      totalPages: 14
    }
  },
  created () {
    // console.log('created')
    this.initializeComponent()
  },
  watch: {
    $route (to, from) {
      // console.log('route')
      this.initializeComponent()
    }
  },
  computed: {
    getData () {
      return this.list_excursions.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    }
  },
  methods: {
    initializeComponent () {
      // debugger
      const listPorts = this.$store.state.auth.listPorts.data
      const listExcursions = this.$store.state.auth.listExcursions.data
      let nameDestination = ''
      if (listPorts !== null && listPorts !== undefined) {
        this.ports = listPorts
        let objPortsList = {}
        const portsList = listPorts
        if (portsList !== null && portsList !== undefined) {
          portsList.forEach((element) => {
            objPortsList = { value: element.code, label: element.destination }
            this.list_ports.push(objPortsList)
          })
        } else {
          this.$q.notify({
            message: 'Error',
            color: 'red'
          })
        }
        for (let i = 0; i < this.ports.length; i++) {
          if (nameDestination !== this.ports[i].destination) {
            this.arrayDestinations.push(this.ports[i].destination)
          }
          nameDestination = this.ports[i].destination
        }
      } else {
        this.$store.dispatch('auth/getPortsList', {}).then((response) => {
          // console.log(response)
          this.$store.dispatch('auth/fetchListPorts', { data: response })
          this.ports = response
          let objPortsList = {}
          const portsList = response
          if (portsList !== null && portsList !== undefined) {
            portsList.forEach((element) => {
              objPortsList = {
                value: element.code,
                label: element.destination
              }
              this.list_ports.push(objPortsList)
            })
          } else {
            this.$q.notify({
              message: 'Error',
              color: 'red'
            })
          }

          for (let i = 0; i < this.ports.length; i++) {
            if (nameDestination !== this.ports[i].destination) {
              this.arrayDestinations.push(this.ports[i].destination)
            }
            nameDestination = this.ports[i].destination
          }
        })
      }
      if (listExcursions !== null && listExcursions !== undefined) {
        this.excursions = listExcursions
      } else {
        this.$store.dispatch('auth/getExcursionsList', {}).then((response) => {
          // console.log(response)
          this.$store.dispatch('auth/fetchListExcursions', { data: response })
          this.excursions = response
        })
      }
    },
    filterDestination (val, update) {
      if (val === '') {
        update(() => {
          this.destinations_options = this.arrayDestinations
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.destinations_options = this.arrayDestinations.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    setDestination () {
      // console.log(this.destination)
      this.arrayExcursions = []
      this.list_excursions = []
      this.visible = true
      this.page = 1
      this.currentPage = 1
      const portsSelected = this.list_ports.filter(
        (p) =>
          p.label.toLowerCase().indexOf(this.destination.toLowerCase()) > -1
      )
      if (portsSelected !== null && portsSelected !== undefined) {
        portsSelected.forEach((element) => {
          const excursionSelected = this.excursions.filter(
            (e) => e.port.code.indexOf(element.value) > -1
          )
          // console.log(excursionSelected)
          if (excursionSelected.length > 0) {
            this.arrayExcursions.push(excursionSelected)
          }
        })
        if (
          this.arrayExcursions !== null &&
          this.arrayExcursions !== undefined
        ) {
          this.arrayExcursions.forEach((element) => {
            element.forEach((subElement) => {
              this.list_excursions.push(subElement)
            })
          })
          setTimeout(() => {
            this.visible = false
          }, 2500)
        }
      } else {
        this.$q.notify({
          message: 'Error',
          color: 'red'
        })
      }
    },
    clearSelected () {
      this.arrayExcursions = []
      this.list_excursions = []
      this.destination = ''
      this.page = 1
      this.currentPage = 1
    },
    excDetails (url) {
      this.imgURL = url
      this.preview_image = true
    }
  }
}
</script>
