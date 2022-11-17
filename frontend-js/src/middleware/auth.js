export default function(next, store) {
    console.log('aseauoe')
    if (!store.state.isLoggedIn) {
        next('/login')
        // store.commit('setLoginModal', true)
    }
    else {
        next()
    }
    // console.log(store)
    
}