import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private seVal1: any;
  private selectVals1:any;
  private seVal2: any;
  private selectVals2: any;
  private seVal3: any;
  private selectVals3: any;
  private chooseBtnVal: string[];
  private isBtnShow: any;
  private imageUrl1: any = '../../../assets/imgs/kbg.png';
  private imageUrl2: any = '../../../assets/imgs/kbg.png';
  private imageUrl3: any = '../../../assets/imgs/kbg.png';
  private img1: any;
  private imgId1: any;
  private isImgUpload: boolean;
  private loading1: boolean;
  private loading2: boolean;
  private loading3: boolean;
  private img2: any;
  private imgId2: any;
  private userId: string;
  private img3: any;
  private imgId3: any;
  constructor(private httpService: HttpService,
              private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) {
    this.userId = Cookie.load('userId');
    this.chooseBtnVal= ['图片找料','上门取样','寄送样品'];
    this.selectVals1 = ['现货','定制'];
    this.isBtnShow = 0;
    this.seVal1 = this.selectVals1[0];
    this.selectVals2 = [
      {name:'1'},
      {name:'2'},
      {name:'3'},
    ];
    this.seVal2 = this.selectVals2[0].name;
    this.selectVals3 = [
      {name:'1'},
      {name:'2'},
      {name:'3'},
    ];
    this.seVal3 = this.selectVals2[0].name;
  }

  ngOnInit() {
    console.log(this.seVal1);

  }
  //第一个下拉框
  select1Change() {
    console.log(this.seVal1);
  }

  // 切换找料方式
  activeBtn(i){
    this.isBtnShow = i;
  }

  //获取图片
  // 获取图片
  onChangeSelectFile(event,index){
    // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
    if(index===1){
      const file1 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file1.type)){
        alert("请确保文件为图像类型");
        return false;
      }
      const reader1 = new FileReader();
      reader1.readAsDataURL(file1);
      reader1.onload = (e:any)=>{
        //就是base64
        this.img1 = e.target.result;
        this.httpService.post('/find/image/upload',{user_id:this.userId,image:this.img1 }).subscribe((res:any)=>{
          if(res.code>=0){
            this.imageUrl1 = res.data.image_url;
            this.imgId1 = res.data.image_id;
            this.isImgUpload = true;
            this.loading1 = false;
          }else{
            this.loading1 = false;
            alert("网络慢，请稍等！");
          }
        },(error)=>{
          alert("网络慢，请稍等！");
          this.loading1 = false;
        })
      }
      this.imageUrl1 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file1));
    }else if(index===2){
      this.loading2 = true;
      const file2 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file2.type)){
        alert("请确保文件为图像类型");
        return false;
      }
      const reader2 = new FileReader();
      reader2.readAsDataURL(file2);

      reader2.onload = (e:any)=>{
        // 就是base64
        this.img2 = e.target.result;
        this.httpService.post('/find/image/upload',{user_id:this.userId,image:this.img2 }).subscribe((res:any)=>{
          if(res.code>=0){
            this.imageUrl2 = res.data.image_url;
            this.imgId2 = res.data.image_id;
            this.isImgUpload = true;
            this.loading2 = false;
          }else{
            this.loading2 = false;
           alert("网络慢，请稍等！");
          }
        },(error)=>{
          this.loading2 = false;
          alert("网络慢，请稍等！");
        })
      }
      this.imageUrl2 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file2));
    }else if(index===3){
      this.loading3 = true;
      const file3 = event.currentTarget.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file3.type)){
        alert("请确保文件为图像类型");
        return false;
      }
      const reader3 = new FileReader();
      reader3.readAsDataURL(file3);

      reader3.onload = (e:any)=>{
        // 就是base64
        this.img3 = e.target.result;
        this.httpService.post('/find/image/upload',{user_id:this.userId,image:this.img3 }).subscribe((res:any)=>{
          if(res.code>=0){
            this.imageUrl3 = res.data.image_url;
            this.imgId3 = res.data.image_id;
            this.isImgUpload = true;
            this.loading3 = false;
          }else{
            alert("网络慢，请稍等！");
            this.loading3 = false;
          }
        },(error)=>{
          alert("网络慢，请稍等！");
          this.loading3 = false;
        })
      }
      this.imageUrl3 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file3));
    }

    this.cd.markForCheck();
    this.cd.detectChanges();

  }


}
