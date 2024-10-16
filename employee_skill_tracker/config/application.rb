require_relative "boot"

require "rails/all"
require "devise"

Bundler.require(*Rails.groups)

module EmployeeSkillTracker
  class Application < Rails::Application
    config.load_defaults 7.2
    config.autoload_lib(ignore: %w[assets tasks])
    config.session_store :cookie_store, key: '_employee_skill_tracker_session'
    config.api_only = true
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use config.session_store, config.session_options
  end
end