Vue.component('comp-exercise-point-input', {
    data: function() {
        return {
            point_expand: false,
            exercise_points: ""

        }
    },
    props: ['allexercises', 'exercise'],
    methods: {
        expand_points: function () {
            if (this.point_expand===false) {
                this.point_expand=true
            } else {
                this.point_expand=false
            }
        },
    
        add_to_comp: function (item) {
            axios ({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/compworkouts/',
                headers : {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    "exercise": item.id,
                    "exercise_points": this.exercise_points,
                    "competition": this.$root.current_competition.id
                }
            }).then(response => {
                let path = window.location.pathname.split('/')
                this.$root.comp_detail_load(path[path.length-2])
                this.$root.show_allExercises = false
            })
        }

    },
    template: `
    <div>       
            <input type="number" v-model="exercise_points" placeholder="Points"/>   
            <button @click="add_to_comp(exercise)" >Add to Comp</button>
    </div>

    `
})

Vue.component('template-editor', {
    data: function () {
        return {
            template_edit_name: "",
            comp_search_text: "",
            template_edit: false,
            template_add: false,
            show_comp_show: false,
            comp_search_results: "",
            

        }
    },
    props: ['temp', 'allexercises'],
    methods: {
        edit_template: function (item) {
            if (this.template_edit === false) {
                (this.template_edit = true)
                this.template_edit_name=item.name
            } else {
                this.template_edit = false
                this.template_add = false
                this.comp_search_results = ""
            }
            
            
            
        },
        save_edit: function (item) {
            console.log(item.id)
            axios({
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/templates/'+item.id+'/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    "name": this.template_edit_name
                }
            }).then(response => {
                this.$root.loadCurrentUser()
                this.template_edit_name=""
                this.template_edit=false
            })
            
        },
        add_to_temp_comp: function (item) {
           if (this.template_add===false) {
               this.template_add=true
           } else {
               this.template_add=false
               this.comp_search_results=""
           }
        },
        comp_search: function () {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/exercises/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                params: {
                    "search": this.comp_search_text
                }
            }).then(response => {
                this.comp_search_results= response.data
                this.comp_search_text = ""
            })
        },
        add_comp_item: function (item, temp) {
            let comp_new_temp_list = []
            console.log(item.id)
            console.log(temp)
            for (i in temp.temp_details) {
                comp_new_temp_list.push(temp.temp_details[i].id)
            }
            comp_new_temp_list.push(item.id)

            axios ({
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/templates/'+temp.id+'/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    "exercises": comp_new_temp_list
                }
            }).then(response => {
                this.$root.loadCurrentUser()
                this.template_add=false
            })
        },
        delete_template: function (item) {
            console.log(item.id)
            axios ({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/v1/templates/'+item.id,
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
            }).then(response => {
                this.$root.loadCurrentUser()
                this.template_edit=false
            })
        },
        
        

        

    },
    template: `
    <div>
        <button class="green_btn" @click="edit_template(temp)">Edit</button>
        
        <div v-if="template_edit===true">  
            <br> 
            <input type="text" @keydown.enter="save_edit(temp)" v-model="template_edit_name" placeholder="template name"/>
            <button class="green_btn" @click="save_edit(temp)">Save</button>
        </div>
        

        <h2>{{temp.name}}  <a class="black_btn3" v-if="template_edit===true" @click="delete_template(temp)"><i class="fas fa-times"></i></a></h2>
        <div v-for="workout in temp.temp_details">
            <h4><button class="black_btn3" v-if="template_edit===true" @click="$root.remove_from_saved_template(temp, workout)">{{workout.name}} <i class="fas fa-times"></i></button></h4>                                
        </div>
        <button class="green_btn" v-if="template_edit===true" @click="add_to_temp_comp(temp)">Add</button>
        
        <div v-if="template_add===true">
            <input type="text" @keydown.enter="comp_search()" v-model="comp_search_text" placeholder="Search"/>
            <button class="green_btn" @click="comp_search()">Seach</button>
        </div>

        <div v-if="template_add===true">
        <br>
            <div v-for="item in comp_search_results">
               <p><button class="green_btn" @click="add_comp_item(item, temp)">Add</button> {{item.name}}</p> 
            </div>
        </div>        
    </div>
    `
})

