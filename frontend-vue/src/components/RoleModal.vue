<template>
<div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Launch static backdrop modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Silahkan Pilih Role</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" >
            <select class="form-select">
                <option value="">{{roles}}</option>
            </select>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Login</button>
        </div>
        </div>
    </div>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {

    data () {
        let listRole = JSON.parse(localStorage.getItem('roles'))
        return listRole 
    },

    computed : mapGetters (['roles']),
    setup() {

        // let roles = JSON.parse(localStorage.getItem('roles'))
        // // console.log(this.listRole)
        // return roles
        
    },
}
</script>