<template>
   <div class="row">
      <div class="col m3">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="img/guest.png">
                </div>
                <div class="card-content text-center">
                  <span class="card-title activator grey-text text-darken-4">
                      <a class="btn-floating btn-large waves-effect waves-light brown-orange" v-on:click="add()"><i class="material-icons">add</i></a>
                  </span>
                </div>
                <div class="card-action">
                    <a href="#" class="not-active"><i class="material-icons">mode_edit</i></a>
                    <a href="#" class="right not-active"><i class="material-icons">delete</i></a>
                </div>
            </div>
       </div>
       <div class="col m3" v-for="guest in guests">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="img/guest.png">
                </div>
                <div class="card-content text-center">
                  <span class="card-title activator grey-text text-darken-4">{{guest.firstname }} {{guest.lastname | firstLetter }}.</span>
                </div>
                <div class="card-action">
                    <a href="#"><i class="material-icons text-brown-orange">mode_edit</i></a>
                    <a href="#" class="right"><i class="material-icons text-brown-orange">delete</i></a>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            guests: [{
                id: 0,
                email: 'sample@domain.com',
                firstname: 'Jerome',
                lastname: 'BEHUET',
                avatar: '',
            },
            {
                id: 1,
                email: 'sample@domain.com',
                firstname: 'Sebastien',
                lastname: 'Henry',
                avatar: '',
            },
            {
                id: 1,
                email: 'sample@domain.com',
                firstname: 'Guillaume',
                lastname: 'Durant',
                avatar: '',
            }]
        }
    },
    methods: {
    },
    filters: {
        firstLetter: function(text){
            return text.substr(0, 1);
        }
    },
}

</script>