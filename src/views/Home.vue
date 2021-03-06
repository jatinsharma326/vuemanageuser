<template>
  <div>
    <v-card>
      <v-toolbar color="pink" dark flat>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab
              v-for="(ele, index) in tabConfig"
              :key="ele.id + '__' + index"
              >{{ ele.name }}</v-tab
            >
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(ele, index) in tabConfig"
          :key="ele.id + '__' + index"
        >
          <About v-bind="{ ...ele.props }" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import About from "./About";
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      tab: "",
      tabConfig: [],
      activeCountriesList: [],
    };
  },
  components: {
    About,
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions("ManageTargets", ["getActiveCountries"]),
    getCountry() {
      return this.getActiveCountries().then((data) => {
        this.activeCountriesList = data.list;
      });
    },
    setTabConfig(activeCountriesList = []) {
      this.tabConfig = [
        {
          name: "Sales Team",
          id: "salesTeam",
          component: "Users",
          props: {
            name: "Sales Team",
            type: "sales_agent",
            placeholder: "Search Sales Team",
            activeCountriesList: activeCountriesList,
            inputConfig: [
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
                name: "Designation*",
                type: "String",
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email*",
                type: "String",
                key: "email",
                width: "full",
                validations: {
                  required,
                  email,
                  minLength: minLength(4),
                },
              },
              {
                name: "Address*",
                type: "String",
                key: "address",
                width: "full",
                validations: {
                  required,
                  minLength: minLength(10),
                },
              },
              {
                name: "Countries*",
                type: "Dropdown",
                key: "countries",
                width: "half",
                multi: true,
                isListInStore: false,
                listItems: activeCountriesList,
                validations: {
                  required,
                },
              },
              {
                name: "Partners*",
                type: "Dropdown",
                key: "representing_partner_ids",
                width: "half",
                multi: true,
                isListInStore: true,
                listVariable: "partners",
                validations: {
                  required,
                },
              },
              {
                name: "Contact Numbers*",
                type: "MultiInput",
                key: "phone_numbers",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                  $each: {
                    input: {
                      required,
                      minLength: minLength(8),
                    },
                  },
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
            inputConfig: [
              {
                name: "Full Name*",
                type: "String",
                key: "name",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(4),
                },
              },
              {
                name: "Designation*",
                type: "String",
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email*",
                type: "String",
                key: "email",
                width: "half",
                validations: {
                  required,
                  email,
                  minLength: minLength(4),
                },
              },
              {
                name: "Address*",
                type: "String",
                key: "address",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(10),
                },
              },
              {
                name: "Zone*",
                type: "Dropdown",
                key: "zone",
                width: "half",
                multi: false,
                isListInStore: true,
                listVariable: "zone",
                validations: {
                  required,
                },
              },
              {
                name: "Contact Numbers*",
                type: "MultiInput",
                key: "phone_numbers",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                  $each: {
                    input: {
                      required,
                      minLength: minLength(8),
                    },
                  },
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
            inputConfig: [
              {
                name: "Full Name*",
                type: "String",
                key: "name",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(4),
                },
              },
              {
                name: "Designation*",
                type: "String",
                key: "designation",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                },
              },
              {
                name: "Email*",
                type: "String",
                key: "email",
                width: "half",
                validations: {
                  required,
                  email,
                  minLength: minLength(4),
                },
              },
              {
                name: "Address*",
                type: "String",
                key: "address",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(10),
                },
              },
              {
                name: "Contact Numbers*",
                type: "MultiInput",
                key: "phone_numbers",
                width: "half",
                validations: {
                  required,
                  minLength: minLength(1),
                  $each: {
                    input: {
                      required,
                      minLength: minLength(8),
                    },
                  },
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
