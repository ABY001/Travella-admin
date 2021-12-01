<template>
  <!-- Settings Drawer -->
  <a-drawer
    class="settings-drawer"
    :closable="false"
    title="Create New Post"
    :visible="showSettingsDrawer"
    :getContainer="() => wrapper"
    @close="$emit('toggleSettingsDrawer', false)"
  >
    <!-- Settings Drawer Close Button -->
    <a-button
      type="link"
      class="btn-close"
      @click="$emit('toggleSettingsDrawer', false)"
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
      <a-input
        v-model="author"
        placeholder="Post Author"
      />
      <div style="margin: 24px 0" />
      <a-input
        v-model="title"
        placeholder="Post Title"
      />
      <div style="margin: 24px 0" />
      <a-textarea
        v-model="content"
        placeholder="Post Content"
        :auto-size="{ minRows: 10 }"
      />
      <div style="margin: 24px 0" />
      <a-upload-dragger
        name="file"
        :multiple="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Note : Total size of cover picture cannot exceed 1056PX by 256PX .
          Ensure pictures are of good quality.
        </p>
      </a-upload-dragger>
      <div style="margin: 24px 0" />
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> Submit </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            Clear
          </a-button></a-col
        ></a-row
      >
    </div>
  </a-drawer>
</template>

<script>
export default {
  props: {
    // Settings drawer visiblility status.
    showSettingsDrawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: "",
      content: "",
      author: "",
      // The wrapper element to attach dropdowns to.
      wrapper: document.body,
    };
  },
  mounted: function () {
    // Set the wrapper to the proper element, layout wrapper.
    this.wrapper = document.getElementById("layout-dashboard");
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleReset() {
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
