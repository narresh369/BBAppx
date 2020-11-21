export class SampleShellModel3 {
    cover: string;
    title: string;
  }
  
  export class SampleShellListingModel3 {
    categories: Array<SampleShellModel3> = [
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
      new SampleShellModel3(),
    ];
  
    constructor(readonly isShell: boolean) { }
  }
  
  
 /*  export class SampleShellModel3 {
  }
  export class SampleShellListingModel3 {
  
     arr = [];
  
    constructor(readonly isShell: boolean) {
      for(let i=1;i<=8;i++){
        this.arr.push({
        "cover":"",       
        "title":""
       });
      }    
     }
     results: Array<SampleShellModel3> = this.arr;
  } */
  