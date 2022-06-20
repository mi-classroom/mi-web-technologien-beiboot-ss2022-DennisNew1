<template lang="de">
    <view-port :image-metadata="timelineData"></view-port>
</template>
<script>
import ViewPort from './ViewPort.vue';
import metafile from '@/assets/cda-paintings-2022-04-22.de.json';

export default {
    name: 'timeline-gallery',
    components: {
        ViewPort
    },
    data() {
        return {
           items: metafile.items, 
           timelineData: null
        }
    },
    created() {
        
        // structure idea, height and width in always in m

        this.timelineData = this.processMetadata(this.items);
    },
    methods: {
        processMetadata(data) {
            // first filter out and sort by year
            let sortedData = data.filter(item => item.isBestOf);
            sortedData.sort((a, b) => {return a.metadata.date.localeCompare(b.metadata.date)});

            // create metadata
            let preparedData = [];

            for(let i = 0; i < sortedData.length; i++ ) {
                let item = {};
                item.year = this.parseDate(sortedData[i].metadata.date);
                item.url = sortedData[i].images.overall.images[0].sizes.origin.src;
                item.title = sortedData[i].metadata.title;
                item.artist = sortedData[i].involvedPersons[0].name;
                item.medium = this.noBrackets(sortedData[i].medium);
                item.repository = sortedData[i].repository;
                const size = this.parseArtworkDimension(sortedData[i].dimensions);
                item.size = size;

                // find if that year already exists
                let id = preparedData.findIndex((o) => o.year === item.year)

                if (id >= 0) {
                    preparedData[id].items.push(item);
                } else {
                    preparedData.push({
                        "year": item.year,
                        "items": [ item ]
                    });
                }
            }            
            return preparedData;
        },
        // Returns artwork size in meters from a dimension string
        parseArtworkDimension(dimensionString) {
            // replace everything in brackets
            let cleanDimensions = dimensionString.replaceAll(/(\(.*?\))|(\[.*?\])/g, "")
            // replace commas with dots.
            .replaceAll(",",".")
            // One special case here
            .replaceAll(/X|×/g,"x")
            // sometimes "/" are used insted of "-"
            .replaceAll("/","-")
            // replace everything after "cm" (yes indeed every artwork has that). We don't need values with borders etc.
            .replaceAll(/cm([\s\S]*)$/g, "")
            // There are some cases where no minus for ranges is used, so numbers get tricky.
            .replaceAll(/(\d)(\s+)(\d)/g, "$1-$3")
            // replace everything else not needed, mostly text.
            .replaceAll(/[^x|\-|.|\d]/g, "")        
            
            // only take first value, keep x for now
            .replaceAll(/([^x].*?(?=-))(.*?(?=x|$))/g, "$1")

            let splitDimensions = cleanDimensions.split("x");
            let parsedDimensions;
            if (splitDimensions.length === 1) {
                parsedDimensions = {
                    "isRound": true,
                    "width": splitDimensions[0],
                };
            } else {
                parsedDimensions = {
                    "isRound": false,
                    "width": splitDimensions[0],
                    "height": splitDimensions[1],
                };
            }

            return parsedDimensions;
        },
        parseDate: function (dateString) {
            let splittedDate = dateString.replaceAll(/\D(?!\d+)/g, "")
            .split(" ");

            let parsedDate = splittedDate[0] === "" ? splittedDate[1] : splittedDate[0];
            return parsedDate;
        },
        noBrackets: function (value) {
            return value.replace(/(\(.*?\))|(\[.*?\])/g, "");
        }
    },
    
    
    
}
</script>
<style lang="css">
    
</style>