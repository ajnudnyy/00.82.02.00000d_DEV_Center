// uPLProjectUUID  项目名称 一般为 g_uProjectUUID

var g_uProjectUUID = 1;

//函数也可以当成参数传递。

function DoPost(url, func, obj, cb) {

  var req = new TRequest();

  console.log(func);
  // exec : function (url, op, obj, cb, err)
  req.exec(url, func, obj,
  // success:
  function(json) {

    cb(json); //cb是一个函数，这里调用了这个函数，然后给了参数。

    return;
  },
  // error:
  function(json) {});
  return;
}

//http://localhost:52491/dev/Handler_Plproject_V1.ashx
// http://dev.top-link.me/dev/Handler_Plproject_V1.ashx

function DoPost_Folder(func, obj, cb) {
  var url = "http://localhost:52491/dev/Handler_Plproject_Folder_V1.ashx";
  return DoPost(url, func, obj, cb);
}

function DoPost_File(func, obj, cb) {
  var url = "http://localhost:52491/dev/Handler_Plproject_File_V1.ashx";
  return DoPost(url, func, obj, cb);
}

function DoPost_Project(func, obj, cb) {
  var url = "http://localhost:52491/dev/Handler_Plproject_V1.ashx";
  return DoPost(url, func, obj, cb);
}

function Plproject_GetRenamefolderTree() {
  var obj = {};

  DoPost_Project("Plproject_GetFileStruct", obj);

  return;

}

//ok
//还需要

function Plproject_Add(id, name) {

  var obj = {
    uDevModelUUID: id, // 智能硬件原型UUID, 为什么不是projected_id
    strPLProjectName: name // PL工程名称
  };

  //输入值与默认值进行替换。

  console.log(obj);

  DoPost_Project("Plproject_Add", obj);

}

// function Plproject_Save(){
//     var obj={
//     };
//     console.log(obj);
//     // DoPost_Project("Plproject_Save",obj);

//     $.each(,function(index,item){});
//     Plproject_File_Save();
// }

//ok
function Plproject_Del(project_id) {

  var obj = {
    uPLProjectUUID: 1 // PL工程UUID
  };

  DoPost_Project("Plproject_Del", obj);

}
// ok
function Plproject_List() {
  var obj = {
    // uPLProjectUUID : 1    // PL工程UUID
  };

  DoPost_Project("Plproject_List", obj, function(json) {
    var item_list = $("#project_list");
    $.each(json.obj, function(index, item) {

      var new_item = document.createElement("option");
      new_item.setAttribute("value", item.uPLProjectUUID);
      new_item.innerHTML = item.strPLProjectName;

      item_list[0].appendChild(new_item);

    })
  });
}

// ok
// 项目的链接以project_id,fold_id,file_id.

function Plproject_GetFileStruct(project_id) {
  var obj = {
    uPlprojectUUID: project_id || g_uProjectUUID // PL项目的项目UUID
  };
  //这个地方传递进去的是一个函数。
  DoPost_Project("Plproject_GetFileStruct", obj, function(json) {
    treeNodes = json.obj;
    initTree();
    console.log("json.obj");
    console.log(json.obj);
  });
}

function Plproject_ReName(parentId, id, name) {
  var obj = {
    uPLProjectUUID: 11, // PL工程UUID
    strPLProjectName: "1" // PL工程名称
    //还差一个拓展名。
  };

  DoPost_Project("Plproject_ReName", obj);
}

function Plproject_Folder_Add(id, name) {
  var obj = {
    uProjectUUID: g_uProjectUUID, // PL工程项目UUID
    uParentFolderUUID: id, // 上级文件夹名称,如果是顶级文件夹,则为0
    strFolderName: name, // 文件夹名称
  };
  //传回来的数据是哪样的？
  DoPost_Folder("Plproject_Folder_Add", obj, function(json) {
    treeNodes = json.obj; //也有可能直接切换。
    initTree();
  });
}

function Plproject_Folder_ReName(fold_id, name) {
  var obj = {
    uPlprojectUUID: g_uProjectUUID,
    uFolderUUID: fold_id,
    strNewFolderName: name
  };

  DoPost_Folder("Plproject_Folder_ReName", obj, function(json) {
    // treeNodes=json.obj;
    // initTree();
    Plproject_GetFileStruct();
  });

}

function Plproject_Folder_Del(fold_id) {
  var obj = {
    uPlprojectUUID: g_uProjectUUID, // 当前PL工程UUID
    uFolderUUID: fold_id // 要删除的文件夹UUID
  };

  DoPost_Folder("Plproject_Folder_Del", obj, function(json) {
    Plproject_GetFileStruct();
    // treeNodes=json.obj;
    // initTree();
  });
}

function Plproject_Folder_List() {
  var obj = {
    uPlprojectUUID: Plproject_Folder_List // PL工程UUID
  };

  DoPost_Folder("Plproject_Folder_List", obj, function(json) {
    Plproject_GetFileStruct();
  });
}

