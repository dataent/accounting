<template>
  <div class="bg-light">
    <page-header :title="listConfig.title" />
    <div class="px-4 py-3">
      <list-toolbar
        :listConfig="listConfig"
        @newClick="openNewForm"
        @filterList="keyword => filterList(keyword)"
        class="mb-4"
      />
      <list
        :listConfig="listConfig"
      />
    </div>
  </div>
</template>
<script>
import dataent from 'dataentjs';
import Observable from 'dataentjs/utils/observable';
import PageHeader from '@/components/PageHeader';
import ListToolbar from './ListToolbar';
import List from './List';
import listConfigs from './listConfig';

export default {
  name: 'ListView',
  props: ['listName'],
  components: {
    PageHeader,
    ListToolbar,
    List
  },
  created() {
    dataent.listView = new Observable();
  },
  methods: {
    async openNewForm() {
      const doctype = this.listConfig.doctype;
      const doc = await dataent.getNewDoc(doctype);
      if (this.listConfig.filters) {
        doc.set(this.listConfig.filters);
      }
      this.$router.push(`/edit/${doctype}/${doc.name}`);
      doc.on('afterInsert', () => {
        this.$router.push(`/edit/${doctype}/${doc.name}`);
      });
    }
  },
  computed: {
    listConfig() {
      return listConfigs[this.listName];
    }
  }
}
</script>
