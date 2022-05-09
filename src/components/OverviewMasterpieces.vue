<template>
    <div>
        <div class="gallery-container" > 
            <template v-for="item in items"  >
                <div  
                    class="gallery-item" 
                    v-bind:key="item.metadata.id"
                    v-if="item.images.overall"  
                >
                    <div class="img-container">
                        <img class="item-img" :src="item.images.overall.images[0].sizes.medium.src">
                    </div>
                    <div class="item-overlay"> 
                        <div class="item-title"> {{ item.metadata.title | noBrackets}} </div>
                        <div class="item-date"> {{ item.metadata.date| noBrackets}} </div>
                        <div class="item-type"> {{ item.medium | noBrackets}} </div>
                        <div class="item-owner"> {{ item.repository| noBrackets}} </div>
                    </div>
                    
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import metafile from '@/assets/cda-paintings-2022-04-22.de.json';

export default {
    name: 'OverviewMasterpieces',
    data() {
        return {
            mpCount: 0,
            items: metafile.items,
        }
    },
    created() {
        this.items = this.items.filter(item => item.isBestOf);
        this.items.sort((a, b) => {return a.sortingNumber.localeCompare(b.sortingNumber)});
    },
    filters: {
        noBrackets: function (value) {
            let newValue = '';
            if (!value) return "";
            newValue = value.replace(/ *\([^)]*\) */g, "");
            newValue = newValue.replace(/\[.*?\] */g, "");
            return newValue;
        }
    }
}
</script>
<style lang="css">
    html {
        width: 100%;
        height: 100%;
    }

    .gallery-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: 25px 10px;
        width: 100%;
        height: 100%;
        
    }
    .gallery-item {        
        position: relative;
        width: 380px;
        height: 500px;
        overflow: hidden;

    }
    .gallery-item:hover > .item-overlay {
        bottom: 0px; 
    }
    .img-container:after {
        content:'\A';
        position:absolute;
        width:100%; 
        height:100%;
        top:0; left:0;
        background:rgba(0,0,0,0.6);
        opacity:0;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
    }
    .gallery-item:hover > .img-container:after {
        opacity: 1;
    }
    .item-img {
        width: 100%;
        height: 500px;        
        object-fit: cover;
        transition: all 1s;
    }
    .item-overlay {
        position: absolute;
        bottom: -100px;
        background-color: rgba(184, 184, 184, 0.80);
        width: 360px;
        height: 180px;
        font-family: Arial;
        padding: 10px;
        transition: bottom 0.5s;
        word-wrap: break-word;
    }

    .item-title {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 5px;
    }

    .item-date {
        font-size: 12px;
        font-weight: italic;
        padding-bottom: 15px;
    }

    .item-type, .item-owner {
        font-size: 16px;
        opacity: 0;
        transition: all 1s;
    }

    .gallery-item:hover > .item-overlay > .item-type, 
    .gallery-item:hover > .item-overlay >.item-owner {
        opacity: 1;
    }
</style>