function Plproject_File_Add(folder_id, file_name, file_ext) {
  var obj = {
    uProjectUUID: g_uProjectUUID, // PL工程UUID
    uFolderUUID: folder_id, // 文件夹UUID
    strFileName: file_name, // 文件名称
    strFileExt: file_ext // 文件扩展名
  };

  console.log("obj");
  console.log(obj);

  //数据上传成功之后再拉取数据的列表。
  DoPost_File("Plproject_File_Add", obj, function(json) {
    Plproject_GetFileStruct();
    // treeNodes=json.obj;
    // initTree();
  });
}

function Plproject_File_ReName(id, name, file_ext) {
  var obj = {
    uProjectUUID: g_uProjectUUID, // 工程UUID
    uFileUUID: id, // 文件UUID
    strFileName: name, // 文件名称
    strFileExt: file_ext // 文件扩展名  remane文件的扩展名应该不会改吧。
  };

  DoPost_File("Plproject_File_ReName", obj);
}

function Plproject_File_Del(file_id) {
  var obj = {
    uProjectUUID: g_uProjectUUID, // 所在工程的UUID
    uFileUUID: file_id, // 要删除的文件UUID
  };

  DoPost_File("Plproject_File_Del", obj, function(json) {
    Plproject_GetFileStruct();
  });
}

function Plproject_File_List() {
  var obj = {
    uProjectUUID: 4, // 当前PL项目UUID
    uFolderUUID: 7, // 所在文件夹UUID
  };

  DoPost_File("Plproject_File_List", obj);
}

function Plproject_File_Save(file_id, file_content) {
  // 然后将对应
  var obj = {
    uProjectUUID: g_uProjectUUID, // 当前PL项目UUID
    uFileUUID: file_id, // 所在文件夹UUID
    strFileContent: file_content
  };
  console.log("obj");
  console.log(obj);

  DoPost_File("Plproject_File_Save", obj, function(json) {
    console.log(json.obj[0]); //可能并没有返回值。
    //alert("文件保存成功");
    swal("文件保存成功");
  });
}

function Plproject_File_Details(file_id, callback) {
  var obj = {
    uProjectUUID: g_uProjectUUID, // 当前PL项目UUID
    uFileUUID: file_id // 所在文件夹UUID
  };

  //相当于将json的这个值。
  console.log("Plproject_File_Details.obj");
  console.log(obj);

  DoPost_File("Plproject_File_Details", obj, function(json) {
    console.log("json.obj[0]");
    console.log(json.obj[0]);

    //收到数据之后
    //codemirrordisplay(json.obj[0].strPLProjectFileContent,file_id);

    callback(json.obj[0].strPLProjectFileContent, json.obj[0].strPLProjectFileName);

  });
}

//定义一个数组

//////////////////////////模态框调用函数发送数据///////////////////////////

function Plproject_Tree_File_Add(name, extname) {
  //文件夹的重命名
  Plproject_File_Add(right_Click_Item_fold_id, name, extname);
}

function Plproject_Tree_File_Add_icon(id, name, extname) {
  Plproject_File_Add(id, name, extname);
}
//编辑和重命名好像是一回事。

function Plproject_Tree_File_Edi(name) {
  console.log(right_Click_Item_Id);
  console.log(right_Click_Item_Pid);

  if (right_Click_Item_type) {
    Plproject_File_ReName(right_Click_Item_fold_id, right_Click_Item_file_id, name);
  } else {
    //文件夹的重命名
    Plproject_Folder_ReName(right_Click_Item_fold_id, name);
  }
}

function Plproject_Tree_File_Del() {
  console.log(right_Click_Item_Id);
  console.log(right_Click_Item_Pid);

  //分删除文件或者文件夹
  if (right_Click_Item_type) {
    Plproject_File_Del(right_Click_Item_file_id, name);
  } else {
    Plproject_Folder_Del(right_Click_Item_fold_id, name);
  }
  // Plproject_File_Del(right_Click_Item_Pid,right_Click_Item_Id);
}

function Plproject_Tree_File_List(name) {
  console.log(right_Click_Item_Id);
  console.log(right_Click_Item_Pid);

  Plproject_Folder_List();
}

function Plproject_Tree_File_Con(name) {
  console.log(right_Click_Item_Id);
  console.log(right_Click_Item_Pid);

  //Plproject_File_List(right_Click_Item_Pid,right_Click_Item_Id,name);
  //工程列表，不需要传递参数
  Plproject_List();
}

//编辑和重命名好像是一回事。
function Plproject_Tree_File_Ren(name, extname) {
  //Plproject_File_ReName(right_Click_Item_Pid,right_Click_Item_Id,name);
  Plproject_File_ReName(right_Click_Item_file_id, name, extname);
}

function Plproject_Tree_Fold_Ren(name, extname) {
  Plproject_Folder_ReName(right_Click_Item_fold_id, name, extname);
}

function Plproject_Tree_creat_Fold(name) {
  Plproject_Folder_Add(right_Click_Item_Id, name);
}

function Plproject_Tree_File_Save() {
  console.log(right_Click_Item_Id);
  console.log(right_Click_Item_Pid);

  //var active_id = editorcreat[active_item_index].id;
  Plproject_File_Save(editorcreat[active_item_index].id, editorcreat[active_item_index].codeMirror.getValue());
}

function Plproject_Tree_File_details(itemid) {
  Plproject_File_Details(itemid, function(content, name) {
    console.log("content");
    console.log(content);
    display_new_codemirror_id(itemid, content, name);
  });
}
