// Create route components
const Home = {
    data() { 
        return {
            userData: {},
            usersID: 0,
            name: "",
            email: "",
            password: "",
            max_length: 25,
            max_pass_length: 16,
            error: "",
            registered: false,
            newdep:[],
            departureTables:'',
            wantAddRoute:false,
            wannaLog:false,
            newRouteCount:1,
            newRoute:[],
            currentRoute:0,
            departures:[
                [["place 1","place 2","place 3","place 4"],["10:00","10:20","10:40","11:00"]]
            ],
            }
        },
        methods:{
            registerAccount(){
      
                if (this.name.length > 0 && this.name.length <= this.max_length && this.email !== "" && this.password == "admin" ) {
                    
                      this.userData.id = ++this.usersID,
                      this.userData.name = this.name,
                      this.userData.email = this.email,
                      this.userData.password = this.password
                      this.registered=true;
                     /* Add registration data to the local storage */
              localStorage.setItem('simple_tweet_registered', true)
              /* Add the whole userData object as JSON string */
              localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))
              
              /* Clear the registration inputs */
              this.name = "";
              this.email = "";
              this.password = "";
                    
                   router.push({path:'/registered'})
                } else {
                    this.error = "Complete all the form fields"
                }
              
             
          },
          routeToLineUpdate(route){
            line="";
            //console.log(route+"l")
            for(place in route){
                line+="/"+route[place]
            }
            return(line)
        },
        wannaReg(){
            if(this.wannaLog==false)
            this.wannaLog=true
            else
            this.wannaLog=false
        },
        changeCurrentRoute(route){
            console.log(this.currentRoute)
        },
        },
        created(){
            console.log("fdsfd")
            console.log(localStorage.getItem('departures'))
            if(JSON.parse(localStorage.getItem('departures')))
                this.departures=JSON.parse(localStorage.getItem('departures'))
        },
    template: 
    `     
       <div class="register" v-if="!registered">
    <button @click="wannaReg" type="submit">Login</button>
    
    <div v-if="wannaLog">
    
    <h2>Login as administrator</h2>
    <form id="register" v-on:submit.prevent="registerAccount">
        <div class="form_group">
            <label for="name">Name
                <span> {{ name.length + '/' + max_length }}</span>
            </label>
            <input type="text" v-model="name" :maxlength="max_length" required>
        </div>
        <div class="form_group">
            <label for="email">Email
                <span> {{ email.length + '/' + max_length }}</span>
            </label>
            <input type="email" v-model="email" :maxlength="max_length" required>
        </div>
        <div class="form_group">
            <label for="password">Password
                <span> {{ password.length + '/' + max_pass_length }}</span>
            </label>
            <input type="password" v-model="password" :maxlength="max_pass_length" required>
        </div>
    </form>
    <button form="register" class="forma" type="submit">Register</button>
    </div>
    <br></br>
    <select class="routeSelector" v-model="currentRoute" v-if="departures.length!=0">
        <option v-for="(route,index) in departures"  @click="changeCurrentRoute(route[0])"   :value="index">{{routeToLineUpdate(route[0])}}</option>
    </select>
    <div class="tableM" v-for="(route,index) in departures" :ley="index">
        <div v-if="index == currentRoute && departures.length!=0">
        <table class="depTable">
            <div class="departurs" v-for="(depart,indes) in departures[currentRoute]" :key="indes">
                <tr class="depTableCell" v-if="indes==0"><th>#</th><th>{{routeToLineUpdate(depart)}}</th></tr>
                <tr  class="depTableCell" v-if="indes!=0"><th>{{indes}}</th><th>{{routeToLineUpdate(depart)}}</th></tr>
            </div>
        </table>
        </div>
    </div>
    <div v-if="error.length > 0"> {{error}}</div>
    <br></br>
    </div>`
