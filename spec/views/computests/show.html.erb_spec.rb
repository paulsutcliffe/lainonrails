require 'spec_helper'

describe "computests/show" do
  before(:each) do
    @computest = assign(:computest, stub_model(Computest,
      :imc => 1.5,
      :peso_ideal => 1.5,
      :usuario_id => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1.5/)
    rendered.should match(/1.5/)
    rendered.should match(/1/)
  end
end
