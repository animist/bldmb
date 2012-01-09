# vim:set fileencoding=utf-8 :#

before do
  userStoreTransport = Thrift::HTTPClientTransport.new(options.userStoreUrl)
  userStoreProtocol = Thrift::BinaryProtocol.new(userStoreTransport)
  userStore = Evernote::EDAM::UserStore::UserStore::Client.new(userStoreProtocol)

  versionOK = userStore.checkVersion("Ruby EDAMTest",
                                  Evernote::EDAM::UserStore::EDAM_VERSION_MAJOR,
                                  Evernote::EDAM::UserStore::EDAM_VERSION_MINOR)

  # Authenticate the user
  begin
    authResult = userStore.authenticate(options.username, options.password,
                                        options.consumerKey, options.consumerSecret)
  rescue Evernote::EDAM::Error::EDAMUserException => ex
    # See http://www.evernote.com/about/developer/api/ref/UserStore.html#Fn_UserStore_authenticate
    parameter = ex.parameter
    errorCode = ex.errorCode
    errorText = Evernote::EDAM::Error::EDAMErrorCode::VALUE_MAP[errorCode]
  end

  user = authResult.user
  @authToken = authResult.authenticationToken

  noteStoreUrl = options.noteStoreUrlBase + user.shardId
  noteStoreTransport = Thrift::HTTPClientTransport.new(noteStoreUrl)
  noteStoreProtocol = Thrift::BinaryProtocol.new(noteStoreTransport)
  @noteStore = Evernote::EDAM::NoteStore::NoteStore::Client.new(noteStoreProtocol)

  @note = @noteStore.getNote(@authToken, options.noteGuid, true, true, true, true)
end

get '/' do
  erb :index
end

post '/add' do
  ncn = Nokogiri::XML.parse(@note.content)
  tgt = ncn.xpath('//en-note').last.inner_html
  tgt += "\n" if tgt.slice(tgt.size - 1, 1) != "\n"
  tgt += "<div>#{params[:subject]}</div>"
  ncn.xpath('//en-note').last.inner_html = tgt
  @note.content = ncn.to_xml
  @noteStore.updateNote(@authToken, @note)
end

get '/list' do
  ncn = Nokogiri::XML.parse(@note.content)
  tgt = ncn.xpath('//en-note').last.inner_text
  tgt.split(/\n/).reject { |x| x == "" }.to_json
end
