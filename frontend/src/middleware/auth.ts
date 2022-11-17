import { NavigationGuardNext } from "vue-router"
import { State } from '../store/index'
import { Store } from "vuex"

export default function(next:NavigationGuardNext, store: Store<State>) {
    // const store = useStore()
    console.log('in')
    // console.log(store.state)
    if (!store.state.isLoggedIn) {
        next('/login')
        // store.commit('')
    }
    else next()
}