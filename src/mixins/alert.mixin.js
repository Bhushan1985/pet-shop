import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setAlert']),
    showAlert (color, message) {
      this.setAlert({ color, message, show: message.length > 0 })
    },
    showAlertError (message, err) {
      if (message && message.includes('Request Canceled: User filter change or locally stored filters')) return
      let fullMsg = message
      if (err) {
        console.error(message, err)
        if (err.response && err.response.data && err.response.data.message) {
          fullMsg = message + ': ' + err.response.data.message
        } else if (err.message) {
          fullMsg = message + ': ' + err.message
        }
      }
      this.setAlert({ color: 'error', message: fullMsg, show: true })
    },
    showAlertSuccess (message) {
      this.setAlert({ color: 'success', message, show: true })
    }
  }
}
