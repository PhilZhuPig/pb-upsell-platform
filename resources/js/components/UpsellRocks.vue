<template>
  <div>
    <!-- navs -->
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="/images/upsell-logo.svg" alt />
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <!-- <router-link
                  to="/"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >Dashboard</router-link>-->
                <router-link
                  to="/"
                  class="bg-gray-900 text-white block px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >Ant Upsell Rocks</router-link>
                <router-link
                  to="/setting"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >Setting</router-link>
                <router-link
                  to="/performance"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >Performance</router-link>
                <div
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  aria-current="page"
                  @click="gotoCCA"
                >Add 170+ Currencies to your shop</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <!-- <router-link
            to="/"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >Dashboard</router-link>-->
          <router-link
            to="/"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >Ant Upsell Rocks</router-link>
          <router-link
            to="/setting"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >Setting</router-link>
          <router-link
            to="/performance"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >Performance</router-link>
          <div
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
            aria-current="page"
            @click="gotoCCA"
          >Add 170+ Currencies to your shop</div>
        </div>
      </div>
    </nav>
    <!-- end navs -->
    <!-- content -->
    <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8" v-if="upsells.length===0 || show_type_list">
      <div class="flex justify-start">
        <div
          class="flex items-center text-gray-500"
          v-if="show_type_list"
          @click="show_type_list = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </div>
        <div
          :class="`${show_type_list?'ml-4':''} text-xl text-gray-900 text-center font-medium py-4`"
        >Fill Up Your Ant Upsell Rock</div>
      </div>
      <instructor></instructor>
      <product-upsell class="mt-4"></product-upsell>
      <smart-auto-upsell class="mt-4"></smart-auto-upsell>
      <custom-service class="mt-4"></custom-service>
    </div>
    <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8" v-else>
      <upsell-rock-list></upsell-rock-list>
      <!-- new upsell -->
      <div class="mt-4 flex justify-center items-center">
        <div
          @click="show_type_list = true"
          class="bg-green-700 text-center text-sm text-white w-auto rounded-sm border border-green-800 px-3 py-2 shadow-sm font-light cursor-pointer hover:bg-green-800"
        >New Upsell</div>
      </div>
    </div>
    <!-- end content -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ProductUpsell from "./ProductUpsell.vue";
import SmartAutoUpsell from "./SmartAutoUpsell.vue";
import CustomService from "./CustomService.vue";
import UpsellRockList from "./UpsellRockList.vue";
import Instructor from "./Instructor.vue";
export default {
  components: {
    ProductUpsell,
    SmartAutoUpsell,
    CustomService,
    UpsellRockList,
    Instructor
  },
  data() {
    return {
      interval: null,
      loaded: false,
      show_type_list: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.upsellrock.user,
      shop: state => state.upsellrock.shop,
      currencies: state => state.upsellrock.currencies,
      upsells: state => state.upsellrock.upsells,
      local_products: state => state.upsellrock.local_products
    })
  },
  mounted() {
    console.log("upsell mounted");
    console.log("token=" + window.sessionToken);
    this.interval = setInterval(() => {
      if (!this.loaded && window.sessionToken != null) {
        this.loaded = true;
        this.getUpsells();
        this.getUser();
        this.getShop();
        this.getCurrencies();
        this.getCustomCollections();
        this.getSmartCollections();
        this.getLocalProducts();
        this.getLocalCollections();
        this.updateSmartCollection();
        clearInterval(this.interval);
      }
    }, 100);
  },
  methods: {
    getUpsells() {
      axios.get("/spa/upsells").then(res => {
        this.$store.commit("upsellrock/SET_UPSELLS", { upsells: res.data });
      });
    },
    getUser() {
      axios.get("/spa/user").then(res => {
        this.$store.commit("upsellrock/SET_USER", { user: res.data });
      });
    },
    getShop() {
      axios.get("/spa/shop").then(res => {
        console.log(res.data);
        this.$store.commit("upsellrock/SET_SHOP", { shop: res.data });
      });
    },
    getCurrencies() {
      axios.get("/spa/currencies").then(res => {
        this.$store.commit("upsellrock/SET_CURRENCIES", {
          currencies: res.data
        });
      });
    },
    getCustomCollections() {
      axios.get("/spa/custom_collections").then(res => {
        // console.log("getCustomCollections");
        // console.log(res.data);
        this.$store.commit("upsellrock/SET_CUSTOM_COLLECTIONS", {
          custom_collections: res.data
        });
      });
    },
    getSmartCollections() {
      axios.get("/spa/smart_collections").then(res => {
        // console.log("getSmartCollections");
        // console.log(res.data);
        this.$store.commit("upsellrock/SET_SMART_COLLECTIONS", {
          smart_collections: res.data
        });
      });
    },
    updateSmartCollection() {
      axios.get("/spa/update_smart_collection").then(res => {
        // console.log("updateSmartCollection");
        // console.log(res.data);
      });
    },
    getLocalProducts() {
      axios.get("/spa/local_products").then(res => {
        console.log("getLocalProducts");
        console.log(res.data);
        this.$store.commit("upsellrock/SET_LOCAL_PRODUCTS", {
          local_products: res.data
        });
      });
    },
    getLocalCollections() {
      axios.get("/spa/local_collections").then(res => {
        console.log("getLocalCollections");
        console.log(res.data);
        this.$store.commit("upsellrock/SET_LOCAL_COLLECTIONS", {
          local_collections: res.data
        });
      });
    },
    gotoCCA() {
      window
        .open("https://apps.shopify.com/currency-converter-ant", "_blank")
        .focus();
    }
  }
};
</script>
