import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private isSends:boolean = true;
  private isPassWordShow: boolean = true;
  private isAgree: boolean = false;
  private phone: string;
  private code: string;
  private passWord: string;
  private codeFormService: any;
  private sends: number = 60;
  private setIntervalTimer:any;
  constructor(public totastService: TotastService,
              public httpService: HttpService,
              public router: Router) { }

  ngOnInit() {
  }
  // 返回上一级
  goback() {
    window.history.go(-1);
  }

  // 显示隐藏密码
  passWordShow() {
    this.isPassWordShow = !this.isPassWordShow;
  }

  //是否同意协议
  agreeTodo(){
    this.isAgree = !this.isAgree;
  }
  //获取验证码
  getMsgCode(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){

      this.totastService.waring('请输入正确的手机号');
      return false;
    } else {
      const codeParams = {
        user_name:this.phone,
        token:''
      }
      this.httpService.post('/auth/member/exist',codeParams).subscribe((res:any)=>{
        if(res.code<0){
          const params = {
            user_name:this.phone
          }
          this.httpService.get('/auth/member/register/sms',params).subscribe((res:any)=>{
            if(res.code >=0){
              this.totastService.success('短信发送成功');
              this.codeFormService = res.data;
              this.sendsFn();
              console.log(res.data);
            }
          })
        } else{
          this.totastService.error('你注册的手机号已存在！');
        }
      },(error)=>{
        this.totastService.error('网络超时，请稍后！');
      })
    }
  }

  // 注册
  register() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){

      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.isAgree){
      this.totastService.waring('请同意一大批用户协议');
      return false
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('验证码错误');
      return false;
    }

    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.passWord)) || this.passWord==='' || this.passWord === undefined ) {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }

    const params={
      token:'',
      user_name:this.phone,
      user_psw:this.passWord,
      sms_id:this.codeFormService,
      code:Number.parseInt(this.code)
    }
    this.httpService.post('/auth/member/register',params).subscribe((res:any)=>{
      if(res.code>=0){
        this.totastService.success('注册成功');
        this.router.navigate(['login']);
      }else{
        this.totastService.error('注册失败,请稍后再试');
      }
    })
  }


  // 60秒
  sendsFn() {
    this.isSends = !this.isSends;
    if(this.sends > 0){
      this.setIntervalTimer = setInterval(()=>{
        this.sends--;
        console.log();
        if(this.sends<1){
          clearInterval(this.setIntervalTimer);
          this.sends = 60;
          this.isSends = !this.isSends;
        }
      },1000);
    }
  }

  //去协议页面
  // 去协议页面
  goLoginProtocol(event) {
    event.stopPropagation();
    this.router.navigate(['protocol']);
  }
}
