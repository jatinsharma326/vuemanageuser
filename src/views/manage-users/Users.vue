<template>
  <div>
    <Search @queryString="queryString"></Search>
    <!-- <h1 id="toptext">You are the one</h1> -->

    <div class="flexing">
      <Card v-for="user in userList" :key="user._id" :expandCard="true">
        <template v-slot:designation>
          <span> {{ user.usr_data.designation }}</span>
          <v-spacer></v-spacer>
          <span>{{ getFormattedDate(user.usr_data.dob, "DD/MM") }}</span>
        </template>
        <template v-slot:subTitle>
          {{ user.usr_data.name }}
        </template>
        <template v-slot:subTitletwo>
          {{ getMainContentSubtitle(user) }}
        </template>
        <template v-slot:mainContentSubtitle>
          Greyhound divisively hello coldly wonderfully marginally far upon
          excluding.
        </template>
        <template v-slot:actionButtons>
          <v-btn color="orange lighten-3">Reset</v-btn>
          <v-btn color="purple lighten-4">Disabled</v-btn>
          <v-btn color="green lighten-5 editbutton">Edit</v-btn>
        </template>
        <template v-slot:expandCardContent>
          <v-list>
            <v-list-item
              v-for="(number, index) in user.usr_data.phone_numbers"
              :key="user._id + '+' + index"
            >
              <v-list-item-icon>
                <v-icon v-if="index == 0" color="secondary">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary"> mdi-email </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ user.usr_data.email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary"> mdi-map-marker </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{
                  user.usr_data.address
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <div class="date-container">
                    <div class="doj">
                      DOJ: {{ getFormattedDate(user.usr_data.doj) }}
                    </div>
                    <div class="doe">
                      DOE:
                      {{
                        user.usr_data.doe
                          ? getFormattedDate(user.usr_data.doe)
                          : "--/--/----"
                      }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </Card>
    </div>

    <!-- First Make A simple Form from vuetify or html css
   2) Form validation
   3)API CALL addUser() post -->
    <!-- Field Name 
   Full Name* - textField
   Designation* - textField
   Email* - textField
   Address* -TextField
   Countries - Dropdowns
   Partners - Dropdowns 
   Contact Numbers - Number
   ALl three consist of calender
   DOB - date of birth calender
   Doj - date of joining
   DOE - date of ending -->

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn id="btmryt" color="danger" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">FillUp The Form</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                <form v-on:submit.prevent="formOutput">
                    <v-text-field
                      v-model="form.fullName"
                      :error-messages="nameErrors"
                      :counter="10"
                      label="Name"
                      required
                      @input="$v.form.fullName.$touch()"
                      @blur="$v.form.fullName.$touch()"
                    ></v-text-field>
              
                    <v-text-field
                      v-model="form.designation"
                      :error-messages="designationErrors"
                      label="Designation"
                      required
                      @input="$v.form.designation.$touch()"
                      @blur="$v.form.designation.$touch()"
                    >
                    </v-text-field>
                  
                    <v-text-field
                      v-model="form.email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                      @input="$v.form.email.$touch()"
                      @blur="$v.form.email.$touch()"
                    ></v-text-field>
               
                    <v-text-field
                      v-model="form.address"
                      :error-messages="addressErrors"
                      label="Address"
                      required
                      @input="$v.form.address.$touch()"
                      @blur="$v.form.address.$touch()"
                    >
                    </v-text-field>
               
                    <v-select
                      v-model="form.select"
                      :items="form.countriesItems"
                      :error-messages="selectErrors"
                      label="CountryList"
                      required
                      @change="$v.form.select.$touch()"
                      @blur="$v.form.select.$touch()"
                    ></v-select>
                
                    <v-select
                      v-model="form.partners"
                      :items="form.partnersItems"
                      :error-messages="partnersErrors"
                      label="PartnerList"
                      required
                      @change="$v.form.partners.$touch()"
                      @blur="$v.form.partners.$touch()"
                    >
                    </v-select>
                
                    <v-text-field
                      v-model="form.number"
                      :error-messages="contactError"
                      label="ContactNo"
                      required
                      @input="$v.form.number.$touch()"
                      @blur="$v.form.number.$touch()"
                    >
                    </v-text-field>
                    DOB
                 <v-menu
        v-model="form.menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.date"
          @input="form.menu2 = false"
        ></v-date-picker>
      </v-menu>
                    DOJ
                 <v-menu
        v-model="form.menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.date"
          @input="form.menu2 = false"
        ></v-date-picker>
      </v-menu>
                    DOE
                 <v-menu
        v-model="form.menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.date"
            label="Picker without buttons"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.date"
          @input="form.menu2 = false"
        ></v-date-picker>
      </v-menu>
                  
               </form>
                </v-row>
              </v-container>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger" class="mr-4" type="submit" :disabled="submitStatus === 'PENDING'">
                submit
              </v-btn>
            
               <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn> 
       
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
// Used to fetch out the userType of the Login

