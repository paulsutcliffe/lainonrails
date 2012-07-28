 ActionMailer::Base.smtp_settings = {
  :address              => "mail.lainadelgaza.net",
  :port                 => 25,
  :domain               => "lainadelgaza.net",
  :user_name            => "info@lainadelgaza.net",
  :password             => "ugEIwjJ9",
  :authentication       => "plain",
  :enable_starttls_auto => false
}

ActionMailer::Base.default_url_options[:host] = "www.lainadelgaza.net"