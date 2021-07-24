<template>
  <div>
    <div class="grid grid-cols-3 bg-white rounded shadow">
      <div class="col-span-1 px-8 py-6 flex flex-col border-r border-gray-200">
        <div class="text-gray-900 font-medium">{{ title }}</div>
        <div class="flex-1 mt-4 mb-10 text-gray-900 text-sm">
          {{ description}}
          <a
            :href="learn.link"
            target="_blank"
            class="text-blue-500"
          >({{learn.title}})</a>
        </div>
        <div
          v-if="Object.keys(smart_auto_upsell).length===0"
          @click="createUpsell"
          class="bg-green-700 text-center text-sm text-white w-20 rounded-sm border border-green-800 px-3 py-2 shadow-sm font-light cursor-pointer"
        >Select</div>
        <div
          v-if="Object.keys(smart_auto_upsell).length>0"
          class="bg-green-300 text-center text-sm text-white w-20 rounded-sm border border-green-400 px-3 py-2 shadow-sm font-light cursor-pointer"
        >Select</div>
        <div
          v-if="Object.keys(smart_auto_upsell).length>0"
          class="text-gray-800 font-light text-sm mt-1"
        >
          Already exists
          <router-link class="text-blue-500" :to="`/upsell/${smart_auto_upsell.id}/edit`">(edit)</router-link>
        </div>
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
            <div class="image flex flex-col justify-start bg-white">
              <img :src="item.icon" class="w-12 h-12" alt />
            </div>
            <div class="ml-3 flex flex-col">
              <div class="text-xs font-medium text-gray-800">{{item.title}}</div>
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
      title: "Smart Auto-Upsell",
      description:
        "Upsell products are chosen automatically based on the Shopify Product Recommendation API",
      learn: {
        title: "learn more",
        link: "/what-are-smart-auto-upsells-and-how-to-use-them-ant-upsell-rock"
      },
      item: {
        title: "Most relevant product",
        description: "You may need this one",
        icon: ""
      },
      smart_auto_upsell: {},
      interval: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.upsellrock.user,
      shop: state => state.upsellrock.shop,
      currencies: state => state.upsellrock.currencies,
      upsells: state => state.upsellrock.upsells
    })
  },
  mounted() {
    console.log("Smart Auto Upsell mounted.");
    this.interval = setInterval(() => {
      if (window.sessionToken) {
        this.getSmartAutoUpsell();
        clearInterval(this.interval);
      }
    }, 100);
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
        console.log(res.data);
        this.smart_auto_upsell = res.data;
      });
    },
    createUpsell() {
      axios.get("/spa/create_upsell?type=smart-auto").then(res => {
        console.log(res.data);
        this.smart_auto_upsell = res.data;
        this.$router.push("/upsell/" + res.data.id + "/edit");
      });
    }
  }
};
</script>
