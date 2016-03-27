<template>
<div class="card grey lighten-5 animated fadeIn" v-bind:class="(recipes.length <= 0 && !adding && !editing ? 'empty-card' :'')">
   <a class="btn-floating btn-large waves-effect waves-light brown-orange" v-bind:class="(recipes.length > 0 ? 'recipe-add' :'')" v-on:click="add()" v-if="!adding && !editing"><i class="material-icons">add</i></a>
   <a class="btn-floating btn-large waves-effect waves-light brown-orange recipe-edit" v-if="(recipes.length > 0 && !adding && !editing)" v-on:click="edit()"><i class="material-icons">mode_edit</i></a>
   <a class="btn-floating btn-large waves-effect waves-light brown-orange recipe-delete" v-if="(recipes.length > 0 && !adding && !editing)" v-on:click="remove()"><i class="material-icons">delete</i></a>
   <img v-bind:src="selectedRecipe.picture" alt="" class="recipe" v-if="(recipes.length > 0 && !adding && !editing)">
   <div class="card-content">
        <div v-if="recipes.length > 0 && !adding && !editing">
            <div class="row">
                <div class="col s3 arrow">
                    <img src="img/left.png">
                </div>
                <div class="col s6 title">
                    {{selectedRecipe.name}}
                </div>
                <div class="col s3 arrow">
                    <img src="img/right.png">
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                   {{selectedRecipe.description}}
                </div>
            </div>
            <div class="row">
                <div class="col s12 notes">
                  <i class="material-icons prefix" v-if="selectedRecipe.note >= 1">grade</i>
                  <i class="material-icons prefix" v-if="selectedRecipe.note >= 2">grade</i>
                  <i class="material-icons prefix" v-if="selectedRecipe.note >= 3">grade</i>
                  <i class="material-icons prefix" v-if="selectedRecipe.note >= 4">grade</i>
                  <i class="material-icons prefix" v-if="selectedRecipe.note == 5">grade</i>
                </div>
            </div>
            <div class="row">
                <div class="col s2">
                    <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="getRecipes(-1)" :disabled="(startIndex <= 0)">&#60;</button>
                </div>
                <div class="col s2 offset-s8">
                    <button type="submit" class="btn btn-success btn-block brown-orange" v-on:click="getRecipes(1)" :disabled="!(startIndex < recipes.length - 1)">&#62;</button>
                </div>
            </div>
        </div>
        <div v-if="adding || editing">
           <div class="row">
                <div class="col s3 arrow">
                    <img src="img/left.png">
                </div>
                <div class="col s6 title">
                    Edition / Création
                </div>
                <div class="col s3 arrow">
                    <img src="img/right.png">
                </div>
            </div>
            <form name="formRecipe">
                <div class="input-field">
                    <input id="icon_prefix" type="text" class="validate" v-model="selectedRecipe.name">
                    <label for="icon_prefix">Nom</label>
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
                <div class="input-field">
                    <textarea id="icon_prefix" class="materialize-textarea" v-model="selectedRecipe.description"></textarea>
                    <label for="icon_prefix">Description</label>
                </div>
                <div>
                    <p class="range-field">
                        <label for="icon_prefix">Note</label>
                        <input type="range" class="brown-orange" id="note" min="0" max="5" v-model="selectedRecipe.note"/>
                    </p>
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
export default {
    data() {
        return {
            adding: false,
            editing: false,
            recipes: [],
            selectedRecipe : {},
            startIndex: 0
        }
    },
    ready(){
        this.load(this.$route.params.party);
    },
    methods: {
        load(partyId){
            this.startIndex = 0; //init
            this.$http.get('/recipes/' + partyId ).then(function(response){
                this.recipes = response.data;
                this.getRecipes(this.startIndex);
            }, function(response){
                //Error
            });  
        },
        getRecipes(move){
            this.startIndex += move;
            this.selectedRecipe = this.recipes[this.startIndex];
        },
        add(){
            this.selectedRecipe = {};
            this.adding = true;
        },
        edit(){
            this.editing = true;
        },
        remove(){
            this.$http.delete('/recipes/' + this.selectedRecipe._id).then(function(response){
                Materialize.toast("Suppression : " + this.selectedRecipe.name, 2000);
                this.recipes.splice(this.recipes.indexOf( this.selectedRecipe), 1);
                this.cancel();
            }, function(response){
                //Error
            });
        },
        save(){
            this.selectedRecipe.party = this.$route.params.party;
            if (this.adding){
                //Creating
                this.$http.post('/recipes', this.selectedRecipe).then(function(response){
                    Materialize.toast("Création : " + this.selectedRecipe.name, 2000,'',function(){
                        this.load();
                        this.cancel();
                    }.bind(this));
                }, function(response){
                    //Error
                });
            } else {
                //Updating
                this.$http.put('/recipes/' + this.selectedRecipe._id, this.selectedRecipe).then(function(response){
                    Materialize.toast("Mis à jour : " +this.selectedRecipe.name, 2000,'',function(){
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
            this.load(this.$route.params.party);
        },
        convertImage(){
            var file    = document.querySelector('input[type=file]').files[0];
            var reader  = new FileReader();

            reader.onloadend = function () {
                this.selectedRecipe.picture = reader.result;
            }.bind(this)

            if (file)
                reader.readAsDataURL(file);
        }
    }
}
</script>