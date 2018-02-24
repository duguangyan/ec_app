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
      ,time: 3
    });
  }

  waring(msg){
    layer.open({
      content: '<div><img src="../../assets/imgs/waring_icon.png"><p>'+msg+'</p></div>'
      ,style: 'background-color:#333; color:#fff; border:none;text-align: center;opacity: .7;' //自定风格
      ,time: 3
    });
  }

  confirm(msg,fun){
    layer.open({
      title: [
        msg,
        'background-color:#8DCE16; color:#fff;'
      ]
      ,anim: 'up'
      ,content: '展现的是全部结构'
      ,btn: ['确认', '取消']
      ,yes:(index) => {
        layer.close(index);
        fun();
      }
    });
  }

  open(msg,fun){
    layer.open({
      title: [
        '',
        'background-color:#8DCE16; color:#fff; display:none'
      ]
      ,anim: 'up'
      ,content: msg
      ,btn: ['确认']
      ,yes:(index)=>{
        layer.close(index);
        fun();
      }
    });
  }
}
