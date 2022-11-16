import { NavigationGuardNext } from "vue-router"
import { Store } from "vuex"

export default function(next:NavigationGuardNext, store: Store<any>) {
    if (store.state.isLoggedIn) {
        next('/')
    }
    else next()
}