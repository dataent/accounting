<template>
  <div v-if="meta" class="setup-wizard d-flex justify-content-center">
    <div class="col-4 border rounded shadow-sm p-4 mt-5">
      <h4 class="text-center">Setup your account</h4>
      <div class="progress-indicator d-flex justify-content-center p-4">
        <indicator
          class="mr-1"
          :color="indicatorColor(index)"
          v-for="(section, index) in layout.sections"
          :key="index"
        />
      </div>
      <form-layout :doc="doc" :fields="fields" :layout="layout" :currentSection="currentSection"/>
      <div class="d-flex justify-content-between">
        <div>
          <f-button secondary v-if="currentSection > 0" @click="prevSection">Prev</f-button>
        </div>
        <div>
          <f-button
            primary
            v-if="currentSection < layout.sections.length - 1"
            @click="nextSection"
          >Next</f-button>
          <f-button
            primary
            v-if="currentSection === layout.sections.length - 1"
            @click="submit"
          >Complete</f-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataent from 'dataentjs';
import Observable from 'dataentjs/utils/observable';
import FormLayout from 'dataentjs/ui/components/Form/FormLayout';
import indicatorColor from 'dataentjs/ui/constants/indicators';

export default {
  name: 'SetupWizard',
  data() {
    return {
      meta: dataent.getMeta('SetupWizard'),
      currentSection: 0
    };
  },
  components: {
    FormLayout
  },
  created() {
    this.doc = new Observable();
    this.doc.isNew = () => true;
  },
  methods: {
    async submit() {
      try {
        dataent.events.trigger('SetupWizard:setup-complete', this.doc);
      } catch (e) {
        console.error(e);
      }
    },
    nextSection() {
      this.currentSection += 1;
    },
    prevSection() {
      this.currentSection -= 1;
    },
    indicatorColor(i) {
      return i === this.currentSection
        ? indicatorColor.BLUE
        : indicatorColor.GREY;
    }
  },
  computed: {
    fields() {
      return this.meta.fields;
    },
    layout() {
      return this.meta.layout;
    }
  }
};
</script>
