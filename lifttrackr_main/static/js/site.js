
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
        detail: false   
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
            console.log(item.name)
        }

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
        search_text: "",
        allExercises: [],
        allCategories: [],
        categoryExercises: [],
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
        
        

        
        
        
    },
    created: function () {
        
    },
    mounted: function() {
        category_div = document.getElementById("category_div")
        category_div.style.display = "none"

        ex_list_div = document.getElementById("ex_list_div")
        ex_list_div.style.display = "none"
    }
})