,

}
const Projects = {
    template: 
    `<div class="depBox" v-else>
    <h3>Welcome {{ userData.name }}, here you can change routes in any way you want</h3>
    <button @click="wantAddRouteChange">Add route</button>
    <div id="addingRoute" v-if="wantAddRoute==true">
        <form id="adding" v-on:submit.prevent="addRoute">
                    <div v-for="(n,i) in newRouteCount">
                        <div class="form_group">
                            <label for="name">{{i+1}}
                                <span> {{ name.length + '/' + max_length }}</span>
                            </label>
                            <input type="text" v-model="newRoute[i]" :maxlength="max_length" required>
                        </div>
                    </div>
        </form>
        <button @click="addToRoute">Add</button>
        <button @click="removeFromRoute">Remove</button>
        <button @click="addRoute">Submit</button>
    </div>
    <select v-model="currentRoute" v-if="departures.length!=0">
        <option v-for="(route,index) in departures"  @click="changeCurrentRoute(route[0])"   :value="index">{{routeToLineUpdate(route[0])}}</option>
    </select>
    <form id="adding" v-on:submit.prevent="addDeparture" v-if="departures.length!=0">
        <div v-for="(blank,index) in departures[currentRoute][0]" :key="index">
            <div class="form_group">
                <label for="index">Place {{index}}
                    <span> {{ name.length + '/' + max_length }}</span>
                </label>
                <input type="time" v-model="newdep[index]" :maxlength="max_length" required>
            </div>
        </div>
    </form>
    <button form="adding" type="submit">Add</button>
    <div v-for="(route,index) in departures" :ley="index">
        <div v-if="index == currentRoute && departures.length!=0">
        <table class="depTable">
            <div class="departurs" v-for="(depart,indes) in departures[currentRoute]" :key="indes">
                <div v-if="indes==0"><tr><th>#/</th><th>{{routeToLineUpdate(depart)}}</th></tr></div>
                <div v-if="indes!=0"><tr v-if="indes!=0"><th>{{indes}}/</th><th>{{routeToLineUpdate(depart)}}</th></tr></div>
            </div>
        </table>
        </div>
    </div>
    <button @click="deleteRoute">
        Delete
    </button>
    <button @click="logout" type="submit">logout</button>
</div>`,
data() { 
    return {
        userData: {},
        usersID: 0,
        name: "",
        email: "",
        password: "",
        max_length: 25,
        max_pass_length: 16,
        error: "",
        registered: false,
        newdep:[],
        departureTables:'',
        wantAddRoute:false,
        newRouteCount:1,
        newRoute:[],
        currentRoute:0,
        departures:[
            [["place 1","place 2","place 3","place 4"],["10:00","10:20","10:40","11:00"]]
        ],
        }
    },
    methods: {
        registerAccount(){
      
            if (this.name.length > 0 && this.name.length <= this.max_length && this.email !== "" && this.password !== "" ) {
                
                  this.userData.id = ++this.usersID,
                  this.userData.name = this.name,
                  this.userData.email = this.email,
                  this.userData.password = this.password
                  this.registered=true;
              
                
               
            } else {
                this.error = "Complete all the form fields"
            }
          
          /* Add registration data to the local storage */
          localStorage.setItem('simple_tweet_registered', true)
          /* Add the whole userData object as JSON string */
          localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))
          
          /* Clear the registration inputs */
          this.name = "";
          this.email = "";
          this.password = "";
      },
      addDeparture(){
          console.log(this.newdep[0])
          if (this.newdep )
          {
              arr=[]
              for(part in this.newdep)
              {
                  console.log(this.newdep[part])
                  arr.push(this.newdep[part])
              }
              this.departures[this.currentRoute].push(arr)
              this.newdep=[]
          }
          console.log(this.departures)
      },
      wantAddRouteChange(){
          this.wantAddRoute=!this.wantAddRoute;
          console.log(this.wantAddRoute)
      },
      addToRoute(){
          this.newRouteCount++
      },
      removeFromRoute(){
          this.newRouteCount--;
          this.newRoute.pop()
      },
      addRoute(){
          this.departures.push([this.newRoute])
          console.log(this.departures)
          this.newRoute=[]
      },
      routeToLineUpdate(route){
          line="";
          //console.log(route+"l")
          console.log(route)
          for(place in route){
              line+="/"+route[place]
          }
          return(line)
      },
      changeCurrentRoute(route){
          console.log(this.currentRoute)
      },
      deleteRoute(){
          if(this.currentRoute<0)
          {this.currentRoute-=1
          this.departures.splice(this.currentRoute+1,1);
          }
          else
          this.departures.splice(this.currentRoute,1);
      },
      logout(){
          localStorage.removeItem("simple_tweet_registered")
          this.registered=false
          console.log(this.registered)
          localStorage.setItem("departures",JSON.stringify(this.departures))
          console.log(localStorage.getItem("departures"))
          console.log(JSON.parse(localStorage.getItem("departures")))
          router.push({path:'/'})
      }

      
  },
  created(){
      /* Check if the user is registered and set the registered to true */
      if(localStorage.getItem("simple_tweet_registered") === 'true'){
          this.registered = true;
      }
      // repopulate the userData object
      if(localStorage.getItem('simple_tweet_registered_user')) {
          this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
      console.log(this.departures)
      
      }
     
  }
}

// Define routes
const routes = [
    {path: '/', component: Home},
    {path: '/registered', component: Projects},
];


// create the router instance
const router = new VueRouter({
    routes
})

// create and mount the vue instance
const app = new Vue({
    router
}).$mount('#app');
