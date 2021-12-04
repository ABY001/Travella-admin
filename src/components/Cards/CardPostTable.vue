<template>
  <!-- Authors Table Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ padding: 0 }"
  >
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">All Posts</h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <a-button type="primary" @click="$emit('togglePostDrawer', true)"
            >Create Post
          </a-button>
        </a-col>
      </a-row>
    </template>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="_id"
      :pagination="true"
    >
      <!-- 
      <template slot="title" slot-scope="title">
        <div class="author-info">
          <h6 class="m-0">Published</h6>
          <p class="m-0 font-regular text-muted">on {{ title }}</p>
        </div>
      </template> -->

      <template slot="createdAt" slot-scope="createdAt">
        <div class="author-info">
          <h6 class="m-0">Published</h6>
          <p class="m-0 font-regular text-muted">
            on {{ convertTime(createdAt) }}
          </p>
        </div>
      </template>

      <template slot="createdAt2" slot-scope="createdAt">
        <div class="author-info">
          <h6 class="m-0">{{ convertTime1(createdAt) }}</h6>
          <p class="m-0 font-regular text-muted">
            {{ convertTime2(createdAt) }}
          </p>
        </div>
      </template>

      <template slot="author" slot-scope="author">
        <div class="author-info">
          <h6 class="m-0">{{ author }}</h6>
        </div>
      </template>

      <!-- <template slot="Priority" slot-scope="Priority">
        <a-tag
          class="tag-status"
          :color="
            Priority === 'HIGH'
              ? 'red'
              : Priority === 'LOW'
              ? 'yellow'
              : 'green'
          "
        >
          {{ Priority.toUpperCase() }}
        </a-tag>
      </template> -->

      <template slot="action" slot-scope="row">
        <!-- <a-button type="link" :data-id="row.key" class="btn-edit">
          Edit
        </a-button> -->

        <a-dropdown :data-id="row.key" :trigger="['click']">
          <a
            class="ant-dropdown-link"
            :style="{
              fontWeight: 'bold',
              fontSize: '17.5px',
              color: '#C5C7CD',
            }"
            @click="(e) => e.preventDefault()"
          >
            <a-icon type="more" :style="{ color: '#000000' }" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0" @click="viewRecord(row)"
              ><a-icon type="eye" /> View
            </a-menu-item>
            <a-menu-item key="1" @click="editRecord(row)"
              ><a-icon type="edit" /> Edit
            </a-menu-item>
            <a-menu-item
              key="2"
              @click="deleteRecord(row)"
              :style="{ color: 'red' }"
              ><a-icon type="delete" /> Delete
            </a-menu-item>
          </a-menu></a-dropdown
        >
      </template>
    </a-table>
  </a-card>
  <!-- / Authors Table Card -->
</template>

<script>
import moment from "moment";
import todos from "@/logic";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: "all",
    };
  },
  methods: {
    viewRecord(row) {
      console.log(row);
      this.$emit("viewPostRecord", row);
    },
    editRecord(row) {
      console.log(row);
      this.$emit("editPostRecord", row);
    },
    async deleteRecord(row) {
      console.log(row);
      try {
        let response = await todos.delete(`blog/${row._id}`);
        console.log(response.data);
        if (response.data.status === true) {
          this.$notification.success({
            message: "Success",
            description: "Deleted successfully",
          });
          this.$emit("fetchPosts");
        }
      } catch (error) {
        const { response } = error;
        console.log(response);
        return;
      }
    },
    convertTime(time) {
      if (!time) {
        return;
      }
      return moment(time).format("L");
    },
    convertTime1(time) {
      if (!time) {
        return;
      }
      return moment(time).format("LL");
    },
    convertTime2(time) {
      if (!time) {
        return;
      }
      return moment(time).format("LT");
    },
  },
};
</script>
