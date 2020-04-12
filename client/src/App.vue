<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Bittrader</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({})
}
</script>
