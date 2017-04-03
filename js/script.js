$(function() {
  var $filterType = $('.filter-type');
  var $searchInput = $('[name="search"]');
  var $checkboxes = $('.dropdown-only [type=checkbox]');
  var $results = $('.results');
  var $selectAllBtn = $('.select-all');
  var $deselectAllBtn = $('.deselect-all');
  var $cities = $('.city');

  $checkboxes.each(function(i) {
    $(this).attr('data-city-id', i);
  }); 

  $searchInput.on('input', function() {
    var query = $(this).val().toLowerCase();

    $cities.each(function() {
      var cityName = $(this).find('.city-name').text().toLowerCase();
      var isFound = cityName.indexOf(query) !== -1;
      $(this).toggle(isFound);
    });
  });

  $checkboxes.on('change', function() {
    var $currentCheckbox = $(this);
    var isChecked = $currentCheckbox.is(':checked');
    var cityId = $currentCheckbox.data('city-id');
    var $marker;
    var $remover;

    if (isChecked) {
      $marker = $('<span class="label label-warning city-marker">');
      $marker.attr('data-city-id', cityId);
      $marker.append('<span>' + $currentCheckbox.next().text() + '</span>');
      $remover = $('<span class="item-remove"><i class="glyphicon glyphicon-remove"></i></span>');
      $marker.append($remover);

      $results.append($marker);

      $remover.on('click', function() {
        $currentCheckbox.prop('checked', false);
        $marker.remove();
      });
    } else {
      $marker = $('.city-marker[data-city-id="' + cityId + '"]');
      $marker.remove();
    }

    $filterType.text('Только области');
  });

  $selectAllBtn.on('click', function(ev) {
    ev.preventDefault();
    $checkboxes.filter(':not(:checked)').prop('checked', true).change();
  });

  $deselectAllBtn.on('click', function(ev) {
    ev.preventDefault();
    $filterType.text('Иключить все области');
    $checkboxes.prop('checked', false);
    $results.empty();
  });

  // Dropdown
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
	});

  $('.dropdown-filter').on('click', function(ev) {
    ev.stopPropagation();
  });
});
