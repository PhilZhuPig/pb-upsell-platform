<template>
  <div>
    <div class="bg-white rounded shadow">
      <div class="flex flex-col px-8 py-6">
        <div class="font-medium text-gray-900">{{ title }}</div>
        <div class="flex-1 mt-4 mb-10 text-sm text-gray-900">
          {{ description}}
          <a
            :href="learn.link"
            target="_blank"
            class="text-blue-500"
          >({{learn.title}})</a>
        </div>
        <div
          v-if="Object.keys(smart_auto_upsell).length===0 && !creating"
          @click="createUpsell"
          class="w-full px-3 py-2 text-sm font-light text-center text-white bg-green-700 border border-green-800 rounded-sm shadow-sm cursor-pointer hover:bg-green-800"
        >Select</div>
        <div
          v-if="Object.keys(smart_auto_upsell).length===0 && creating"
          class="flex items-center justify-center w-full px-3 py-2 text-sm font-light text-center text-white bg-green-800 border border-green-800 rounded-sm shadow-sm cursor-pointer"
        >
          <svg
            class="w-4 h-4 mr-2 animate-spin"
            viewBox="0 0 1024 1024"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M510.5 958.7c-60.4 0-119-11.8-174.2-35.2-53.3-22.5-101.1-54.8-142.2-95.9s-73.3-88.9-95.9-142.2C74.9 630.2 63 571.6 63 511.2s11.8-119 35.2-174.2c22.5-53.3 54.8-101.1 95.9-142.2S283 121.5 336.3 99c55.2-23.3 113.8-35.2 174.2-35.2 49.3 0 97.8 8 144.1 23.7 26.1 8.9 40.1 37.3 31.2 63.4-7.1 20.8-26.5 33.9-47.3 33.9-5.3 0-10.8-0.9-16.1-2.7-35.9-12.2-73.6-18.4-111.9-18.4-92.8 0-180 36.1-245.7 101.8C199.2 331.1 163 418.4 163 511.2c0 92.8 36.1 180 101.8 245.7 65.6 65.6 152.9 101.8 245.7 101.8s180-36.1 245.7-101.8C821.8 691.3 858 604 858 511.2c0-58.6-14.9-116.6-43-167.6-13.3-24.2-4.6-54.6 19.6-67.9 24.2-13.3 54.6-4.6 67.9 19.6 36.3 65.7 55.4 140.4 55.4 215.9 0 60.4-11.8 119-35.2 174.2-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.3-142.2 95.9-55.1 23.3-113.7 35.2-174.1 35.2z"
              fill="#ffffff"
            />
          </svg>
          Select
        </div>
        <div
          v-if="Object.keys(smart_auto_upsell).length>0"
          class="w-full px-3 py-2 text-sm font-light text-center text-white bg-green-400 border border-green-400 rounded-sm shadow-sm cursor-pointer"
        >Select</div>
        <div
          v-if="Object.keys(smart_auto_upsell).length>0"
          class="mt-1 text-sm font-light text-gray-800"
        >
          Already exists
          <router-link class="text-blue-500" :to="`/upsell/${smart_auto_upsell.id}/edit`">(edit)</router-link>
        </div>
      </div>
      <!-- <div class="flex flex-col col-span-2 px-8 py-6">
        <div class="font-medium text-gray-500">Preview</div>
        <div class="relative flex p-4 mt-4 bg-gray-50">
          <div class="w-10 h-10 bg-gray-200 rounded"></div>
          <div class="flex flex-col justify-center ml-3 space-y-2">
            <div class="w-40 h-2 bg-gray-200 rounded"></div>
            <div class="w-40 h-2 pr-5">
              <div class="h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="absolute w-5 h-20 border-b border-l border-gray-200 rounded left-9 top-8"></div>
        </div>
        <div class="z-10 pl-12 mt-4">
          <div class="flex">
            <div class="flex flex-col justify-start bg-white border border-gray-300 rounded image">
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div class="flex flex-col ml-3">
              <div class="text-xs font-medium text-gray-800">{{item.title}}</div>
              <div class="flex mt-1">
                <div class="text-xs font-light text-gray-400">{{item.description}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>-->
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
        "Automatically select products for upsell based on the Shopify product recommendation API",
      learn: {
        title: "learn more",
        link:
          "/what-are-smart-auto-upsells-and-how-to-use-them-within-ant-upsell-rock"
      },
      item: {
        title: "Most relevant product",
        description: "You may need this one",
        icon: ""
      },
      smart_auto_upsell: {},
      interval: null,
      creating: false
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
      this.creating = true;
      axios.get("/spa/create_upsell?type=smart-auto").then(res => {
        this.creating = false;
        console.log(res.data);
        this.smart_auto_upsell = res.data;
        this.$router.push("/upsell/" + res.data.id + "/edit");
      });
    }
  }
};
</script>
