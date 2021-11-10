<template>
  <div class="detail">
    <div class="mb-30">
      <div class="head">
        <search class="flex-grow" />
        <div class="navButtonsWrapper">
          <button
              @click="$router.go(-1)"
              class="navButton"
              type="button">
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span>Back</span>
          </button>
          <button
              @click="$router.push('/')"
              class="navButton"
              type="button">
            <ion-icon name="home-outline"></ion-icon>
            <span>Main page</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="states.isDataFetched" class="wrapper">
      <h1 class="mb-30">{{ mainData.name }}</h1>
      <div class="head">
        <template v-if="mainData.image !== null">
          <div
              class="imageWrapper"
              :style="{backgroundImage: `url(${mainData.image.medium})`}"></div>
          <img :src="mainData.image.original" class="imageOnMobile">
        </template>
        <box class="flex-grow">
          <p v-html="mainData.summary === null ? 'No description' : mainData.summary"></p>
        </box>
      </div>
      <box class="mt-30 mb-30">
        <table class="info">
          <tr v-if="mainData.rating.average !== null">
            <th class="info-key">Rating</th>
            <td class="info-value">
              {{ mainData.rating.average }}
            </td>
          </tr>
          <tr v-if="mainData.genres.length !== 0">
            <th class="info-key">Genres</th>
            <td class="info-value">
              {{ mainData.genres.join(', ') }}
            </td>
          </tr>
          <tr v-if="mainData.language !== null">
            <th class="info-key">Language</th>
            <td class="info-value">
              {{ mainData.language }}
            </td>
          </tr>
          <tr v-if="mainData.status !== null">
            <th class="info-key">Status</th>
            <td class="info-value">
              {{ mainData.status }}
            </td>
          </tr>
          <tr v-if="mainData.runtime !== null">
            <th class="info-key">Runtime</th>
            <td class="info-value">
              {{ mainData.runtime }}
            </td>
          </tr>
          <tr v-if="mainData.premiered !== null">
            <th class="info-key">Premiered</th>
            <td class="info-value">
              {{ mainData.premiered }}
            </td>
          </tr>
          <tr v-if="mainData.schedule !== null">
            <th class="info-key">Schedule</th>
            <td class="info-value">
              Each {{ mainData.schedule.days.join(', ') }}
              <template v-if="mainData.schedule.time !== ''">
                at {{ mainData.schedule.time }}
              </template>
            </td>
          </tr>
          <tr v-if="mainData.network !== null">
            <th class="info-key">Channel's name</th>
            <td class="info-value">
              {{ mainData.network.name }}
            </td>
          </tr>
          <tr v-if="mainData.officialSite !== null">
            <th class="info-key">Official Site</th>
            <td class="info-value">
              <a :href="mainData.officialSite" target=”_blank”>Link</a>
            </td>
          </tr>
          <tr v-if="mainData.url !== null">
            <th class="info-key">Link on TV Maze</th>
            <td class="info-value">
              <a :href="mainData.url" target=”_blank”>Link</a>
            </td>
          </tr>
        </table>
      </box>
    </div>
    <skeleton-loader v-else height="500px" width="100%" />
  </div>
</template>

<script>
import URLs from '@/enums/URLs';
import Search from '@/components/shared/Search.vue';
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue';
import Box from '@/components/shared/Box.vue';
import AxiosMixin from '@/mixins/AxiosMixin.vue';

export default {
  name: 'Detail',
  mixins: [AxiosMixin],
  components: {
    Search,
    SkeletonLoader,
    Box,
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  watch: {
    id() {
      this.getMainData();
    },
  },
  methods: {
    getMainData() {
      this.axiosInstance.get(`${URLs.singleShow}${this.id}`).then((res) => {
        this.mainData = res.data;
        this.states.isDataFetched = true;
      }).catch(() => {
        this.states.isDataFetched = true;
      });
    },
  },
  created() {
    this.getMainData();
  },
  data() {
    return {
      mainData: {},
      showsList: [],
      states: {
        isDataFetched: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
}
.info-key, .info-value {
  border: 1px dashed $gray-3;
  padding: 15px;
}
.info-key {
  text-align: left;
}
.head {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}
.imageWrapper {
  border-radius: 10px;
  overflow: hidden;
  min-width: 150px;
  min-height: 200px;
  background-color: $gray-3;
  background-size: cover;
  background-position: center;
  @include onTablet {
    display: none;
  }
}
.imageOnMobile {
  width: 100%;
  display: none;
  border-radius: 10px;
  @include onTablet {
    display: block;
  }
}
.navButton {
  border: none;
  background-color: $blue;
  color: $white;
  border-radius: 10px;
  line-height: 45px;
  height: 45px;
  padding: 0 10px;
  margin-left: 10px;
  filter: brightness(1);
  transition: .2s ease filter;
  > span {
    margin-left: 5px;
    @include onTablet {
      display: none;
    }
  }
  &:hover {
    filter: brightness(1.1);
  }
}
.head {
  display: flex;
  @include onTablet {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