Vue.component('save-template', {
    data: function () {
        return{
            save_template_show: false,
            template_name: ""
        }
    },
    props: ['session'],
    methods: {
        comp_template_save_toggle: function () {
            if (this.save_template_show === true) {
                this.save_template_show = false
            } else {
                this.save_template_show = true
            }
        },
        save_template: function(item) {
            ex_list = []
            for (x in item.exercise_instance_detail)
            ex_list.push(item.exercise_instance_detail[x].exercise)
            console.log(ex_list)

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/templates/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    "user": [this.$root.currentUser.id],
                    "name": this.template_name,
                    "exercises": ex_list,
                },
            }).then(response => {
                
                console.log("before")
                location.href ="http://127.0.0.1:8000/"
                console.log("after")
                this.$root.loadCurrentUser()
                this.$root.show_my_temps=true
            })
        }     
    },
    template: `
        <div>
        <button class="green_btn" @click="comp_template_save_toggle()">CreateTemplate</button>

            <div v-if="save_template_show===true">
                <input type="text" v-model="template_name" placeholder="Template Name"/>
                <button class="green_btn" @click="save_template(session)">Save Template</button>
            </div>
        </div>
    `
})

Vue.component('set-counter', {
    data: function () {
        return{
            
             
            reps: "",
            weight: "",
        }
    },
    props: ['workout', 'inst'],
    methods: {
        new_set: function (item) {
            count = item.set_detail.length + 1
            
            

            axios ({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/setinstances/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    "set": count,
                    "reps": this.reps,
                    "weight": this.weight,
                    "exerciseinstance": [item.id]
                },
            }).then(response => {
                this.$root.loadCurrentUser()
                this.$root.load_competitions()

                let path = window.location.pathname.split('/')
                this.$root.comp_detail_load(path[path.length-2])
                this.reps = ""
                this.weight = ""
            }).catch(function (error) {
                if (error.response) {
                    alert("Cannot enter blank set")
                }
            })
        },
        
        
    },
    template: `
    <div>
        <input type="number" v-model="reps" placeholder="Reps"/>
        <input @keydown.enter="new_set(workout)" v-model="weight" type="number" placeholder="Weight"/>
        
        <a id="set_btns" @click="new_set(workout)"><i class="fas fa-plus"></i></a>
        
    
    </div>   
    `

})

Vue.component('session', {
    data: function () {
        return{
            session_length: this.$root.currentUser.session_details.length
             

        }
    },
    methods: {
        delete_exercise_instance: function (item) {
            console.log(item.id)

            axios({
                method: "delete",
                url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/'+item.id,
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
            }).then(response => {
                this.$root.loadCurrentUser()
            })
        },
        delete_set_instance: function (item) {
            console.log(item.id)

            axios({ 
                method: "delete",
                url: "http://127.0.0.1:8000/api/v1/setinstances/"+item.id,
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
            }).then(response => {
                this.$root.loadCurrentUser()
            })
        }
        
        
    },
    props: ['currentuser', 'reversed_sessions', 'inst'],
    template: `
    <div id="session">    
        <h3 v-html=$root.date_format($root.reversed_sessions[0].date)></h3>
        
        <div v-if="$root.comp_session===false">
            <button class="black_btn" v-if="$root.resume===false" @click="$root.cancel_workout()">Cancel</button>
        </div>
        <button class="black_btn" v-if="$root.resume===true" @click="$root.cancel_resume()">Cancel</button>
        <button class="green_btn" v-if="$root.comp_session===false" @click="$root.finish_session()">Finish Workout</button>
        
        
        <div v-for="workout in this.$root.reversed_sessions[0].exercise_instance_detail">
        
            <h3>{{workout.exercise_detail.name}} <a class="black_btn2" @click="delete_exercise_instance(workout)"><i class="fas fa-times"></i></a></h3>
            
            <div v-for="set in workout.set_detail">
                <p>Set {{set.set}}: {{set.reps}} reps @ {{set.weight}} lbs.
                <a id="set_btns" v-if="set.set === workout.set_detail.length" @click="delete_set_instance(set)"><i class="fas fa-times"></i></a></p>
               
            </div>

            
            <set-counter :workout="workout"></set-counter>
    
    
        </div>
        
    </div>
    `
})



