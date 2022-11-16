import { NavigationGuardNext } from "vue-router"
import { Store } from "vuex"

export default function(next:NavigationGuardNext, store: Store<any>) {
    // const store = useStore()
    console.log('in')
    console.log(store.state.isLoggedIn)
    if (!store.state.isLoggedIn) {
        next('/login')
        // store.commit('')
    }
    else next()
}