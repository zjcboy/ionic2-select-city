# ionic2-select-city
# 基于ionic2的城市下拉选择插件

# 在引用插件的地方，使用事件监听接收数据。
import {Events} from 'ionic-angular';
this.events.subscribe('select:locale', (locale) => {
      this.local = locale[0];
});
