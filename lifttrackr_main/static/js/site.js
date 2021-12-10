


Vue.component('set-counter', {
    data: function () {
        return{
            
             
            reps: "",
            weight: "",
        }
    },
    props: ['workout'],
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
        <a @click="new_set(workout)"><i class="fas fa-plus"></i></a>
    
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
    props: ['currentuser', 'reversed_sessions'],
    template: `
    <div>
    <h3>Current Session: {{this.$root.reversed_sessions[0].name}}</h3>
    
    <p>Date: {{this.$root.reversed_sessions[0].date}}</p>

        <div v-for="workout in this.$root.reversed_sessions[0].exercise_instance_detail">
            <h3>{{workout.exercise_detail.name}} <a @click="delete_exercise_instance(workout)"><i class="fas fa-times"></i></a></h3>
            
            <div v-for="set in workout.set_detail">
                <p>Set {{set.set}}: {{set.reps}} reps @ {{set.weight}} lbs.
                <a v-if="set.set === workout.set_detail.length" @click="delete_set_instance(set)"><i class="fas fa-times"></i></a></p>
               
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
    props: ['category'],
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
        <a @click="detail_toggle()"><i class="fas fa-chevron-right"></i> {{category.category}}</a>
        
        <template>                    
                <div v-for="exercise in category['exercise_detail']">
                    
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
            console.log(this.set)
            console.log(item.name)
            console.log(item.id)
            console.log(this.$root.reversed_sessions.id)
        

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
        

    },
    created: function () { 
        detail = false
    },
    template: `
    <div>
        <div>
            
            <a @click="add(exercise)"><i class="fas fa-plus"></i>{{exercise.name}}</a>
            
            <div v-if="detail===true">
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

    },
    template: `
    
    <div>
        <a @click="$root.show_allExercises=false"><i class="fas fa-times"></i></a>
        <div>        
            <div v-for="exercise in allexercises">
                <a @click="add(exercise)"><i class="fas fa-plus"></i>{{exercise.name}}</a>
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
        search_results: [],
        allExercises: [],
        allCategories: [],
        categoryExercises: [],
        show_allExercises: false,
        show_allCategories: false,
        show_results: false,
        current_session: false,
        currentWorkout: "",
        csrf_token: "",
        create_session: false,        
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
                    "name": this.session_name,
                },
            }).then(response => {
                this.loadCurrentUser()
                this.current_session_id = this.reversed_sessions.id
                this.getSession()
                this.current_session=true
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
            }
        },
        toggle_categories: function () {
            this.show_allExercises = false
            if (this.show_allCategories===true) {
                this.show_allCategories = false
            } else {
                this.show_allCategories = true
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
                this.current_session = false
                this.session_name=""
                this.create_session = false
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
        }
        
        

        
        
        
    },
    computed: {
        reversed_sessions: function () {
            if (this.currentUser) {
            
            x = this.currentUser.session_details.slice().reverse()
            return x} 
        }
    },
    
    created: function () {
        this.loadCurrentUser()
        this.getSession()
        this.all_categories()
        this.all_exercises()
        
    },
    mounted: function() {
        

        this.csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})