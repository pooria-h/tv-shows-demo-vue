<template>
  <div class="home">
    <div class="mb-30">
      <search />
    </div>
    <template v-if="states.isDataFetched">
      <div class="mb-30">
        <h2>{{ names.trans.tvShowsFromBestToWorst }}</h2>
        <horizontal-scroller>
          <box
              v-for="(elem, index) in sortedShows"
              :margin="'0 10px'"
              :no-padding="true"
              :key="index">
            <router-link :to="`${routes.pure.detail}${elem.id}`" class="d-block">
              <div class="singleShow" :style="{ backgroundImage: `url(${elem.image.medium})` }">
                <i class="rank">{{ index + 1 }}</i>
              </div>
            </router-link>
          </box>
        </horizontal-scroller>
      </div>
      <div
          v-for="(list, index) in categorizedLists"
          :key="index"
          class="mb-30">
        <h2>{{ list.name }}</h2>
        <horizontal-scroller>
          <box
              v-for="(elem, index) in list.value"
              :margin="'0 10px'"
              :no-padding="true"
              :key="index">
            <router-link :to="`${routes.pure.detail}${elem.id}`" class="d-block">
              <div
                  class="singleShow"
                  :style="{ backgroundImage: `url(${elem.image.medium})` }"></div>
            </router-link>
          </box>
        </horizontal-scroller>
      </div>
    </template>
    <template v-else>
      <skeleton-loader
          v-for="index in Object.keys(names.trans.genres)"
          :key="index"
          height="300px"
          width="100%"
          class="mb-30" />
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
import HorizontalScroller from '@/components/home/HorizontalScroller.vue';
import Box from '@/components/shared/Box.vue';
import Search from '@/components/shared/Search.vue';
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue';
import URLs from '@/enums/URLs';
import Routes from '@/enums/Routes';
import Names from '@/enums/Names';
import AxiosMixin from '@/mixins/AxiosMixin.vue';

export default {
  name: 'Home',
  mixins: [AxiosMixin],
  components: {
    HorizontalScroller,
    Box,
    Search,
    SkeletonLoader,
  },
  computed: {
    ratedShows() {
      return this.mainList.filter((elem) => elem.rating.average !== null);
    },
    sortedShows() {
      let sorted = _.sortBy(this.ratedShows, 'rating.average', 'desc');
      sorted = _.reverse(sorted);
      return sorted;
    },
  },
  methods: {
    getMainData() {
      this.axiosInstance.get(URLs.shows).then((res) => {
        this.mainList = res.data;
        this.categorizeList();
        this.states.isDataFetched = true;
      }).catch(() => {
        this.states.isDataFetched = true;
      });
    },
    categorizeList() {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(Names.trans.genres)) {
        this.categorizedLists.push({
          name: value,
          value: this.sortedShows.filter((elem) => elem.genres.includes(value)),
        });
      }
    },
  },
  created() {
    this.getMainData();
  },
  data() {
    return {
      mainList: [],
      categorizedLists: [],
      routes: Routes,
      names: Names,
      states: {
        isDataFetched: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.rank {
  display: inline-block;
  position: absolute;
  left: -10px;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  font-weight: bold;
  font-style: normal;
  background-color: $white;
  color: $black;
  line-height: 32px;
  text-align: center;
  border: 1px solid $gray-3;
}
.singleShow {
  position: relative;
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  transition: .2s ease filter;
  filter: brightness(.9);
  &:hover {
    filter: brightness(1);
  }
}
</style>
