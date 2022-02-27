import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        base: '#4EC690',
        lighten1: '#EDF5F1',
        lighten2: '#69817B',
        dark: '#2DB479'
      }
    }
  }
}

export default new Vuetify(opts);
