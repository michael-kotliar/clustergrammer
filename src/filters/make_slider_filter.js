var make_filter_title = require('./make_filter_title');
var apply_filter_slider = require('./apply_filter_slider');
var get_filter_default_state = require('./get_filter_default_state');
var get_subset_views = require('./get_subset_views');

module.exports = function make_slider_filter(config, params, filter_type, div_filters){

  var requested_view = {};

  var possible_filters = _.keys(params.viz.possible_filters);

  _.each(possible_filters, function(tmp_filter){

    if (tmp_filter != filter_type){
      var default_state = get_filter_default_state(params.viz.filter_data, tmp_filter);

      requested_view[tmp_filter] = default_state;
    }

  });

  var filter_title = make_filter_title(params, filter_type);
  
  div_filters
    .append('div')
    .classed('viz_medium_text',true)
    .classed('title_'+filter_type,true)
    .text(filter_title.text + filter_title.state + filter_title.suffix);

  div_filters
    .append('div')
    .classed('slider_'+filter_type,true)
    .classed('slider',true)
    .style('width', params.sidebar.slider.width+'px')
    .style('margin-left', params.sidebar.slider.margin_left+'px')
    .attr('current_state', filter_title.state);
    
  var views = params.network_data.views;

  var available_views = get_subset_views(params, views, requested_view);

  var inst_max = available_views.length - 1;

  $( '.slider_'+filter_type ).slider({
    value:0,
    min: 0,
    max: inst_max,
    step: 1,
    stop: function() {
      params = apply_filter_slider(config, params, filter_type, available_views);
    }
  });

};