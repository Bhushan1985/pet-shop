<template>
  <v-dialog :value="value" :max-width="maxWidth" persistent>
    <v-card>
      <v-card-title>
        <v-flex xs11> {{title}} </v-flex>
        <v-spacer></v-spacer>
        <v-flex shrink>
          <v-btn ma-0 text icon @click="updateValue(false)">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-flex>
      </v-card-title>
      <slot></slot>
      <slot name="footer">
      </slot>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    title: { datatype: String, default: '' },
    value: { datatype: Boolean, default: false },
    maxWidth: { datatype: Number, default: 800 }
  },
  computed: {
    hasFooterSlot () {
      return !!this.$slots.footer
    }    
  },
  methods: {
    updateValue (val) {
      this.$emit('input', !!val)
    }
  }  
}
</script>
