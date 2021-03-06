// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';
import Reqwest from 'reqwest';

const graph_conf = {

    type: 'graphList', // tableList graphList simpleObject complexObject

    EchartStyle: {
        width: '100%',
        height: '450px'
    },

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){

        // 参考echarts 参数
        var option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['模温机','干燥机','机器人']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['中南区','华北区','华东区','华北区','西南大区','港台特别行政区','海外']
              }
            ],
            yAxis : [
              {
                  type : 'value'
              }
            ]
        }

       // 模拟数据
       Reqwest({
            url: '/api/example4',
            data: {},

            type: 'json',
            success: function (data) {
                option.series = data.data;

                option.series.forEach(function(item) {
                    item.type = 'line';
                    item.stack = '总量';
                });
                option.series[0].name = '模温机'
                option.series[1].name = '干燥机'
                option.series[2].name = '机器人'
                callback(option);
            }
        });
    }

};

const Feature = FeatureSetConfig(graph_conf);

export default Feature;
