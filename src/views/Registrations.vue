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
        <CardUserTable
          :data="Users"
          :columns="table1Columns"
          @toggleSettingsDrawer="toggleSettingsDrawer"
        ></CardUserTable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- </div>
  </div> -->
  </div>
</template>

<script>
import CardUserTable from "../components/Cards/CardUserTable";
// import todos from "../logic";

const table1Columns = [
  {
    title: "Users details",
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
  // {
  //   title: "Author",
  //   dataIndex: "author",
  //   scopedSlots: { customRender: "author" },
  //   key: "author",
  // },
  {
    title: "",
    scopedSlots: { customRender: "action" },
    width: 30,
  },
];
export default {
  components: {
    CardUserTable,
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.
      Users: [],

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
  // async created() {
  //   let response = await todos.get("blog/all");
  //   this.Users = response.data.data;
  //   console.log(response.data.data);
  // },
};
</script>

<style lang="scss"></style>
