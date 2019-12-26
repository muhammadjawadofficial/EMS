import Toasted from 'vue-toasted';
import Vue from 'vue'
Vue.use(Toasted)



function basicToastInformation(typeOfToast, durationOfToast){
  return {
    type: typeOfToast,
    action: {
      text: 'Close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
    duration: durationOfToast
  }
}
Vue.toasted.register('error',
    (payload) => {
        
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Something Went Wrong.. Please Try Again Later!!"
        }
        
        // if there is a message show it with the message
        return payload.message;
    },
    basicToastInformation('error', 5000)
)

Vue.toasted.register('success',
    (payload) => {
        
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Welcome to the DevBatch-EMS"
        }
        
        // if there is a message show it with the message
        return payload.message;
    },
    basicToastInformation('success', 5000)
)

Vue.toasted.register('update',
    (payload) => {
        
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Successfully Updated!!"
        }
        
        // if there is a message show it with the message
        return payload.message;
    },
    basicToastInformation('success', 5000)
)