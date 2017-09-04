// uPLProjectUUID  项目名称 一般为 g_uProjectUUID

var g_uProjectUUID = 1;

const plInfo = [
  {
    Pro: 'Plproject',
    DC_url: 'http://dev.top-link.me/dev/Handler_Plproject_V1.ashx',
    Oplist: [
      {
        Op: '_Add',
        OpName: 'Plproject_Add',
      },
      {
        Op: '_DEL',
        OpName: 'Plproject_DEL',
      }
    ]
  },
  {
    Pro: 'UIproject',
    DC_url: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx',
    Oplist: [
      {
        Op: '_Add',
        OpName: 'Uiproject_Add',
      },
      {
        Op: '_DEL',
        OpName: 'Uiproject_DEL',
      }
    ]
  }
]

//函数也可以当成参数传递。
function DoPost(url, func, obj, cb, failcb) {

  var req = new TRequest();
  req.exec(url, func, obj,
  // success:
  function(json) {
    cb(json); //cb是一个函数，这里调用了这个函数，然后给了参数。
    return;
  },
  // error:
  function(json) { failcb(json) });
  return;
}

//ok
//还需要

const getParam = (MeduleInfo) => {
  for(var i = 0; i < plInfo.length; i++){
      if(plInfo[i].Pro == MeduleInfo.modleName){
        let OpItem = {}
        plInfo[i].Oplist.map(function(item){
          if (item.Op == MeduleInfo.op) {
            OpItem = item
            return
          }
        })

        return {
          getDCurl: function(){
            return plInfo[i].DC_url
          },
          getOp: function(){
             return OpItem.OpName
          },
          // {getParams: function(dat){
          //   const redat = {}
          //   for(var _key in OpItem.params){
          //     if (object.hasOwnProperty(_key)) {
          //       for (var variable in dat) {
          //         if (object.hasOwnProperty(variable) && _key = variable) {
          //
          //         }
          //       }
          //     }
          //   }
          //   return {
          //     OpItem.params[g].: OpItem[g].value,
          //
          //   }
          // }}
        }
    }
  }
}

function HandleCreate(MeduleInfo, dat, cb, failcb) {
  console.log('dat ==============', dat)
  DoPost(getParam(MeduleInfo).getDCurl(), getParam(MeduleInfo).getOp(), dat, cb, failcb);

}

export {
  plInfo,
  getParam,
  DoPost,
  HandleCreate
};
