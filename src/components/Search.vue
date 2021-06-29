<template>
  <div>
    <v-container class="my-7">
      <v-row>
        <div class="search">
          <input
            @input="performBasicSearch()"
            v-model="queryString"
            type="text"
            class="searchTerm"
            placeholder="What are you looking for?"
          >
          
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Search",
  components: {},
  data(){ 
  return{
    
    queryString: "",
   
    searchTimeoutRef: "",
   
    dateMenuRef: {},
  }
},
  
  computed: {
    ...mapGetters(["countries", "partners", "zone", "businessType"]),
   
    
  },
  methods: {
    checkForClass(classes) {
      if (classes) {
        return classes;
      }
    },

    performBasicSearch() {
      clearTimeout(this.searchTimeoutRef);
      this.searchTimeoutRef = setTimeout(() => {
        this.$emit("queryString", this.queryString);
      }, 500);
    },
    clearDate(key) {
      this.filterObject[key] = null;
      this.dateMenuRef[key] = false;
    },
  
   
  },
};
</script>
<style lang="scss">
.search {
  width: 100%;
  position: relative;
  display: flex;
}
.searchTerm {
  width: 80%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}
.searchTerm:focus {
  color: #00b4cc;
}
.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

</style>
