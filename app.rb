require 'sinatra'
require 'httparty'
require 'json'
require 'better_errors'
require 'parallel'
require 'action_view'
require 'redis'
require 'cgi'
require 'open-uri'

helpers ActionView::Helpers::DateHelper

$redis = Redis.new(:url => ENV["REDISURL"])

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

get '/api' do
  content_type "application/json"
  story_ids = get_story_ids()
	get_stories(story_ids).to_json
end

get '/thumbnail' do
  story_url = params[:story_url]
  content_type 'image/png'
  stw_url = "http://images.shrinktheweb.com/xino.php?stwembed=1&stwaccesskeyid=#{ENV['SHRINKTHEWEBAPIKEY']}&stwsize=xlg&stwurl=#{CGI.escape(story_url)}"
  open(stw_url).read
end

def get_stories(first_eleven)
  # throw 'o'
  	story_responses = Parallel.map(first_eleven) do |story_id|
  		body = get_url("https://hacker-news.firebaseio.com/v0/item/#{story_id}.json")
  		story = JSON.parse(body)
      story_url = story['url']
  		story_domain = URI.parse(story_url).host
  		story_title = story['title']
  		story_time = time_ago_in_words(Time.at(story['time']))
  		story_score = story['score']
  		story_thumbnail_url = "/thumbnail?story_url=#{CGI.escape(story_url)}"
  		comment_length = story['descendants']
  		comment_url = "https://news.ycombinator.com/item?id=#{story_id}"
      if story['kids']
        first_comment_id = story['kids'][0]
        first_comment_response = get_url("https://hacker-news.firebaseio.com/v0/item/#{first_comment_id}.json")
        first_comment_text = JSON.parse(first_comment_response)['text']
      else
        first_comment_text = ""
      end
  	{
      story_url: story_url,
      story_id: story_id,
			domain: story_domain,
			title: story_title,
			time: story_time,
			score: story_score,
			thumbnail_url: story_thumbnail_url,
			comment_length: comment_length,
			comments_url: comment_url,
			first_comment_text: first_comment_text
		}
	end
end

def get_url (url)
  body = $redis.get(url)

  if body.nil?
    body = HTTParty.get(url).body
    $redis.set(url, body)
    $redis.expire(url, 300)
  end

  body
end

def get_story_ids
  body = get_url('https://hacker-news.firebaseio.com/v0/topstories.json')
  first_eleven = JSON.parse(body)[0..11]
end

get '/hello' do
	'omg'
end