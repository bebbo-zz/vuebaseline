<template>
  <div id="edit-product">
    <h3>Edit Product</h3>
    <div class="row">
      <!-- @submit.prevent="updateProduct" -->
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <label>{{$t("barcode")}}</label>
            <br />
            <input type="text" v-model="barcode" required>
          </div>
          <div class="input-field col s6">
            <label>Article Number</label>
            <br />
            <input type="text" v-model="article_number">
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
                <input type="text" v-model="category">
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <label>Description</label>
                <br />
                <b-form-textarea :rows="10" v-model="description"></b-form-textarea>
            </div>
        </div>
        <ul class="collection with-header">
          <li class="collection-header">
            <h4>Thumb Image</h4>
              <b-form-file @change="thumbFileSelected" v-model="thumbFile" :state="Boolean(thumbFile)" accept="image/jpeg, image/png, image/gif" placeholder="Choose a thumb picture..."></b-form-file>
              <br />
              <!--button @click="uploadThumbFile" class="btn blue"><i class="fa fa-plus-circle"></i></button-->
          </li>
        </ul>
        <ul class="collection with-header">
          <li class="collection-header">
            <h4>Images</h4>
            <b-form-file @change="fileSelected" v-model="file" :state="Boolean(file)" accept="image/jpeg, image/png, image/gif" placeholder="Choose a file..."></b-form-file>
            <br />
            <!--multiple="true" button @click="uploadFile" class="btn blue"><i class="fa fa-plus-circle"></i></button-->
          </li>
          <li v-for="i in picsLength" v-bind:key="i - 1" class="collection-item">
            <img v-bind:src="picsUrl[i - 1]" width="150" height="150" />
            <button @click="deletePicture(i - 1)" class="btn" v-b-tooltip.hover title="Delete Image"><i class="fa fa-trash"></i></button>
            <button @click="downloadPicture(i - 1)" class="btn" v-b-tooltip.hover title="Download Image"><i class="fa fa-download"></i></button>
          </li>
        </ul>
        <ul class="collection with-header">
          <li class="collection-header">
            <h4>Tags</h4>
            <input-tag v-model="tags"></input-tag>
          </li>
        </ul>
        <ul class="collection with-header">
          <li class="collection-header">
            <h4>Intakes</h4>
            <button @click="showIntakeModal" class="btn" v-b-tooltip.hover title="Add Intake">
              <i class="fa fa-cart-arrow-down"></i>
            </button>
          </li>
          <li v-for="intake in intakes" v-bind:key="intake.id" class="collection-item">
            <div class="chip">{{intake.quantity}}</div>
            {{intake.purchase_price}} from {{intake.supplier}}
          </li>
        </ul>
        <button @click="updateProduct" class="btn" v-b-tooltip.hover title="Save"><i class="fa fa-save"></i></button>
        <button @click="deleteProduct" class="btn" v-b-tooltip.hover title="Delete Product"><i class="fa fa-trash"></i></button>
        <router-link to="/" class="btn" v-b-tooltip.hover title="Cancel"><i class="fa fa-ban"></i></router-link>
      </form>
    </div>
    <!-- Modal Component -->
    <b-modal 
      ref="modal1" 
      title="New Intake"
      @ok="saveIntake">
      <div class="row">
        <div class="input-field col s6">
          <input type="text" v-model="newin_quantity" required>
          <label>Quantity</label>
        </div>
        <div class="input-field col s6">
          <input type="text" v-model="newin_purchase_price" required>
          <label>Purchase Price</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="newin_supplier" required>
          <label>Supplier</label>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
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
      tags: [],
      file: [],
      intakes: [],
      picsUrl: [],
      picsReference: [],
      picsMaxRef: null,
      picsLength: null,
      newin_quantity: null,
      newin_purchase_price: null,
      newin_supplier: null,
      thumbFile: null,
      thumbUrl: null
    }
  },
  beforeRouteEnter(to, from, next) {
    var db = firebaseApp.firestore();
    var tempIntakes = []
    db.collection('intakes').where('product_id', '==', to.params.product_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = {
            'id': doc.id,
            'purchase_price': doc.data().purchase_price,
            'quantity': doc.data().quantity,
            'supplier': doc.data().supplier
          }
          tempIntakes.push(data)
        })
    })
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
          vm.size = doc.data().size,
          vm.intakes = tempIntakes,
          vm.picsUrl = doc.data().picsUrl,
          vm.picsReference = doc.data().picsReference,
          vm.picsLength = doc.data().picsLength,
          vm.picsMaxRef = doc.data().picsMaxRef,
          vm.thumbUrl = doc.data().thumbUrl,
          vm.tags = doc.data().tags
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
      db.collection('intakes').where('product_id', '==', this.$route.params.product_id).get()
      .then(querySnapshot => {
          querySnapshot.forEach(doc => {
              var tempIntakes = []
              var data = {
                  'id': doc.id,
                  'purchase_price': doc.data().purchase_price,
                  'quantity': doc.data().quantity,
                  'supplier': doc.data().supplier
              }
              this.intakes.push(data)
          })
      })
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
          this.picsUrl = doc.data().picsUrl
          this.picsReference = doc.data().picsReference
          this.picsLength = doc.data().picsLength
          this.picsMaxRef = doc.data().picsMaxRef
          this.thumbUrl = doc.data().thumbUrl
          this.tags = doc.data().tags
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
      var docRef = db.collection("products").doc(this.$route.params.product_id);
      // db.collection('products').where('barcode', '==', this.$route.params.product_id).get()
      console.log("here to update")
      if (this.article_number == undefined) {
          this.article_number = ''
      }
      if (this.size == undefined) {
          this.size = ''
      }
      if (this.category == undefined) {
          this.category = ''
      }
      if (this.description == undefined) {
          this.description = ''
      }
      if (this.colour == undefined) {
          this.colour = ''
      }
      if (this.thumbUrl == undefined) {
          this.thumbUrl = ''
      }
      if (this.name_ger == undefined) {
          this.name_ger = ''
      }
      if (this.picsUrl == undefined) {
        this.picsUrl = []
        this.picsReference = []
        this.picsMaxRef = -1
        this.picsLength = 0
      }
      if (this.tags == undefined) {
          this.tags = []
      }
      docRef.update({
        article_number: this.article_number,
        barcode: this.barcode,
        category: this.category,
        colour: this.colour,
        description: this.description,
        name: this.name,
        name_ger: this.name_ger,
        price: this.price,
        size: this.size,
        picsUrl: this.picsUrl,
        picsReference: this.picsReference,
        picsLength: this.picsLength,
        picsMaxRef: this.picsMaxRef,
        thumbUrl: this.thumbUrl,
        tags: this.tags
      })
      .then(() => {
        console.log("it worked")
        this.$router.push({name: 'edit-product', params: {product_id: this.product_id}}) 
      })
      .catch(error => {
          console.log(err)
      })
    },
    deletePicture(i) {
        console.log("delete picture number: " + i)
        if (confirm('Are you sure?')) {
            this.picsUrl.splice(i, 1)
            var nameofref = this.picsReference.splice(i, 1)
            this.picsLength = this.picsLength - 1
            var reference = nameofref[0]
            var storage = firebaseApp.storage();
            var storageRef = storage.ref();
            var desertRef = storageRef.child('images/' + reference)
            // Delete the file
            desertRef.delete().then(function() {
              // File deleted successfully
              console.log("delete successful")
            }).catch(function(error) {
              // Uh-oh, an error occurred!
            })
        }
    },  
    downloadPicture(i) {
      console.log("download: " + this.picsUrl[i])
      var downloadString = this.picsReference[i] + 'jpg'
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var returnedBlob = new Blob([xhr.response], {type: 'image/jpeg'});
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(returnedBlob)
        link.download = downloadString
        link.click()
      };
      xhr.open('GET', this.picsUrl[i]);
      xhr.send();    
    },
    deleteProduct() {
      if (confirm('Are you sure?')) {
        var db = firebaseApp.firestore();
        var docRef = db.collection("products").doc(this.$route.params.product_id);
        docRef.delete()
        this.$router.push('/')
      } 
    },
    showIntakeModal() {
      this.newin_quantity = null
      this.newin_purchase_price = null
      this.newin_supplier = null
      this.$refs.modal1.show()  
    },
    saveIntake() {
      var db = firebaseApp.firestore();
      db.collection('intakes').add({
        product_id: this.$route.params.product_id,
        purchase_price: this.newin_purchase_price,
        quantity: this.newin_quantity,
        supplier: this.newin_supplier
      })
      .then(docRef => {
        //this.$router.push('/')
        var data = {
          'id': docRef.id,
          'purchase_price': this.newin_purchase_price,
          'quantity': this.newin_quantity,
          'supplier': this.newin_supplier
        }
        console.log(data)
        this.intakes.push(data)
      })
      .catch(error => {
          console.log(err)
      })
    },
    fileSelected(event) {
        this.file = event.target.files[0]
        console.log(event.target.files)
        this.uploadFile()
       // this.file.forEach(pic => { this.uploadFile (pic) })
       // console.log(this.file)
    },
    thumbFileSelected(event) {
        this.thumbFile = event.target.files[0]
        this.uploadThumbFile()
      //  console.log(this.thumbFile)
    },
    uploadFile() {
      var curFile = this.file
      var curProductID = this.$route.params.product_id
      var curReference = 1
      if ((this.picsMaxRef == undefined) || this.picsMaxRef == null) {
          console.log("nothing was there before")
          var curReference = 1
          this.picsUrl = []
          this.picsReference = []
          this.picsLength = 0
      } else {
          var curReference = this.picsMaxRef + 1
      }
      var vm = this
      if (curFile != null) {
        console.log("start importing")
        var storageRef = firebaseApp.storage().ref();
        var storageSpace = "images/" + curProductID + "_" + curReference
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
            vm.picsUrl.push(downloadURL);
            vm.picsReference.push(curProductID + "_" + curReference);
            vm.picsLength = vm.picsLength + 1;
            vm.picsMaxRef = curReference;
            vm.file = null;
            vm.updateProduct();
          })
          // hier sollte das images ebenfalls in die Datenbank geschrieben werden
        })
      }
    },
    uploadThumbFile() {
        // get blob which we want to upload
        var runthrough = this.getResizedBlob()
    },
    uploadBlob(curBlob, mime) {
      var curProductID = this.$route.params.product_id
      var vm = this
      console.log("twenty")
      var storageRef = firebaseApp.storage().ref();
      var storageSpace = "images/" + curProductID + "_thumb"
      var imageRef = storageRef.child(storageSpace)
      console.log("twentyone")
      var uploadTask = imageRef.put(curBlob, { contentType: mime })
      console.log("twentytwo")
      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        // Handle unsuccessful uploads
        console.log(error)
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          vm.thumbUrl = downloadURL;
          vm.thumbFile = null;
        })
        // hier sollte das images ebenfalls in die Datenbank geschrieben werden
      })
    },
    getResizedBlob: function() {
      // Read in file
      var outputQuality = 1
      var file = this.thumbFile
      var curBlob = null
      var vm = this
      // Load the image
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (readerEvent) {
        var image = new Image()
        image.onload = function (imageEvent) {
          // Resize the image
          var newx = 0
          var newy = 0
          var canvas = document.createElement('canvas'),
            max_size = 250,// TODO : pull max size from a site config
            width = image.width,
            height = image.height
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width
              newy = (max_size - height) / 2
              width = max_size
            }
          } else {
            if (height > max_size) {
                width *= max_size / height
                newx = (max_size - width) / 2
                height = max_size
            }
          }
          canvas.width = max_size;
          canvas.height = max_size;
          canvas.getContext('2d').drawImage(image, newx, newy, width, height);
          canvas.toBlob((blob) => {
            console.log("twelve" + blob); //output image as a blob
            curBlob = blob;
            //const file = new File([blob], this.thumbFile, {
            //    type: 'image/jpeg',
            //    lastModified: Date.now()
            // }); //output image as a file
            vm.uploadBlob(blob, 'image/jpeg')
          }, 'image/jpeg', outputQuality);
        }
        image.src = readerEvent.target.result;
      }
      console.log("thirdteen: ")
      return "done"
    }
  }
}
</script>
