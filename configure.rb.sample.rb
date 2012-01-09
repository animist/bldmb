configure do
  set :username, "YOUR ACCOUNT"
  set :password, "YOUR PASSWORD"

  set :consumerKey, "YOUR KEY"
  set :consumerSecret, "YOUR SECRET"

  evernoteHost = "www.evernote.com"
  set :userStoreUrl, "https://#{evernoteHost}/edam/user"
  set :noteStoreUrlBase, "https://#{evernoteHost}/edam/note/"

  set :noteGuid, "YOUR NOTE GUID"
end
