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
        <CardFAQsTable
          :data="Users"
          :columns="table1Columns"
          :editRecord="editRecord"
          @toggleFAQDrawer="toggleFAQDrawer"
          @viewFAQRecord="viewFAQRecord"
          @editFAQRecord="editFAQRecord"
          @fetchUsers="fetchUsers"
        ></CardFAQsTable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- </div>
  </div> -->
    <AppFAQDrawer
      :editRecord="editRecord"
      :showFAQDrawer="showFAQDrawer"
      :editMode="editMode"
      :viewMode="viewMode"
      @toggleFAQDrawer="toggleFAQDrawer"
      @fetchUsers="fetchUsers"
    >
    </AppFAQDrawer>
  </div>
</template>

<script>
import CardFAQsTable from "../components/Cards/CardFAQsTable";
import AppFAQDrawer from "../components/Drawers/AppFAQDrawer.vue";
import todos from "../logic";

const table1Columns = [
  {
    title: "FAQ details",
    dataIndex: "question",
    scopedSlots: { customRender: "question" },
    key: "question",
  },
  {
    title: "Answer",
    dataIndex: "answer",
    scopedSlots: { customRender: "answer" },
    key: "answer",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "createdAt" },
    key: "createdAt",
  },
  {
    title: "",
    scopedSlots: { customRender: "action" },
    width: 30,
  },
];
export default {
  components: {
    CardFAQsTable,
    AppFAQDrawer,
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.
      Users: [],

      // Associating "Authors" table columns with its corresponding property.
      table1Columns: table1Columns,

      // Associating "Authors" table columns with its corresponding property.
      editRecord: {},

      // Settings drawer visiblility status.
      showFAQDrawer: false,

      // Settings drawer visiblility status.
      editMode: false,

      // Settings drawer visiblility status.
      viewMode: false,
    };
  },
  methods: {
    toggleFAQDrawer(value) {
      this.editMode = false;
      this.viewMode = false;
      this.editRecord = { question: "", answer: "" };
      this.showFAQDrawer = value;
    },
    viewFAQRecord(value) {
      this.editMode = false;
      this.viewMode = true;
      this.editRecord = value;
      this.showFAQDrawer = true;
    },
    editFAQRecord(value) {
      this.viewMode = false;
      this.editRecord = value;
      this.showFAQDrawer = true;
      this.editMode = true;
    },
    fetchUsers() {
      this.getFAQs();
    },
    async getFAQs() {
      let response = await todos.get("faq/all");
      this.Users = response.data.data;
      console.log(response.data.data);
    },
  },
  created() {
    this.getFAQs();
  },
};
</script>

<style lang="scss"></style>
