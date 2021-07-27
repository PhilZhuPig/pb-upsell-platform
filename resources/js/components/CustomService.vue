<template>
  <div>
    <div class="grid grid-cols-3 bg-white rounded shadow">
      <div class="col-span-1 px-8 py-6 flex flex-col border-r border-gray-200">
        <div class="text-gray-900 font-medium">{{ title }}</div>
        <div class="flex-1 mt-4 mb-10 text-gray-900 text-sm">{{ description}}</div>
        <div
          @click="createUpsell"
          class="bg-green-700 text-center text-sm text-white w-20 rounded-sm border border-green-800 px-3 py-2 shadow-sm font-light cursor-pointer"
        >Select</div>
      </div>
      <div class="col-span-2 px-8 py-6 flex flex-col">
        <div class="text-gray-500 font-medium">Pop-Up Window Preview</div>
        <div class="mt-4 flex bg-gray-50 p-4 relative">
          <div class="rounded bg-gray-200 w-10 h-10"></div>
          <div class="ml-3 flex flex-col justify-center space-y-2">
            <div class="h-2 w-40 bg-gray-200 rounded"></div>
            <div class="h-2 w-40 pr-5">
              <div class="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="absolute left-9 top-8 rounded border-l border-b border-gray-200 w-5 h-20"></div>
        </div>
        <!-- product -->
        <div class="z-10 pl-12 mt-4">
          <div class="flex">
            <div class="image flex flex-col justify-start bg-white border border-gray-300 rounded">
              <svg
                class="w-12 h-12 opacity-75"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div class="ml-3 flex flex-col">
              <div class="text-xs font-medium text-gray-800">{{item.title}}</div>
              <div
                class="text-xs font-light text-gray-400"
              >{{getCurrencySymbol(shop.currency)}}{{item.price}}</div>
              <div class="mt-1 flex">
                <div class="text-xs text-gray-400 font-light">{{item.description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "Custom service",
      description: "Custom description",
      item: {
        title: "Custom service",
        description: "Custom description",
        icon: "",
        price: "9.99"
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.upsellrock.user,
      shop: state => state.upsellrock.shop,
      currencies: state => state.upsellrock.currencies
    })
  },
  mounted() {
    console.log("Custom Service mounted.");
  },
  methods: {
    getCurrencySymbol(currency) {
      var cur = this.currencies.find(c => c.currency === currency);
      if (cur) {
        return cur.currency_symbol;
      }
    },
    getSmartAutoUpsell() {
      axios.get("/spa/smart_auto_upsell").then(res => {
        this.smart_auto_upsell = res.data;
      });
    },
    createUpsell() {
      axios.get("/spa/create_upsell?type=custom-service").then(res => {
        console.log(res.data);
        this.$router.push("/upsell/" + res.data.id + "/edit");
      });
    }
  }
};
</script>
