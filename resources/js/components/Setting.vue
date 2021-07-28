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
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >Ant Upsell Rocks</router-link>
                <router-link
                  to="/setting"
                  class="bg-gray-900 text-white block px-3 py-2 rounded-md text-sm font-medium"
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
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >Ant Upsell Rocks</router-link>
          <router-link
            to="/setting"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
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
    <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- color -->
      <div class="flex flex-col pb-6 border-b border-gray-300">
        <div class="font-bold">Color</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Select the color of the main button (Continue to Cart) on the pop-up window.</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex">
          <div class="border border-gray-300 px-1 pt-1 rounded-xl">
            <v-swatches swatches="text-advanced" v-model="form.primary_color"></v-swatches>
          </div>
          <input
            type="text"
            name="bg-color"
            id="bg-color"
            v-model="form.primary_color"
            class="ml-2 w-40 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <!-- Custom Wording & Translation -->
      <div class="flex flex-col py-6 border-b border-gray-300">
        <div class="font-bold">Custom Wording & Translation</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Customize or translate the wording of the pop-up window.</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex flex-col">
          <!-- title -->
          <div class="flex flex-col">
            <div class="text-sm text-gray-800">Title (max. 50 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                v-model="form.title"
                placeholder="Get extras for your product"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Title that appears on the top of the pop-up window.</div>
          </div>

          <!-- Button add to cart -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Add to Cart (max. 20 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="add_to_cart"
                id="add_to_cart"
                v-model="form.add_to_cart"
                placeholder="Add"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <!-- Button added to cart -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Added to Cart (max. 20 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="added_to_cart"
                id="added_to_cart"
                v-model="form.added_to_cart"
                placeholder="Added"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Appears when upsell product is added to cart.</div>
          </div>

          <!-- Button upgrade -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Upgrade (max. 30 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="upgrade"
                id="upgrade"
                v-model="form.upgrade"
                placeholder="Upgrade"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <!-- Button upgraded -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Upgraded (max. 30 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="upgraded"
                id="upgraded"
                v-model="form.upgraded"
                placeholder="Upgraded"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Appears when upgrade product is added to cart.</div>
          </div>

          <!-- Button continue -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Continue to Cart (max. 30 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="proceed_to_cart"
                id="proceed_to_cart"
                v-model="form.proceed_to_cart"
                placeholder="Continue"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Bottom button on the pop-up window which leads customer to the cart or checkout page.</div>
          </div>

          <!-- Button back -->
          <div class="flex flex-col mt-4">
            <div class="text-sm text-gray-800">Button -- Back (max. 50 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="back"
                id="back"
                v-model="form.back"
                placeholder="Back"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Back button displayed on the product offer detail page.</div>
          </div>

          <!-- Cart -->
          <div class="flex flex-col mt-4">
            <div
              class="text-sm text-gray-800"
            >Cart -- Discount AMOUNT will be applied at checkout (max. 100 chars)</div>
            <div class="mt-1">
              <input
                type="text"
                name="cart_discount_note"
                id="cart_discount_note"
                v-model="form.cart_discount_note"
                placeholder="Discount AMOUNT will be applied at checkout"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Discount info displayed on the cart page.</div>
          </div>
        </div>
      </div>

      <!-- Button Action Settings -->
      <div class="flex flex-col py-6 border-b border-gray-300">
        <div class="font-bold">Button Action Settings</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Customize the click behavior of the buttons on the pop-up.</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex flex-col">
          <!-- contiue button action -->
          <div class="flex flex-col">
            <div class="text-sm text-gray-800">Continue button action</div>
            <div class="mt-1">
              <select
                id="continue_action"
                name="continue_action"
                v-model="form.continue_action"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value>Default</option>
                <option value="redirect_to_cart">Redirect to cart</option>
                <option value="redirect_to_checkout">Redirect to checkout</option>
                <option value="close">Close</option>
              </select>
            </div>
          </div>

          <!-- contiue button action -->
          <div class="mt-4 flex flex-col">
            <div class="text-sm text-gray-800">Close (x) button action</div>
            <div class="mt-1">
              <select
                id="close_action"
                name="close_action"
                v-model="form.close_action"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value>Default</option>
                <option value="redirect_to_cart">Redirect to cart</option>
                <option value="redirect_to_checkout">Redirect to checkout</option>
                <option value="close">Close</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Appearance -->
      <div class="flex flex-col py-6 border-b border-gray-300">
        <div class="font-bold">Custom Appearance</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Override our styles to make the pop-up match the rest of your site.</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex flex-col">
          <!-- custom css -->
          <div class="flex flex-col">
            <div class="text-sm text-gray-800">Custom CSS</div>
            <div class="mt-1">
              <textarea
                id="custom-css"
                name="custom-css"
                rows="6"
                v-model="form.custom_css"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Your custom CSS that will be used for the pop-up window.</div>
          </div>

          <!-- custom js -->
          <div class="mt-4 flex flex-col">
            <div class="text-sm text-gray-800">Custom JS</div>
            <div class="mt-1">
              <textarea
                id="custom-JS"
                name="custom-JS"
                rows="6"
                v-model="form.custom_js"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div
              class="mt-1 text-sm text-gray-500 font-light"
            >Your custom Javascript that will be used for the pop-up window.</div>
          </div>
        </div>
      </div>

      <!-- Limit Pop-up Views -->
      <div class="flex flex-col py-6 border-b border-gray-300">
        <div class="font-bold">Limit Pop-up Views</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Set the maximum number of pop-up views per one browsing session.</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex flex-col">
          <!-- Number of pop-up views per session -->
          <div class="flex flex-col">
            <div class="text-sm text-gray-800">Number of pop-up views per session</div>
            <div class="mt-4 flex flex-col space-y-4">
              <div class="flex items-center">
                <input
                  id="unlimited-session"
                  name="unlimited-session"
                  type="radio"
                  :value="true"
                  v-model="unlimited"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  for="unlimited-session"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >Unlimited</label>
              </div>
              <div class="flex items-center">
                <input
                  id="unlimited-session"
                  name="unlimited-session"
                  type="radio"
                  :value="false"
                  v-model="unlimited"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  for="unlimited-session"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >Maximum number</label>
              </div>
              <div class="flex items-center" v-if="!unlimited">
                <input
                  type="number"
                  name="max_popup_session_views"
                  id="max_popup_session_views"
                  v-model="form.max_popup_session_views"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- auto conversion -->
      <div class="flex flex-col py-6 mb-40">
        <div class="font-bold">Currency auto conversion</div>
        <div
          class="text-sm text-gray-600 font-light py-2"
        >Auto set the currency by customer's location</div>
        <div class="mt-2 rounded shadow bg-white p-6 flex flex-col">
          <!-- Number of pop-up views per session -->
          <div class="flex flex-col">
            <div class="flex flex-col space-y-4">
              <div class="flex items-center">
                <input
                  id="conversion-yes"
                  name="conversion-yes"
                  type="radio"
                  :value="true"
                  v-model="form.auto_conversion"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label for="conversion-yes" class="ml-3 block text-sm font-medium text-gray-700">YES</label>
              </div>
              <div class="flex items-center">
                <input
                  id="conversion-no"
                  name="conversion-no"
                  type="radio"
                  :value="false"
                  v-model="form.auto_conversion"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label for="conversion-no" class="ml-3 block text-sm font-medium text-gray-700">NO</label>
              </div>
              <div class="flex flex-col">
                <div class="flex">
                  <div
                    @click="gotoCCA"
                    class="flex items-center px-5 py-3 rounded-sm shadow w-auto cursor-pointer border-green-700 bg-green-600 text-white text-sm font-light hover:bg-green-700"
                  >
                    <svg
                      class="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Integrate with
                    <span
                      class="font-base italic"
                    >Currency Converter Ant</span>
                  </div>
                  <div class="flex-1"></div>
                </div>
                <p class="mt-2 text-sm text-gray-500 font-light">
                  Integrate with
                  <span class="italic">Currency Converter Ant</span> to obtain 170+ currency conversion capabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end content -->

    <!-- footer -->
    <footer class="fixed bottom-0 left-0 w-full h-16 bg-gray-50 border-t-2 border-gray-300">
      <div class="px-4 py-3 bg-gray-50 flex justify-end">
        <div class="flex items-center justify-end">
          <div
            v-if="updated_success"
            class="flex-1 mr-4 text-gray-700 text-sm justify-center items-center"
          >updated!</div>
          <div
            @click.prevent="updateSetting"
            class="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >Save</div>
        </div>
      </div>
    </footer>
    <!-- end footer -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";
export default {
  components: {
    VSwatches
  },
  data() {
    return {
      unlimited: true,
      updated_success: false,
      form: {}
    };
  },
  computed: {
    ...mapState({
      setting: state => state.upsellrock.setting
    })
  },
  mounted() {
    console.log("setting mounted");
    this.getSetting();
  },
  methods: {
    getSetting() {
      axios.get("/spa/setting").then(res => {
        this.form = res.data;
        this.$store.commit("upsellrock/SET_SETTING", { setting: res.data });
        if (this.form.max_popup_session_views > 0) {
          this.unlimited = false;
        }
      });
    },
    updateSetting() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      });
      if (this.unlimited === true) {
        this.form.max_popup_session_views = 0;
      }
      axios
        .put("/spa/setting", this.form)
        .then(res => {
          this.$store.commit("upsellrock/SET_SETTING", { setting: res.data });
          loader.hide();
          this.updated_success = true;
          setTimeout(() => {
            this.updated_success = false;
          }, 2000);
        })
        .catch(error => {
          loader.hide();
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