// Helper mixins is used to fetch out the formatted Date and some other things related to date
// import helpers from "../../components/helpers";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import Search from "../../components/Search";
// import Form from "../../components/Form";
import { mapActions, mapMutations } from "vuex";
import helperMixin from "../../mixin/helperMixins";
import helpers from "../../components/helpers";
import searchMixin from "../../mixin/searchMixin";
import inputFormMixin from "../../mixin/inputFormMixin";
import defaultCRUDMixin from "../../mixin/defaultCRUDMixins";
import Card from "../../components/card";
export default {
  name: "Users",
  mixins: [helperMixin, searchMixin, inputFormMixin, defaultCRUDMixin],
  data: () => ({
    filter: {},
    activeState: true,
    userList: [],
    show: false,
    expandCard: { required: false, default: true },
    dialog:false,
   submitStatus: null,
  form:{
    fullName: "",
    email: "",
    // email:'',
    designation: "",
    address: "",
    countries: null,
    partners: null,
    dialog:false,
     select: null,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
    countriesItems: [
      "Azerbaijain",
      "Belarus",
      "Bulgaria",
      "Canada",
      "East Africa",
      "Egypt",
      "Fiji",
      "Global Destinations",
      "Greece",
      "Indo China",
      "Indonesia",
      "Italy",
      "Kazakhstan",
      "Latin America",
      "Maldives",
      "Morocco",
      "New Zealand",
      "New Zealand-ANZ",
      "Portugal",
      "Russian Federation",
      "Seychelles",
      "South Africa",
      "Spain",
      "Spain-PHG",
      "Turkey",
      "United Arab Emirates",
      "United Kingdom",
      "United Kingdom",
      "United Kingdom - ACH",
      "United State",
    ],
    partnersItems: [
      "Century Incoming",
      "Allied T Pro Inc.",
      "Cairo Transport & Touring",
      "Kazin Travel Consultants",
      "General Travel",
      "Threeland Travel dba Gray Lin",
      "Southern Africa 360",
      "Tangerine Tours",
      "Win Travel",
      "Affordable Car Hire",
      "TUO Travel",
      "Global Destinations Greece",
      "Escapes & Co. Travels",
      "Grayline Latin America",
      "Swiss-BelHotel",
      "Private Safari",
      "Leisure Pass Group",
      "Global Destinations",
      "Tourism Fiji",
      "Air New Zealand",
      "Russian Tour",
      "New Concept Travel",
    ],
    number: "",
  }
  }),
  created() {
    this.getData();
    // console.log(this.);
    // this.setSearchConfig();
    // console.log()
  },
  computed: {
 
    selectErrors() {
      const errors = [];
      if (!this.$v.form.select.$dirty) return errors;
      !this.$v.form.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.form.fullName.$dirty) return errors;
      !this.$v.form.fullName.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.form.fullName.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Must be valid e-mail");
      !this.$v.form.email.required && errors.push("E-mail is required");
      return errors;
    },

    designationErrors() {
      const errors = [];
      if (!this.$v.form.designation.$dirty) return errors;
      !this.$v.form.designation.minLength &&
        errors.push("Name has minimum length of 2");
      !this.$v.form.designation.maxLength &&
        errors.push("Name has max length of 40");
      !this.$v.form.designation.required && errors.push("This field is required");

      return errors;
    },

    addressErrors() {
      const errors = [];
      if (!this.$v.form.address.$dirty) return errors;
      !this.$v.form.address.minLength && errors.push("Name has minimum length of 5");
      !this.$v.form.address.required && errors.push("This field is required");
      return errors;
    },
  
    partnersErrors() {
      const errors = [];
      if (!this.$v.form.partners.$dirty) return errors;
      !this.$v.form.partners.required && errors.push("Select one option");
      return errors;
    },
    contactError() {
      const errors = [];
      if (!this.$v.form.number.$dirty) return errors;
      !this.$v.form.number.required && errors.push("Name has minimum length of 5");
      !this.$v.form.number.number && errors.push("Enter a valid Contact");
      return errors;
    },
  },
  components: { Search, Card },
  methods: {
    ...mapActions("ManageUser", ["getUserList", "addUser"]),
    ...mapMutations(["openLoaderDialog", "closeLoaderDialog"]),
    submit() {
      console.log('submit!')
      this.$v.$touch();
      if(this.$v.$invalid){
        this.submitStatus = 'ERROR'
      }else{
        this.submitStattus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500);
      }
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
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
    formOutput(data) {
      var formData = JSON.parse(JSON.stringify(data)); //When the data we send to the server it sends in a form of string but when receiving side we take as an object
      formData.type = this.type;
      formData.dob = helpers.getISODate(formData.dob);
      formData.doj = helpers.getISODate(formData.doj);
      if (formData.doe) {
        formData.doe = helpers.getISODate(formData.doe);
      }

      if (formData.countries) {
        formData.countries = formData.countries.filter(
          (e) => !!this.activeCountriesList.find((f) => f == e)
        );
      }
      formData.phone_numbers = data.phone_numbers.map((data) => data.input);
      if (formData.representing_partner_ids) {
        formData.representing_partner_ids = formData.representing_partner_ids.filter(
          (id) => {
            for (let partner of this.partners) {
              if (partner.value == id) {
                return true;
              }
            }
          }
        );
      }

      this.openLoaderDialog();
      if (!this.isEditMode) {
        this.addUser(formData).then((data) => {
          this.closeLoaderDialog();
          if (data.ok) {
            this.openSnackbar({ text: "Added User Sucessfully" });

            this.getData();
            this.closeForm();
          } else {
            this.openSnackbar({ text: data.message });
          }
        });
      } else {
        this.editUser(formData).then((data) => {
          this.closeLoaderDialog();
          if (data.ok) {
            this.openSnackbar({ text: "Edited User Sucessfuly" });

            this.getData();
            this.closeForm();
          } else {
            this.openSnackbar({ text: data.message });
          }
        });
      }
    },
    getEditRowObject(data) {
      return {
        ...data.usr_data,
        _id: data._id,
        updated_on: data.record.updated_on,
      };
    },

   
    getMainContentSubtitle(user) {
      if (user.type == this.SALES_AGENT) {
        return user.usr_data.countries.join(", ");
      } else if (user.type == this.REMOTE_SALES_AGENT) {
        return user.usr_data.zone;
      }
      return "";
    },

    
  },
  props: {
    name: { required: true, type: String },
    type: { required: true, type: String },
    placeholder: { required: true, type: String },
    activeCountriesList: { required: false, type: Array },
  },
  validations: {
   form:{ email: { required, email },
    select: { required },
   
    fullName: { required, maxLength: maxLength(40) },
    designation: {
      required,
      maxLength: maxLength(40),
      minLength: minLength(2),
    },
    address: { required, maxLength: maxLength(40) },
    partners: { required },
    number: { required },
  },
  }
};
</script>

<style lang="scss" scopped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);

#btmryt {
  position: fixed;
  right: 3%;
  bottom: 3%;
  width:23px;
  border-radius: 20px;
  background-color: purple;
  // float:right;
}

.flexing {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.mystyle {
  width: 100%;
  padding: 25px;
  background-color: coral;
  color: white;
  font-size: 25px;
  box-sizing: border-box;
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