Vue.component('category', {
    data: function () {
        return {
            show_exercises: false
        }
    },
    props: ['category', 'allcategories'],
    methods: {
        detail_toggle: function () {
            if (this.show_exercises===true) {
                this.show_exercises = false
            } else {
                this.show_exercises = true
            }
        },
        
    },
    template: `
           
            
        <div>
        <a class="green_btn" @click="detail_toggle()"><i class="fas fa-chevron-right"></i> {{category.category}}</a>
        
        <template>                    
            <div class="test" v-for="exercise in category['exercise_detail']">
                
                <category-exercise v-if="show_exercises===true" :exercise=exercise></category-exercise>
                
                
            </div> 
                                
        </template>
        </div>
           
    `
})



Vue.component('category-exercise', {
    data: function() {
        return {
        detail: false ,
        
        }

    },
    props: ['exercise'],
        
    methods: {
        detail_toggle: function () {
            if (this.detail===true) {
                this.detail = false
            } else {
                this.detail = true
            }
        },
        add: function (item) {
            session = this.$root.reversed_sessions[0].id
           

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    
                    "exercise": item.id,
                    "session": session,
                }
            }).then(response => {
                this.$root.loadCurrentUser()
                this.$root.show_allCategories=false
                this.$root.show_allExercises=false
                this.$root.show_results=false
            })
            
        },
        add_to_temp: function (item) {
            this.$root.template_exercise_list.push(item)
            this.$root.show_allExercises=false
            this.$root.show_allCategories=false
            this.$root.show_results=false
        },

    },
    created: function () { 
        detail = false
    },
    template: `
    <div class="category_items">
        <div v-if="$root.template_start===false">            
            <a class="green_btn" @click="add(exercise)">        
            <i class="fas fa-plus"></i>{{exercise.name}}</a> 
            
        </div>
        <div v-else-if="$root.template_start===true">
            <a class="green_btn" @click="add_to_temp(exercise)">        
            <i class="fas fa-plus"></i>{{exercise.name}}</a>
            
        </div>          
            <div v-else-if="detail===true">
                <p>{{exercise.description}}</p>
            </div>
        </div>
        
        
    </div>
    `
    

})

Vue.component('category-item', {
    data: function() {
        return{
        category_detail_show: false
        }
    },
    props: ['allcategories', 'category_detail'],
    methods: {
        category_detail_toggle: function() {
            if (this.category_detail_show === false) {
                this.category_detail_show = true
            } else {
                this.category_detail_show = false
            }
            
        }
        

    },
    template: `
    
    <div>
        <a @click="$root.show_allCategories=false"><i class="fas fa-times"></i></a>
        <br>
        <br>
        <div>
            <div v-for="category in allcategories">            
                <category :category=category></category>                
            </div>
        </div>
    </div>
    
   
    `
})

Vue.component('exercise-item', {
    data: function() {
        return{
            exercise_points: ""

        }
    },
    props: ['allexercises'],
    methods: {
        add: function (item) {
            session = this.$root.reversed_sessions[0].id
            
            
        

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    
                    "exercise": item.id,
                    "session": session,
                }
            }).then(response => {
                this.$root.loadCurrentUser()
                this.$root.show_allCategories=false
                this.$root.show_allExercises=false
                this.$root.show_results=false
            })
            
        },
        add_to_temp: function (item) {
            this.$root.template_exercise_list.push(item)
            this.$root.show_allExercises=false
            this.$root.show_allCategories=false
            this.$root.show_results=false
        },
        
    },
    template: `
    
    <div>
        <a @click="$root.show_allExercises=false"><i class="fas fa-times"></i></a>
        <div> 
        <br>       
            <div v-for="exercise in allexercises">
                <div v-if="$root.template_start===false">
                    <a class="green_btn" v-if="$root.competition_builder===false" @click="add(exercise)"><i class="fas fa-plus"></i> {{exercise.name}}</a>
                    <div v-if="$root.competition_builder===true">
                        <p>{{exercise.name}}</p>
                        <comp-exercise-point-input :exercise="exercise" ></comp-exercise-point-input>
                    </div>
                </div>
                <div v-if="$root.template_start===true">
                    <a class="green_btn" @click="add_to_temp(exercise)"><i class="fas fa-plus"></i>{{exercise.name}}</a>
                    
                </div>
                <br>
            </div>
        </div>
    </div>`
})


