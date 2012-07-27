# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format
# (all these examples are active by default):
ActiveSupport::Inflector.inflections do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
inflect.irregular 'informacion', 'informaciones'
inflect.irregular 'error', 'errores'
inflect.irregular 'promocion', 'promociones'
inflect.irregular 'sucursal', 'sucursales'
inflect.uncountable %w( nosotros nosotros )
#   inflect.uncountable %w( fish sheep )
end
