
var guid = 0,
  ignoredKeyCode = [
    9, 13, 17, 19, 20, 27, 33, 34, 35, 36, 37, 39, 44, 92, 113, 114, 115, 118,
    119, 120, 122, 123, 144, 145,
  ],
  
  userAgent =
    window.navigator.userAgent || window.navigator.vendor || window.opera,
  isFirefox = /Firefox/i.test(userAgent),
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(userAgent),
  isFirefoxMobile = isFirefox && isMobile,
  $body = null,
  delayTimeout = null,
  localStorageKey = "autocompleterCache",
  supportLocalStorage = (function () {
    var supported = typeof window.localStorage !== "undefined";

    if (supported) {
      try {
        localStorage.setItem("autocompleter", "autocompleter");
        localStorage.removeItem("autocompleter");
      } catch (e) {
        supported = false;
      }
    }

    return supported;
  })();


var options = {
  source: null,
  asLocal: false,
  empty: true,
  limit: 10,
  minLength: 0,
  delay: 0,
  customClass: [],
  cache: true,
  cacheExpires: 86400,
  focusOpen: true,
  enterSelect: true,
  hint: false,
  selectFirst: false,
  changeWhenSelect: true,
  highlightMatches: false,
  ignoredKeyCode: [],
  customLabel: false,
  customValue: false,
  onBeforeSend: $.noop,
  onBeforeShow: $.noop,
  onEmpty: $.noop,
  onItem: $.noop,
  onListOpen: $.noop,
  onListClose: $.noop,
  onBeforeLaunch: $.noop,
  template: false,
  offset: false,
  format: null,
  combine: null,
  callback: null,
};

var publics = {

};

function _init(opts) {
  opts = $.extend({}, options, opts || {});
  if ($body === null) {
    $body = $("body");
  }
  var $items = $(this);

  for (var i = 0, count = $items.length; i < count; i++) {
    _build($items.eq(i), opts);
  }

  return $items;
}

function _build($node, opts) {
  if (!$node.hasClass("autocompleter-node")) {
    opts = $.extend({}, opts, $node.data("autocompleter-options"));

    var html =
      '<div class="autocompleter ' +
      opts.customClass.join(" ") +
      '" id="autocompleter-' +
      (guid + 1) +
      '">';

    html += '<ul class="autocompleter-list"></ul>';
    html += "</div>";

    $node.addClass("autocompleter-node").after(html);

    var $autocompleter = $node.next(".autocompleter").eq(0);

    var data = $.extend(
      {
        $node: $node,
        $autocompleter: $autocompleter,
        $selected: null,
        $list: null,
        index: -1,
        hintText: false,
        source: false,
        jqxhr: false,
        response: null,
        focused: false,
        query: "",
        guid: guid++,
      },
      opts
    );

    // Bind autocompleter events
    data.$autocompleter
      .on("mousedown.autocompleter", ".autocompleter-item", data, _select)
      .on("mousedown.autocompleter", ".autocompleter-list", data, function () {
        return false;
      })
      .data("autocompleter", data);

    // Bind node events
    data.$node
      .on("keyup.autocompleter", data, _onKeyup)
      .on("focus.autocompleter", data, _onFocus)
      .on("blur.autocompleter", data, _onBlur)
  }
}

function _search(query, source, data) {
  var response = [];

  query = query.toUpperCase();

  if (source.length) {
    for (var item in source) {
      if (response.length < data.limit) {
        var label =
          data.customLabel && source[item][data.customLabel]
            ? source[item][data.customLabel]
            : source[item].label;
        if (label.toUpperCase().search(query) === 0) {
          response.push(source[item]);
        } 
      }
    }
  }

  return response;
}

function _launch(data) {
  data.query = $.trim(data.$node.val());
  if (typeof data.source === "object") {
    var search = _search(data.query, data.source, data);
    _response(search, data);
  }
}

function _response(response, data) {
  _buildList(response, data);
}

function _buildList(list, data) {
  var menu = "";

  for (var item = 0, count = list.length; item < count; item++) {
    var label =
        data.customLabel && list[item][data.customLabel]
          ? list[item][data.customLabel]
          : list[item].label
    
    if (data.template) {
      var template = data.template.replace(/({{ label }})/gi, label);

      for (var property in list[item]) {
        if (Object.prototype.hasOwnProperty.call(list[item], property)) {
          var regex = new RegExp("{{ " + property + " }}", "gi");

          template = template.replace(regex, list[item][property]);
        }
      }

      label = template;
    }

    menu +='<li class="autocompleter-item">' +label +"</li>";
  }

  data.response = list;
  data.$autocompleter.find(".autocompleter-list").html(menu);
}


function _onKeyup(e) {
  var data = e.data, code = e.keyCode ? e.keyCode : e.which;

  if ($.inArray(code, ignoredKeyCode) === -1 && $.inArray(code, data.ignoredKeyCode) === -1) {
    // Typing
    _launch(data);
  }
}

function _onFocus(e) {
  var data = e.data;
  _launch(data);
  data.$autocompleter.addClass("autocompleter-show")
}

function _onBlur(e) {
  e.preventDefault();
  e.stopPropagation();
  var data = e.data;
  data.$autocompleter.removeClass("autocompleter-show");
}


function _select(e) {
  if (e.type === "mousedown" && $.inArray(e.which, [2, 3]) !== -1) {
    return;
  }

  var data = e.data;

  e.preventDefault();
  e.stopPropagation();

  if (e.type === "mousedown" && $(this).length) {
    data.$selected = $(this);
    data.index = $(this).index();
  }

  _update(data);

}

function _setValue(data) {
  if (data.$selected) {
    let value = data.response[data.index][data.customLabel];
    data.$node.val(value);
  } else {
    data.$node.val(data.query);
  }
}

function _update(data) {
  _setValue(data);
  _handleChange(data);
  _clear(data);
}

function _handleChange(data) {
  if(data.callback)
    data.callback(
      data.index,
      data.response[data.index]
    );
}

function _clear(data) {
  data.response = null;
  data.$selected = null;
  data.index = 0;
  data.$autocompleter.find(".autocompleter-list").empty();
}

$.fn.autocompleter = function (method) {  
  return _init.apply(this, arguments);
};
