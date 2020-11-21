/* export class SampleShellModel {
  image: string;
  title: string;
  description: string;
}

export class SampleShellListingModel {
  items: Array<SampleShellModel> = [
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel()
  ];

  constructor(readonly isShell: boolean) { }
} */
/* class Namex {
  constructor() { }
  name:{
  first: string;
  last: string;
  }
} */


/* export class Name {
  constructor(
      public first: string,
      public last: string,     
  ){}
}

class Picturex {
  picture:{
  large: string;
  medium: string;
  thumbnail: string;
  }
} */

/* interface picturex
  {
    "large":string;
  "medium":string;
  "thumbnail":string
}

interface namex
{
  "first":string;
"last":string
} */

export interface Namex {
   first: string;
   last: string;
}


export class SampleShellModel {

  
 
  /* gender:string;
  email:string;
  name:"";
  picture:{large:string}; */
  
  /* name:{first: string,
    last: string;}; */
    /* name:{first:string,last:string} */
 /*  "name":namex;
  "picture":picturex; */
  
 /*  image: string;
  title: string;
  description: string; */

 /*  name:{"first":string,"last":string};  
  picture:{"large": string};   */
 /*  [{"gender":"male",
  "name":{"title":"Mr",
  "first":"Patrick",
  "last":"Herrera"},
  "location":{"street":{"number":3813,"name":"The Green"},
  "city":"Cardiff",
  "state":"Gwent",
  "country":"United Kingdom",
  "postcode":"UO24 3RQ",
  "coordinates":{"latitude":"14.9362","longitude":"-103.4737"},
  "timezone":{"offset":"-8:00","description":"Pacific Time (US & Canada)"}},
  "email":"patrick.herrera@example.com",
  "login":{"uuid":"b626d261-d8c5-43eb-a33c-de6217b89b84",
  "username":"bluepeacock859","password":"clemente","salt":"ZHWwo3Sl",
  "md5":"66330d3632697103f0acd652291a9e20",
  "sha1":"ca2fb6dc617b6a2c3e800d9684a88a62aeafcb9c",
  "sha256":"fdf9ab33567e44a44d490cabc3735218ca5d4c400a6ca397ec5e4f5dbf5c33b0"},
  "dob":{"date":"1995-03-21T06:17:59.047Z","age":25},
  "registered":{"date":"2009-09-15T00:53:58.163Z","age":11},
  "phone":"015242 08974","cell":"0703-897-564",
  "id":{"name":"NINO","value":"LW 53 51 03 X"},
  "picture":{"large":"https://randomuser.me/api/portraits/men/17.jpg",
  "medium":"https://randomuser.me/api/portraits/med/men/17.jpg",
  "thumbnail":"https://randomuser.me/api/portraits/thumb/men/17.jpg"},
  "nat":"GB"}] */
 /*  gender:string;
  name:string; */
 /*  name:{title:string,
  first:string,
  last:string
  } */
 /*  name:{"title":string,
  "first":string,
  "last":string
  }
  picture:{"large":string,
  "medium":string,
  "thumbnail":string
} */
}

export class SampleShellListingModel {

   arr = [];
  /* results: Array<SampleShellModel> = [
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel(),
    new SampleShellModel()
  ]; */

  

  constructor(readonly isShell: boolean,cnt:number) {
    for(let i=1;i<=cnt;i++){
      //this.arr.push(new SampleShellModel());
      this.arr.push({
      "gender":"",
      "name":{"title":"Mr","first":"","last":""},
      "location":{"street":{"number":3813,"name":"The Green"},
      "city":"Cardiff","state":"Gwent",
      "country":"United Kingdom","postcode":"UO24 3RQ",
      "coordinates":{"latitude":"14.9362","longitude":"-103.4737"},
      "timezone":{"offset":"-8:00","description":"Pacific Time (US & Canada)"}},
      "email":"",
      "login":{"uuid":"b626d261-d8c5-43eb-a33c-de6217b89b84","username":"bluepeacock859",
      "password":"clemente","salt":"ZHWwo3Sl","md5":"66330d3632697103f0acd652291a9e20",
      "sha1":"ca2fb6dc617b6a2c3e800d9684a88a62aeafcb9c",
      "sha256":"fdf9ab33567e44a44d490cabc3735218ca5d4c400a6ca397ec5e4f5dbf5c33b0"},
      "dob":{"date":"1995-03-21T06:17:59.047Z","age":25},"registered":{"date":"2009-09-15T00:53:58.163Z","age":11},
      "phone":"015242 08974","cell":"0703-897-564","id":{"name":"NINO","value":"LW 53 51 03 X"},
      "picture":{"large":"","medium":"",
      "thumbnail":""},"nat":"GB"});
    }    
   }
   results: Array<SampleShellModel> = this.arr;
}
