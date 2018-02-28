import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public isSends:boolean = true;
  public isPassWordShow: boolean = true;
  public isAgree: boolean = false;
  public phone: string;
  public code: string;
  public passWord: string;
  public codeFormService: any;
  public sends: number = 60;
  public setIntervalTimer:any;
  private isNumber: boolean = false;
  constructor(public totastService: TotastService,
              public httpService: HttpService,
              public router: Router,
              public cd: ChangeDetectorRef) { }

  ngOnInit() {
    //alert(1);
    //window.location.reload();
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
    }
    const codeParams = {
      user_name:this.phone,
      token:''
    }

    this.httpService.post('/auth/member/exist',codeParams,(res:any)=>{
      this.isNumber = true;
      const params = {
        phone:this.phone
      }
      if(res.code>=0){
        this.totastService.error('手机号已注册!');
      }else{
        this.httpService.get('/auth/member/register/sms?phone='+ this.phone,params,(ress:any)=>{
          if(ress.code>=0){
            this.sendsFn();
            this.totastService.success('短信发送成功!');
            this.codeFormService = ress.data;
          }else{
            this.totastService.waring('短信发送失败!');
          }
        })
      }
    })
  }

  // 注册
  register() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(!this.phone){
      this.totastService.waring('请输入的手机号');
      return false;
    }
    if(this.isAgree){
      this.totastService.waring('请同意一大批用户协议');
      return false
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('请填写正确的验证码');
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
    /*this.httpService.post('/auth/member/register',params).subscribe((res:any)=>{
      if(res.code>=0){
        //this.totastService.success('注册成功');
        console.log(res);
        this.getUserMsg(res.data);
        //this.router.navigate(['home']);
      }else{
        this.totastService.error('注册失败,请稍后再试');
      }
    },(error)=>{
      console.log(error);
      this.totastService.error('注册失败,请稍后再试');
    })*/
    this.httpService.post('/auth/member/register',params,(res:any)=>{
      if(res.code>=0){
        this.getUserMsg(res.data);
      }else{
        this.totastService.error(res.msg);
      }
    })
  }

  // 60秒
  sendsFn() {
    this.isSends = !this.isSends;
    if(this.sends > 0){
      this.setIntervalTimer = setInterval(()=>{
        this.sends--;
        if(this.sends<1){
          clearInterval(this.setIntervalTimer);
          this.sends = 60;
          this.isSends = !this.isSends;
        }
      },1000);
    }
  }

  // 去协议页面
  goLoginProtocol(event) {
    event.stopPropagation();
    this.router.navigate(['protocol']);
  }

  // 获取用户信息
  getUserMsg(token) {
    const params = {
      token:'',
      member_token:token
    }
    /*this.httpService.get('/auth/member/info?user_id='+id,params).subscribe((res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('username',res.data.user_name,7);
        this.totastService.success('登录成功');
        this.router.navigate(['home']);
      }else{
        this.totastService.error('登录失败');
      }
    })*/
    this.httpService.get('/auth/member/info?member_token='+token,params,(res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('username',res.data.user_name,7);
        this.totastService.success('登录成功');
        this.router.navigate(['home']);
      }else{
        this.totastService.error('登录失败!');
      }

    })
  }
}
