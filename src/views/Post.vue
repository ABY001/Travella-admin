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
        <CardTable
          :data="Post"
          :columns="table1Columns"
          @toggleSettingsDrawer="toggleSettingsDrawer"
        ></CardTable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- </div>
  </div> -->
    <AppDrawer
      :showSettingsDrawer="showSettingsDrawer"
      @toggleSettingsDrawer="toggleSettingsDrawer"
    ></AppDrawer>
  </div>
</template>

<script>
import CardTable from "../components/Cards/CardTable";
import AppDrawer from "../components/Drawers/AppDrawer";
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
    CardTable,
    AppDrawer,
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.
      Post: [],

      // Associating "Authors" table columns with its corresponding property.
      table1Columns: table1Columns,

       // Settings drawer visiblility status.
      showSettingsDrawer: false,
    };
  },
  methods: {
    toggleSettingsDrawer(value) {
      this.showSettingsDrawer = value;
    },
  },
  async created() {
    let response = await todos.get("blog/all");
    this.Post = response.data.data;
    console.log(response.data.data);
  },
};
</script>

<style lang="scss"></style>
