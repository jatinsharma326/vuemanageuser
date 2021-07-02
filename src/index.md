```html
//Form 1
<template>
   <v-row justify="space-around">
     <v-col cols="auto">
       <v-dialog
       transition="dialog-top-transition"
       max-width="700">

       </v-dialog>
       <template v-slot:activator="{on,attrs}">
         <v-btn
         color="primary"
         v-bind="attrs"
         v-on="on" id="btmryt">Button</v-btn>
       </template>
       <template v-slot:default="dialog">
        <v-card>
 <form>
     <v-text-field
     v-model="fullName"
     :error-messages="nameErrors"
     :counter="10"
     label="Name"
     required
     @input="$v.fullName.$touch()"
     @blur="$v.fullName.$touch()">

     </v-text-field>
      <v-text-field
     v-model="designation"
     :error-messages="designationErrors"
     label="Designation"
     required
     @input="$v.designation.$touch()"
     @blur="$v.designation.$touch()">

     </v-text-field>
     <v-text-field
     v-model="email"
     :error-messages="emailErrors"
     label="E-mail"
     required
     @input="$v.email.$touch()"
     @blur="$v.email.$touch()">

     </v-text-field>
      <v-text-field
     v-model="address"
     :error-messages="addressErrors"
     label="Address"
     required
     @input="$v.address.$touch()"
     @blur="$v.address.$touch()">

     </v-text-field>
     <v-select
     v-model="countries"
     :countriesItems="countriesItems"
     :error-messages="countriesErros"
     label="Item"
     required
     @change="$v.countries.$touch()"
    @blur="$v.countries.$touch()"
     >
     </v-select>
     <v-select
     v-model="partners"
     :partnerItems="partnerItems"
     :error-messages="partnersErrors"
     label="Item"
     required
     @change="$v.partners.$touch()"
    @blur="$v.partners.$touch()"
     >
     </v-select>
     <v-text-field
     v-model="number"
     :error-messages="contactError"
     label="ContactNo"
     required
     @input="$v.number.$touch()"
     @blur="$v.number.$touch()">

     </v-text-field>
   </form>
     <v-card-actions class="justify-end">
       <v-btn
       text 
       @click="dialog.value=false"></v-btn>
       <v-btn class="mr-4"
       @click="submit">

       </v-btn>
     </v-card-actions>
      
        </v-card>
       </template>
     </v-col>
   </v-row>
  
 </template>
 ```
 ```html
 Button for submit
  <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    ```

    ```html
    Starts from here
       <form>
    <v-text-field
      v-model="fullName"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.fullName.$touch()"
      @blur="$v.fullName.$touch()"
    ></v-text-field>
     <v-text-field
     v-model="designation"
     :error-messages="designationErrors"
     label="Designation"
     required
     @input="$v.designation.$touch()"
     @blur="$v.designation.$touch()">

     </v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
      <v-text-field
     v-model="address"
     :error-messages="addressErrors"
     label="Address"
     required
     @input="$v.address.$touch()"
     @blur="$v.address.$touch()">

     </v-text-field>
    <v-select
      v-model="select"
      :items="countriesItems"
      :error-messages="selectErrors"
      label="CountryList"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
     <v-select
     v-model="partners"
     :items="partnersItems"
     :error-messages="partnersErrors"
     label="PartnerList"
     required
     @change="$v.partners.$touch()"
    @blur="$v.partners.$touch()"
     >
     </v-select>
        <v-text-field
     v-model="number"
     :error-messages="contactError"
     label="ContactNo"
     required
     @input="$v.number.$touch()"
     @blur="$v.number.$touch()">

     </v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
  Complete Form
  ```
```js
data(){
  return{
   filter: {},
    activeState: true,
    userList: [],
    show: false,
    expandCard: { required: false, default: true },
      email: '',
      select: null,
     
      checkbox: false,
    fullName:'',
    // email:'',
    designation:'',
    address:'',
    countries:null,
    partners:null,
    // dialog:false,
    countriesItems:['Azerbaijain','Belarus','Bulgaria','Canada','East Africa','Egypt',
    'Fiji','Global Destinations','Greece','Indo China','Indonesia','Italy','Kazakhstan','Latin America','Maldives','Morocco',
    'New Zealand','New Zealand-ANZ','Portugal','Russian Federation','Seychelles','South Africa','Spain','Spain-PHG','Turkey','United Arab Emirates','United Kingdom','United Kingdom','United Kingdom - ACH'
    ,'United State'],
    partnersItems:['Century Incoming','Allied T Pro Inc.','Cairo Transport & Touring','Kazin Travel Consultants',
    'General Travel','Threeland Travel dba Gray Lin','Southern Africa 360','Tangerine Tours','Win Travel','Affordable Car Hire','TUO Travel','Global Destinations Greece',
    'Escapes & Co. Travels','Grayline Latin America','Swiss-BelHotel','Private Safari','Leisure Pass Group','Global Destinations','Tourism Fiji','Air New Zealand','Russian Tour','New Concept Travel',]
    ,number:'',
  }
}
computed{
  
 checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.fullName.$dirty) return errors
        !this.$v.fullName.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.fullName.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },

    designationErrors(){
      const errors = [];
      if(!this.$v.designation.$dirty) return errors
      !this.$v.designation.minLength && errors.push("Name has minimum length of 2")
       !this.$v.designation.maxLength && errors.push("Name has max length of 40");
      !this.$v.designation.required && errors.push("This field is required");

      return errors;
    },

    addressErrors(){
      const errors = [];
      if(!this.$v.address.$dirty) return errors
      !this.$v.address.minLength && errors.push("Name has minimum length of 5")
      !this.$v.address.required && errors.push("This field is required");
  return errors;
    },
  //   countriesErrors(){
  //     const errors = [];
  //     // if(!this.$v.countries.dirty) return errors
  //     !this.$v.countries.required && errors.push("Name has minimum length of 5")
  //       return errors;

  //   },
    partnersErrors(){
      const errors = [];
      if(!this.$v.partners.$dirty) return errors
      !this.$v.partners.required && errors.push("Name has minimum length of 5")
        return errors;
    },
  contactError(){
    const errors = [];
      if(!this.$v.number.$dirty) return errors
      !this.$v.number.required && errors.push("Name has minimum length of 5")
      !this.$v.number.number && errors.push("Enter a valid Contact");
      return errors;
  }
}
  ```
