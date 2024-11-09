<div class="appointment-services">
   <div class="appointment-services-title">
       Services:
   </div>

   <div class="line-services-added row" style="padding-left: 20px">
       <ul class="list-group list-group-flush services-list" id="services-list">
       @foreach ($services as $service)
            <li class="list-group-item d-flex" 
               data-price="{{ $service['price'] }}" 
               data-title="{{ $service['title'] }}"
               data-description="{{ $service['description'] }}">
                <input type="hidden" name="service-prices[]" class = "service-prices" value="{{ $service['price'] }}">
                <input type="hidden" name="service-title[]" value="{{ $service['title'] }}">
                <input type="hidden" name="service-description[]"  value="{{ $service['description'] }}">
                <input type="hidden" name="service-isTaxable[]"  value="{{ $service['taxable'] }}">
                <div class="service-item-loading remove">
                    <div class="spinner-border text-secondary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div>   
                    <i class="task-icon bg-secondary"></i>
                    <h6 class="fw-semibold">{{ $service['title'] }}<span class="text-muted fs-11 mx-2 fw-normal"> ${{ $service['price'] }}</span>
                    </h6>
                    <p class="text-muted fs-12">{!! nl2br($service['description']) !!}</p>
                </div>
                <div class="ms-auto d-flex">
                    <a href="#" wire:click.prevent='edit({{ $service['id'] }})' class="text-muted me-2" data-bs-toggle="modal" data-bs-target="#add_new_service_model"><span class="fe fe-edit"></span></a>
                    <a href="#" wire:click.prevent="delete({{ $service['id'] }})" class="text-muted"><span class="fe fe-trash-2"></span></a>
                </div>
            </li>
           
       @endforeach
       </ul>
       <div class="text-center">
           <a href="#" wire:click='create()' data-bs-toggle="modal" data-bs-target="#add_new_service_model" class="text-secondary">+ add new service</a>
       </div>
   </div>
   <div class="subtotal">
       <table class="table table-borderless text-nowrap mb-0">
           <tbody>
               <tr>
                   <td class="text-end p-1">Tax:</td>
                   <td class="text-end p-1" width='20%'><span class="fw-bold text-danger">+ ${{ number_format($tax,2) }}</span></td>
               </tr>
               <tr>
                   <td class="text-end p-1">Total:</td>
                   <td class="text-end p-1"><span class="fw-bold text-success">${{ number_format($total,2) }}</span></td>
               </tr>
           </tbody>
       </table>
   </div>
</div>