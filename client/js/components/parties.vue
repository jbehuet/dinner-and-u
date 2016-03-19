<template>
<div class="card grey lighten-5 animated fadeIn">
   <div class="card-content">
        <div class="row">
            <div class="col s3 arrow">
                <img src="img/left.png">
            </div>
            <div class="col s6 title">
                DINERS
            </div>
            <div class="col s3 arrow">
                <img src="img/right.png">
            </div>
        </div>
        <div v-if="!adding && !editing">
            <div class="row">
                <div class="col s12">
                   <table class="highlight">
                       <tr v-for="party in parties">
                           <td>{{party.title}} <span class="badge new">{{ party.date | moment }}</span></td>
                           <td class="align-right">
                               <a class="waves-effect brown-orange btn-flat white-text" v-on:click="displayRecipes(party._id)"><i class="material-icons">visibility</i></a> <a class="waves-effect brown-orange btn-flat white-text" v-on:click="edit(party)"><i class="material-icons">mode_edit</i></a> <a class="waves-effect brown-orange btn-flat white-text" v-on:click="remove(party)"><i class="material-icons">delete</i></a>
                            </td>
                       </tr>
                   </table>
                </div>
            </div>
            <div class="row">
                <div class="col s12 align-right">
                    <a class="btn-floating btn-large waves-effect waves-light brown-orange" v-on:click="add()"><i class="material-icons">add</i></a>
                </div>
            </div>
        </div>
        <div v-if="adding || editing">
            <form name="formParty">
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate" v-model="party.title">
                    <label for="icon_prefix">Nom</label>
                </div>
                <div>
                    <input id="date" type="date" class="datepicker" v-model="party.date">
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
</div>
</template>

<script>
import {router} from '../app'

export default {
    data() {
        return {
            party:{},
            adding: false,
            editing: false,
            parties: []
        }
    },
    ready(){
        this.load();
    },
    methods: {
        load(){
            this.$http.get('/parties').then(function(response){
                this.parties = response.data;
            }, function(response){
                //Error
            });  
        },
        displayRecipes(id){
            router.go('recipes/'+ id);
        },
        add(){
            this.adding = true;
        },
        edit(party){
            this.editing = true;
            this.party = party;
            this.party.date = moment(this.party.date).format('YYYY-MM-DD'); // Format date
        },
        remove(party){
            this.$http.delete('/parties/' + party._id).then(function(response){
                Materialize.toast("Suppression : " + party.title, 2000);
                this.parties.splice(this.parties.indexOf(party), 1);
            }, function(response){
                //Error
            });
        },
        save(){
            if (this.adding){
                //Creating
                this.$http.post('/parties', this.party).then(function(response){
                    Materialize.toast("Création : " + this.party.title, 2000,'',function(){
                        this.load();
                        this.cancel();
                    }.bind(this));
                }, function(response){
                    //Error
                });
            } else {
                //Updating
                this.$http.put('/parties/' + this.party._id, this.party).then(function(response){
                    Materialize.toast("Mise à jour : " + this.party.title, 2000,'',function(){
                        this.load();
                        this.cancel();
                    }.bind(this));
                }, function(response){
                    //Error
                });
            }
        },
        cancel(){
            this.adding = false;
            this.editing = false;
            this.party = {};
        },
    },
    filters: {
        moment: function (date) {
            moment.locale('fr');
            return moment(date).format('LL');
        }
    }
}
</script>