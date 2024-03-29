<template>
  <div class="bg-light">
    <page-header :title="doctype"/>
    <div class="row no-gutters">
      <div v-if="showInvoiceCustomizer" class="col-3 mt-4 mx-auto"></div>
      <div class="col-8 mx-auto text-right mt-4">
        <f-button primary @click="send">{{ _('Send') }}</f-button>
        <f-button secondary @click="toggleInvoiceCustomizer">{{ _('Customize') }}</f-button>
        <f-button secondary @click="makePDF">{{ _('PDF') }}</f-button>
      </div>
    </div>
    <div class="row no-gutters">
      <div v-if="showInvoiceCustomizer" class="col-3 mt-4 mx-auto">
        <invoice-customizer
          class="border"
          style="position: fixed"
          @closeInvoiceCustomizer="toggleInvoiceCustomizer"
          @changeColor="changeColor($event)"
          @changeTemplate="changeTemplate($event)"
          @changeFont="changeFont($event)"
        />
      </div>
      <div ref="printComponent" class="col-8 bg-white mt-4 mx-auto border shadow">
        <component
          :themeColor="themeColor"
          :template="template"
          :font="font"
          :is="printComponent"
          v-if="doc"
          :doc="doc"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader';
import InvoiceCustomizer from '@/components/InvoiceCustomizer';
import InvoicePrint from '@/../models/doctype/Invoice/InvoicePrint';
import EmailSend from '../Email/EmailSend';

const printComponents = {
  Invoice: InvoicePrint
};
export default {
  name: 'PrintView',
  props: ['doctype', 'name'],
  components: {
    PageHeader,
    InvoiceCustomizer
  },
  data() {
    return {
      doc: undefined,
      printComponent: undefined,
      themeColor: undefined,
      template: undefined,
      font: undefined,
      showInvoiceCustomizer: false
    };
  },
  async mounted() {
    this.doc = await dataent.getDoc(this.doctype, this.name);
    this.printComponent = printComponents[this.doctype];
  },
  methods: {
    makePDF() {
      dataent.call({
        method: 'print-pdf',
        args: {
          doctype: this.doctype,
          name: this.name,
          html: this.$refs.printComponent.innerHTML
        }
      });
    },
    async send() {
      let doc = await dataent.getNewDoc('Email');
      let emailFields = dataent.getMeta('Email').fields;
      var file_path = this.name;
      doc['fromEmailAddress'] = this.selectedId;
      this.makePDF();
      doc['filePath'] = this.name + '.pdf';
      this.$modal.show({
        component: EmailSend,
        props: {
          doctype: doc.doctype,
          name: doc.name
        },
        modalProps: {
          title: 'Send Invoice',
          footerMessage: 'Invoice attached along..'
        }
      });
      doc.on('afterInsert', data => {
        this.$modal.hide();
      });
    },
    async toggleInvoiceCustomizer() {
      this.showInvoiceCustomizer = !this.showInvoiceCustomizer;
    },
    changeColor(color) {
      this.themeColor = color;
    },
    changeTemplate(template) {
      this.template = template;
    },
    changeFont(font) {
      this.font = font;
    }
  }
};
</script>