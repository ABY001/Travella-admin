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
        <CardTable :data="table1Data" :columns="table1Columns"></CardTable>
        <!-- / Authors Table Card -->
      </a-col>
      <!-- / Authors Table Column -->
    </a-row>
    <!-- </div>
  </div> -->
  </div>
</template>

<script>
import CardTable from "../components/Cards/CardTable";

const table1Columns = [
  {
    title: "Ticket details",
    dataIndex: "Ticket",
    scopedSlots: { customRender: "Ticket" },
  },
  {
    title: "Status",
    dataIndex: "Status",
    scopedSlots: { customRender: "Status" },
  },
  {
    title: "Date",
    dataIndex: "Date",
    scopedSlots: { customRender: "Date" },
  },
  {
    title: "Priority",
    dataIndex: "Priority",
    scopedSlots: { customRender: "Priority" },
  },
  {
    title: "",
    scopedSlots: { customRender: "action" },
    width: 30,
  },
];

const table1Data = [
  {
    key: "1",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "HIGH",
  },
  {
    key: "2",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "LOW",
  },
  {
    key: "3",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "NORMAL",
  },
  {
    key: "4",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "NORMAL",
  },
  {
    key: "5",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "NORMAL",
  },
  {
    key: "6",
    Ticket: {
      avatar: "images/face-2.jpg",
      name: "Travella Goes live with new update ",
      email: "Updated 1 day ago",
    },
    Status: {
      job: "Published",
      department: "on 24.05.2019",
    },
    Date: {
      job: "May 26, 2019",
      department: "6:30 PM",
    },
    Priority: "NORMAL",
  },
];

export default {
  components: {
    CardTable,
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.
      table1Data: table1Data,

      // Associating "Authors" table columns with its corresponding property.
      table1Columns: table1Columns,
    };
  },
};
</script>

<style lang="scss"></style>
