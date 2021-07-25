<template>
  <div
    class="flex flex-col items-center py-6 text-center border-r border-gray-300"
    v-if="plan_id==='' || plan_id===null"
  >
    <div class="font-medium text-2xl">{{ sessions.length }} / {{getPlanSessionCount()}}</div>
    <div class="font-light text-gray-500">Sessions usage</div>
    <div
      class="mt-1 font-light w-auto px-3 py-2 text-sm rounded-sm bg-gray-300 text-gray-600"
    >Your plan</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["plan_id", "sessions"],
  computed: {
    ...mapState({
      user: state => state.upsellrock.user
    })
  },
  methods: {
    getPlanSessionCount() {
      if (this.plan_id === "" || this.plan_id === null) {
        return 200;
      } else if (this.plan_id === 7) {
        return 2000;
      } else if (this.plan_id === 8) {
        return 5000;
      } else if (this.plan_id === 9) {
        return "Unlimited";
      }
    }
  }
};
</script>
