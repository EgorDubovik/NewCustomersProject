<div>
    <div class="card col-md-8">
        <div class="card-header">
            Services list <button wire:click='create' type="button" data-bs-toggle="modal" data-bs-target="#add_new_service_model" class="btn btn-success" style="margin-left: 20px;"><i class="fa fa-plus"></i> Add new service</button>
        </div>
        <div class="card-body">
            <table class="table border table-striped mb-0">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @forelse($services as $service)
                    <tr >
                        <td>{{$service->title}}</td>
                        <td>{{$service->description}}</td>
                        <td>$ {{$service->price}}</td>
                        <td class="align-middle" style="width: 150px">
                            <button type="submit" wire:click='delete({{ $service->id }})' class="btn btn-danger"><i class="fa fa-trash"></i> </button>
                            <button type="button" wire:click='edit({{ $service->id }})' class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#add_new_service_model"><i class="fe fe-edit"></i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    {{-- Add service modal --}}
    @include('livewire.layout.service-add-modal')
    
</div>

