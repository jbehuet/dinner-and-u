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
        <div v-if="!addOrEdit">
            <div class="row">
                <div class="col s12">
                   <table class="highlight">
                       <tr v-for="party in parties">
                           <td>{{ party.title + ' (' + party.date + ')' }}</td>
                           <td class="align-right">
                               <a class="waves-effect brown-orange btn-flat white-text" v-on:click="displayRecipes(party._id)"><i class="material-icons">visibility</i></a> <a class="waves-effect brown-orange btn-flat white-text" v-on:click="edit(party)"><i class="material-icons">mode_edit</i></a> <a class="waves-effect brown-orange btn-flat white-text" v-on:click="delete(party)"><i class="material-icons">delete</i></a>
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
        <div v-if="addOrEdit">
            <form name="formConnect">
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate">
                    <label for="icon_prefix">Nom</label>
                </div>
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate">
                    <label for="icon_prefix">Date</label>
                </div>
                <div class="row">
                   <div class="col s3">
                       <button type="submit" class="btn btn-success btn-block brown-orange">Valider</button>
                   </div>
                   <div class="col s3 offset-s6">
                       <button type="submit" class="btn btn-success btn-block brown-orange">Annuler</button>
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
            addOrEdit: false,
            parties: [
                { _id: 1, title: 'Pasta', date:'12/03/2016'},
                { _id: 2, title: 'Pasta', date:'12/03/2016'},
                { _id: 3, title: 'Pasta', date:'12/03/2016'},
                { _id: 4, title: 'Pasta', date:'12/03/2016'}
            ]
        }
    },
    methods: {
        displayRecipes(id){
            router.go('recipes');
        },
        add(){
            this.addOrEdit = true;
        },
        edit(party){
            console.log(party);
        },
        delete(party){
            console.log(party); 
        },
    }
}
</script>