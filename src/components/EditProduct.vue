<template>
    <div id="edit-product">
        <h3>Edit Product</h3>
        <div class="row">
            <form @submit.prevent="updateProduct" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <label>Barcode</label>
                        <br />
                        <input type="text" v-model="barcode" required>
                    </div>
                    <div class="input-field col s6">
                        <label>Article Number</label>
                        <br />
                        <input type="text" v-model="article_number" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Name (German)</label>
                        <br />
                        <input type="text" v-model="name_ger" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Name (Display)</label>
                        <br />
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <label>Price</label>
                        <br />
                        <input type="text" v-model="price" required>
                    </div>
                    <div class="input-field col s6">
                        <label>Category</label>
                        <br />
                        <input type="text" v-model="category" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Description</label>
                        <br />
                        <input type="text" v-model="description" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <b-form-file @change="fileSelected" v-model="file" :state="Boolean(file)" accept="image/jpeg, image/png, image/gif" placeholder="Choose a file..."></b-form-file>
                        <br />
                        <button @click="uploadFile" class="btn blue"><i class="fa fa-file-upload"></i></button>
                    </div>
                </div>

                <router-link v-bind:to="{name: 'new-intake', params: {product_id: product_id}}" class="btn-floating btn-large red">
                    <i class="fa fa-cart-plus"></i>
                </router-link>

                <button type="submit" class="btn" v-b-tooltip.hover title="Save"><i class="fa fa-save"></button>
                <button @click="deleteProduct" class="btn red"><i class="fa fa-trash-alt"></i></button>
                
                <router-link to="/" class="btn grey"><i class="fa fa-ban"></router-link>
            </form>
        </div>
    </div>
</template>

<script>
//import db from './firebaseInit'
import firebaseApp from './firebaseInit'
export default {
    name: 'edit-product',
    data () {
        return {
            product_id: null,
            article_number: null,
            barcode: null,
            category: null,
            colour: null,
            description: null,
            name: null,
            name_ger: null,
            price: null,
            size: null,
            tags: null,
            file: null
        }
    },
    beforeRouteEnter(to, from, next) {
        var db = firebaseApp.firestore();
        console.log("routerbeforeenter: " + to.params.product_id)
        var docRef = db.collection("products").doc(to.params.product_id);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                    next(vm => {
                        vm.product_id = doc.id,
                        vm.article_number = doc.data().article_number,
                        vm.barcode = doc.data().barcode,
                        vm.category = doc.data().category,
                        vm.colour = doc.data().colour,
                        vm.description = doc.data().description,
                        vm.name = doc.data().name,
                        vm.name_ger = doc.data().name_ger,
                        vm.price = doc.data().price,
                        vm.size = doc.data().size
                    })
            } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
        }).catch(function(error) {
                console.log("Error getting document:", error);
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData () {
            var db = firebaseApp.firestore();
            console.log("fetchdata: " + this.$route.params.product_id)
            var docRef = db.collection("products").doc(this.$route.params.product_id);
            // db.collection('products').where('barcode', '==', this.$route.params.product_id).get()
            docRef.get().then(function(doc) {
                if (doc.exists) {
                        this.product_id = doc.id
                        this.article_number = doc.data().article_number
                        this.barcode = doc.data().barcode
                        this.category = doc.data().category
                        this.colour = doc.data().colour
                        this.description = doc.data().description
                        this.name = doc.data().name
                        this.name_ger = doc.data().name_ger
                        this.price = doc.data().price
                        this.size = doc.data().size
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })
        },
        updateProduct() {
            var db = firebaseApp.firestore();
            console.log("updateEmployee: " + this.$route.params.product_id)
            var docRef = db.collection("products").doc(this.$route.params.product_id);
            // db.collection('products').where('barcode', '==', this.$route.params.product_id).get()
            docRef.update({
                            article_number: doc.data().article_number,
                            barcode: doc.data().barcode,
                            category: doc.data().category,
                            colour: doc.data().colour,
                            description: doc.data().description,
                            name: doc.data().name,
                            name_ger: doc.data().name_ger,
                            price: doc.data().price,
                            size: doc.data().size
            })
                .then(() => {
                    this.$router.push({name: 'view-product', params: {product_id: this.product_id}}) 
            })
        },
        deleteProduct() {
            if(confirm('Are you sure?')) {
                var db = firebaseApp.firestore();
                var docRef = db.collection("products").doc(this.$route.params.product_id);
                docRef.delete()
                this.$router.push('/')
            }
        },
        fileSelected(event) {
            this.file = event.target.files[0]
            console.log(this.file)
        },
        uploadFile() {
            var curFile = this.file
            var curProductID = this.$route.params.product_id
            firebaseApp.auth().signInAnonymously().then(function() {
                    if(curFile != null) {
                        var storageRef = firebaseApp.storage().ref();
                        var storageSpace = "images/" + curProductID + "_0"
                        var imageRef = storageRef.child(storageSpace)

                        var uploadTask = imageRef.put(curFile);

                        // Register three observers:
                        // 1. 'state_changed' observer, called any time the state changes
                        // 2. Error observer, called on failure
                        // 3. Completion observer, called on successful completion
                        uploadTask.on('state_changed', function(snapshot){
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebaseApp.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                            case firebaseApp.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                        }
                        }, function(error) {
                        // Handle unsuccessful uploads
                            console.log(error)
                        }, function() {
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                console.log('File available at', downloadURL);
                            })
                            // hier sollte das images ebenfalls in die Datenbank geschrieben werden
                        })
                    }
                }) 
        }
    }
}
</script>