import { Component, OnInit } from '@angular/core';
import { constant_params } from './constants';
import { logger } from '../logger';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})


export class ContentComponent implements OnInit {


  public get_info: Boolean = false;
  public constants: Array<any> = constant_params;
  public name_method: string;
  public called: number;

  constructor() { }

  ngOnInit() {
  }

  get_info_fn() {
    const state = JSON.parse(localStorage.getItem('call_status')); // достаю из стораджа инфо
    if (state === null) {
      return;
    }
    this.name_method = state.method_name;
    this.called = state.called;
    this.get_info = true;

  }

  @logger()
  resizer(item: Object) {

    if (!item.hasOwnProperty('big_flag') || item['big_flag'] === false) {
      item['big_flag'] = true;
    } else {
      item['big_flag'] = false;
    }

    return item;
  }

  @logger()
  clicker() {

  }


}


