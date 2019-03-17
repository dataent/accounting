<template>
  <div>
    <div class="p-4">
        <h4 class="pb-2">{{ _('Data Import') }}</h4>
        <dataent-control
          :docfield="{
            fieldtype: 'Select',
            fieldname: 'referenceDoctype',
            options: ['Select a doctype...', 'ToDo', 'Item', 'Party', 'Invoice']
          }"
          @change="doctype => showTable(doctype)"
        />
        <f-button primary @click="importData">Submit</f-button>
        <div class="pt-2" ref="datatable" v-once></div>
    </div>
  </div>
</template>
<script>
import dataent from 'dataentjs';
import DataTable from 'dataent-datatable';
import { convertFieldsToDatatableColumns } from 'dataentjs/client/ui/utils';

export default {
  methods: {
    showTable(doctype) {
      this.doctype = doctype;
      const meta = dataent.getMeta(doctype);
      const columns = convertFieldsToDatatableColumns(meta.fields);
      this.renderTable(columns);
    },
    renderTable(columns) {
      this.datatable = new DataTable(this.$refs.datatable, {
        columns,
        data: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        pasteFromClipboard: true
      });
    },
    importData() {
      const rows = this.datatable.datamanager.getRows();

      const data = rows.map(row => {
        return row.slice(1).reduce((prev, curr) => {
          prev[curr.column.field.fieldname] = curr.content;
          return prev;
        }, {})
      });

      data.forEach(async d => {
        try {
          await dataent.newDoc(Object.assign(d, {
            doctype: this.doctype,
          })).insert()
        } catch(e) {
          console.log(e);
        }
      })
    }
  }
}
</script>
