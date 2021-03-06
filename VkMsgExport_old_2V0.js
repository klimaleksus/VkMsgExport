﻿
"use strict";

'WARNING!! Make sure this is the only original version from https://github.com/klimaleksus/VkMsgExport';

var ScriptVersion='VkMsgExport v2.0',PageHtml=''+
'<body>'+
'<style>textarea[disabled]{background-color:#eee;color:#111;}input,button,textarea,span,i,b,u{margin:3px;}</style>'+
'<div style="display:none;position:fixed;left:0;right:0;top:0;bottom:0;z-index:10;background:#eee;color:#111;" id="mystop">'+
'<table border="0" style="height:100%;width:100%;"><tr><td valign="middle"><table border="0" style="height:75%;width:100%;">'+
'<tr><th valign="middle"><center id="myheader">123</center></th></tr>'+
'<tr><td valign="middle"><center id="myprogress">123</center></td></tr>'+
'<tr><td valign="middle"><center><button id="myabort">Abort</button></center></td></tr>'+
'</table></td></tr></table>'+
'</div>'+
'<div style="display:none" id="myframe"></div>'+
'<h2>'+ScriptVersion+'</h2>'+
'<hr/>'+
'<b>Account: </b>'+
'<button onclick="MyAccountLogin(this);">Login</button> '+
'<u id="myaccount">???</u><i></i>'+
'<b> Messages: </b>'+
'<i id="mymess">0</i> '+
'<button onclick="MyMessagesImport(this);">Import</button> '+
'<button onclick="MyMessagesExport(this);">Export</button> '+
'<button onclick="MyMessagesForget(this);">Forget</button> '+
'<hr/>'+
'<b>Buffer: </b>'+
'<button onclick="MyTextShow(this);">Show</button> '+
'<button onclick="MyTextFree(this);">Free</button> '+
'<button onclick="MyTextStore(this);">Store</button> '+
'<label>Open: <input type="file" id="myfile" onchange="MyFileChange(this);" /></label>'+
'<br/>'+
'<textarea wrap="off" spellcheck="false" id="mybuffer" rows="4" style="width:85%;"></textarea>'+
'<hr/>'+
'<b>List: </b>'+
'<button onclick="MyListFetch(this);">Fetch</button> '+
'<button onclick="MyListLoad(this);">Load</button> '+
'<button onclick="MyListSave(this);">Save</button> '+
'<button onclick="MyListClear(this);">Clear</button> '+
'<br/>'+
'<i>Current: <span id="mydialogs"></span></i>'+
'<hr/>'+
'<b>Selected: </b>'+
'<button onclick="MySelectedCount(this);">Count</button> '+
'<button onclick="MySelectedDownload(this);">Download</button> '+
'<button onclick="MySelectedRaw(this);">Raw</button> '+
'<button onclick="MySelectedTxt(this);">Txt</button> '+
'<br/>'+
'<input type="text" style="width:80%;" id="myids" readonly="readonly" />'+
'<hr/>'+
'<b>Change: </b>'+
'<button onclick="MySelectAll(this);">All</button> '+
'<button onclick="MySelectCancel(this);">Cancel</button> '+
'<button onclick="MySelectInvert(this);">Invert</button> '+
'<i></i><b>Sort: </b>'+
'<button onclick="MySortTime(this);">Time</button> '+
'<button onclick="MySortSize(this);">Size</button> '+
'<button onclick="MySortType(this);">Type</button> '+
'<hr/>'+
'<select multiple="multiple" id="myselect" style="margin:8px;width:90%;" size="16" onchange="MySelectOnchange(this);"></select>'+
'<hr/>'+
'</body>';

var GEBI=function(I){return document.getElementById(I);};

var DownloadText=function(text){
	var e=document.createElement('a');
	e.href=window.URL.createObjectURL(new Blob([text],{type:'application/octet-stream'}));
	e.style.display='none';
	document.body.appendChild(e);
	if(DownloadText.lasturl)window.URL.revokeObjectURL(DownloadText.lasturl);
	DownloadText.lasturl=e.href;
	e.click();
	document.body.removeChild(e);
};

