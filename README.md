# tv-shows-demo-vue

__Demo:__
https://pooria-h.github.io/tv-shows-demo-vue/

## Setup
```
npm install
npm run serve
OR
npm run build
```

To run Unit-tests:
```
npm run test:unit
```

### Extra Packages used in this project
- axios (I've used this package for handling XHR requests)
- lodash (I've used this package for working with Arrays. It provides methods such as Sort and Reverse which are clean and makes our life easier.)
- ionicons (For Adding Icons)

## Description
The structure used in this project is for high scalable apps. I've made it with Vue CLI, but it has some extra directories such as following items.
<br>
`enums` directory is a place for storing string variables.
<br>
`mixins` directory is a place for keeping reusable codes.
<br>
The files inside `assets/scss/preload` directory load before any other scss files.

For naming CSS classes I've used BEM naming system. But it's partially used and the reason is almost all the styles are "Scoped", Which it means Vue.js will add a hash after each class so writing longer classes such as `.testComponent-wrapper--blue` is unnecessary. 
