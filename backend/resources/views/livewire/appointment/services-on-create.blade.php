<div>
   <div class="card">
      <div class="card-header">
          <h3 class="card-title"><i class="fe fe-list"></i> Infromation </h3>
      </div>
      <div class="card-body">
         @include('livewire.appointment.services-list', ['services' => $services])
      </div>
      
      @include('livewire.layout.service-add-modal')
  </div>
</div>