var GetUrl=function(url,post,cb){
	if(GetUrl.StopDownloads)return cb('');
	if(GetUrl.LastRequest){
		var wait=1150-(Date.now()-GetUrl.LastRequest);
		if(wait>0)return setTimeout(function(){GetUrl(url,post,cb);},wait+100);
	}
	GetUrl.LastRequest=Date.now();
	var t=true,f=function(r){if(t){t=false;return cb('');}};
	var x=new XMLHttpRequest();
	x.ontimeout=f;
	x.onerror=f;
	x.onabort=f;
	x.open(post?'POST':'GET',url,true);
	if(post)x.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
	x.setRequestHeader('X-Requested-With','XMLHttpRequest');
	x.onreadystatechange=function(){
		if(+x.readyState===4){
			if(+x.status===200){
				if(t){
					if(GetUrl.StopDownloads)return f();
					t=false;
					cb(''+(x.responseText||x.response));
				}
			}else f();
		}
	};
	return x.send(post?post:null);
};

var StopDownloads=function(abort){
	if(abort===true)GetUrl.StopDownloads=true;
	if(abort===false)GetUrl.StopDownloads=false;
	return !!GetUrl.StopDownloads;
};

var SelectedValues=function(){
	var select=GEBI('myselect');
	var res=[],options=select.options,opt;
	for(var i=0,len=options.length;i<len;i++){
		opt=options[i];
		if(opt.selected)res.push(opt.value||opt.text);
	};
	return res;
};

var SelectedChange=function(action){
	var select=GEBI('myselect');
	var options=select.options,opt;
	for(var i=0,len=options.length;i<len;i++){
		opt=options[i];
		if(action.length)opt.selected=action.indexOf(opt.value)>=0;
		else if(action>0)opt.selected=true;
		else if(action<0)opt.selected=false;
		else opt.selected=!opt.selected;
	};
	SelectOnchange();
};

var SelectFindValue=function(value){
	var select=GEBI('myselect');
	var options=select.options,opt;
	for(var i=0,len=options.length;i<len;i++){
		opt=options[i];
		if(opt.value==value)return opt.text||opt.textContent;
	};
	return '';
};

var SelectOnchange=function(){
	GEBI('myids').value=SelectedValues().join(', ');
};

var HtmlDecode=function(text){
	if(!HtmlDecode.mydiv)HtmlDecode.mydiv=document.createElement('div');
	HtmlDecode.mydiv.innerHTML=text.replace(/\x01/g,' ').replace(/</g,'\x01');
	return HtmlDecode.mydiv.textContent.replace(/\x01/g,'<');
};

var RemakeSelect=function(){
	var name=function(obj,users){
		var id=obj.peer?obj.peer.id:0;
		var got=0,cnt=GetCount(id);
		if(BaseMessages[id])got=Object.keys(BaseMessages[id].messages).length;
		cnt=''+got+'/'+cnt+' ';
		if(obj.chat_settings&&obj.chat_settings.title)return cnt+'['+obj.chat_settings.title+']'+(obj.chat_settings.members_count?' - '+obj.chat_settings.members_count:0);
		if(!id)return cnt+'? '+JSON.stringify(obj);
		var us=users[id];
		if(!us)return cnt+'<'+JSON.stringify(obj)+'>';
		if(us.name)return cnt+'{'+us.name+'} '+us.screen_name;
		return cnt+HumanName(us.first_name,us.last_name,us.screen_name);
	};
	var old=SelectedValues();
	old.push(0);
	var arr=[],str=[];
	for(var i in BaseDialogs)arr.push([i,HtmlDecode(name(BaseDialogs[i],BaseUsers)),BaseDialogs[i]]);
	for(var i in BaseMessages)if(!BaseDialogs[i])arr.push([i,'-'+HtmlDecode(name(BaseMessages[i].dialog,BaseMessages[i].users)),BaseMessages[i].dialog]);
	var testtype=function(c){
		if(c.peer&&c.peer.type)switch(c.peer.type.toLowerCase()){
			case 'user':return 4;
			case 'chat':return 3;
			case 'group':return 2;
			case 'page':return 2;
			case 'email':return 1;
		}
		return 0;
	};
	var testsize=function(c){
		return +c._count;
	};
	var testtime=function(c){
		if(c.last_message&&c.last_message.date)return +c.last_message.date;
		return 0;
	};
	var have=[0,0,0,0,0];
	arr=arr.sort(function(a,b){
		var x,y;
		if(SortingByType){
			x=testtype(a[2]);
			y=testtype(b[2]);
			if(x<y)return SortingByType;
			if(x>y)return -SortingByType;
		}
		if(SortingBySize){
			x=testsize(a[2]);
			y=testsize(b[2]);
			if(x<y)return SortingBySize;
			if(x>y)return -SortingBySize;
		}
		if(SortingByDate){
			x=testtime(a[2]);
			y=testtime(b[2]);
			if(x<y)return SortingByDate;
			if(x>y)return -SortingByDate;
		}
		return 0;
	});
	arr.forEach(function(x){
		have[testtype(x[2])]++;
		str.push('<option value="'+EscapeAttr(x[0])+'">'+EscapeAttr(x[1])+'</option>');
	});
	GEBI('myselect').innerHTML=str.join('');
	GEBI('mydialogs').innerHTML=arr.length+' (users - '+have[4]+', chats - '+have[3]+', groups - '+have[2]+', mails - '+have[1]+', other - '+have[0]+')';
	SelectedChange(old);
	var cnt=0;
	for(var i in BaseMessages)if(BaseMessages[i].messages)cnt+=Object.keys(BaseMessages[i].messages).length;
	GEBI('mymess').innerHTML=''+cnt;
};

