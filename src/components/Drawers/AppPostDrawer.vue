<template>
  <!-- Post Drawer -->
  <a-drawer
    class="settings-drawer"
    :closable="false"
    :title="`${editMode ? 'Update' : viewMode ? 'View' : 'Create New'} Post`"
    :visible="showPostDrawer"
    :getContainer="() => wrapper"
    @close="$emit('togglePostDrawer', false)"
  >
    <!-- Post Drawer Close Button -->
    <a-button
      type="link"
      class="btn-close"
      @click="$emit('togglePostDrawer', false)"
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
    <!-- / Post Drawer Close Button -->
    <div>
      <a-textarea
        v-model="record.author"
        :disabled="viewMode"
        placeholder="Post Author"
        :rows="1"
      />
      <div style="margin: 24px 0" />
      <a-textarea
        v-model="record.title"
        :disabled="viewMode"
        placeholder="Post Title"
        :rows="1"
      />
      <div style="margin: 24px 0" />
      <!-- <a-textarea
        v-if="viewMode"
        v-html="record.body"
        :disabled="viewMode"
        placeholder="Post Content"
        :rows="10"
      />
      <div style="margin: 24px 0" /> -->
      <!-- <div class="output ql-snow">
        <div class="ql-editor" v-html="content"></div>
      </div>
      <div style="margin: 24px 0" /> -->

      <div class="example">
        <quill-editor
          class="editor"
          ref="myTextEditor"
          :value="editRecord.body"
          :options="editorOption"
          @change="onEditorChange"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
        <!-- <div class="output code">
          <code class="hljs" v-html="contentCode"></code>
        </div> -->
        <!-- <div class="output ql-snow">
          <div class="ql-editor" v-html="content"></div>
        </div> -->
      </div>
      <div style="margin: 24px 0" />
      <a-row type="flex">
        <a-col :span="24" :md="12">
          <a-upload
            list-type="picture-card"
            id="file"
            :disabled="viewMode"
            :show-upload-list="false"
            @change="handleChange"
          >
            <div>
              <p class="ant-upload-drag-icon">
                <svg
                  width="101"
                  height="101"
                  viewBox="0 0 101 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50.1206" cy="50.377" r="50" fill="#C4C4C4" />
                  <rect
                    x="46.1206"
                    y="23.377"
                    width="12"
                    height="53"
                    fill="white"
                  />
                  <rect
                    x="24.6206"
                    y="55.877"
                    width="12"
                    height="53"
                    transform="rotate(-90 24.6206 55.877)"
                    fill="white"
                  />
                </svg>
              </p>
              <div class="ant-upload-text">ADD COVER PICTURE</div>
            </div>
          </a-upload>
          <p class="ant-upload-hint">
            Note : Total size of cover picture cannot exceed 1056px by 256px .
            Ensure pictures are of good quality.
          </p>
        </a-col>
        <a-col :span="24" :md="12">
          <div v-if="previewVisible || viewMode || editMode">
            <img class="image-preview" :src="record.image" />
          </div>
        </a-col>
      </a-row>

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
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
import todos from "@/logic";
// import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";
// import "highlight.js/styles/tomorrow.css";

// import theme style
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default {
  components: {
    quillEditor,
  },
  props: {
    // Post drawer visiblility status.
    showPostDrawer: {
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
    createMode: {
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
      title: "",
      body: "",
      author: "",
      picture: undefined,
      image: {},
      previewVisible: false,
      previewImage: "",
      wrapper: document.body,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      // content: this.createMode ? "" : this.editRecord.body,
      content: this.editRecord.body,
      // content: !this.viewMode ? this.record.body : "",
    };
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.editRecord.body = value.html;
    }, 466),
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      console.log("target", file);
      // this.imagesArray = file.target.files[0];

      file.preview = await getBase64(file.originFileObj);
      // }
      this.record.image = file.preview;
      this.previewVisible = true;
      // return false;
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange({ file, fileList }) {
      console.log(file);
      this.beforeUpload(file);
      this.image = fileList[0].originFileObj;
      this.fileList = file;
      this.handlePreview(file);
      return false;
    },

    handleReset() {
      this.record.title = "";
      this.record.body = "";
      this.record.author = "";
      this.record.image = "";
    },

    async submit() {
      console.log("lllllllll", this.picture);
      const formData = new FormData();
      formData.append("title", this.record.title);
      formData.append("body", this.editRecord.body);
      formData.append("author", this.record.author);
      formData.append("image", this.record.image);

      console.log(formData);

      try {
        if (this.editMode) {
          let response = await todos.update(
            `blog/${this.record._id}`,
            formData
          );
          console.log(response);
          if (response.data.status === true) {
            this.$emit("togglePostDrawer", false);
            this.$emit("fetchPosts");
          }
        } else {
          let response = await todos.upload("blog/new", formData);
          console.log(response);
          if (response.data.status === true) {
            this.$emit("togglePostDrawer", false);
            this.$emit("fetchPosts");
          }
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        return;
      }
    },
  },
  computed: {
    // content() {
    //   return this.viewMode || this.editMode ? this.record.body : "";
    // },
    editor() {
      return this.$refs.myTextEditor?.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.editRecord.body).value;
    },
    record: {
      get: function () {
        return JSON.parse(JSON.stringify(this.editRecord));
      },
      set: function (newValue) {
        console.log(newValue);
      },
    },
  },
  mounted() {
    // Set the wrapper to the proper element, layout wrapper.
    this.wrapper = document.getElementById("layout-dashboard");
    console.log("this is Quill instance:", this.editor);
  },
  watch: {
    record() {
      console.log("Foo Changed!");
    },
  },
};
</script>

<style lang="scss" scoped>
.example {
  display: flex;
  flex-direction: column;

  .editor {
    height: 15rem;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>
