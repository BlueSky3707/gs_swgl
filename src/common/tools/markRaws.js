import {markRaw} from "vue";

const markRaws = (echart) => {
    const chart = markRaw(echart)

    window.addEventListener("resize", () => {
        if(chart?._dom != null){
            chart.resize();
        }
        // chart.resize();
    });

    return chart
}

export default markRaws
