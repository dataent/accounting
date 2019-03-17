<template>
  <div id="app">
    <desk v-if="showDesk" />
    <database-selector v-if="showDatabaseSelector" @file="connectToDBFile" />
    <setup-wizard v-if="showSetupWizard" />
  </div>
</template>

<script>
import dataent from 'dataentjs';
import Desk from './pages/Desk';
import SetupWizard from './pages/SetupWizard/SetupWizard';
import DatabaseSelector from './pages/DatabaseSelector';

export default {
  name: 'App',
  data() {
    return {
      showDatabaseSelector: false,
      showDesk: false,
      showSetupWizard: false
    }
  },
  components: {
    Desk,
    SetupWizard,
    DatabaseSelector,
  },
  mounted() {
    if (!localStorage.dbPath) {
      this.showDatabaseSelector = true;
    } else {
      dataent.events.trigger('connect-database', localStorage.dbPath);
    }

    dataent.events.on('show-setup-wizard', () => {
      this.showSetupWizard = true;
      this.showDesk = false;
      this.showDatabaseSelector = false;
    });

    dataent.events.on('show-desk', () => {
      this.showDesk = true;
      this.showSetupWizard = false;
      this.showDatabaseSelector = false;
    })
  },
  methods: {
    connectToDBFile(filePath) {
      dataent.events.trigger('DatabaseSelector:file-selected', filePath);
    }
  }
}
</script>
<style lang="scss">
@import "styles/index.scss";
</style>
