<style>
.widget-user-header{
    background-position: center center;
    background-size: cover;
    height: 280px !important;
}
</style>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image:url('./img/cover.png')">
                        <h3 class="widget-user-username">{{this.form.name}}</h3>
                        <h5 class="widget-user-desc">{{this.form.type | upText}}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                            <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                            <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                            </div>
                            <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-3">
                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                        <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                        <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                        <div class="tab-pane" id="activity">
                            <!-- Post -->
                            <div class="post">
                                <div class="user-block text-center">
                                    <h2>Display User Activity</h2>
                                </div>
                            <!-- /.user-block -->
                            </div>
                            <!-- /.post -->
                        </div>

                        <div class="tab-pane active show" id="settings">
                            <form class="form-horizontal">
                            <div class="form-group">
                                <label for="inputName" class="col-sm-2 control-label">Name</label>

                                <div class="col-sm-10">
                                <input type="text" v-model="form.name" name="name" class="form-control" id="inputName"
                                :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Name">
                                <has-error :form="form" field="name"></has-error>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                                <div class="col-sm-10">
                                <input type="email" v-model="form.email" name="email" class="form-control" id="inputEmail"
                                :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Email">
                                <has-error :form="form" field="email"></has-error>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                                <div class="col-sm-10">
                                <textarea class="form-control" v-model="form.bio" name="bio" id="inputExperience"
                                :class="{ 'is-invalid': form.errors.has('bio') }" placeholder="Experience"></textarea>
                                 <has-error :form="form" field="bio"></has-error>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPhoto" class="col-sm-2 control-label">Profile Photo</label>

                                <div class="col-sm-10">
                                <input type="file" @change="updateProfile" name="photo" class="form-control" id="inputPhoto">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="col-sm-10 control-label">
                                    Password(leave empty if not changing)</label>

                                <div class="col-sm-10">
                                <input type="password" v-model="form.password" name="password" class="form-control"
                                :class="{ 'is-invalid': form.errors.has('password') }" id="inputPassword" placeholder="Password">
                                <has-error :form="form" field="password"></has-error>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                <button @click.prevent="updateInfo" type="submit" class="btn btn-success">Update</button>
                                </div>
                            </div>
                            </form>
                        </div>
                        <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    id: '',
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : ''
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },

        methods:{
            getProfilePhoto(){
                // return "img/profile/"+ this.form.photo;
                // --------------
                // var photo = this.form.photo;
                // if ( photo.includes('data:image'))
                //     return this.form.photo;
                // else
                //     return ('img/profile/')+this.form.photo;
                // ---------------

                let photo = (this.form.photo.length > 200) ? this.form.photo : "img/profile/"+ this.form.photo ;
                return photo;

            },
            updateInfo(){
                this.$Progress.start();
                this.form.put('api/profile')
                    .then(() => {
                        Fire.$emit("AfterCreate");

                        Swal.fire({
                        type: "success",
                        title: 'Successfull',
                        text: 'Your data has been updated'
                        })
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        this.$Progress.fail();
                    })
            },
            updateProfile(e){
                // console.log('uploading');
                let file = e.target.files[0];
                console.log(file);
                let reader = new FileReader();

                if (file['size'] < 2111775) {
                    reader.onloadend = (file) => {
                    // console.log('RESULT', reader.result)
                    this.form.photo = reader.result;
                    }
                    reader.readAsDataURL(file);
                }else{
                    Swal.fire({
                    type: "error",
                    title: 'Oops....',
                    text: 'You are uploading a large file'
                    })
                }

                
            }
        },

        created() {
            axios.get("api/profile")
                .then(({ data }) => (
                    this.form.fill(data)
                ));
        }
    }
</script>

