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
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-radio-button value="all">ALL</a-radio-button>
            <a-radio-button value="low">LOW</a-radio-button>
            <a-radio-button value="normal">NORMAL</a-radio-button>
            <a-radio-button value="high">HIGH</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
    </template>
    <a-table :columns="columns" :data-source="data" :pagination="true">
      <template slot="Ticket" slot-scope="Ticket">
        <div class="table-avatar-info">
          <!-- <a-avatar shape="square" :src="Ticket.avatar" /> -->
          <div class="avatar-info">
            <h6>{{ Ticket.name }}</h6>
            <p>{{ Ticket.email }}</p>
          </div>
        </div>
      </template>

      <template slot="Status" slot-scope="Status">
        <div class="author-info">
          <h6 class="m-0">{{ Status.job }}</h6>
          <p class="m-0 font-regular text-muted">{{ Status.department }}</p>
        </div>
      </template>

      <template slot="Date" slot-scope="Date">
        <div class="author-info">
          <h6 class="m-0">{{ Date.job }}</h6>
          <p class="m-0 font-regular text-muted">{{ Date.department }}</p>
        </div>
      </template>

      <template slot="Priority" slot-scope="Priority">
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
          <!-- :class="Priority ? 'ant-tag-primary' : 'ant-tag-muted'" -->
          {{ Priority.toUpperCase() }}
        </a-tag>
      </template>

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
            <a-menu-item key="0"><a-icon type="eye" /> View </a-menu-item>
            <a-menu-item key="1"><a-icon type="edit" /> Edit </a-menu-item>
            <a-menu-item key="2" :style="{ color: 'red' }"
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
};
</script>
