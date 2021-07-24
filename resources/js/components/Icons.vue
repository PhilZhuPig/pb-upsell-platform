<template>
  <div class="mt-4 grid grid-cols-6 gap-6">
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('badge-check')">
      <img
        src="/images/icons/badge-check.svg"
        alt="badge-check"
        :class="`${cIcon==='badge-check'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      @click="chooseIcon('cursor-click')"
    >
      <img
        src="/images/icons/cursor-click.svg"
        alt="cursor-click"
        :class="`${cIcon==='cursor-click'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('gift')">
      <img
        src="/images/icons/gift.svg"
        alt="gift"
        :class="`${cIcon==='gift'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('plus')">
      <img
        src="/images/icons/plus.svg"
        alt="plus"
        :class="`${cIcon==='plus'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('star')">
      <img
        src="/images/icons/star.svg"
        alt="star"
        :class="`${cIcon==='star'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('mail-open')">
      <img
        src="/images/icons/mail-open.svg"
        alt="mail-open"
        :class="`${cIcon==='mail-open'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      @click="chooseIcon('shield-check')"
    >
      <img
        src="/images/icons/shield-check.svg"
        alt="shield-check"
        :class="`${cIcon==='shield-check'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('sparkles')">
      <img
        src="/images/icons/sparkles.svg"
        alt="sparkles"
        :class="`${cIcon==='sparkles'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('chat')">
      <img
        src="/images/icons/chat.svg"
        alt="chat"
        :class="`${cIcon==='chat'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('key')">
      <img
        src="/images/icons/key.svg"
        alt="key"
        :class="`${cIcon==='key'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('heart')">
      <img
        src="/images/icons/heart.svg"
        alt="heart"
        :class="`${cIcon==='heart'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('thumb-up')">
      <img
        src="/images/icons/thumb-up.svg"
        alt="thumb-up"
        :class="`${cIcon==='thumb-up'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('clock')">
      <img
        src="/images/icons/clock.svg"
        alt="clock"
        :class="`${cIcon==='clock'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      @click="chooseIcon('question-mark-circle')"
    >
      <img
        src="/images/icons/question-mark-circle.svg"
        alt="question-mark-circle"
        :class="`${cIcon==='question-mark-circle'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('emoji-happy')">
      <img
        src="/images/icons/emoji-happy.svg"
        alt="emoji-happy"
        :class="`${cIcon==='emoji-happy'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('eye-off')">
      <img
        src="/images/icons/eye-off.svg"
        alt="eye-off"
        :class="`${cIcon==='eye-off'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('fire')">
      <img
        src="/images/icons/fire.svg"
        alt="fire"
        :class="`${cIcon==='fire'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('truck')">
      <img
        src="/images/icons/truck.svg"
        alt="truck"
        :class="`${cIcon==='truck'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('camera')">
      <img
        src="/images/icons/camera.svg"
        alt="camera"
        :class="`${cIcon==='camera'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      @click="chooseIcon('lightning-bolt')"
    >
      <img
        src="/images/icons/lightning-bolt.svg"
        alt="lightning-bolt"
        :class="`${cIcon==='lightning-bolt'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('bell')">
      <img
        src="/images/icons/bell.svg"
        alt="bell"
        :class="`${cIcon==='bell'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      @click="chooseIcon('color-swatch')"
    >
      <img
        src="/images/icons/color-swatch.svg"
        alt="color-swatch"
        :class="`${cIcon==='color-swatch'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('collection')">
      <img
        src="/images/icons/collection.svg"
        alt="collection"
        :class="`${cIcon==='collection'?'opacity-80':'opacity-40'}`"
      />
    </div>
    <div class="flex justify-center items-center cursor-pointer" @click="chooseIcon('cake')">
      <img
        src="/images/icons/cake.svg"
        alt="cake"
        :class="`${cIcon==='cake'?'opacity-80':'opacity-40'}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["icon"],
  data() {
    return {
      cIcon: ""
    };
  },
  mounted() {
    console.log("icons mounted");
    this.cIcon = this.icon;
  },
  methods: {
    chooseIcon(icon) {
      console.log("chooseIcon:" + icon);
      this.cIcon = icon;
      this.$emit("update:icon", icon);
    }
  }
};
</script>
