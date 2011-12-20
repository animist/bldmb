require 'sinatra'
require "digest/md5"
require "date"
require "nokogiri"
require "active_support/all"

$LOAD_PATH.push("./lib")
$LOAD_PATH.push("./lib/Evernote/EDAM")

require "thrift/types"
require "thrift/struct"
require "thrift/protocol/base_protocol"
require "thrift/protocol/binary_protocol"
require "thrift/transport/base_transport"
require "thrift/transport/http_client_transport"
require "Evernote/EDAM/user_store"
require "Evernote/EDAM/user_store_constants.rb"
require "Evernote/EDAM/note_store"
require "Evernote/EDAM/limits_constants.rb"


require './bldmb'
require './configure'
run Sinatra::Application