var NoDrag=function(e){
	e=e||event;
	if(e.target.id!='myfile'){
		e.preventDefault();
		e.dataTransfer.effectAllowed='none';
		e.dataTransfer.dropEffect='none';
	}
};

var MainStartup=function(){
	if(window.location.host!='vk.com') {
		var url=window.prompt('Domain must be vk.com! Press OK to redirect, then run this script again:','https://vk.com/404');
		if(url) return window.location=url;
	}
	try{document.head.innerHTML='';}catch(e){;};
	try{document.body.outerHTML=PageHtml;}catch(e){document.body.innerHTML=PageHtml;};
	window.removeEventListener('dragover',NoDrag,false);
	window.removeEventListener('drop',NoDrag,false);
	window.addEventListener('dragover',NoDrag,false);
	window.addEventListener('drop',NoDrag,false);
	ListClear();
	StopDownloads(true);
	document.title=ScriptVersion;
};

var GetHashToken=function(method,cb){
	return GetUrl('https://vk.com/dev/'+encodeURI(method),'',function(text){
		if(!text)return cb('');
		var r=text.match(/Dev.methodRun\('(.*?)',/i);
		if(r&&r[1])return cb(r[1]);
		return cb('');
	});
};

var RunMethod=function(name,params,cb){
	var nextcall=function(hash,first){
		var post='act=a_run_method&al=1&hash='+encodeURIComponent(hash)+'&method='+encodeURIComponent(name);
		for(var i in params)post+='&param_'+encodeURIComponent(i)+'='+encodeURIComponent(params[i]);
		return GetUrl('https://vk.com/dev',post,function(res){
			var obj=res?ParseMethodResponse(res):null;
			if(!obj){if(first)return hashcall();return cb('');}
			return cb(obj);
		});
	};
	var hashcall=function(){
		return GetHashToken(name,function(hash){
			if(!hash)return cb('');
			RunMethod['hash.'+name]=hash;
			return nextcall(hash,false);
		});
	};
	var token=RunMethod['hash.'+name];
	if(token)return nextcall(token,true);
	return hashcall();
};

var ParseMethodResponse=function(text){
	if(!text)return null;
	var res=text.match(/\{"response":([^\00]*)}/);
	if(!(res&&res[1])){
		res=text.match(/\{"error":([^\00]*)}/);		
		if(res&&res[1]){
			var obj=null;
			try{obj=JSON.parse(res[1]);}catch(e){obj=null;}
			console.log('error:',obj||text);
			window.alert('API error: '+(obj?JSON.stringify(obj):text));
		}
		return null;
	}
	try{
		return JSON.parse(res[1]);
	}catch(e){
		return null;
	};
};

var DownloadSelf=function(cb){
	return RunMethod('account.getProfileInfo',{v:5.92},function(res){
		if(!res)return cb();
		return cb({first_name:res.first_name,last_name:res.last_name,screen_name:res.screen_name});
	});
};

var HumanName=function(first,last,screen){
	return (first?first:'')+' '+(last?last:'')+(screen?(' ('+screen+')'):'');
};

var ReloginState=function(cb){
	GEBI('myaccount').textContent='???';
	var cnt=6;
	var next=function(){
		DownloadSelf(function(r){
			if(r){
				GEBI('myframe').innerHTML='';
				GEBI('myaccount').textContent=HumanName(r.first_name,r.last_name,r.screen_name);
				return cb(true);
			};
			if(!cnt--||StopDownloads())return cb(false);
			setTimeout(next,1000);
		});
	};
	return next();
};

var ReloginMake=function(cb){
	if(StopDownloads())return cb(false);
	var frame=function(){GEBI('myframe').innerHTML='<iframe src="https://vk.com/dev/methods"></iframe>';};
	frame();
	return ReloginState(function(r){
		if(r)return cb(true);
		frame();
		return ReloginState(function(r){return cb(r);});
	});
};

var DownloadConversationsList=function(offset,count,cb){
	var waserror=false,error=function(){
		if(waserror)return cb(null);
		waserror=true;
		return main();
	},main=function(){
		return RunMethod('messages.getConversations',{offset:+offset,count:+count,v:5.92,extended:1,filter:'all'},function(obj){
			if(!obj)return error();
			if(!obj.count||obj.count<1)return error();
			var fatal=false,arr=obj.items;
			var our=arr.map(function(x){
				if(!x.conversation)return fatal=true;
				x.conversation._count=0;
				x.conversation.last_message=x.last_message;
				return x.conversation;
			});
			if(fatal)return cb(null);
			var us=obj.profiles;
			if(obj.groups)obj.groups.forEach(function(x){x.id=-x.id;us.push(x);});
			return cb(our,us);
		});
	};
	return main();
};

var SetCount=function(id,cnt){
	if(BaseDialogs[id])BaseDialogs[id]._count=cnt;
	if(BaseMessages[id])BaseMessages[id].dialog._count=cnt;
};

var GetCount=function(id){
	var a=BaseDialogs[id]?BaseDialogs[id]._count:0;
	var b=BaseMessages[id]?BaseMessages[id].dialog._count:0;
	if(a<b)a=b;
	SetCount(id,a);
	if(BaseMessages[id]){
		if(!BaseMessages[id].dialog.last_message)BaseMessages[id].dialog.last_message={};
		if(!BaseMessages[id].dialog.last_message.date){
			var m=0;
			for(var i in BaseMessages[id].messages)if(m<BaseMessages[id].messages[i].date)m=BaseMessages[id].messages[i].date;
			BaseMessages[id].dialog.last_message.date=m;
		}
	}
	return a;
};

var BaseDialogs={};
var BaseUsers={};
var BaseMessages={};

var DownloadAllConversations=function(cb,prog){
	var count=80;
	var offset=0,users={},dialogs={};
	var next=function(){
		return DownloadConversationsList(offset,count,function(items,profiles){
			if(!items)return cb(false);
			var len=items.length;
			if(len==0){
				for(var i in dialogs){
					BaseDialogs[i]=dialogs[i];
					GetCount(i);
				}
				for(var i in users)BaseUsers[i]=users[i];
				return cb(true);
			}
			items.forEach(function(x){if(x&&x.peer&&x.peer.id)dialogs[x.peer.id]=x;});
			profiles.forEach(function(x){if(x&&x.id)users[x.id]=x;});
			if(len>count-5)len=count-5;
			offset+=len;
			prog(Object.keys(dialogs).length);
			return next();
		});
	};
	return next();
};

var DialogsSave=function(dialogs,users){
	return DownloadText(JSON.stringify({dialogs:dialogs,users:users}));
};

var EscapeAttr=function(text){
	var m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};
	return text.replace(/['<&>"]/g,function(x){return m[x];});
};

var FillSelect=function(dialogs){
	var arr=[],str=[];
	for(var i in dialogs)arr.push([i,JSON.stringify(dialogs[i].peer)]);
	for(var i=0,len=arr.length;i<len;i++)str.push('<option value="'+EscapeAttr(arr[i][0])+'">'+EscapeAttr(arr[i][1])+'</option>');
	GEBI('myselect').innerHTML=str.join('');
};

var SelectAll=function(){SelectedChange(1);};
var SelectCancel=function(){SelectedChange(-1);};
var SelectInvert=function(){SelectedChange(0);};

var SortingByDate=1;
var SortingBySize=0;
var SortingByType=0;

var SortTime=function(){
	SortingByType=0;
	SortingBySize=0;
	SortingByDate=SortingByDate?-SortingByDate:1;
	RemakeSelect();
};
var SortSize=function(){
	SortingByType=0;
	SortingByDate=0;
	SortingBySize=SortingBySize?-SortingBySize:1;
	RemakeSelect();
};
var SortType=function(){
	SortingByType=SortingByType?-SortingByType:1;
	RemakeSelect();
};

var ListFetch=function(){
	var done=LongAction('Downloading:',function(){
		done('');
		StopDownloads(true);
	});
	done('starting...');
	var attempt=function(first){
		return DownloadAllConversations(function(success){
			if(!success){
				if(first){
					done('trying to login...');
					return ReloginMake(function(success){
						if(success)return attempt(false);
						if(!StopDownloads())window.alert('Error: login failed!');
						StopDownloads(true);
						return done();
					});
				}
				if(!StopDownloads())window.alert('Error: download failed!');			
				StopDownloads(true);
				return done();
			}
			RemakeSelect();
			StopDownloads(true);
			return done();
		},function(cnt){done('dialogs - '+cnt);});		
	};
	StopDownloads(false);
	return attempt(true);
};

var ListLoad=function(){
	var text=BufferGet(),obj;
	if(text.length<1)return;
	try{obj=JSON.parse(text);}catch(e){obj=null};
	if(!obj)return window.alert('JSON parse error!');
	if(!obj.dialogs)return window.alert('Wrong JSON object!');
	BufferSet('');
	BaseDialogs=obj.dialogs;
	for(var i in BaseDialogs){
		if(!BaseDialogs[i]._count)BaseDialogs[i]._count=0;
		GetCount(i);
	}
	BaseUsers=obj.users||{};
	RemakeSelect();
};

var ListSave=function(){
	BufferSet('');
	if(Object.keys(BaseDialogs).length==0)return;
	BufferSet(JSON.stringify({dialogs:BaseDialogs,users:BaseUsers}));
};

var ListClear=function(){
	BaseDialogs={};
	BaseUsers={};
	RemakeSelect();
};

var TextStore=function(){
	var text=BufferGet();
	if(text.length>0)return DownloadText(text);
};

var FileChange=function(file){
	if(file&&file.files&&file.files[0]){
		var reader=new FileReader(),cancel=false;
		var done=LongAction('Reading file...',function(){
			cancel=true;
			done();
			reader.abort();
		});
		reader.onload=function(event){
			if(cancel)return;
			done();
			BufferSet(event.target.result);
			file.value='';
		};
	 reader.readAsText(file.files[0],'utf-8');
	}
};

var TextShow=function(){
	var t=GEBI('mybuffer');
	if(BufferSet.realtext)t.value=BufferSet.realtext;
	BufferSet.realtext='';
	t.disabled=false;
	t.select();
	t.focus();
};

var TextFree=function(me){
	var t=GEBI('mybuffer');
	t.value='';
	t.disabled=false;
	BufferSet.realtext='';
	if(me)t.focus();
};

var BufferGet=function(){
	var t=GEBI('mybuffer');
	if(BufferSet.realtext)return BufferSet.realtext;
	return t.value;
};

var BufferSet=function(text){
	if(text.length==0)return TextFree();
	var t=GEBI('mybuffer');
	if(text.length>32){
		t.value='<'+text.length+'>';
		t.disabled=true;
		BufferSet.realtext=text;
	}else{
		t.value=text;
		t.disabled=false;
		BufferSet.realtext='';
	}
};

var LongAction=function(header,oncancel){
	if(LongAction.IsActive)throw new Error('LongAction');
	var stop=GEBI('mystop');
	GEBI('myheader').textContent=header;
	GEBI('myprogress').textContent='';
	GEBI('myabort').onclick=function(){if(LongAction.IsActive)oncancel();};
	LongAction.IsActive=true;
	stop.style.display='block';
	return function(progress){
		if(!LongAction.IsActive)return;
		if(progress)return GEBI('myprogress').textContent=progress;
		stop.style.display='none';
		GEBI('myabort').onclick=null;
		GEBI('myheader').textContent='';
		GEBI('myprogress').textContent='';
		LongAction.IsActive=false;
	};
};

var TestBlock=function(){
	var done=LongAction('Timeout:',function(){done('');tick=null;});
	var i=0,tick=function(){done(''+(i++));if(tick)setTimeout(tick,100);};
	setTimeout(function(){done('');setTimeout(function(){tick=null;},1000);},5000);
	return tick();
};

var AccountLogin=function(){
	var done=LongAction('Logging in...',function(){
		StopDownloads(true);
		return done('');
	});
	StopDownloads(false);
	return ReloginMake(function(success){
		if(!success&&!StopDownloads())window.alert('Login failed!');
		StopDownloads(true);
		return done('');		
	});
};

var CountOneDialog=function(id,cb){
	return RunMethod('messages.getHistory',{offset:0,count:0,peer_id:id,v:5.92},function(res){
		if(!res)return cb();
		return cb(res.count);
	});
};

var DownloadMessages=function(id,offset,old,cb){
	return RunMethod('messages.getHistory',{offset:offset,count:100,rev:1,extended:1,peer_id:id,v:5.92},function(res){
		if(!res)return cb(false);
		old.messages=old.messages||{};
		old.users=old.users||{};
		if(res.items)res.items.forEach(function(x){old.messages[x.id]=x;});
		if(res.conversations)res.conversations.forEach(function(x){if(x.peer.id==id)old.dialog=x;});
		if(res.profiles)res.profiles.forEach(function(x){old.users[x.id]=x;});
		if(res.groups)res.groups.forEach(function(x){x.id=-x.id;old.users[x.id]=x;});
		if(res.count){old.count=res.count;if(old.dialog)old.dialog._count=res.count;}
		return cb(true);
	});
};

var SelectedCount=function(){
	var arr=SelectedValues();
	var len=arr.length;
	if(len==0)return;
	var done=LongAction('Fetching counters:',function(){
		StopDownloads(true);
		return done('');
	});
	StopDownloads(false);
	var i=0,ok=true;
	var next=function(){
		done(''+(i+1)+' / '+len);
		return CountOneDialog(arr[i],function(cnt){
			if(!cnt){
				if(!ok){
					if(!StopDownloads())window.alert('Error: counting failed!');
					StopDownloads(true);
					RemakeSelect();
					return done();
				}
				ok=false;
				done('trying to login...');
				return ReloginMake(function(success){
					if(success)return next();
					if(!StopDownloads())window.alert('Error: login failed!');
					StopDownloads(true);
					RemakeSelect();
					return done();
				});
			}
			ok=true;
			SetCount(arr[i],cnt);
			if(++i==len||StopDownloads()){
				RemakeSelect();
				StopDownloads(true);
				return done();
			}
			return next();
		});
	};
	return next();
};

var SelectedDownload=function(){
	var arr=SelectedValues();
	var len=arr.length;
	if(len==0)return;
	var done=LongAction('Retrieving messages:',function(){
		StopDownloads(true);
		return done('');
	});
	StopDownloads(false);
	var i=0,old={},offset=0,cur=0;
	var save=function(){
		if(!cur)return;
		if(!BaseMessages[cur])BaseMessages[cur]={messages:{},users:{},dialog:{}};
		if(old.messages)for(var i in old.messages)BaseMessages[cur].messages[i]=old.messages[i];
		if(old.dialog)BaseMessages[cur].dialog=old.dialog;
		if(old.users)for(var i in old.users)BaseMessages[cur].users[i]=old.users[i];
		old.count=old.count||0;
		SetCount(old.count);
	};
	var next=function(){
		cur=arr[i];
		var have=0,need=GetCount(cur);
		if(BaseMessages[cur])have=Object.keys(BaseMessages[cur].messages).length;
		offset=have>2?have-2:0;
		done('task: '+(i+1)+'/'+len+' - messages: '+have+' / '+need);
		return DownloadMessages(cur,offset,old,function(success){
			if(!success){
				done('trying to login...');
				return ReloginMake(function(success){
					if(success)return next();
					if(!StopDownloads())window.alert('Error: login failed!');
					StopDownloads(true);
					RemakeSelect();
					return done();
				});
			}
			save();
			if(Object.keys(BaseMessages[cur].messages).length==have){
				i++;
				old={};
				if(i==len||StopDownloads()){
					StopDownloads(true);
					RemakeSelect();
					return done();
				}	
			}
			return next();
		});
	};
	return next();
};

var MessagesImport=function(){
	var text=BufferGet(),obj;
	if(!text)return;
	try{obj=JSON.parse(text);}catch(e){obj=null;}
	if(!obj)return window.alert('JSON parse error!');
	for(var i in obj){
		if(!obj[i].messages)return window.alert('Wrong JSON object!');
		if(!obj[i].users)obj[i].users={};
		if(!obj[i].dialog)obj[i].dialog={};
		if(!obj[i].dialog._count)obj[i].dialog._count||0;
		BaseMessages[i]=obj[i];
		GetCount(i);
	}
	BufferSet('');
	RemakeSelect();
};

var MessagesExport=function(){
	BufferSet('');
	if(Object.keys(BaseMessages).length==0)return;
	BufferSet(JSON.stringify(BaseMessages));
};

var MessagesForget=function(){
	BaseMessages={};
	RemakeSelect();
};

var SelectedRaw=function(){
	BufferSet('');
	var arr=SelectedValues();
	var obj={};
	arr.forEach(function(x){
		if(BaseMessages[x])obj[x]=BaseMessages[x];
	});
	if(Object.keys(obj).length!=0){
		var res=[];
		for(var i in obj)res.push('"'+i+'":'+JSON.stringify(obj[i]));
		BufferSet('{\n'+res.join(',\n')+'\n}\n');
	}
};

var PrintDate=function(Timestamp,OldDate){
	var Zero=function(Num){
		return(Num>9?(''+Num):('0'+Num));
	};
	var NoteOld='';
	if(OldDate){
		OldDate=Timestamp-OldDate;
		if(OldDate>=0){
			var TimeValues=[60, 60, 24, 30, 12];
			var TimeNames=['sec.','min.','hr.','days.','month.','year.'];
			var Type;
			for(Type=0;Type<5;Type++){
				if(OldDate<TimeValues[Type])
					break;
				OldDate=Math.floor(OldDate/TimeValues[Type]);
			}
			if(OldDate<100)
				NoteOld='; +'+OldDate+' '+TimeNames[Type];
		}
	}
	var Time=new Date(Timestamp*1000);
	return (Time.getFullYear())
		+'-'+Zero(Time.getMonth()+1)
		+'-'+Zero(Time.getDate())
		+', '+Time.getHours()
		+':'+Zero(Time.getMinutes())
		+':'+Zero(Time.getSeconds())
		+NoteOld;
};

var ObjRemove=function(obj,arr){
	var res={};
	for(var i in obj)if(arr.indexOf(i)<0)res[i]=obj[i];
	return res;
};

var RenderTxt=function(obj,title,first){
	var mess=[],users=obj.users,levels;
	var nameproc=function(id){
		var us=users[id];
		if(!us)return '<'+id+'>';
		if(us.name)return '<'+id+': '+HtmlDecode('{'+us.name+'} '+us.screen_name)+'>';
		return '<'+id+': '+HtmlDecode(HumanName(us.first_name,us.last_name,us.screen_name))+'>';
	};
	var actproc=function(act){
		if(!act)return '';
		var txt='ACTION: <'+act.type+'>';
		if(act.member_id&&users[act.member_id]){
			var us=users[act.member_id];
			txt+=' '+HtmlDecode(HumanName(us.first_name,us.last_name,us.screen_name));
		}
		if(act.email)txt+=' ['+HtmlDecode(act.email)+']';
		if(act.text)txt+=' "'+HtmlDecode(act.text)+'"';
		txt+=' '+HtmlDecode(JSON.stringify(ObjRemove(act,['type','email','text'])));
		return txt+'\n';
	};
	var replyproc=function(msg){
		if(!msg)return '';
		var txt='REPLY: ---\n';
		txt+=deepproc(msg);
		return txt+'----------\n';
	};
	var fwdproc=function(arr){
		if(!arr||arr.length==0)return '';
		var txt='';
		arr.forEach(function(a){txt+='QUOTE: ---\n'+deepproc(a);});
		return txt+'----------\n';
	};
	var deepproc=function(x){
		var txt,old=levels;
		levels+='#';
		txt=levels+'{\n'+nameproc(x.from_id||0)+' ('+PrintDate(x.date||0)+') '+':\n'+actproc(x.action)+replyproc(x.reply_message)+fwdproc(x.fwd_messages)+textproc(x.text)+attproc(x.attachments);
		levels=old;
		return txt+levels+'}\n';
	};
	var textproc=function(txt){
		return HtmlDecode(txt)+'\n';
	};
	var photoproc=function(photo){
		if(photo.sizes){
			var sz=photo.sizes.map(function(s){return (s.width*s.height)+('smxyzw'.indexOf(s.type||' '));});
			var min=0,max=0,i,len=photo.sizes.length;
			for(i=1;i<len;i++){
				if(sz[i]<sz[min])min=i;
				if(sz[i]>sz[max])max=i;
			}
			var a=photo.sizes[min].src||photo.sizes[min].url;
			var b=photo.sizes[max].src||photo.sizes[max].url;
			return (photo.text?' "'+HtmlDecode(photo.text)+'"':'')+(photo.width?photo.width:photo.sizes[max].width)+'*'+(photo.width?photo.width:photo.sizes[max].height)+' ( '+a+(a!=b?(' \\ '+b):'')+' )';
		}
		return HtmlDecode(JSON.stringify(photo));
	};
	var attproc=function(att){
		if(!att||att.length==0)return '';
		return att.map(function(a){
			var txt='ATTACHMENT: <'+a.type+'> ';
			switch(a.type){
				case 'photo':txt+=photoproc(a.photo);break;
				default: txt+=HtmlDecode(JSON.stringify(ObjRemove(a,['type'])));
			}
			return txt+'\n';
		}).join('');
	};
	for(var i in obj.messages)mess.push(obj.messages[i]);
	mess=mess.sort(function(a,b){
		var ta=(a.date?a.date:0),tb=(b.date?b.date:0);
		if(ta>tb)return 1;
		if(ta<tb)return -1;
		ta=a.id?a.id:0;
		tb=b.id?b.id:0;
		if(ta>tb)return 1;
		if(ta<tb)return -1;
		return 0;
	});
	var oldtime=0;
	levels='';
	return '\n_____ ===== "'+title+'" ===== _____\n\n'+mess.map(function(x){
		var time=x.date||0;
		var date=PrintDate(time,oldtime);
		oldtime=time;
		return nameproc(x.from_id||0)+' ('+date+') - '+(x.id||0)+':\n'+actproc(x.action)+replyproc(x.reply_message)+fwdproc(x.fwd_messages)+textproc(x.text)+attproc(x.attachments)+'\n';
	}).join('')+'\n_____=====_____\n\n';
};

var SelectedTxt=function(){
	BufferSet('');
	var arr=SelectedValues();
	var obj={};
	arr.forEach(function(x){
		if(BaseMessages[x])obj[x]=BaseMessages[x];
	});
	if(Object.keys(obj).length==0)return;
	var res=[],first=0;
	for(var i in obj)res.push(RenderTxt(obj[i],SelectFindValue(i),first++));
	BufferSet(res.join(''));
};


window.MyMessagesImport=MessagesImport;
window.MyMessagesExport=MessagesExport;
window.MyMessagesForget=MessagesForget;

window.MySelectedDownload=SelectedDownload;
window.MySelectedCount=SelectedCount;
window.MySelectedRaw=SelectedRaw;
window.MySelectedTxt=SelectedTxt;

window.MySelectOnchange=SelectOnchange;
window.MyAccountLogin=AccountLogin;

window.MyTextShow=TextShow;
window.MyTextFree=TextFree;

window.MyFileChange=FileChange;
window.MyTextStore=TextStore;

window.MyListFetch=ListFetch;
window.MyListLoad=ListLoad;
window.MyListSave=ListSave;
window.MyListClear=ListClear;

window.MySelectAll=SelectAll;
window.MySelectCancel=SelectCancel;
window.MySelectInvert=SelectInvert;

window.MySortTime=SortTime;
window.MySortSize=SortSize;
window.MySortType=SortType;

MainStartup();

'WARNING!! Make sure this is the only original version from https://github.com/klimaleksus/VkMsgExport';
