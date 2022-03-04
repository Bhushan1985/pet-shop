import * as dateFilters from './date.filter'

export default {
  install: function (Vue) {
    Vue.filter('date', dateFilters.dateFilter)
    Vue.filter('time', dateFilters.timeFilter)
  }
}
