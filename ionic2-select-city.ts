import {Page, Modal, NavParams, NavController, ViewController} from 'ionic-angular';
import {ProfileService} from './profile.service';
import {Events} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/ionic2-select-city/ionic2-select-city.html',
  providers: [ProfileService]
})
export class LocaleSelectPage {

  province: any;

  city: any;

  citys: any;

  area: any;

  locales: any;

  LocaleSelect: any;

  constructor(public nav: NavController, public params: NavParams, public view: ViewController, public events: Events, private profile: ProfileService) {
    this.nav = nav;
    this.view = view;
    this.locales = [];
    this.profile = profile;
    this.params = params;
    this.events = events;
  }


  onPageWillEnter() {
    this.province = this.params.get('province');
    this.city = this.params.get('city');
    this.citys = this.params.get('citys');
    this.area = this.params.get('area');

  }

  onPageLoaded() {
    this.profile.loadLocales().then((locales) => {
      this.locales = locales;
    });
  }

  onPageDidLeave() {
    this.citys = undefined;
    this.area = undefined;
    this.province = undefined;
    this.city = undefined;
  }

  selectCity(index, area) {
    if (typeof index === 'number') {
      if (!area) {
        this.province = this.locales[index].name;
        this.citys = this.locales[index].city;
        if (this.citys.length === 1) {
          this.area = this.citys[0].area;
        }
      } else {
        this.city = this.citys[index].name;
        this.area = this.citys[index].area;
      }
      this.nav.push(LocaleSelectPage, { province: this.province, city: this.city, citys: this.citys, area: this.area });
    } else if (typeof index === 'string') {
      let locale = {
        province: this.province,
        city: this.city || this.province,
        district: index,
        str: this.province
      };

      let backIndex = 0;
      if (this.city) {
        backIndex = this.view.index - 3;
      } else {
        backIndex = this.view.index - 2;
      }
      locale.str = locale.city + ' ' + locale.district;
      this.nav.popTo(this.nav.getByIndex(backIndex));
      this.events.publish('select:locale', locale);
    }
  }

}
