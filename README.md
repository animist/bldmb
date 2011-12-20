青葉台寮の情報共有用に作った伝言板です

データは Evernote に保持してます
1行が1メッセージになる扱いです。
Web もしくは Mac 版クライアントからノートを変更する事が出来ます
Windows 版クライアントで変更すると行の区切りを見失って大変な事になるようです。
そんな時は慌てず Web で再度編集しなおすと治ります。

動作には、configure.rb ファイルが必要です
下記の情報を入れて下さい。

> configure do
>   set :username, "YOUR_NAME_IS_HERE"
>   set :password, "YOUR_PASSWORD_IS_HERE"
> 
>   set :consumerKey, "YOUR_KEY_IS_HERE"
>   set :consumerSecret, "YOUR_SECRET_IS_HERE"
> 
>   evernoteHost = "www.evernote.com"
>   set :userStoreUrl, "https://#{evernoteHost}/edam/user"
>   set :noteStoreUrlBase, "https://#{evernoteHost}/edam/note/"
> 
>   set :noteGuid, "YOUR_NOTEBOOK_ID_IS_HERE"
> end