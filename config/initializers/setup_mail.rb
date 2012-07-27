 ActionMailer::Base.smtp_settings = {
  :address              => "smtp.lainadelgaza.net",
  :port                 => 587,
  :domain               => "lainadelgaza.net",
  :user_name            => "info@lainadelgaza.net",
  :password             => "ugEIwjJ9",
  :authentication       => "plain",
  :enable_starttls_auto => true
}

ActionMailer::Base.default_url_options[:host] = "localhost"