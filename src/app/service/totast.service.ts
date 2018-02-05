import { Injectable } from '@angular/core';

declare var layer: any;

@Injectable()
export class TotastService {

  constructor() { }

  success(msg){
    layer.open({
      content: '<div><img src="../../assets/imgs/success_icon.png"><p>'+msg+'</p></div>'
      ,style: 'background-color:#333; color:#fff; border:none;text-align: center;opacity: .7;' //自定风格
      ,time: 1
    });
  }

  error(msg){
    layer.open({
      content: '<div><img src="../../assets/imgs/error_icon.png"><p>'+msg+'</p></div>'
      ,style: 'background-color:#333; color:#fff; border:none;text-align: center;opacity: .7;' //自定风格
      ,time: 1
    });
  }

  waring(msg){
    layer.open({
      content: '<div><img src="../../assets/imgs/waring_icon.png"><p>'+msg+'</p></div>'
      ,style: 'background-color:#333; color:#fff; border:none;text-align: center;opacity: .7;' //自定风格
      ,time: 2
    });
  }

}
