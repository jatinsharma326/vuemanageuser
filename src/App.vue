<template>
  <v-app>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="grey"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>TheElonMusk</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon @click="logoutUser">mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height: 100px;"> </v-container>
      </v-sheet>
    </v-card>
    <!-- <v-app-bar class="toolbarWrapper" color="primary" app fixed>
			<v-btn icon x-large @click="toggleNav">
				<v-icon color="white">mdi-menu</v-icon>
			</v-btn>

			<v-toolbar-title
				><span style="color:white">{{ title }}</span></v-toolbar-title
			>
			<v-spacer></v-spacer>
			<v-btn large icon @click="openPortal(settingsRoute)">
				<v-icon color="white">mdi-cog</v-icon>
			</v-btn>
			<v-btn large icon @click="logoutUser">
				<v-icon color="white">mdi-logout</v-icon>
			</v-btn>
		</v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-model="localSnackbarState"
      multi-line
      light
      top
      right
      :timeout="snackbarTime"
    >
      <div class="snackbarComponentWrapper">
        <div class="content">{{ snackbarText }}</div>
        <div class="action-button">
          <v-btn small fab color="accent" text @click.stop="closeSnackbar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-snackbar>

    <v-overlay class="app-loader" :value="loaderDialog" :z-index="300">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import helpers from "./components/helpers";
export default {
  name: "App",

  components: {},
  data: () => ({
    navigationToggle: false,
    localSnackbarState: false,
    currentRoute: "",
    value: "",
    title: "TITLE",
    // settingsRoute: {
    // 	title: "Settings",
    // 	route: "/settings",
    // },
    // routeItems: [
    // 	{
    // 		icon: "data_usage",
    // 		title: "Dashboard",
    // 		route: "/",
    // 		highlight: false,
    // 	},
    // 	{
    // 		icon: "rule_folder",
    // 		title: "Manage Users",
    // 		route: "/manage-users",
    // 		highlight: "#00a0ff",
    // 		iconColor: "#00a0ff",
    // 	},

    // ],
  }),
  async created() {
    if (helpers.getCurrentRoute() != "settings") {
      // this.currentRoute =
      //   this.routeItems.find((e) => e.route == "/" + helpers.getCurrentRoute())
      //     .title || "Dashboard";
    } else {
      this.currentRoute = this.settingsRoute.title;
    }
    // this.title = this.title.split("/")[0] + " / " + this.currentRoute;

    //Means what the title it becomes the current route
    this.title = this.currentRoute;
    let promises = [];
    promises.push(this.getCountries());
    promises.push(this.getPartnerList());
    promises.push(this.getZones());
    promises.push(this.getBusinessTypes());
    promises.push(this.getAllCurrencies());
    // promises.push(this.getStatesList());
    await Promise.all(promises);
  },
  methods: {
    ...mapActions([
      "logout",
      "getCountries",
      "getPartnerList",
      "getZones",
      "getBusinessTypes",
      "getAllCurrencies",
    ]),
    // ...mapActions("ManageAgents", ["getStatesList"]),
    ...mapMutations([
      "openLoaderDialog",
      "closeLoaderDialog",
      "resetState",
      "openSnackbar",
      "closeSnackbar",
    ]),

    toggleNav() {
      this.navigationToggle = !this.navigationToggle;
    },
    async logoutUser() {
      console.log("User Logged Out");
      this.openSnackbar({ text: "You are being logged out" });
      this.openLoaderDialog();
      await this.logout();
      this.closeLoaderDialog();
      localStorage.clear();
      this.resetState();
      this.$emit("userHasLoggedOut");
    },
    // openPortal(item) {
    // 	if (item.title !== this.currentRoute) {
    // 		// this.title = this.title.split("/")[0] + "/" + item.title;
    // 		this.currentRoute = item.title;
    // 		this.title = item.title;
    // 		// eslint-disable-next-line no-prototype-builtins
    // 		if (item.hasOwnProperty("prop")) {
    // 			this.$router.push({
    // 				name: item.route,
    // 				params: {
    // 					propItem: item.prop,
    // 				},
    // 			});
    // 		} else {
    // 			this.$router.push({
    // 				path: item.route,
    // 			});
    // 		}
    // 	}
    // },
  },
  computed: {
    ...mapGetters([
      "loaderDialog",
      "userData",
      "userType",
      "snackbarState",
      "snackbarText",
      "snackbarTime",
      "ADMIN",
      "MANAGEMENT",
      "SALES_AGENT",
      "REMOTE_SALES_AGENT",
    ]),
  },
  watch: {
    snackbarState(nv) {
      this.localSnackbarState = nv;
    },
    localSnackbarState(nv) {
      if (!nv) {
        this.closeSnackbar();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// .title-wrapper {
// 	// transform: translateX(-50%);
// 	text-align: center;
// 	width: 100%;
// 	font-size: 20px;
// 	color: white;
// 	padding-top: 24px;
// 	padding-bottom: 54px;
// }

.logo-wrapper {
  // background-color: white;
  width: 100%;
  height: auto;
  padding: 10px;
  img {
    height: 100%;
    width: 100%;
  }
}

.toolbarWrapper {
  background: linear-gradient(
    90deg,
    rgb(201, 72, 55) 0%,
    rgba(166, 206, 68, 1) 100%
  );
}
.navigationDrawerWrapper {
  background: linear-gradient(
    180deg,
    rgba(55, 182, 201, 1) 0%,
    rgba(166, 206, 68, 1) 100%
  );
}

.snackbarComponentWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#navigation-list {
  // background-color: $primary;

  .v-list-item__content {
    padding: 0px !important;
  }
  .v-list-group__header {
    font-size: 16px;
    &:not(.v-list-item--active) {
      .list-group-title {
        color: white;
      }
    }

    &.v-list-item--active {
      background-color: red;
    }
  }

  .list-title {
    display: block;
    color: blue;
    padding: 12px;
    width: 98%;
    margin: 4px 0;
  }

  .selected-route {
    background-color: pink;
    border-radius: 6px;
    color: black;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  // #basic-list-item {
  // 	.selected-route {
  // 		background-color: pink;
  // 		border-radius: 6px;
  // 		box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  // 			0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  // 	}
  // }

  .list-group-title-dot {
    height: 12px;
    width: 12px;
    background-color: pink;
    border-radius: 50%;
    float: right;
  }
}
</style>

<style lang="scss">
#navigation-list {
  .v-list-group
    .v-list-group__header
    .v-list-item__icon.v-list-group__header__append-icon {
    margin-left: 0px;
  }

  .v-list-item__icon.v-list-group__header__append-icon {
    .v-icon.v-icon {
      color: white;
    }
  }

  .v-list-group__header {
    &.v-list-item--active {
      background-color: yellow;
      border-left: 4px solid pink;
    }
  }
}
#basic-list-item {
  .v-list-item.v-list-item--link.active-list-item {
    background-color: yellow;
    border-left: 4px solid pink;
  }
}
.app-loader {
  z-index: 10;
}
</style>
