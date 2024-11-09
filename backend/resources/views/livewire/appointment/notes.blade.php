<div class="card">
    <div class="card-header">
        <h3 class="card-title"><i class="fe fe-note"></i> Notes</h3>
    </div>
    <div class="card-body">
        <form method="post" wire:submit="store">
            @csrf
            <div class="form-group">
                <div class="input-group">
                    <textarea wire:model='note' type="text" id="add-new-note" class="form-control" placeholder="Add new note to customer"
                        name="text"></textarea>
                    <button class="btn btn-secondary" type="send">
                        <i class="fa fa-save"></i>
                    </button>
                </div>
            </div>
        </form>
        @foreach ($appointment->notes as $note)
            <div class="media m-0 mt-2 border-bottom">
                <div class="avatar_cirle" style="background: {{ $note->creator->color }}"></div>
                <div class="media-body">
                    <a
                        class="text-default fw-semibold">{{ $note->creator->name }}</a>
                    <p class="text-muted ">{!! $note->text !!}</p>
                </div>
            </div>
        @endforeach
    </div>
</div>  
