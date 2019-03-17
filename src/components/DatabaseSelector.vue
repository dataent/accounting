<template>
  <form-layout
    :fields="[docfield]"
    :doc="doc"
  />
</template>
<script>
import dataent from 'dataentjs';
// import SQLite from 'dataentjs/backends/sqlite';
import FormLayout from 'dataentjs/ui/components/Form/FormLayout';
import Observable from 'dataentjs/utils/observable';

export default {
  name: 'DatabaseSelector',
  components: {
    FormLayout
  },
  data() {
    return {
      docfield: {
        fieldtype: 'File',
        label: 'Select File',
        fieldname: 'file',
        filetypes: ['.db']
      },
      value: null,
      invalid: false
    }
  },
  created() {
    this.doc = new Observable();
  },
  methods: {
    handleChange(fileList) {
      const value = fileList[0].name;
      this.value = value;
    },
    async changeDatabase() {
      if (dataent.db) {
        dataent.db.close();
      }

      const dbPath = this.value;
      dataent.db = new SQLite({ dbPath });
      await dataent.db.connect();
      await dataent.db.migrate();
    }
  }
}
</script>
