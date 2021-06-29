<template>
  <div class="manageUser">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in tabPages" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabPages" :key="item.id">
        <Users v-bind="{ ...item.props }" />
      </v-tab-item>
    </v-tabs-items>
    
  </div>
</template>

<script>
// import { required, email, minLength } from "vuelidate/lib/validators";
// import {mapGetters } from "vuex";
import Users from "./Users";
import { mapActions } from "vuex";
import commonAPICallsMixin from "../../mixin/commonAPICallsMixin";

import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "ManageUsers",
  mixins: [commonAPICallsMixin],
  components: { Users },
  async created() {
    console.warn(this.name);
    await this.getCountryList();
    this.setTabConfig(this.activeCountriesList);
  },
  data: () => ({
    tab: "",
    name: "",
    email: "",
    valid: false,
    tabPages: [],
    activeCountriesList: [],
  }),
  computed: {},
  methods: {
    // ...mapActions(["getPartnerList"]),
    ...mapActions(["getActiveCountries"]),

    getCountryList() {
      return this.getActiveCountries().then((data) => {
        this.activeCountriesList = data.list;
      });
    },
    setTabConfig(activeCountriesList = []) {
      this.tabPages = [
        {
          name: "Sales Team",
          id: "salesTeam",
          component: "Users",
          props: {
            name: "Sales Team",
            type: "sales_agent",
            placeholder: "Search Sales Team",
            activeCountriesList: activeCountriesList,
            inputForm: [
              {
                name: "Full Name*",
                type: "String",
                key: "name",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Designation",
                type: String,
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email",
                type: String,
                key: "email",
                width: "half",
                validations: {
                  required,
                  email,
                },
              },
              {
                name: "Address",
                type: String,
                key: "address",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Countries",
                type: "Dropdown",
                key: "countries",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Partners",
                type: "Dropdown",
                key: "partners",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "PhoneNumber",
                type: "Number",
                key: "phonenumber",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "DOB*",
                type: "Date",
                key: "dob",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOJ*",
                type: "Date",
                key: "doj",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOE",
                type: "Date",
                key: "doe",
                width: "oneThird",
              },
            ],
          },
        },
        {
          name: "Remote Sales Team",
          id: "remoteSalesTeam",
          component: "Users",
          props: {
            name: "Remote Sales Team",
            type: "remote_sales_agent",
            placeholder: "Search Remote Sales Team",
             inputForm: [
              {
                name: "Full Name*",
                type: "String",
                key: "name",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Designation",
                type: String,
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email",
                type: String,
                key: "email",
                width: "half",
                validations: {
                  required,
                  email,
                },
              },
              {
                name: "Address",
                type: String,
                key: "address",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "zone",
                type: "Dropdown",
                key: "zone",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "PhoneNumber",
                type: "Number",
                key: "phonenumber",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "DOB*",
                type: "Date",
                key: "dob",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOJ*",
                type: "Date",
                key: "doj",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOE",
                type: "Date",
                key: "doe",
                width: "oneThird",
              },
            ],
          },
        },
        {
          name: "Management Team",
          id: "management",
          component: "Users",
          props: {
            name: "Management",
            type: "management",
            placeholder: "Search Management Team",
             inputForm: [
              {
                name: "Full Name*",
                type: "String",
                key: "name",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Designation",
                type: String,
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email",
                type: String,
                key: "email",
                width: "half",
                validations: {
                  required,
                  email,
                },
              },
              {
                name: "Address",
                type: String,
                key: "address",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "PhoneNumber",
                type: "Number",
                key: "phonenumber",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "DOB*",
                type: "Date",
                key: "dob",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOJ*",
                type: "Date",
                key: "doj",
                width: "oneThird",
                validations: {
                  required,
                },
              },
              {
                name: "DOE",
                type: "Date",
                key: "doe",
                width: "oneThird",
              },
            ],
          },
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.btmryt {
  position: absolute;
  right: 0;
  bottom: 0;
}
.manageUserWrapper {
  height: 100%;
  .tabItemWrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
