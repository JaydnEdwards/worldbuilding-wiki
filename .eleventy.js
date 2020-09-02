const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("./src/css/");

    // Returns pages, sorted by display order
    config.addCollection('pages', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/pages/*.md'));
  });

    config.addCollection('characters', collection => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/characters/*.md'));
  });

    //Should allow me to call collections in multiple figures.
    config.addCollection('allTags', collection => {
      const allCollections = collection.getAll();
      let tagSet = new Set();
      allCollections.forEach(temp => {
          if('tags' in temp.data) {
              for(const tag of temp.data.tags) {
                  tagSet.add(tag);
              }
          }
      });
      return [...tagSet];
  });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
          input: 'src',
          output: 'dist'
        }
      };
  };