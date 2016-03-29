<template>
    <div class="row" v-if="!adding && !editing">
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
    <div class="card grey lighten-5 animated fadeIn" v-if="adding || editing">
        <div class="card-content">
            <div class="row">
                <div class="col s3 arrow">
                    <img src="img/left.png">
                </div>
                <div class="col s6 title">
                    INVITES
                </div>
                <div class="col s3 arrow">
                    <img src="img/right.png">
                </div>
            </div>
            <form name="formGuest">
                <div class="input-field">
                    <select class="text-brown-light" id="guestsList" v-model="selectedGuest">
                      <option value="" selected>Choose an user</option>
                      <option v-bind:value="user._id" v-for="user in users">{{user.firstname }} {{user.lastname | firstLetter }}.</option>
                    </select>
                </div>
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate" v-model="guest.firstname">
                    <label for="icon_prefix">Nom</label>
                </div>
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate" v-model="guest.lastname">
                    <label for="icon_prefix">Prénom</label>
                </div>
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate" v-model="guest.email">
                    <label for="icon_prefix">Email</label>
                </div>
                <div class="file-field input-field">
                    <div class="btn brown-orange">
                        <span>Image</span>
                        <input type="file" v-on:change="convertImage()">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="">
                    </div>
                </div>
                <div class="row">
                   <div class="col s3">
                        <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="cancel()">Annuler</button>
                   </div>
                   <div class="col s3 offset-s6">
                       <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="save()">Valider</button>
                   </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            users:[],
            guest:{},
            selectedGuest: {},
            adding: false,
            editing: false,
            guests: []
        }
    },
    ready(){    
        this.load(this.$route.params.party);
    },
    methods: {
        load(partyId){
            
            this.$http.get('/parties/' + partyId).then(function(response){
                this.guests = response.data.guests;
            }, function(response){
                //Error
            });  
            
            this.$http.get('/users').then(function(response){
                this.users = response.data;
            }, function(response){
                //Error
            });
        },
        add(){
            this.adding = true;
            //Hack with timeout
            setTimeout(function(){
                $('select').material_select();  
                //Use jQuery event on change selected value from select
                $('#guestsList').change(function(){ 
                    this.$set('selectedGuest', $('#guestsList').val()); 
                }.bind(this));
            }.bind(this), 100);
        },
        cancel(){
            this.adding = false;
            this.editing = false;
            this.guest = {};
        },
        save(){
            if (this.adding){
                //Creating
                /*this.$http.put('/parties/' + this.$route.params.party, this.guest).then(function(response){
                    Materialize.toast("Ajout de : " + this.guest.firstname +  ' ' + this.guest.lastname, 2000,'',function(){
                        this.load();
                        this.cancel();
                    }.bind(this));
                }, function(response){
                    //Error
                });*/
            } else {
                //Updating
                /*this.$http.put('/parties/' + this.selectedRecipe._id, this.selectedRecipe).then(function(response){
                    Materialize.toast("Mis à jour : " +this.selectedRecipe.name, 2000,'',function(){
                        this.load();
                        this.cancel();
                    }.bind(this));
                }, function(response){
                    //Error
                });*/
            }
        },
        convertImage(){
            var file    = document.querySelector('input[type=file]').files[0];
            var reader  = new FileReader();

            reader.onloadend = function () {
                this.selectedRecipe.picture = reader.result;
            }.bind(this)

            if (file)
                reader.readAsDataURL(file);
        },
    },
    watch: {
        'selectedGuest': function(val, old){
            debugger
        }
    },
    filters: {
        firstLetter: function(text){
            return text.substr(0, 1);
        }
    },
}

</script>