<template>
<div class="search">
  <div class="wrapper">
    <input
        @blur="onBlur"
        @focusin="onFocus"
        @input="search"
        :value="searchValue"
        type="text"
        class="searchInput"
        placeholder="Search...">
    <ul v-show="states.isListVisible" class="list">
      <li v-if="hasNoResult" class="item--noResult">{{ names.trans.noResult }}</li>
      <li
          v-for="(elem, index) in result"
          class="item"
          :key="index">
        <router-link :to="`${routes.pure.detail}${elem.show.id}`">
          {{ mixItemNameWithDate(elem.show.name, elem.show.premiered) }}
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import Routes from '@/enums/Routes';
import Names from '@/enums/Names';
import URLs from '@/enums/URLs';

export default {
  name: 'Search',
  computed: {
    hasNoResult() {
      return this.result.length === 0 && this.searchValue.length !== 0
          && this.states.isFetchingData === false;
    },
  },
  methods: {
    search: _.debounce(function (event) {
      this.states.isFetchingData = true;
      this.searchValue = event.target.value.trim();
      if (this.searchValue.length === 0) {
        this.result = [];
        return;
      }
      axios.get(URLs.search, { params: { q: this.searchValue } }).then((res) => {
        this.result = res.data;
        this.states.isFetchingData = false;
      }).catch((error) => {
        console.error(error);
        this.states.isFetchingData = false;
      });
    }, 500),
    onBlur() {
      setTimeout(() => {
        this.states.isListVisible = false;
      }, 50);
    },
    onFocus() {
      this.states.isListVisible = true;
    },
    mixItemNameWithDate(name, date) {
      if (date === null) {
        return name;
      }
      return `${name} (${date.substring(0, 4)})`;
    },
  },
  data() {
    return {
      routes: Routes,
      names: Names,
      result: [],
      searchValue: '',
      states: {
        isListVisible: false,
        isFetchingData: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 280px;
  height: 45px;
  z-index: 3;
  @include onTablet {
    width: 100%;
  }
}
.searchInput {
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0 15px;
}
.list {
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: $white;
  border-radius: 10px;
  box-shadow: $boxShadow-default;
}
.item {
  &:hover {
    background-color: $gray-3;
  }
  > a {
    display: block;
    color: $black;
    padding: 15px;
  }
}
.item--noResult {
  padding: 10px 15px;
}
</style>
