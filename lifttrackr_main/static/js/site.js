
Vue.component('set-counter', {
    data: function () {
        return{
            
            count:0, 
            reps: "",
            weight: "",
        }
    },
    props: ['workout'],
    methods: {
        new_set: function () {
            this.count++
            console.log(this.count)
        },
        postSet: function () {
            console.log(this.count)
            console.log(this.reps)
            console.log(this.weight)

            
            
            
        }
    },
    template: `
    <div>
    <input type="number" v-model="reps" placeholder="Reps"/><input v-model="weight" type="number" placeholder="Weight"/>
    </div>   
    `

})

Vue.component('session', {
    data: function () {
        return{
             

        }
    },
    methods: {
        post: function(item) {
            console.log(item.id)
            console.log()
        }
        
    },
    props: ['currentuser'],
    template: `
    <div>
    <h3>Current Session</h3>
    <p>Session Name: {{currentuser.session_details[0].name}}</p>
    <p>Date: {{currentuser.session_details[0].date}}</p>
        <div v-for="workout in currentuser.session_details[0].exercise_instance_detail">
            <h3>{{workout.exercise_detail.name}}</h3> 
            
            <div v-for="set in workout.set_detail">
                <p>Set {{set.set}}: {{set.reps}} reps @ {{set.weight}} lbs.</p>
            </div>
            <p><set-counter></set-counter><button @click="post(workout)">Here</button><button @click="">Button</button></p>
    
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

            <p>{{category.category}}{{category.id}}</p><button @click="detail_toggle()">Click</button>
            
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
            
            console.log(this.set)
            console.log(item.name)
            console.log(item.id)
            console.log(this.$root.reversed_sessions.id)
        

            axios({
                method: 'post',
                url: 'api/v1/exerciseinstances/',
                headers: {
                    'X-CSRFToken': this.$root.csrf_token
                },
                data: {
                    
                    "exercise": item.id,
                    "session": this.$root.reversed_sessions.id,
                }
            }).then(response => {
                this.$root.loadCurrentUser()
            })
            
        },
        

    },
    created: function () { 
        detail = false
    },
    template: `
    <div>
        <div>
            <p>{{exercise.name}}</p><button @click="detail_toggle()">click</button>
            <button @click="add(exercise)">Add</button>
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
            console.log("here")
        }
        

    },
    template: `
    
    <div>
        <div v-for="category in allcategories">
        
            <category :category=category></category>
            
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

    },
    template: `
    <div>
        <div v-for="exercise in allexercises">
            <p>{{exercise.name}}</p>
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
        allExercises: [],
        allCategories: [],
        categoryExercises: [],
        currentWorkout: [],
        csrf_token: "",
        
    },
    methods: {
        all_exercises: function() {
            category_div.style.display = "none"

            axios ({
                method: 'get',
                url: '/api/v1/exercises',
                params: {
                    limit: 20
                }
            }).then(response => {
                this.allExercises = response.data

                if (ex_list_div.style.display === "none"){
                    ex_list_div.style.display = "block"
                } else { ex_list_div.style.display = "none"}
            })
        },
        all_categories: function() {
            ex_list_div.style.display = "none"
            
            axios ({
                method: 'get',
                url: '/api/v1/categories',
            }).then(response => {
                this.allCategories = response.data

                if (category_div.style.display === "none"){
                category_div.style.display = "block"
                
                } else { category_div.style.display = "none"}
                console.log(this.allCategories)
                
            })

        },
        loadCurrentUser: function() {
            axios({
                method: 'get',
                url: 'api/v1/currentuser/',
            }).then(response => {
                this.currentUser = response.data
                
                
            })
        },
        newSession: function() {   
            axios({ 
                method: 'post',
                url: '/api/v1/sessions/',
                headers: {
                    'X-CSRFToken': this.csrf_token
                },
                data: {
                    "user": [this.currentUser.id],
                    "name": this.session_name,
                },
            }).then(response => {
                this.loadCurrentUser()
                
            })
                
            
        },
        
        

        
        
        
    },
    computed: {
        reversed_sessions: function () {
            if (this.currentUser) {
            
            x = this.currentUser.session_details.reverse()
            return x[0]} 
        }
    },
    
    created: function () {
        this.loadCurrentUser()
        
    },
    mounted: function() {
        category_div = document.getElementById("category_div")
        category_div.style.display = "none"

        ex_list_div = document.getElementById("ex_list_div")
        ex_list_div.style.display = "none"

        this.csrf_token = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})