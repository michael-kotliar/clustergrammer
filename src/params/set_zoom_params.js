var zoomed = require('../zoom/zoomed');

module.exports = function set_zoom_params(params){

  params.viz.zoom_scale_font = {};
  params.viz.zoom_scale_font.row = 1;
  params.viz.zoom_scale_font.col = 1;


  var half_col_height = (params.matrix.x_scale.rangeBand() / 2);
  params.viz.real_zoom = params.norm_label.width.col / half_col_height;

  var width_by_col = params.viz.clust.dim.width / params.viz.num_col_nodes;
  var height_by_row = params.viz.clust.dim.height / params.viz.num_row_nodes;
  params.viz.zoom_switch = width_by_col / height_by_row;

  if (params.viz.zoom_switch < 1) {
    params.viz.zoom_switch = 1;
  }

  params.zoom_behavior = d3.behavior.zoom()
    .scaleExtent([1, params.viz.real_zoom * params.viz.zoom_switch])
    .on('zoom', function(){
      zoomed(params);
    });

  return params;
};