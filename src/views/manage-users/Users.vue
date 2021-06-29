<template>
  <div>
    <Search @queryString="queryString"></Search>
    <v-container>
      <v-row>
        <v-col
          v-for="user in userList"
          :key="user._id"
          class="d--flex justify-space-around tile"
        >
          <v-card class="my-2" elevation="23" outlined shaped max-width="344">
            <v-card-title>
              <span> {{ user.usr_data.designation }}</span>
              <v-spacer></v-spacer>
              <span>{{ getFormattedDate(user.usr_data.dob, "DD/MM") }}</span>
            </v-card-title>
            <v-card-subtitle> {{ user.usr_data.name }}</v-card-subtitle>
            <v-card-subtitle>
              {{ getMainContentSubtitle(user) }}</v-card-subtitle
            >
            <v-card-text
              >Greyhound divisively hello coldly wonderfully marginally far upon
              excluding.
            </v-card-text>
           
            <v-card-actions>
              <v-btn color="orange lighten-3">Reset</v-btn>
              <v-btn color="purple lighten-4">Disabled</v-btn>
              <v-btn color="green lighten-5">Edit</v-btn>
               <div v-if="expandCard">
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
              </div>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-card-text>{{ user.usr_data.email }}</v-card-text>
              </div>
            </v-expand-transition>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>

   <Form 
   :name="name"
   :inputForm="inputForm"
   :type="type"
   :placeholder="placeholder"
   />
  </div>
</template>

<script>
// Used to fetch out the userType of the Login

// Helper mixins is used to fetch out the formatted Date and some other things related to date
// import helpers from "../../components/helpers";
import Search from "../../components/Search";
import Form from "../../components/Form";
import { mapActions, mapMutations } from "vuex";
import helperMixin from "../../mixin/helperMixins";
import searchMixin from "../../mixin/searchMixin";
export default {
  name: "Users",
  mixins: [helperMixin, searchMixin],
  data: () => ({
    filter: {},
    activeState: true,
    userList: [],
    show: false,
    expandCard:{ required:false, type:Boolean, default:false}
  }),
  created() {
    this.getData();
    // console.log(this.);
    // this.setSearchConfig();
  },
  computed: {},
  components: { Search,Form},
  methods: {
    ...mapActions("ManageUser", ["getUserList", "addUser"]),
    ...mapMutations(["openLoaderDialog", "closeLoaderDialog"]),

    getData() {
      this.openLoaderDialog();
      this.filter.type = this.type;
      this.filter.active = this.activeState;
      this.getUserList({
        filter: this.filter,
        active: this.activeState,
        type: this.type,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then((data) => {
        console.log(data);
        this.closeLoaderDialog();
        this.userList = data.list;

        this.totalCount = data.totalCount;
        this.fetchCount = data.fetchCount;
        // if (!data.ok) {
        // 	this.openSnackbar({ text: "Failed to Fetched User Data" });
        // }
        // this.userList = data.list;
      });
    },
    performBasicSearch() {
      clearTimeout(this.searchTimeoutRef);
      this.searchTimeoutRef = setTimeout(() => {
        this.$emit("searchBar", this.searchBar);
      });
    },
    // addData(){
    //   this.filter.type = this.type,
    //   this.filter.active = this.active,
    //   this.addUser({
    //     filter:this.filter,
    //     active:this.active,
    //     type:this.type,
    //     pageSize:this.pageSize,
    //     pageNo:this.pageNo,
    //   }).then(data => {
    //     console.log(data);
    //     this.userList = data.list;
    //   })
    // },
    getMainContentSubtitle(user) {
      if (user.type == this.SALES_AGENT) {
        return user.usr_data.countries.join(", ");
      } else if (user.type == this.REMOTE_SALES_AGENT) {
        return user.usr_data.zone;
      }
      return "";
    },

    // };
  },
  props: {
    name: { required: true, type: String },
    type: { required: true, type: String },
    placeholder: { required: true, type: String },
    activeCountriesList: { required: false, type: Array },
    inputForm: { required: true, type: Array },
  },
};
</script>

<style lang="scss" scopped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

#btmryt {
  position: absolute;
  right: 3%;
  bottom: 3%;
  border-radius: 20px;
  background-color: purple;
  // float:right;
}
// .usersComponentWrapper {
//   height: 100%;
// }
// .date-container {
//   display: flex;
//   justify-content: space-between;
// }
// .manageusers-search-bar {
//   padding-top: 12px;
// }
// .Information-Card{
//   display:flex;
//   flex-direction:row;
//   flex-wrap:wrap;
// }
</style>
