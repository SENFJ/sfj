/**
 * 自动生成代码：logic模版
 * 2018年1月17日 
 */
const fs = require('fs');
const common = require('../util/common.js');
const _path='/back-end/src/';

module.exports =  {
  do(time,param,data) {
  	/*
  	创建目录
  	 */
  	let targetDir=think.config('generator_path')+'/'+time+_path+param.mokuainame+'/logic';
  	common.mkdirs(targetDir);
  	let file=targetDir+'/'+param.tablename+'.js';
	  let template=
    "/**\r\n"+
    "*"+param.tablecomment+"\r\n"+
    "*/\r\n"+
		"module.exports = class extends think.Logic {\r\n"+
		"  indexAction() {\r\n"+
		"  }\r\n"+
		"};";
	fs.writeFileSync(file,template);
  }
};
