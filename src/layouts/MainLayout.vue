<!-- @format -->

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Destination App
        </q-toolbar-title>
        <q-item>
          <q-btn flat round dense icon="info" @click="info">
            <q-tooltip>
              About
            </q-tooltip>
          </q-btn>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-dark"
      class="text-white"
    >
      <q-card class="profile-card bg-dark text-white">
        <q-card-section>
          <q-chip size="20px" dark>
            <q-avatar>
              <img src="images/user.jpg" />
            </q-avatar>
            Test
          </q-chip>
        </q-card-section>
      </q-card>
      <q-separator dark />
      <q-list>
        <q-item
          clickable
          tag="a"
          to="/"
          :active="linkName === 'index'"
          active-class="my-menu-link"
          id="link-destination"
          class="main-menu-item"
          @mouseover="userSubMenu = false"
        >
          <q-item-section avatar>
            <q-icon name="explore" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Destination</q-item-label>
          </q-item-section>
        </q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="about_modal">
      <q-card>
        <div class="row q-pa-md" style="max-height: 100%">
          <div class="col-5">
            <div class="row justify-center">
              <img
                transition="rotate"
                src="~assets/quasar-logo-full.svg"
                style="width: 90px; height: 90px;"
              />
              <div class="text-h6">Destination App</div>
            </div>
          </div>
          <div class="col-7">
            <div class="text-overline text-left">
              Destination App v.{{ app_version }}
            </div>
            <div class="text-overline text-left">
              Quasar Framework v{{ $q.version }}
            </div>
            <div class="text-overline">
              Developed by Mario Perez<br />
              {{ year }}
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'My Github',
    caption: 'github.com/3shu',
    icon: 'code',
    link: 'https://github.com/3shu'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  created () {
    this.app_version = process.env.APP_VERSION
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      link: 'index',
      about_modal: false,
      year: '',
      app_version: ''
    }
  },
  computed: {
    linkName: function () {
      const path = this.$router.currentRoute.path
      if (path === '/') {
        return 'index'
      }
      return this.link
    }
  },
  methods: {
    info () {
      this.about_modal = true
      this.year = new Date().getFullYear()
    }
  }
}
</script>
