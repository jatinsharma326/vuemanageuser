<template>
  <div>
    <v-btn id="btmryt" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <v-icon color="blue">mdi-plus</v-icon>
    </v-btn>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Form</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    v-for="formInput in inputForm"
                    :key="formInput.key"
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="formInput.name"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { required, email, minLength, numeric, alpha } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
// import moment from "moment-timezone";
// import helpers from "./helpers";
export default {
  name: "Form",
  components: {},
  data: () => ({
    form: false,
    showError: false,
    errorText: false,
    formElements: {},
    dateMenuRef: {},
	valid:"",
    asyncList: {},
    watcherList: [],
    disableConfig: {},
    errorMessages: {
      required: {
        type: "normal",
        msg: (name) => `${name} is a Required Field`,
      },
      alpha: { type: "normal", msg: (name) => `${name} can only be Alphabets` },
      numeric: { type: "normal", msg: (name) => `${name} can only be Numbers` },
      minLength: {
        type: "conditional",
        msg: (name, condition) =>
          `${name} needs to have a minimum length of ${condition}`,
        conditionKey: "min",
      },
      maxLength: {
        type: "conditional",
        msg: (name, condition) =>
          `${name} needs to have a minimum length of ${condition}`,
        conditionKey: "max",
      },
      email: { type: "normal", msg: (name) => `${name} is not a valid email` },
    },
  }),
//   created() {
//     this.initialiseFormElements();
//   },
  mounted() {},
  computed: {
    ...mapGetters(["countries", "partners", "zone", "businessType"]),
  },
  methods: {
    // ...mapActions("UserManagement", ["getUserList"]),
    checkWidth(width) {
      if (width) {
        return width;
      }
    },
    clearDate(key) {
      this.formElements[key] = null;
      this.dateMenuRef[key] = false;
    },
    getMin(config) {
      if (config.min) {
        return config.min();
      }
    },
    getMax(config) {
      if (config.max) {
        return config.max();
      }
    },
    getFormName() {
      if (this.prependFormName) {
        if (this.isEditMode) {
          return "Edit ";
        } else {
          return "Add ";
        }
      }
      return "";
    },

    getItems(config) {
      if (config.isListInStore) {
        return this[config.listVariable];
      } else {
        return config.listItems;
      }
    },
    updateMultiInputObject(value, config, mulIndex) {
      this.formElements[config.key][mulIndex].input = value;
    },
    updateMultiInputWithGroupKey(value, config, rowIndex, mulIndex) {
      this.formElements[config.key][rowIndex].input[mulIndex].input = value;
    },
    removeMultiInputWithGroupKeyField(config, rowIndex) {
      if (this.formElements[config.key][rowIndex].input.length > 1) {
        this.formElements[config.key][rowIndex].input.pop({ input: "" });
      }
    },
    addMultiInputWithGroupKeyField(config, rowIndex) {
      this.formElements[config.key][rowIndex].input.push({ input: "" });
    },
    removeMultiInputField(config) {
      if (this.formElements[config.key].length > 1) {
        this.formElements[config.key].pop({ input: "" });
      }
    },
    addMultiInputField(config) {
      this.formElements[config.key].push({ input: "" });
    },
    closeForm() {
      this.$emit("closeForm");
    },
    // async initialiseFormElements() {
    //   this.showError = false;
    //   if (this.watcherList.length) {
    //     for (let i of this.watcherList) {
    //       i();
    //     }
    //   }

    //   for (let i of this.inputConfig) {
    //     this.$set(this.disableConfig, i.key, false);

    //     if (!this.isEditMode) {
    //       // This will initialize the form when add user button is clicked
    //       if (i.type == "MultiInput") {
    //         this.$set(this.formElements, i.key, [{ input: "" }]);
    //       } else if (i.type == "MultiInputWithGroupKey") {
    //         this.$set(this.formElements, i.key, null);
    //       } else if (i.type == "Switch") {
    //         this.$set(this.formElements, i.key, false);
    //       } else {
    //         if (i.initialValue) {
    //           this.$set(this.formElements, i.key, i.initialValue);
    //         } else {
    //           this.$set(this.formElements, i.key, null);
    //         }
    //       }
    //       if (i.type == "AsyncDropdownWithMoreInfo") {
    //         this.$set(this.asyncList, i.key, []);
    //       }
    //       if (i.type == "Date") {
    //         this.$set(this.dateMenuRef, i.key, false);
    //       }
    //     } else {
    //       // This will initialize the form when Edit user button is clicked
    //       if (i.type == "MultiInput") {
    //         if (this.formData[i.key] && this.formData[i.key].length) {
    //           this.$set(
    //             this.formElements,
    //             i.key,
    //             this.formData[i.key].map((e) => ({
    //               input: e,
    //             }))
    //           );
    //         } else {
    //           this.$set(this.formElements, i.key, [{ input: "" }]);
    //         }
    //       } else if (i.type == "MultiInputWithGroupKey") {
    //         // formData object -> {
    //         // 	_id: "5f857a9ad8a96c2e4ca6e7c5",
    //         // 	name: "Allied T Pro Inc.",
    //         // 	proprietor_info: "Sanya Hamilton",
    //         // 	business_types: ["FIT", "GIT", "MICE", "ADHOC", "LUXURY"],
    //         // 	countries: ["United States", "Canada"],
    //         // 	emergency_contacts: [{ country: "United States", contacts: ["+1 310 663 9484"] }],
    //         // 	logo: "base64 String here",
    //         // 	record: {
    //         // 		created_on: "2020-10-13T09:59:54.919Z",
    //         // 		updated_on: "2020-10-29T07:44:40.388Z",
    //         // 		active: true,
    //         // 	},
    //         // 	email_ids: ["sanya.hamilton@atptravel.com"],
    //         // 	updated_on: "2020-10-29T07:44:40.388Z",
    //         // };
    //         if (this.formData[i.key]) {
    //           let tempObj = this.formData[i.key].map((e) => ({
    //             groupKey: e[i.keyforGrouped],
    //             input: i.multi
    //               ? e[i.keyBeingGrouped].map((f) => ({ input: f }))
    //               : [{ input: e[i.keyBeingGrouped] }],
    //           }));
    //           let tempObjRefForLoop = JSON.parse(JSON.stringify(tempObj));
    //           // tempObj Output -> [
    //           // 	{ groupKey: "United States", input: [{ input: "+1 310 663 9484" }] },
    //           // 	{ groupKey: "Canada", input: [{ input: "" }] },
    //           // ];
    //           for (let j of this.formData[i.keyToGroup]) {
    //             let found = true;
    //             for (let k of tempObjRefForLoop) {
    //               if (j == k.groupKey) {
    //                 found = false;
    //               }
    //             }
    //             if (found) {
    //               tempObj.push({
    //                 groupKey: j,
    //                 input: [{ input: "" }],
    //               });
    //             }
    //           }
    //           this.$set(this.formElements, i.key, tempObj);
    //         }
    //       } else if (i.type == "Date") {
    //         if (this.formData[i.key]) {
    //           this.$set(
    //             this.formElements,
    //             i.key,
    //             helpers.getFormattedDate(this.formData[i.key], "YYYY-MM-DD")
    //           );
    //         } else {
    //           this.$set(this.formElements, i.key, null);
    //         }
    //       } else if (i.type == "FilePicker") {
    //         if (this.formData[i.key]) {
    //           // let extn = helpers.base64MimeType(this.formData[i.key]);
    //           // let fileObj = helpers.dataURLtoFile(this.formData[i.key], "logo." + extn);
    //           let urlSplit = this.formData[i.key].split(".");
    //           let extn = urlSplit[urlSplit.length - 1];
    //           let fileObj = await helpers.URLtoFile(
    //             this.formData[i.key],
    //             "logo." + extn,
    //             "image/" + extn
    //           );

    //           this.$set(this.formElements, i.key, fileObj);
    //         } else {
    //           this.$set(this.formElements, i.key, null);
    //         }
    //       } else if (i.type == "Switch") {
    //         if (this.formData[i.key]) {
    //           this.$set(this.formElements, i.key, this.formData[i.key]);
    //         } else {
    //           this.$set(this.formElements, i.key, false);
    //         }
    //       } else {
    //         this.$set(this.formElements, i.key, this.formData[i.key]);
    //       }

    //       if (i.type == "AsyncDropdownWithMoreInfo") {
    //         i.apiCall(this.formData[i.triggerKey]).then((data) => {
    //           this.$set(this.asyncList, i.key, data);
    //         });
    //       }

    //       if (i.type == "Date") {
    //         this.$set(this.dateMenuRef, i.key, false);
    //       }
    //     }
    //   }

    //   for (let i of this.inputConfig) {
    //     if (i.disableCheck) {
    //       this.disableConfig[i.key] = i.disableCheck(
    //         this.formElements[i.disableTriggerKey]
    //       );
    //     }
    //   }

    //   // Initialise watchers
    //   if (this.keysToWatch && this.keysToWatch.length > 0) {
    //     // create watchers here
    //     for (let watchKey of this.keysToWatch) {
    //       this.watcherList.push(
    //         this.$watch(
    //           `formElements.${watchKey}`,
    //           this.keyUpdated.bind(this, watchKey)
    //         )
    //       );
    //     }
    //   }
    // },
  },
  validations() {
    let tempObj = {};
    for (let i of this.inputConfig) {
      if (i.validations) {
        tempObj[i.key] = i.validations;
      }
    }
    return { formElements: tempObj };
  },
  props: {
    name: { required: true, type: String },
    inputForm: { required: true, type: Array },
    // isEditMode: { required: true, type: Boolean, default: false },
    // toggleForm: { required: true, type: Boolean, default: false },
    // keysToWatch: { required: false, type: Array, default: () => [] },
    // formData: { required: false, type: Object },
    prependFormName: { required: false, type: Boolean, default: true },
    // inputForm: { required: true, type: Array },
  },
 
};
</script>

<style lang="scss" scoped>
#btmryt {
  position: absolute;
  right: 3%;
  bottom: 3%;
  border-radius: 20px;
  background-color: purple;
  // float:right;
}
</style>
