<script src="{{ URL::asset('assets/plugins/autocomplete/jquery.autocompleter.js')}}"></script>
<script>
$(document).ready(function () {
    $('.js-typeahead').autocompleter({
        source: @json($services),
        empty: false,
        focusOpen: true,
        limit: 10,
        customLabel : 'title',
        callback: function (index, selected) {
            let wire = window.Livewire.getByName("{{ $componentName }}")[0];
            wire.title = selected.title;
            wire.price = selected.price;
            wire.description = selected.description;
            $('#price').val(selected.price);
            $('#description').val(selected.description);
            $('#price').focus();
            $('#price').select();
        }
    });
});
</script>