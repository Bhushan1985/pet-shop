<template>
  <v-container class="filterBar">
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field v-model="dataModel.first_name" @input="updateFilter" append-icon="mdi-magnify" label="Customer Name" outlined single-line dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field v-model="dataModel.email" @input="updateFilter" append-icon="mdi-magnify" label="Customer Email" outlined single-line dense></v-text-field>
      </v-col> 
      <v-col cols="12" sm="4">
        <v-text-field v-model="dataModel.phone" @input="updateFilter" append-icon="mdi-magnify" label="Customer Phone" outlined single-line dense></v-text-field>
      </v-col> 
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field v-model="dataModel.address" @input="updateFilter" append-icon="mdi-magnify" label="Customer Address" outlined single-line dense></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="dataModel.created_at" @input="updateFilter" append-icon="mdi-calendar-blank" label="Date created" outlined single-line dense></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select v-model="dataModel.marketing" @input="updateFilter" :items="items" label="Marketing preferences" dense outlined> </v-select>
          </v-col>
        </v-row>
      </v-col> 
      <v-col cols="12" sm="4">
        <v-btn :disabled="isDisabled" @click="clearFilter">RESET</v-btn>
      </v-col> 
    </v-row>
  </v-container>
</template>
<script>
import debounce from "lodash/debounce"
export default {
  mounted () {
    if(localStorage.getItem('filter')) {
      this.dataModel = JSON.parse(localStorage.getItem('filter'))
    }
  },
  data () {
    return {
      dataModel: {
        first_name:'',
        email:'',
        phone:'',
        address: '',
        created_at: '',
        marketing: ''
      },
      items:[{text: 'No', value: 0}, {text:'Yes', value: 1}]
    }
  },
  computed: {
    isDisabled () {
      return (Object.keys(this.toJSON()).length === 0)
    }
  },
  methods: {
    hasValue (value) {
      return value !== null && value !== undefined && value !== ''
    },
    updateFilter: debounce(function () {
      localStorage.setItem('filter', JSON.stringify(this.toJSON()))
      this.$emit('change', this.dataModel)
    }, 500),
    toJSON () {
      const output = {}
      Object.entries(this.dataModel).forEach(([key, value]) => {
        if (this.hasValue(value)) output[key] = value
      })
      return output
    },
    clearFilter () {
      Object.entries(this.dataModel).forEach(([key, value]) => {
         if(this.hasValue(value)) {
          this.dataModel[key] = ''
         }
      })
      localStorage.removeItem('filter')
      this.updateFilter()
    }        
  }
}
</script>
<style scoped>
.filterBar {
  background-color: #FAFAFA;
  position: absolute;
   z-index: 9;
}
</style>

