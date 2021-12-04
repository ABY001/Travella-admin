<template>
  <div>
    <!-- <div class="mb-24">
    <div
      class="bg-white border-gray-3"
      style="height: calc(100vh - 89px); border: 1px solid"
    > -->
    <a-row :gutter="24" type="flex">
      <!-- Authors Table Column -->
      <a-col :span="24" class="mb-24">
        <!-- Authors Table Card -->
        <CardPostTable
          :data="Posts"
          :columns="table1Columns"
          :editRecord="editRecord"
          @togglePostDrawer="togglePostDrawer"
          @viewPostRecord="viewPostRecord"
          @editPostRecord="editPostRecord"
          @fetchPosts="fetchPosts"
        ></CardPostTable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- </div>
  </div> -->
    <AppPostDrawer
      :editRecord="editRecord"
      :showPostDrawer="showPostDrawer"
      :editMode="editMode"
      :viewMode="viewMode"
      @togglePostDrawer="togglePostDrawer"
      @fetchPosts="fetchPosts"
    ></AppPostDrawer>
  </div>
</template>

<script>
import CardPostTable from "../components/Cards/CardPostTable";
import AppPostDrawer from "../components/Drawers/AppPostDrawer";
import todos from "../logic";

const table1Columns = [
  {
    title: "Post details",
    dataIndex: "title",
    scopedSlots: { customRender: "title" },
    key: "title",
  },
  {
    title: "Status",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "createdAt" },
    key: "createdAt",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "createdAt2" },
    key: "createdAt2",
  },
  {
    title: "Author",
    dataIndex: "author",
    scopedSlots: { customRender: "author" },
    key: "author",
  },
  {
    title: "",
    scopedSlots: { customRender: "action" },
    width: 30,
  },
];
export default {
  components: {
    CardPostTable,
    AppPostDrawer,
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.
      Posts: [],

      // Associating "Authors" table columns with its corresponding property.
      table1Columns: table1Columns,

      // Associating "Authors" table columns with its corresponding property.
      editRecord: {},

      // Settings drawer visiblility status.
      showPostDrawer: false,

      // Settings drawer visiblility status.
      editMode: false,

      // Settings drawer visiblility status.
      viewMode: false,
    };
  },
  methods: {
    togglePostDrawer(value) {
      this.editMode = false;
      this.viewMode = false;
      this.editRecord = { question: "", answer: "" };
      this.showPostDrawer = value;
    },
    viewPostRecord(value) {
      this.editMode = false;
      this.viewMode = true;
      this.editRecord = value;
      this.showPostDrawer = true;
    },
    editPostRecord(value) {
      this.viewMode = false;
      this.editRecord = value;
      this.showPostDrawer = true;
      this.editMode = true;
    },
    fetchPosts() {
      this.getPosts();
    },
    async getPosts() {
      let response = await todos.get("blog/all");
      this.Posts = response.data.data;
      console.log(response.data.data);
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="scss"></style>
