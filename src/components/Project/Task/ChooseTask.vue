<template>
  <div>
    <div class="modal-body">
      <div class="choose-task">
        <div class="search-bar">
          <div>
            <OakText
              v-bind:data="searchCriteria.text"
              id="text"
              placeholder="Type to search by title"
              @change="handleChange"
            />
          </div>
          <div>
            <OakSelect
              v-bind:data="searchCriteria.stageId"
              id="stageId"
              @change="handleChange"
              v-bind:objects="stageDropDown"
            />
          </div>
        </div>
        <div>
          <!-- <div class="header">
          <div></div>
          <div>Task Id</div>
          <div>Type</div>
          <div>Title</div>
        </div> -->
          <div
            v-for="item in view"
            v-bind:key="item._id"
            class="record"
            @click="choose(item._id)"
          >
            <div class="select-radio">
              <div v-if="item._id === chosenItem" class="active" />
            </div>
            <div>{{ item.taskId }}</div>
            <div>{{ item.type }}</div>
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <OakButton
        @click="submit"
        label="Choose selected"
        theme="primary"
        variant="animate in"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import OakButton from '@/oakui/OakButton.vue';
import OakText from '@/oakui/OakText.vue';
import OakSelect from '@/oakui/OakSelect.vue';
import { isEmptyOrSpaces } from '../../../Utils';
export default {
  name: 'ChooseTask',
  components: { OakButton, OakSelect, OakText },
  props: {
    task: Object,
    types: Array,
  },
  data: function() {
    return {
      chosenList: [],
      chosenItem: null,
      searchCriteria: {
        stageId: '',
        text: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getTasks', 'getStagesByProjectId']),
    permittedTasks: function() {
      if (this.types) {
        return this.getTasks.filter(item => this.types.includes(item.type));
      } else {
        return this.getTasks;
      }
    },
    view: function() {
      if (
        isEmptyOrSpaces(this.searchCriteria.text) &&
        isEmptyOrSpaces(this.searchCriteria.stageId)
      ) {
        return this.permittedTasks;
      } else if (isEmptyOrSpaces(this.searchCriteria.stageId)) {
        return this.permittedTasks.filter(item =>
          item.title
            ?.toLowerCase()
            .includes(this.searchCriteria.text.toLowerCase())
        );
      } else if (isEmptyOrSpaces(this.searchCriteria.text)) {
        return this.permittedTasks.filter(
          item => item.stageId === this.searchCriteria.stageId
        );
      } else {
        return this.permittedTasks.filter(item => {
          if (
            item.stageId === this.searchCriteria.stageId &&
            item.title
              ?.toLowerCase()
              .includes(this.searchCriteria.text.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        });
      }
    },
    stageDropDown: function() {
      const stageList = [];
      this.getStagesByProjectId(this.task.projectId).forEach(item =>
        stageList.push({ key: item._id, value: item.name })
      );
      return stageList;
    },
  },
  methods: {
    handleChange: function() {
      this.searchCriteria[event.target.name] = event.target.value;
    },
    choose: function(id) {
      this.chosenItem = id;
    },
    submit: function() {
      this.$emit('choose', this.chosenItem);
    },
  },
};
</script>
<style lang="scss" scoped>
.choose-task {
  display: grid;
  grid-template-rows: auto;
  row-gap: 20px;
  .search-bar {
    display: grid;
    grid-auto-flow: column;
    column-gap: 20px;
  }
  .header,
  .record {
    padding: 10px 0;
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto 1fr;
    column-gap: 20px;
    border-bottom: 1px solid var(--color-background-5);
    user-select: none;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
  }

  .select-radio {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid var(--color-foreground-1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .active {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background-color: var(--color-foreground-1);
    }
  }
}
</style>
