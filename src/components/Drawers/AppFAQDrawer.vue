<template>
  <!-- Settings Drawer -->
  <a-drawer
    class="settings-drawer"
    :closable="false"
    :title="`${editMode ? 'Update' : viewMode ? 'View' : 'Create New'} FAQ`"
    :visible="showFAQDrawer"
    :getContainer="() => wrapper"
    @close="$emit('toggleFAQDrawer', false)"
  >
    <!-- Settings Drawer Close Button -->
    <a-button
      type="link"
      class="btn-close"
      @click="$emit('toggleFAQDrawer', false)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
      >
        <g id="close" transform="translate(0.75 0.75)">
          <path
            id="Path"
            d="M7.5,0,0,7.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M0,0,7.5,7.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          />
        </g>
      </svg>
    </a-button>
    <!-- / Settings Drawer Close Button -->
    <div>
      <a-textarea
        v-model="record.question"
        :disabled="viewMode"
        placeholder="Question"
        :rows="1"
      />
      <div style="margin: 24px 0" />
      <a-textarea
        v-model="record.answer"
        :disabled="viewMode"
        placeholder="Answer"
        :rows="10"
      />
      <div style="margin: 24px 0" />
      <a-row v-if="!viewMode">
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <!-- <a-button
            v-if="!editMode"
            :style="{ marginRight: '8px' }"
            @click="handleReset"
          >
            Clear
          </a-button> -->
          <a-button type="primary" html-type="submit" @click="submit">
            Submit
          </a-button></a-col
        ></a-row
      >
    </div>
  </a-drawer>
</template>

<script>
import todos from "@/logic";
export default {
  props: {
    // Settings drawer visiblility status.
    showFAQDrawer: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    viewMode: {
      type: Boolean,
      default: false,
    },
    editRecord: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      question: "",
      answer: "",
      mode: "",
      // record: this.editRecord,
      // record: JSON.parse(JSON.stringify(this.editRecord)),
      // The wrapper element to attach dropdowns to.
      wrapper: document.body,
    };
  },
  computed: {
    // record() {
    //   return this.editMode || this.viewMode
    //     ? JSON.parse(JSON.stringify(this.editRecord))
    //     : { question: "", answer: "" };
    // },

    record: {
      get: function () {
        return this.editMode || this.viewMode
          ? JSON.parse(JSON.stringify(this.editRecord))
          : {};
      },
      set: function (newValue) {
        console.log(newValue);
      },
    },
  },
  watch: {
    record() {
      console.log("Foo Changed!");
    },
  },
  mounted: function () {
    // Set the wrapper to the proper element, layout wrapper.
    this.wrapper = document.getElementById("layout-dashboard");
  },
  methods: {
    handleReset() {
      this.record.question = "";
      this.record.answer = "";
    },
    async submit() {
      const obj = {
        question: this.record.question,
        answer: this.record.answer,
      };
      console.log(obj);
      try {
        if (this.editMode) {
          let response = await todos.update(`faq/${this.record._id}`, obj);
          console.log(response);
          if (response.data.status === true) {
            this.$emit("toggleFAQDrawer", false);
            this.$emit("fetchUsers");
          }
        } else {
          let response = await todos.post("faq/new", obj);
          console.log(response);
          if (response.data.status === true) {
            this.$emit("toggleFAQDrawer", false);
            this.$emit("fetchUsers");
          }
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