let app = new Vue ({
    el: "#app",
    delimiters: [ '[[' , ']]' ],
    data: {
        message: "lift trackr",
        current_session_id: "",
        session_name: "",
        currentUser: "",
        search_text: "",
        new_template_name: "",
        user_results: "",
        search_results: [],
        allExercises: [],
        allCategories: [],
        categoryExercises: [],
        allCompetitions: [],
        show_allExercises: false,
        show_allCategories: false,
        expand_categories: false,
        show_results: false,
        current_session: false,
        show_my_temps: false,
        template_start: false,
        template_edit: false,
        build_template: false,
        edit_temp: false,
        comp_session: false,
        competition_builder: false,
        currentWorkout: "",
        csrf_token: "",
        create_session: false, 
        template_exercise_list: [],
        current_user_point_adjust: 0,     
        current_competition: "", 
        start_date: "",
        stop_date: "",
        resume: false,
        exercise_score: "",
        start_date: "",
        end_date: "",
        countdown_time: "",
        
    },
    methods: {
        all_exercises: function() {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/exercises',
                params: {
                    limit: 20
                }
            }).then(response => {
                this.allExercises = response.data                
            })
        },
        all_categories: function() {               
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/categories',
            }).then(response => {
                this.allCategories = response.data                
            })
        },
        toggle_categories_expand: function () {
            if (this.expand_categories === true) {
                this.expand_categories = false
            } else { this.expand_categories = true}
        },
        loadCurrentUser: function() {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/currentuser/',
            }).then(response => {
                this.currentUser = response.data                
            })
        },
        newSession: function() {   
            axios({ 
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/sessions/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "user": [this.currentUser.id],
                },
            }).then(response => {
                this.loadCurrentUser()
                this.current_session_id = this.reversed_sessions.id
                this.show_my_temps=false
                this.template_start=false                
            })            
        },
        getSession: function () {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/sessions/' + this.current_session_id,
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                this.currentWorkout = response.data
            })
        },
        toggle_exercises: function () {
            this.show_allCategories = false
            if (this.show_allExercises===true) {
                this.show_allExercises = false
            } else {
                this.show_allExercises = true
                this.show_results=false
                this.show_my_temps=false
            }
        },
        toggle_categories: function () {
            this.show_allExercises = false
            if (this.show_allCategories===true) {
                this.show_allCategories = false
            } else {
                this.show_allCategories = true
                this.show_results=false
                this.show_my_temps=false
            }
        },
        toggle_current_session: function () {
            if (this.current_session===true) {
                this.current_session = false
            } else {
                this.current_session = true
            }
        },
        finish_session: function () {
            
            this.current_session=false
            this.resume=false
            this.create_session=false
            this.show_allCategories=false
            this.show_allExercises=false
            this.session_name=""
            
        },
        cancel_workout: function () {
            x = this.reversed_sessions[0].id            
            axios ({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/v1/sessions/'+ x,
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                this.loadCurrentUser()
                this.load_competitions()
                this.current_session = false
                this.session_name=""
                this.create_session = false
                this.show_my_temps = false
                this.comp_session = false

                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
            })
        },
        delete_workout: function (item) {            
            axios ({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/v1/sessions/'+item.id,
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                this.loadCurrentUser()

                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
            })
        },
        search_exercise: function () {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/exercises',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                params: {
                    search: this.search_text,
                }
            }).then (response => {
                this.search_results = response.data
                this.show_results = true
                this.show_my_temps = false
                this.search_text=""
                this.show_allCategories = false
                this.show_allExercises=false
            })
        },
        add_result: function (item) {
            session = this.reversed_sessions[0].id
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "exercise": item.id,
                    "session": session
                },
            }).then(response => {
                this.loadCurrentUser()
                this.show_results=false
                this.search_text = ""
            })
        },
        close_search: function () {
            this.show_results=false        
            this.search_text=""
        },        
        toggle_temps: function () {
            if (this.show_my_temps === true) {
                this.show_my_temps =false                

            } else {
                this.show_my_temps = true
                this.show_allExercises=false
                this.show_allCategories=false   
                this.template_start=false    
                this.show_results=false           
            }
        },
        toggle_new_workout: function () {
            if (this.current_session===false) {
                this.current_session=true
                this.newSession()
            } else {
                this.current_session=false
                this.cancel_workout()
            }
        },
        exercises_from_temp: function (item) {
            for (x in item.temp_details) {
                axios ({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/',
                    headers: {
                        'X-CSRFToken': this.csrf_token
                    },
                    data: {
                        "exercise": item.temp_details[x].id,
                        "session": this.reversed_sessions[0].id
                    }
                }).then(response => {
                    this.loadCurrentUser()
                    this.show_my_temps=false
                    this.current_session=true
                })                
            }
        },
        name_session: function() {
            this.create_session = true
            this.show_my_temps = false
        },
        add_to_temp: function (item) {
            console.log(item)
            this.template_exercise_list.push(item)
            this.show_results=false
        },
        start_template: function () {
            if (this.template_start===true) {
                this.template_start=false
                this.template_exercise_list=[]
            } else {this.template_start=true}
            this.show_my_temps=false
        },
        remove_from_template: function (item) {
            let x = this.template_exercise_list.indexOf(item)
            this.template_exercise_list.splice(x, 1)            
        },
        save_template: function () {
            let exercise_id_list = []
            for (i in this.template_exercise_list) {
               exercise_id_list.push(this.template_exercise_list[i].id)
            }            
            axios ({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/templates/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "user": [this.currentUser.id],
                    "name": this.new_template_name,
                    "exercises": exercise_id_list
                }
            }).then(response => {
                this.loadCurrentUser()
                this.template_exercise_list=[]
                this.template_start=false
                this.new_template_name=""
                this.show_my_temps=true
            }).catch(function (error) {
                if (error.response) {
                    alert("Please enter a template name and one or more exercises before saving")
                }
            })            
        },
        
        resume_workout: function () {
            let i = this.currentUser.session_details.length-1
            console.log(i)
            let sesh = this.currentUser.session_details[i].id
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/sessions/'+ sesh,
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                this.loadCurrentUser()
                this.current_session=true
                this.resume=true
            })
            
        },
        cancel_resume: function () {
            this.current_session=false
            this.resume=false
        },
        remove_from_saved_template: function (array, item) {
            let temp_id = array.id
            let new_temp_list = []
            console.log(temp_id)
            console.log(array.temp_details)
            console.log(item.id)

            for ( i in array.temp_details) {
                console.log(array.temp_details[i].id)
                if (array.temp_details[i].id != item.id) {
                    new_temp_list.push(array.temp_details[i].id)
                }
            }
            console.log(new_temp_list)   

            axios ({
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/templates/'+temp_id+'/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "exercises": new_temp_list
                }
            }).then(response => {
                this.loadCurrentUser()
            }).catch(function (error) {
                if (error.response) {
                    alert("Template cannot have 0 items")
                }
            })
        },
        search_users: function () {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/users/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                params: {
                    "search": this.search_text
                }
            }).then(response => {
                this.user_results = response.data
                console.log(this.user_results)
            })
        },
        load_competitions: function () {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/competitions/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                this.allCompetitions = response.data
            })
        },
        score_reset: function () {
            console.log(this.currentUser.competition_points)
            this.currentUser.competition_points += 5
            console.log(this.currentUser.competition_points)

            axios ({
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/currentuser/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "competition_points": 0
                }
            }).then(response => {
                this.loadCurrentUser()
            })
        },        
        new_comp_session: function (item) {
            console.log(item)

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/sessions/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "competition": [item.id],
                    "user": [this.currentUser.id]
                }
            }).then(response => {
                this.loadCurrentUser()
                this.load_competitions()
                this.comp_session=true
                this.competition_builder=false

                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
            })

        },
        new_comp_exercise_instance: function (item) {
            console.log(item)
            console.log(this.reversed_sessions[0].id)

            axios ({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/exerciseinstances/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "exercise": item.exercise,
                    "session": this.reversed_sessions[0].id
                }
            }).then(response => {
                this.loadCurrentUser()
                this.load_competitions()
                this.comp_session = true

                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
            })    
        },
        comp_detail_load: function(item) {
            axios ({ 
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/competitions/'+item+'/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                
                this.current_competition = response.data
                this.countdown(this.current_competition.stop_date)
            })
        },
        new_competition_time: function() {
            this.competition_builder=true
        },
        start_competition: function() {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/competitions/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "title": this.session_name,
                    "creator": this.currentUser.id,
                    "participants": [this.currentUser.id],
                    "notes": this.search_text,
                    "sessions": [],
                    "start_date": this.start_date,
                    "stop_date": this.stop_date,
                }
            }).then(response => {                
                this.competition_builder=false
                this.search_text = ""
                this.load_competitions()

                
            })
        },
        edit_competition: function () {
            if (this.competition_builder===false) {
            this.competition_builder=true
            } else {
                this.competition_builder = false
            }

        },
        cancel_comp_edit () {
            this.competition_builder=false
        },
        delete_comp_exercise: function (item) {
            axios ({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/v1/compworkouts/'+item.id+'/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
            })
        },
        join_competition: function () {
            let new_participants = this.current_competition.participants
            new_participants.push(this.currentUser.id)
            axios ({
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/competitions/'+this.current_competition.id+'/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "participants": new_participants
                }
            }).then(response => {

                axios ({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/api/v1/usercompscores/',
                    headers : {
                        'X-CSRFToken': this.csrf_token
                    },
                    data: {
                        "user": this.currentUser.id,
                        "competition": this.current_competition.id,
                        "score": 0
                    }
                }).then(response => {
                    let path = window.location.pathname.split('/')
                    this.comp_detail_load(path[path.length-2])

                })
            })
                
        },
        participants_contains: function() {
            let current_participants = []
                for (i in this.current_competition.score_details) {
                    current_participants.push(this.current_competition.score_details[i].user)
                }

            if (this.current_competition) {
            return current_participants.includes(this.currentUser.id) }
         else {
            return false }
        
        },
        quit_competition: function () {
            let new_participants = []
            console.log(this.current_competition.participant_details)
            for (p in this.current_competition.participant_details) {
                if (this.currentUser.id != this.current_competition.participant_details[p].id)
                new_participants.push(this.current_competition.participant_details[p].id)
            }
            axios ({ 
                method: 'patch',
                url: 'http://127.0.0.1:8000/api/v1/competitions/'+this.current_competition.id+'/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "participants": new_participants
                }
            }).then(response => {
                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])            
            })

            for (score in this.current_competition.score_details) {
                if (this.current_competition.score_details[score].user===this.currentUser.id) {
                    score_id = this.current_competition.score_details[score].id
                    comp_id = this.current_competition.score_details[score].competition
                    user_score = this.current_competition.score_details[score].score
                    user = this.current_competition.score_details[score].user
                
                }
            
                axios ({ 
                    method: 'delete',
                    url: 'http://127.0.0.1:8000/api/v1/usercompscores/'+score_id+'/',
                    headers : {
                        'X-CSRFToken': this.csrf_token
                    },
                }).then(response => {
                    let path = window.location.pathname.split('/')
                    this.comp_detail_load(path[path.length-2])
                })
            }
        },
        comp_exercise_length: function () {
            if (this.current_competition) {
            return this.current_competition.comp_exercise_details.length
            } else {return false} 
        },
        creator_joins_comp: function () {
            axios ({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/v1/usercompscores/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "user": this.currentUser.id,
                    "competition": this.current_competition.id,
                    "score": 0
                }
            }).then(response => {
                let path = window.location.pathname.split('/')
                this.comp_detail_load(path[path.length-2])
                this.competition_builder=true

            })
        },
        score_upload: function(item) {
            let exercise_value = 0
            let total_reps = 0
            let total_score = 0

            let score_id = ""
            let comp_id = ""
            let user = ""
            let user_score = ""
            
            if (item.sessions.includes(this.reversed_sessions[0].id)) {

                for (score in this.current_competition.score_details) {
                    if (this.current_competition.score_details[score].user===this.currentUser.id) {
                        score_id = this.current_competition.score_details[score].id
                        comp_id = this.current_competition.score_details[score].competition
                        user_score = this.current_competition.score_details[score].score
                        user = this.current_competition.score_details[score].user
                    
                    }
                }

                for (i in this.reversed_sessions[0].exercise_instance_detail) {
                    console.log(this.reversed_sessions[0].exercise_instance_detail[i].exercise)
                    for (x in item.comp_exercise_details) {
                        if (this.reversed_sessions[0].exercise_instance_detail[i].exercise === item.comp_exercise_details[x].exercise) {
                            console.log(`${this.reversed_sessions[0].exercise_instance_detail[i].exercise} = ${item.comp_exercise_details[x].exercise}`)
                            console.log(`${this.reversed_sessions[0].exercise_instance_detail[i].exercise} = ${item.comp_exercise_details[x].exercise_points}`)
                            exercise_value = item.comp_exercise_details[x].exercise_points
                        
                    
                            for (set in this.reversed_sessions[0].exercise_instance_detail[i].set_detail) {
                                console.log(this.reversed_sessions[0].exercise_instance_detail[i].set_detail[set].reps)
                                total_reps += this.reversed_sessions[0].exercise_instance_detail[i].set_detail[set].reps
                            }
                            console.log(`${this.reversed_sessions[0].exercise_instance_detail[i].exercise} - ${total_reps}`)
                            total_score += exercise_value*total_reps
                            
                            total_reps = 0
                        }
                    }
                }
                console.log(total_score)

                let new_score = user_score + total_score

                axios({
                    method: 'patch',
                    url: 'http://127.0.0.1:8000/api/v1/usercompscores/'+score_id+'/',
                    headers : {
                        'X-CSRFToken': this.csrf_token
                    },
                    data: {
                        'score': new_score
                    }
                }).then(response => {
                    let path = window.location.pathname.split('/')
                    this.comp_detail_load(path[path.length-2]) 
                    this.comp_session=false
                })
            }
        },
        in_range: function (start_time, end_time) {
            
            now = new Date()
            start_time = new Date(start_time)
            end_time = new Date(end_time)

            if (now<end_time && now>start_time) {
                return now<end_time && now>start_time
            } else {return false}           
        },
        date_format: function (item) {

            let regex =/GMT.*/
            
            z = new Date(item).toString()
            z = z.replace(regex, '')
            // z = z.replace(' GMT-0800 (Pacific Standard Time)', '')

            // z = z.replace('\([^\(]*\)', ' ')
            // console.log(z)
            return z
            
        },
        delete_competition: function () {
            console.log(this.current_competition.id)
            axios ({
                method: 'delete',
                url: 'http://127.0.0.1:8000/api/v1/competitions/'+this.current_competition.id+'/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
            }).then(response => {
            
                location.href = 'http://127.0.0.1:8000/users/competitions/'

            })
        },
        search_competitions: function () {
            axios ({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/v1/competitions/',
                headers : {
                    'X-CSRFToken': this.csrf_token
                },
                params: {
                    "search": this.search_text
                }
            }).then(response => {
                this.search_results = response.data
                this.show_results=true
                this.search_text = ""
            })
        },
        countdown: function (item) {
            // "Jan 5, 2022 15:37:25"
            
            console.log(item)

            var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime()
            var countDownDate2 = new Date(item).getTime()

            console.log(typeof(countDownDate))
            console.log(countDownDate)

            console.log(typeof(countDownDate2))
            console.log(countDownDate2)

            var x = setInterval(() => {     
                console.log("beginning")       

                var now = new Date().getTime()

                var distance = countDownDate2 - now
                
                var days = Math.floor(distance / (1000 * 60 * 60 * 24))
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                var seconds = Math.floor((distance % (1000 * 60)) / 1000)            
                
                // document.getElementById("countdown").innerHTML=
                // v-html="countdown(current_competition.stop_date)"
                

                this.countdown_time = days+"d "+hours+"h "+minutes+"m "+seconds+"s "
                
                if (distance<0) {
                    
                    clearInterval(x)
                    this.countdown_time="This competition is over.."
                }
            }, 1000)
        },
        
        
            
        
       
    },
    
    computed: {
        reversed_sessions: function () {
            if (this.currentUser) {            
            x = this.currentUser.session_details.slice().reverse()
            return x} 
        },
        reversed_templates: function () {
            if (this.currentUser) {
                y = this.currentUser.workout_templates.slice().reverse()
                return y}
        },
        reversed_competitions: function () {
            if (this.allCompetitions)
                return this.allCompetitions.slice().reverse()
        },
        
        
       

    },
    
    created: function () {
        this.loadCurrentUser()
        this.getSession()
        this.all_categories()
        this.all_exercises()
        this.load_competitions()
        
        
    },
    mounted: function() {
        this.csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value
        
        let path = window.location.pathname.split('/')
        this.comp_detail_load(path[path.length-2])


        
        
        

        

        
    }
})