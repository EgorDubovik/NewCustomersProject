<div class="card">
    <div class="card-header">Notes history</div>
    <div class="card-body">
        <form method="post" action="{{route('note.store', ['customer'=>$customer])}}">
            @csrf
            <div class="form-group">
                <div class="input-group">
                    <textarea type="text" id="add-new-note" class="form-control" placeholder="Add new note to customer" name="text"></textarea>
                    <button class="btn btn-secondary" type="send">
                        <i class="fa fa-save"></i>
                    </button>
                </div>
            </div>
        </form>
        {{-- <ul class="task-list"> --}}
            @foreach($customer->notes as $note)
                <div class="media m-0 mt-2 border-bottom">
                    <img class="avatar brround avatar-md me-3" alt="avatra-img" src="{{ URL::asset('/assets/images/users/18.jpg') }}">
                    <div class="media-body">
                        <a href="javascript:void(0)" class="text-default fw-semibold">{{ $note->creator->name }}</a>
                        <p class="text-muted ">{!! $note->text !!}</p>
                    </div>
                </div>
            {{-- <li class="d-sm-flex">
                <div>
                    <i class="task-icon bg-primary"></i>
                    <h6 class="fw-semibold"><span class="fs-14 mx-2 fw-normal ">{{$note->text}}</span></h6>
                    <p class="text-muted fs-11">{{$note->updated_at->diffForHumans()}}</p>
                </div>
            </li> --}}
            @endforeach
        {{-- </ul> --}}
    </div>
</div>